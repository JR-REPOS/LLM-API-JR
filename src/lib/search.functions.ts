import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { searchLibraries } from "./context7.server";

export const searchDocsLibraries = createServerFn({ method: "POST" })
  .validator(
    z.object({
      libraryName: z.string().min(1).max(120),
      query: z.string().max(400).optional(),
      apiKey: z.string().max(200).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const results = await searchLibraries(data.libraryName, data.query, data.apiKey);
    return { results: results.slice(0, 8) };
  });
