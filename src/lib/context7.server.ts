import type { DocSnippet, LibraryHit } from "./types";

const BASE = "https://context7.com/api/v2";

type SearchResponse = {
  results?: Array<{
    id: string;
    title: string;
    description?: string;
    totalSnippets?: number;
    stars?: number;
    trustScore?: number;
    versions?: string[];
  }>;
  error?: string;
  message?: string;
};

type ContextResponse = {
  codeSnippets?: Array<{
    codeTitle?: string;
    codeDescription?: string;
    codeLanguage?: string;
    codeId?: string;
    pageTitle?: string;
    codeList?: Array<{ language?: string; code?: string }>;
  }>;
  infoSnippets?: Array<{
    title?: string;
    content?: string;
    source?: string;
  }>;
  error?: string;
  message?: string;
  redirectUrl?: string;
};

function authHeaders(apiKey?: string): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/json",
    "X-Context7-Source": "waveterm-widget",
  };
  if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
  return headers;
}

function mapLibrary(row: NonNullable<SearchResponse["results"]>[number]): LibraryHit {
  return {
    id: row.id,
    title: row.title,
    description: row.description ?? "",
    totalSnippets: row.totalSnippets ?? 0,
    stars: row.stars ?? 0,
    trustScore: row.trustScore ?? 0,
    versions: row.versions ?? [],
  };
}

export async function searchLibraries(
  libraryName: string,
  query?: string,
  apiKey?: string,
): Promise<LibraryHit[]> {
  const params = new URLSearchParams({ libraryName: libraryName.trim() });
  if (query?.trim()) params.set("query", query.trim());

  const res = await fetch(`${BASE}/libs/search?${params}`, {
    headers: authHeaders(apiKey),
  });
  const body = (await res.json()) as SearchResponse;
  if (!res.ok) {
    throw new Error(body.message || body.error || `Context7 search failed (${res.status})`);
  }
  return (body.results ?? []).map(mapLibrary);
}

async function fetchContextOnce(
  libraryId: string,
  query: string,
  apiKey?: string,
): Promise<{ status: number; body: ContextResponse }> {
  const params = new URLSearchParams({
    libraryId,
    query,
    type: "json",
  });
  const res = await fetch(`${BASE}/context?${params}`, {
    headers: authHeaders(apiKey),
  });
  const body = (await res.json()) as ContextResponse;
  return { status: res.status, body };
}

export async function getLibraryContext(
  libraryId: string,
  query: string,
  apiKey?: string,
): Promise<{ libraryId: string; snippets: DocSnippet[] }> {
  let id = libraryId;
  let { status, body } = await fetchContextOnce(id, query, apiKey);

  if (body.redirectUrl && typeof body.redirectUrl === "string") {
    id = body.redirectUrl;
    ({ status, body } = await fetchContextOnce(id, query, apiKey));
  }

  if (status !== 200) {
    throw new Error(body.message || body.error || `Context7 context failed (${status})`);
  }

  const snippets: DocSnippet[] = [];

  for (const snippet of body.codeSnippets ?? []) {
    const code = (snippet.codeList ?? [])
      .map((item) => item.code ?? "")
      .filter(Boolean)
      .join("\n\n");
    snippets.push({
      title: snippet.codeTitle || snippet.pageTitle || "Snippet",
      description: snippet.codeDescription ?? "",
      language: snippet.codeLanguage || snippet.codeList?.[0]?.language || "text",
      source: snippet.codeId ?? "",
      code,
    });
  }

  for (const info of body.infoSnippets ?? []) {
    snippets.push({
      title: info.title || "Notes",
      description: info.content ?? "",
      language: "text",
      source: info.source ?? "",
      code: "",
    });
  }

  return { libraryId: id, snippets };
}

export function formatSnippetsForPrompt(snippets: DocSnippet[], maxChars = 9000): string {
  const parts: string[] = [];
  let used = 0;
  for (const snippet of snippets) {
    const block = [
      `### ${snippet.title}`,
      snippet.description,
      snippet.source ? `Source: ${snippet.source}` : "",
      snippet.code ? `\`\`\`${snippet.language}\n${snippet.code}\n\`\`\`` : "",
    ]
      .filter(Boolean)
      .join("\n");
    if (used + block.length > maxChars) break;
    parts.push(block);
    used += block.length;
  }
  return parts.join("\n\n");
}

export function snippetsToAnswer(snippets: DocSnippet[]): string {
  if (snippets.length === 0) {
    return "No documentation snippets came back for that question. Try pinning a more specific library id.";
  }
  const blocks = snippets.slice(0, 4).map((snippet) => {
    const code = snippet.code
      ? `\n\n\`\`\`${snippet.language}\n${snippet.code.slice(0, 1800)}\n\`\`\``
      : "";
    const desc = snippet.description ? `\n\n${snippet.description}` : "";
    return `### ${snippet.title}${desc}${code}`;
  });
  return blocks.join("\n\n");
}
