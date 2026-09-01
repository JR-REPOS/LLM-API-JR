export type LibraryHit = {
  id: string;
  title: string;
  description: string;
  totalSnippets: number;
  stars: number;
  trustScore: number;
  versions: string[];
};

export type DocSnippet = {
  title: string;
  description: string;
  language: string;
  source: string;
  code: string;
};

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  libraryId?: string;
  libraryTitle?: string;
  sources?: DocSnippet[];
  pending?: boolean;
  error?: string;
};
