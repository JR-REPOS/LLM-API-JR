//#region node_modules/.nitro/vite/services/ssr/assets/context7.server-Bb7DZUNe.js
var BASE = "https://context7.com/api/v2";
function authHeaders(apiKey) {
	const headers = {
		Accept: "application/json",
		"X-Context7-Source": "waveterm-widget"
	};
	if (apiKey) headers.Authorization = `Bearer ${apiKey}`;
	return headers;
}
function mapLibrary(row) {
	return {
		id: row.id,
		title: row.title,
		description: row.description ?? "",
		totalSnippets: row.totalSnippets ?? 0,
		stars: row.stars ?? 0,
		trustScore: row.trustScore ?? 0,
		versions: row.versions ?? []
	};
}
async function searchLibraries(libraryName, query, apiKey) {
	const params = new URLSearchParams({ libraryName: libraryName.trim() });
	if (query?.trim()) params.set("query", query.trim());
	const res = await fetch(`${BASE}/libs/search?${params}`, { headers: authHeaders(apiKey) });
	const body = await res.json();
	if (!res.ok) throw new Error(body.message || body.error || `Context7 search failed (${res.status})`);
	return (body.results ?? []).map(mapLibrary);
}
async function fetchContextOnce(libraryId, query, apiKey) {
	const params = new URLSearchParams({
		libraryId,
		query,
		type: "json"
	});
	const res = await fetch(`${BASE}/context?${params}`, { headers: authHeaders(apiKey) });
	const body = await res.json();
	return {
		status: res.status,
		body
	};
}
async function getLibraryContext(libraryId, query, apiKey) {
	let id = libraryId;
	let { status, body } = await fetchContextOnce(id, query, apiKey);
	if (body.redirectUrl && typeof body.redirectUrl === "string") {
		id = body.redirectUrl;
		({status, body} = await fetchContextOnce(id, query, apiKey));
	}
	if (status !== 200) throw new Error(body.message || body.error || `Context7 context failed (${status})`);
	const snippets = [];
	for (const snippet of body.codeSnippets ?? []) {
		const code = (snippet.codeList ?? []).map((item) => item.code ?? "").filter(Boolean).join("\n\n");
		snippets.push({
			title: snippet.codeTitle || snippet.pageTitle || "Snippet",
			description: snippet.codeDescription ?? "",
			language: snippet.codeLanguage || snippet.codeList?.[0]?.language || "text",
			source: snippet.codeId ?? "",
			code
		});
	}
	for (const info of body.infoSnippets ?? []) snippets.push({
		title: info.title || "Notes",
		description: info.content ?? "",
		language: "text",
		source: info.source ?? "",
		code: ""
	});
	return {
		libraryId: id,
		snippets
	};
}
function formatSnippetsForPrompt(snippets, maxChars = 9e3) {
	const parts = [];
	let used = 0;
	for (const snippet of snippets) {
		const block = [
			`### ${snippet.title}`,
			snippet.description,
			snippet.source ? `Source: ${snippet.source}` : "",
			snippet.code ? `\`\`\`${snippet.language}\n${snippet.code}\n\`\`\`` : ""
		].filter(Boolean).join("\n");
		if (used + block.length > maxChars) break;
		parts.push(block);
		used += block.length;
	}
	return parts.join("\n\n");
}
//#endregion
export { getLibraryContext as n, searchLibraries as r, formatSnippetsForPrompt as t };
