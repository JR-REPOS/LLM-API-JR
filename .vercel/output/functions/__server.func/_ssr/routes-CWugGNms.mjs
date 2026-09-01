import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { _ as Activity, a as Sparkles, c as Search, d as Globe, f as Folder, g as BookOpen, h as Check, i as SquareTerminal, l as Plus, m as ChevronDown, o as Settings2, p as Copy, r as Square, s as SendHorizontal, t as X, u as LoaderCircle } from "../_libs/lucide-react.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CWugGNms.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var searchDocsLibraries = createServerFn({ method: "POST" }).validator(object({
	libraryName: string().min(1).max(120),
	query: string().max(400).optional(),
	apiKey: string().max(200).optional()
})).handler(createSsrRpc("6e605ce06e679b1c26776744e9fde220cf3c4ccc0cd6a7cf67f29fdf1b5e0aca"));
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function Inline({ text }) {
	const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: parts.map((part, i) => {
		if (part.startsWith("`") && part.endsWith("`")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded-xs bg-raised px-1 py-px font-mono text-[0.85em] text-primary",
			children: part.slice(1, -1)
		}, i);
		if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-medium text-fg",
			children: part.slice(2, -2)
		}, i);
		const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
		if (link) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
			href: link[2],
			target: "_blank",
			rel: "noreferrer",
			className: "text-primary underline-offset-2 hover:underline",
			children: link[1]
		}, i);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
	}) });
}
function CodeBlock({ code, lang }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "group relative my-2 overflow-hidden rounded-md bg-bg shadow-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between border-b border-border px-3 py-1.5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] uppercase tracking-wider text-subtle",
				children: lang || "code"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "inline-flex size-7 items-center justify-center rounded-xs text-muted transition-colors hover:text-fg",
				onClick: async () => {
					await navigator.clipboard.writeText(code);
					setCopied(true);
					setTimeout(() => setCopied(false), 1200);
				},
				"aria-label": "Copy code",
				children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
			className: "overflow-x-auto p-3 font-mono text-xs leading-relaxed text-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code })
		})]
	});
}
function Markdown({ text, className }) {
	const blocks = text.split(/```/);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("text-sm leading-relaxed text-fg", className),
		children: blocks.map((block, i) => {
			if (i % 2 === 1) {
				const nl = block.indexOf("\n");
				const lang = nl === -1 ? "" : block.slice(0, nl).trim();
				const code = (nl === -1 ? block : block.slice(nl + 1)).replace(/\n$/, "");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CodeBlock, {
					code,
					lang
				}, i);
			}
			return block.split(/\n{2,}/).map((para, j) => {
				const trimmed = para.trim();
				if (!trimmed) return null;
				if (trimmed.startsWith("### ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-3 mb-1 text-sm font-medium",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inline, { text: trimmed.slice(4) })
				}, `${i}-${j}`);
				if (trimmed.startsWith("## ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-3 mb-1 text-base font-medium",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inline, { text: trimmed.slice(3) })
				}, `${i}-${j}`);
				if (trimmed.startsWith("- ")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "my-1.5 list-disc space-y-1 pl-4 text-muted",
					children: trimmed.split("\n").map((line, k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inline, { text: line.replace(/^- /, "") }) }, k))
				}, `${i}-${j}`);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "my-1.5 text-pretty text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inline, { text: trimmed })
				}, `${i}-${j}`);
			});
		})
	});
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 font-medium transition-[opacity,transform,background-color,color] duration-150 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:pointer-events-none disabled:opacity-40 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			primary: "bg-primary text-primary-fg hover:opacity-90",
			ghost: "bg-transparent text-fg hover:bg-raised",
			quiet: "bg-transparent text-muted hover:text-fg hover:bg-raised",
			danger: "bg-danger/15 text-danger hover:bg-danger/25"
		},
		size: {
			sm: "h-8 rounded-sm px-2.5 text-xs",
			md: "h-10 rounded-md px-3.5 text-sm",
			icon: "size-10 rounded-md",
			iconSm: "size-8 rounded-sm"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function Button({ className, variant, size, asChild, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size
		}), className),
		...props
	});
}
var RAIL = [
	{
		id: "term",
		icon: SquareTerminal,
		label: "Terminal",
		active: false
	},
	{
		id: "files",
		icon: Folder,
		label: "Files",
		active: false
	},
	{
		id: "web",
		icon: Globe,
		label: "Web",
		active: false
	},
	{
		id: "ai",
		icon: Sparkles,
		label: "Wave AI",
		active: false
	},
	{
		id: "sys",
		icon: Activity,
		label: "Sysinfo",
		active: false
	},
	{
		id: "c7",
		icon: BookOpen,
		label: "Context7",
		active: true
	}
];
function WaveShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-dvh min-h-0 bg-bg text-fg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "hidden w-14 shrink-0 flex-col items-center border-r border-border py-3 md:flex",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex size-8 items-center justify-center rounded-sm bg-raised font-mono text-xs font-medium text-primary",
				children: "W"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "flex flex-1 flex-col items-center gap-1",
				"aria-label": "Wave widgets",
				children: RAIL.map((item) => {
					const Icon = item.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						title: item.label,
						className: cn("flex size-10 items-center justify-center rounded-sm transition-colors duration-150", item.active ? "bg-raised text-primary shadow-border" : "text-subtle hover:bg-surface hover:text-muted"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-4",
							strokeWidth: 1.75
						})
					}, item.id);
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-0 min-w-0 flex-1 flex-col",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-9 shrink-0 items-center gap-2 border-b border-border px-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-ok/80" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium tracking-tight text-muted",
						children: "workspace"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs text-fg",
						children: "Context7"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1",
				children
			})]
		})]
	});
}
var STORAGE_KEY = "c7-widget-v1";
var STARTERS = [
	{
		label: "React hooks",
		prompt: "How do I use useState and useEffect?",
		lib: "react"
	},
	{
		label: "Wave widgets",
		prompt: "How do I add a custom web widget to the sidebar?",
		lib: "waveterm"
	},
	{
		label: "Next.js middleware",
		prompt: "How do I implement authentication with middleware?",
		lib: "next.js"
	}
];
function uid() {
	return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}
function loadPersist() {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (!raw) return {
			library: null,
			messages: [],
			apiKey: ""
		};
		return JSON.parse(raw);
	} catch {
		return {
			library: null,
			messages: [],
			apiKey: ""
		};
	}
}
function widgetJson(origin) {
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
function Context7Widget() {
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [library, setLibrary] = (0, import_react.useState)(null);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [apiKey, setApiKey] = (0, import_react.useState)("");
	const [draft, setDraft] = (0, import_react.useState)("");
	const [query, setQuery] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)([]);
	const [searching, setSearching] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [settingsOpen, setSettingsOpen] = (0, import_react.useState)(false);
	const [copied, setCopied] = (0, import_react.useState)(false);
	const [origin, setOrigin] = (0, import_react.useState)("https://your-app.grok.me");
	const abortRef = (0, import_react.useRef)(null);
	const scrollerRef = (0, import_react.useRef)(null);
	const inputRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const saved = loadPersist();
		setLibrary(saved.library);
		setMessages(saved.messages.filter((m) => !m.pending));
		setApiKey(saved.apiKey);
		setOrigin(window.location.origin);
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		localStorage.setItem(STORAGE_KEY, JSON.stringify({
			library,
			messages: messages.filter((m) => !m.pending),
			apiKey
		}));
	}, [
		hydrated,
		library,
		messages,
		apiKey
	]);
	(0, import_react.useEffect)(() => {
		scrollerRef.current?.scrollTo({
			top: scrollerRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [messages]);
	async function runSearch(name) {
		const libraryName = name.trim();
		if (libraryName.length < 2) {
			setHits([]);
			return;
		}
		setSearching(true);
		try {
			const { results } = await searchDocsLibraries({ data: {
				libraryName,
				query: libraryName,
				apiKey: apiKey || void 0
			} });
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
		setMessages((prev) => prev.map((m) => m.pending ? {
			...m,
			pending: false,
			content: m.content || "Stopped."
		} : m));
	}
	function resetChat() {
		stop();
		setMessages([]);
	}
	async function send(text) {
		const content = (text ?? draft).trim();
		if (!content || busy) return;
		setDraft("");
		const user = {
			id: uid(),
			role: "user",
			content
		};
		const assistant = {
			id: uid(),
			role: "assistant",
			content: "",
			pending: true
		};
		const next = [
			...messages,
			user,
			assistant
		];
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
					messages: next.filter((m) => !m.pending && m.content).concat(user).map((m) => ({
						role: m.role,
						content: m.content
					})),
					libraryId: library?.id,
					libraryName: library?.title,
					apiKey: apiKey || void 0
				})
			});
			if (!res.ok || !res.body) {
				const err = await res.json().catch(() => ({ error: `Request failed (${res.status})` }));
				throw new Error(err.error || `Request failed (${res.status})`);
			}
			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let buffer = "";
			let acc = "";
			let sources = [];
			let libId = library?.id;
			let libTitle = library?.title;
			const apply = (patch) => {
				setMessages((prev) => prev.map((m) => m.id === assistant.id ? {
					...m,
					...patch
				} : m));
			};
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				buffer += decoder.decode(value, { stream: true });
				const chunks = buffer.split("\n\n");
				buffer = chunks.pop() ?? "";
				for (const chunk of chunks) {
					const event = chunk.match(/^event: (\w+)/m)?.[1];
					const dataLine = chunk.split("\n").filter((l) => l.startsWith("data:")).map((l) => l.slice(5).trim()).join("");
					if (!event || !dataLine) continue;
					const data = JSON.parse(dataLine);
					if (event === "token" && data.text) {
						acc += data.text;
						apply({
							content: acc,
							pending: true,
							sources,
							libraryId: libId,
							libraryTitle: libTitle
						});
					} else if (event === "meta") {
						sources = data.sources ?? [];
						libId = data.libraryId ?? libId;
						libTitle = data.libraryTitle ?? libTitle;
						if (data.libraryId && data.libraryTitle) setLibrary((prev) => prev?.id === data.libraryId ? prev : {
							id: data.libraryId,
							title: data.libraryTitle,
							description: prev?.description ?? "",
							totalSnippets: prev?.totalSnippets ?? 0,
							stars: prev?.stars ?? 0,
							trustScore: prev?.trustScore ?? 0,
							versions: prev?.versions ?? []
						});
						apply({
							sources,
							libraryId: libId,
							libraryTitle: libTitle
						});
					} else if (event === "error") throw new Error(data.error || "Chat failed");
				}
			}
			apply({
				content: acc || "No answer returned.",
				pending: false,
				sources,
				libraryId: libId,
				libraryTitle: libTitle
			});
		} catch (err) {
			if (err.name === "AbortError") return;
			setMessages((prev) => prev.map((m) => m.id === assistant.id ? {
				...m,
				pending: false,
				error: err instanceof Error ? err.message : "Chat failed",
				content: m.content
			} : m));
		} finally {
			setBusy(false);
			abortRef.current = null;
			inputRef.current?.focus();
		}
	}
	const json = (0, import_react.useMemo)(() => widgetJson(origin), [origin]);
	const empty = messages.length === 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WaveShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex h-full min-h-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto flex h-full min-h-0 w-full max-w-xl flex-col border-x border-border bg-surface md:max-w-md lg:max-w-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex h-11 shrink-0 items-center gap-2 border-b border-border px-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex size-8 items-center justify-center rounded-sm bg-raised text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {
								className: "size-4",
								strokeWidth: 1.75
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-sm font-medium leading-none",
								children: "Context7"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 truncate font-mono text-[10px] text-subtle",
								children: library ? library.id : "sidebar widget"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "quiet",
							size: "iconSm",
							onClick: resetChat,
							"aria-label": "New chat",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "quiet",
							size: "iconSm",
							onClick: () => setSettingsOpen((v) => !v),
							"aria-label": "Install in WaveTerm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings2, { className: "size-4" })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative border-b border-border px-2 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 rounded-md bg-bg px-2 shadow-border",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 shrink-0 text-subtle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => {
									setQuery(e.target.value);
									runSearch(e.target.value);
								},
								onFocus: () => {
									if (query.trim().length >= 2) runSearch(query);
								},
								placeholder: library ? `Pinned: ${library.title}` : "Pin a library — react, waveterm…",
								className: "h-9 w-full bg-transparent text-sm text-fg outline-none placeholder:text-subtle"
							}),
							library && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "inline-flex items-center gap-1 rounded-xs bg-raised px-1.5 py-0.5 font-mono text-[10px] text-primary",
								onClick: () => setLibrary(null),
								children: [library.title, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3" })]
							})
						]
					}), (searching || hits.length > 0) && query.trim().length >= 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "absolute inset-x-2 top-full z-20 mt-1 max-h-64 overflow-auto rounded-md bg-raised py-1 shadow-border",
						children: [searching && hits.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "px-3 py-2 text-xs text-muted",
							children: "Searching Context7…"
						}), hits.map((hit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "flex w-full flex-col items-start gap-0.5 px-3 py-2 text-left hover:bg-surface",
							onClick: () => {
								setLibrary(hit);
								setQuery("");
								setHits([]);
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-fg",
									children: hit.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-primary",
									children: hit.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-2 text-xs text-muted",
									children: hit.description
								})
							]
						}) }, hit.id))]
					})]
				}),
				settingsOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "border-b border-border bg-bg px-3 py-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-fg",
							children: "Install in WaveTerm"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs leading-relaxed text-muted",
							children: [
								"Merge this into ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-fg",
									children: "~/.config/waveterm/config/widgets.json"
								}),
								", or run",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-fg",
									children: "wsh editconfig widgets.json"
								}),
								". Click the Context7 icon in the right sidebar."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "mt-2 max-h-40 overflow-auto rounded-md bg-surface p-2 font-mono text-[10px] leading-relaxed text-muted shadow-border",
							children: json
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: async () => {
									await navigator.clipboard.writeText(json);
									setCopied(true);
									setTimeout(() => setCopied(false), 1400);
								},
								children: copied ? "Copied" : "Copy widgets.json"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => setSettingsOpen(false),
								children: "Close"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-[10px] uppercase tracking-wider text-subtle",
							children: ["Optional Context7 API key", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "password",
								value: apiKey,
								onChange: (e) => setApiKey(e.target.value),
								placeholder: "ctx7sk-…",
								className: "mt-1 h-9 w-full rounded-sm bg-surface px-2 font-mono text-xs text-fg shadow-border outline-none placeholder:text-subtle"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					ref: scrollerRef,
					className: "min-h-0 flex-1 overflow-y-auto px-3 py-3",
					children: [empty && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex h-full flex-col justify-end gap-6 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "text-xl font-medium tracking-tight",
							children: "Ask current docs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-sm text-sm leading-relaxed text-muted",
							children: "Pin a library, then ask. Context7 fetches live snippets; Grok answers only from those pages — the same loop as a WaveTerm sidebar widget."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-col gap-1.5",
							children: STARTERS.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "flex items-center justify-between rounded-md bg-bg px-3 py-2.5 text-left shadow-border transition-colors hover:bg-raised",
								onClick: () => {
									setQuery(s.lib);
									runSearch(s.lib);
									send(s.prompt);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-fg",
									children: s.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-subtle",
									children: s.lib
								})]
							}, s.label))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "flex flex-col gap-4",
						children: messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "min-w-0",
							children: m.role === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ml-8 rounded-lg rounded-br-xs bg-raised px-3 py-2 text-sm leading-relaxed text-fg",
								children: m.content
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-subtle",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, { className: "size-3" }),
										m.libraryTitle || library?.title || "Context7",
										m.pending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3 animate-spin text-primary" })
									]
								}),
								m.sources && m.sources.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sources, { sources: m.sources }),
								m.content ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { text: m.content }) : m.pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted",
									children: "Pulling docs…"
								}) : null,
								m.error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-danger",
									children: m.error
								})
							] })
						}, m.id))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
					className: "shrink-0 border-t border-border p-2",
					onSubmit: (e) => {
						e.preventDefault();
						send();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-end gap-1.5 rounded-lg bg-bg p-1.5 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							ref: inputRef,
							rows: 1,
							value: draft,
							onChange: (e) => setDraft(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									send();
								}
							},
							placeholder: library ? `Ask ${library.title}…` : "Ask any library…",
							className: "max-h-32 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-fg outline-none placeholder:text-subtle"
						}), busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							size: "iconSm",
							variant: "ghost",
							onClick: stop,
							"aria-label": "Stop",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5 fill-current" })
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "iconSm",
							disabled: !draft.trim(),
							"aria-label": "Send",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SendHorizontal, { className: "size-3.5" })
						})]
					})
				})
			]
		})
	}) });
}
function Sources({ sources }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "flex items-center gap-1 text-[11px] text-muted hover:text-fg",
			onClick: () => setOpen((v) => !v),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: cn("size-3.5 transition-transform", open ? "rotate-0" : "-rotate-90") }),
				sources.length,
				" snippet",
				sources.length === 1 ? "" : "s"
			]
		}), open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-1.5 space-y-1.5",
			children: sources.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "rounded-md bg-bg px-2.5 py-2 shadow-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs font-medium text-fg",
						children: s.title
					}),
					s.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 line-clamp-3 text-xs leading-relaxed text-muted",
						children: s.description
					}),
					s.source && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.source.startsWith("http") ? s.source : void 0,
						target: "_blank",
						rel: "noreferrer",
						className: "mt-1 block truncate font-mono text-[10px] text-primary",
						children: s.source
					})
				]
			}, `${s.title}-${i}`))
		})]
	});
}
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context7Widget, {});
}
//#endregion
export { Home as component };
