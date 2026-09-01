import { useEffect, useMemo, useRef, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  LoaderCircle,
  Plus,
  Search,
  SendHorizontal,
  Settings2,
  Square,
  X,
} from "lucide-react";
import { searchDocsLibraries } from "@/lib/search.functions";
import type { ChatMessage, DocSnippet, LibraryHit } from "@/lib/types";
import { cn } from "@/lib/cn";
import { Markdown } from "@/components/md";
import { Button } from "@/components/ui/button";
import { WaveShell } from "@/components/wave-shell";

const STORAGE_KEY = "c7-widget-v1";
const STARTERS = [
  { label: "React hooks", prompt: "How do I use useState and useEffect?", lib: "react" },
  { label: "Wave widgets", prompt: "How do I add a custom web widget to the sidebar?", lib: "waveterm" },
  { label: "Next.js middleware", prompt: "How do I implement authentication with middleware?", lib: "next.js" },
];

function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

type Persist = {
  library: LibraryHit | null;
  messages: ChatMessage[];
  apiKey: string;
};

function loadPersist(): Persist {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { library: null, messages: [], apiKey: "" };
    return JSON.parse(raw) as Persist;
  } catch {
    return { library: null, messages: [], apiKey: "" };
  }
}

function widgetJson(origin: string) {
  return `{
  "context7": {
    "icon": "book",
    "label": "context7",
    "color": "#7aa2b8",
    "description": "Chat live library docs via Context7",
    "display:order": -1,
    "blockdef": {
      "meta": {
        "view": "web",
        "url": "${origin}",
        "pinnedurl": "${origin}"
      }
    }
  }
}`;
}

export function Context7Widget() {
  const [hydrated, setHydrated] = useState(false);
  const [library, setLibrary] = useState<LibraryHit | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [draft, setDraft] = useState("");
  const [query, setQuery] = useState("");
  const [hits, setHits] = useState<LibraryHit[]>([]);
  const [searching, setSearching] = useState(false);
  const [busy, setBusy] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [origin, setOrigin] = useState("https://your-app.grok.me");
  const abortRef = useRef<AbortController | null>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const saved = loadPersist();
    setLibrary(saved.library);
    setMessages(saved.messages.filter((m) => !m.pending));
    setApiKey(saved.apiKey);
    setOrigin(window.location.origin);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ library, messages: messages.filter((m) => !m.pending), apiKey }),
    );
  }, [hydrated, library, messages, apiKey]);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function runSearch(name: string) {
    const libraryName = name.trim();
    if (libraryName.length < 2) {
      setHits([]);
      return;
    }
    setSearching(true);
    try {
      const { results } = await searchDocsLibraries({
        data: { libraryName, query: libraryName, apiKey: apiKey || undefined },
      });
      setHits(results);
    } catch {
      setHits([]);
    } finally {
      setSearching(false);
    }
  }

  function stop() {
    abortRef.current?.abort();
    abortRef.current = null;
    setBusy(false);
    setMessages((prev) =>
      prev.map((m) => (m.pending ? { ...m, pending: false, content: m.content || "Stopped." } : m)),
    );
  }

  function resetChat() {
    stop();
    setMessages([]);
  }

  async function send(text?: string, libName?: string) {
    const content = (text ?? draft).trim();
    if (!content || busy) return;
    setDraft("");
    setQuery("");
    setHits([]);
    const user: ChatMessage = { id: uid(), role: "user", content };
    const assistant: ChatMessage = {
      id: uid(),
      role: "assistant",
      content: "",
      pending: true,
    };
    const next = [...messages, user, assistant];
    setMessages(next);
    setBusy(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: next
            .filter((m) => !m.pending && m.content)
            .concat(user)
            .map((m) => ({ role: m.role, content: m.content })),
          libraryId: library?.id,
          libraryName: libName || library?.title,
          apiKey: apiKey || undefined,
        }),
      });

      if (!res.ok || !res.body) {
        const err = await res.json().catch(() => ({ error: `Request failed (${res.status})` }));
        throw new Error((err as { error?: string }).error || `Request failed (${res.status})`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let acc = "";
      let sources: DocSnippet[] = [];
      let libId = library?.id;
      let libTitle = library?.title;

      const apply = (patch: Partial<ChatMessage>) => {
        setMessages((prev) => prev.map((m) => (m.id === assistant.id ? { ...m, ...patch } : m)));
      };

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";
        for (const chunk of chunks) {
          const event = chunk.match(/^event: (\w+)/m)?.[1];
          const dataLine = chunk
            .split("\n")
            .filter((l) => l.startsWith("data:"))
            .map((l) => l.slice(5).trim())
            .join("");
          if (!event || !dataLine) continue;
          const data = JSON.parse(dataLine) as {
            text?: string;
            error?: string;
            libraryId?: string;
            libraryTitle?: string;
            sources?: DocSnippet[];
            stage?: string;
          };
          if (event === "token" && data.text) {
            acc += data.text;
            apply({ content: acc, pending: true, sources, libraryId: libId, libraryTitle: libTitle });
          } else if (event === "meta") {
            sources = data.sources ?? [];
            libId = data.libraryId ?? libId;
            libTitle = data.libraryTitle ?? libTitle;
            if (data.libraryId && data.libraryTitle) {
              setLibrary((prev) =>
                prev?.id === data.libraryId
                  ? prev
                  : {
                      id: data.libraryId!,
                      title: data.libraryTitle!,
                      description: prev?.description ?? "",
                      totalSnippets: prev?.totalSnippets ?? 0,
                      stars: prev?.stars ?? 0,
                      trustScore: prev?.trustScore ?? 0,
                      versions: prev?.versions ?? [],
                    },
              );
            }
            apply({ sources, libraryId: libId, libraryTitle: libTitle });
          } else if (event === "error") {
            throw new Error(data.error || "Chat failed");
          }
        }
      }

      apply({ content: acc || "No answer returned.", pending: false, sources, libraryId: libId, libraryTitle: libTitle });
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistant.id
            ? {
                ...m,
                pending: false,
                error: err instanceof Error ? err.message : "Chat failed",
                content: m.content,
              }
            : m,
        ),
      );
    } finally {
      setBusy(false);
      abortRef.current = null;
      inputRef.current?.focus();
    }
  }

  const json = useMemo(() => widgetJson(origin), [origin]);
  const empty = messages.length === 0;

  return (
    <WaveShell>
      <div className="flex h-full min-h-0">
        <section className="mx-auto flex h-full min-h-0 w-full max-w-xl flex-col border-x border-border bg-surface md:max-w-md lg:max-w-lg">
          <div className="flex h-11 shrink-0 items-center gap-2 border-b border-border px-2">
            <div className="flex size-8 items-center justify-center rounded-sm bg-raised text-primary">
              <BookOpen className="size-4" strokeWidth={1.75} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium leading-none">Context7</div>
              <div className="mt-0.5 truncate font-mono text-[10px] text-subtle">
                {library ? library.id : "sidebar widget"}
              </div>
            </div>
            <Button variant="quiet" size="iconSm" onClick={resetChat} aria-label="New chat">
              <Plus className="size-4" />
            </Button>
            <Button
              variant="quiet"
              size="iconSm"
              onClick={() => setSettingsOpen((v) => !v)}
              aria-label="Install in WaveTerm"
            >
              <Settings2 className="size-4" />
            </Button>
          </div>

          <div className="relative border-b border-border px-2 py-2">
            <div className="flex items-center gap-1.5 rounded-md bg-bg px-2 shadow-border">
              <Search className="size-3.5 shrink-0 text-subtle" />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  void runSearch(e.target.value);
                }}
                onBlur={() => {
                  window.setTimeout(() => setHits([]), 180);
                }}
                placeholder={library ? `Pinned: ${library.title}` : "Pin a library — react, waveterm…"}
                className="h-9 w-full bg-transparent text-sm text-fg outline-none placeholder:text-muted"
              />
              {library && (
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-xs bg-raised px-1.5 py-0.5 font-mono text-[10px] text-primary"
                  onClick={() => setLibrary(null)}
                >
                  {library.title}
                  <X className="size-3" />
                </button>
              )}
            </div>
            {(searching || hits.length > 0) && query.trim().length >= 2 && (
              <ul className="absolute inset-x-2 top-full z-20 mt-1 max-h-64 overflow-auto rounded-md bg-raised py-1 shadow-border">
                {searching && hits.length === 0 && (
                  <li className="px-3 py-2 text-xs text-muted">Searching Context7…</li>
                )}
                {hits.map((hit) => (
                  <li key={hit.id}>
                    <button
                      type="button"
                      className="flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left hover:bg-surface"
                      onClick={() => {
                        setLibrary(hit);
                        setQuery("");
                        setHits([]);
                      }}
                    >
                      <span className="text-sm text-fg">{hit.title}</span>
                      <span className="font-mono text-[10px] text-primary">{hit.id}</span>
                      <span className="line-clamp-2 text-xs text-muted">{hit.description}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {settingsOpen && (
            <div className="border-b border-border bg-bg px-3 py-3">
              <p className="text-xs font-medium text-fg">Install in WaveTerm</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                Merge this into <span className="font-mono text-fg">~/.config/waveterm/config/widgets.json</span>, or run{" "}
                <span className="font-mono text-fg">wsh editconfig widgets.json</span>. Click the Context7 icon in the
                right sidebar.
              </p>
              <pre className="mt-2 max-h-40 overflow-auto rounded-md bg-surface p-2 font-mono text-[10px] leading-relaxed text-muted shadow-border">
                {json}
              </pre>
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={async () => {
                    await navigator.clipboard.writeText(json);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1400);
                  }}
                >
                  {copied ? "Copied" : "Copy widgets.json"}
                </Button>
                <Button size="sm" variant="ghost" onClick={() => setSettingsOpen(false)}>
                  Close
                </Button>
              </div>
              <label className="mt-3 block text-[10px] uppercase tracking-wider text-subtle">
                Optional Context7 API key
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="ctx7sk-…"
                  className="mt-1 h-9 w-full rounded-sm bg-surface px-2 font-mono text-xs text-fg shadow-border outline-none placeholder:text-subtle"
                />
              </label>
            </div>
          )}

          <div ref={scrollerRef} className="min-h-0 flex-1 overflow-y-auto px-3 py-3">
            {empty && (
              <div className="flex h-full flex-col justify-end gap-6 pb-2">
                <div>
                  <h1 className="text-xl font-medium tracking-tight">Ask current docs</h1>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                    Pin a library, then ask. Context7 fetches live snippets; Grok answers only from those pages — the
                    same loop as a WaveTerm sidebar widget.
                  </p>
                </div>
                <div className="flex flex-col gap-1.5">
                  {STARTERS.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      className="flex items-center justify-between rounded-md bg-bg px-3 py-2.5 text-left shadow-border transition-colors hover:bg-raised"
                      onClick={() => {
                        void send(s.prompt, s.lib);
                      }}
                    >
                      <span className="text-sm text-fg">{s.label}</span>
                      <span className="font-mono text-[10px] text-subtle">{s.lib}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <ol className="flex flex-col gap-4">
              {messages.map((m) => (
                <li key={m.id} className="min-w-0">
                  {m.role === "user" ? (
                    <div className="ml-8 rounded-lg rounded-br-xs bg-raised px-3 py-2 text-sm leading-relaxed text-fg">
                      {m.content}
                    </div>
                  ) : (
                    <div>
                      <div className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-subtle">
                        <BookOpen className="size-3" />
                        {m.libraryTitle || library?.title || "Context7"}
                        {m.pending && <LoaderCircle className="size-3 animate-spin text-primary" />}
                      </div>
                      {m.sources && m.sources.length > 0 && <Sources sources={m.sources} />}
                      {m.content ? (
                        <Markdown text={m.content} />
                      ) : m.pending ? (
                        <p className="text-sm text-muted">Pulling docs…</p>
                      ) : null}
                      {m.error && <p className="mt-2 text-sm text-danger">{m.error}</p>}
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>

          <form
            className="shrink-0 border-t border-border p-2"
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <div className="flex items-end gap-1.5 rounded-lg bg-bg p-1.5 shadow-border">
              <textarea
                ref={inputRef}
                rows={1}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void send();
                  }
                }}
                placeholder={library ? `Ask ${library.title}…` : "Ask any library…"}
                className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-fg outline-none placeholder:text-muted"
              />
              {busy ? (
                <Button type="button" size="iconSm" variant="ghost" onClick={stop} aria-label="Stop">
                  <Square className="size-3.5 fill-current" />
                </Button>
              ) : (
                <Button type="submit" size="iconSm" disabled={!draft.trim()} aria-label="Send">
                  <SendHorizontal className="size-3.5" />
                </Button>
              )}
            </div>
          </form>
        </section>
      </div>
    </WaveShell>
  );
}

function Sources({ sources }: { sources: DocSnippet[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mb-2">
      <button
        type="button"
        className="flex items-center gap-1 text-[11px] text-muted hover:text-fg"
        onClick={() => setOpen((v) => !v)}
      >
        <ChevronDown className={cn("size-3.5 transition-transform", open ? "rotate-0" : "-rotate-90")} />
        {sources.length} snippet{sources.length === 1 ? "" : "s"}
      </button>
      {open && (
        <ul className="mt-1.5 space-y-1.5">
          {sources.map((s, i) => (
            <li key={`${s.title}-${i}`} className="rounded-md bg-bg px-2.5 py-2 shadow-border">
              <div className="text-xs font-medium text-fg">{s.title}</div>
              {s.description && (
                <p className="mt-0.5 line-clamp-3 text-xs leading-relaxed text-muted">{s.description}</p>
              )}
              {s.source && (
                <a
                  href={s.source.startsWith("http") ? s.source : undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block truncate font-mono text-[10px] text-primary"
                >
                  {s.source}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
