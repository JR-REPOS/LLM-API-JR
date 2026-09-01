import { r as searchLibraries } from "./context7.server-Bb7DZUNe.mjs";
import { i as string, r as object } from "../_libs/zod.mjs";
import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search.functions-C8OhKGPq.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var searchDocsLibraries_createServerFn_handler = createServerRpc({
	id: "6e605ce06e679b1c26776744e9fde220cf3c4ccc0cd6a7cf67f29fdf1b5e0aca",
	name: "searchDocsLibraries",
	filename: "src/lib/search.functions.ts"
}, (opts) => searchDocsLibraries.__executeServer(opts));
var searchDocsLibraries = createServerFn({ method: "POST" }).validator(object({
	libraryName: string().min(1).max(120),
	query: string().max(400).optional(),
	apiKey: string().max(200).optional()
})).handler(searchDocsLibraries_createServerFn_handler, async ({ data }) => {
	return { results: (await searchLibraries(data.libraryName, data.query, data.apiKey)).slice(0, 8) };
});
//#endregion
export { searchDocsLibraries_createServerFn_handler };
