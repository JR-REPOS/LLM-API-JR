import { createFileRoute } from "@tanstack/react-router";
import {
  formatSnippetsForPrompt,
  getLibraryContext,
  searchLibraries,
  snippetsToAnswer,
} from "@/lib/context7.server";
import type { DocSnippet } from "@/lib/types";

type IncomingMessage = { role: "user" | "assistant"; content: string };

type ChatBody = {
  messages?: IncomingMessage[];
  libraryId?: string;
  libraryName?: string;
  apiKey?: string;
};

function sse(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function extractLibraryHint(text: string): string | undefined {
  const idMatch = text.match(/(\/[\w.-]+\/[\w.-]+(?:\/[\w.-]+)?)/);
  if (idMatch?.[1]) return idMatch[1];
  return undefined;
}

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: ChatBody;
        try {
          body = (await request.json()) as ChatBody;
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const messages = (body.messages ?? []).filter(
          (m) =>
            (m.role === "user" || m.role === "assistant") &&
            typeof m.content === "string" &&
            m.content.trim().length > 0,
        );
        const lastUser = [...messages].reverse().find((m) => m.role === "user");
        if (!lastUser) {
          return Response.json({ error: "Ask a question about a library." }, { status: 400 });
        }
        if (lastUser.content.length > 4000) {
          return Response.json({ error: "Question is too long." }, { status: 400 });
        }

        const encoder = new TextEncoder();
        const stream = new ReadableStream({
          async start(controller) {
            const send = (event: string, data: unknown) => {
              controller.enqueue(encoder.encode(sse(event, data)));
            };

            try {
              let libraryId = body.libraryId?.trim() || extractLibraryHint(lastUser.content);
              let libraryTitle: string | undefined;
              const contextKey = body.apiKey?.trim() || undefined;

              if (!libraryId) {
                const guess = (body.libraryName || lastUser.content).trim();
                const hits = await searchLibraries(guess, lastUser.content, contextKey);
                const best = hits[0];
                if (!best) {
                  send("error", {
                    error:
                      "Could not match a library. Pin one with the search field, or include a Context7 id like /vercel/next.js.",
                  });
                  controller.close();
                  return;
                }
                libraryId = best.id;
                libraryTitle = best.title;
              }

              send("status", { stage: "docs", libraryId, libraryTitle });

              const { libraryId: resolvedId, snippets } = await getLibraryContext(
                libraryId,
                lastUser.content,
                contextKey,
              );
              libraryId = resolvedId;

              const sources: DocSnippet[] = snippets.slice(0, 6);
              send("meta", {
                libraryId,
                libraryTitle: libraryTitle ?? libraryId,
                sources,
              });

              const docs = formatSnippetsForPrompt(sources);
              const fallback = snippetsToAnswer(sources);
              const apiKeyXai = process.env.XAI_API_KEY;

              const streamFallback = () => {
                send("token", { text: fallback });
                send("done", { libraryId, mode: "docs" });
              };

              if (!apiKeyXai) {
                streamFallback();
                return;
              }

              const history = messages.slice(-8).map((m) => ({
                role: m.role,
                content: m.content.slice(0, 2000),
              }));

              const res = await fetch("https://api.x.ai/v1/chat/completions", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${apiKeyXai}`,
                },
                body: JSON.stringify({
                  model: "grok-4.5",
                  stream: true,
                  max_tokens: 1200,
                  temperature: 0.2,
                  messages: [
                    {
                      role: "system",
                      content: [
                        "You are Context7, a WaveTerm sidebar docs assistant.",
                        "Answer using ONLY the provided documentation snippets when they cover the question.",
                        "If the snippets are incomplete, say so and give the best grounded answer you can.",
                        "Prefer concise, practical answers with short code when useful.",
                        "Cite snippet titles inline like (Title). Do not invent APIs.",
                        `Library: ${libraryId}`,
                        "Documentation:",
                        docs || "(no snippets returned)",
                      ].join("\n\n"),
                    },
                    ...history,
                  ],
                }),
              });

              if (!res.ok || !res.body) {
                streamFallback();
                return;
              }

              const reader = res.body.getReader();
              const decoder = new TextDecoder();
              let buffer = "";
              let gotToken = false;

              while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split("\n");
                buffer = lines.pop() ?? "";
                for (const line of lines) {
                  const trimmed = line.trim();
                  if (!trimmed.startsWith("data:")) continue;
                  const payload = trimmed.slice(5).trim();
                  if (payload === "[DONE]") continue;
                  try {
                    const json = JSON.parse(payload) as {
                      choices?: Array<{ delta?: { content?: string } }>;
                    };
                    const token = json.choices?.[0]?.delta?.content;
                    if (token) {
                      gotToken = true;
                      send("token", { text: token });
                    }
                  } catch {
                    /* ignore keepalives */
                  }
                }
              }

              if (!gotToken) streamFallback();
              else send("done", { libraryId, mode: "grok" });
            } catch (err) {
              send("error", {
                error: err instanceof Error ? err.message : "Chat failed",
              });
            } finally {
              controller.close();
            }
          },
        });

        return new Response(stream, {
          headers: {
            "Content-Type": "text/event-stream; charset=utf-8",
            "Cache-Control": "no-store",
            Connection: "keep-alive",
            "X-Accel-Buffering": "no",
          },
        });
      },
    },
  },
});
