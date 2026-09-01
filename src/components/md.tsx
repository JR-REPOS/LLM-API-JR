import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/cn";

function Inline({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="rounded-xs bg-raised px-1 py-px font-mono text-[0.85em] text-primary"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-medium text-fg">
              {part.slice(2, -2)}
            </strong>
          );
        }
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          return (
            <a
              key={i}
              href={link[2]}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-2 hover:underline"
            >
              {link[1]}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function CodeBlock({ code, lang }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group relative my-2 overflow-hidden rounded-md bg-bg shadow-border">
      <div className="flex items-center justify-between border-b border-border px-3 py-1.5">
        <span className="font-mono text-[10px] uppercase tracking-wider text-subtle">
          {lang || "code"}
        </span>
        <button
          type="button"
          className="inline-flex size-7 items-center justify-center rounded-xs text-muted transition-colors hover:text-fg"
          onClick={async () => {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1200);
          }}
          aria-label="Copy code"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre className="overflow-x-auto p-3 font-mono text-xs leading-relaxed text-fg">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  const blocks = text.split(/```/);
  return (
    <div className={cn("text-sm leading-relaxed text-fg", className)}>
      {blocks.map((block, i) => {
        if (i % 2 === 1) {
          const nl = block.indexOf("\n");
          const lang = nl === -1 ? "" : block.slice(0, nl).trim();
          const code = (nl === -1 ? block : block.slice(nl + 1)).replace(/\n$/, "");
          return <CodeBlock key={i} code={code} lang={lang} />;
        }
        return block.split(/\n{2,}/).map((para, j) => {
          const trimmed = para.trim();
          if (!trimmed) return null;
          if (trimmed.startsWith("### ")) {
            return (
              <h3 key={`${i}-${j}`} className="mt-3 mb-1 text-sm font-medium">
                <Inline text={trimmed.slice(4)} />
              </h3>
            );
          }
          if (trimmed.startsWith("## ")) {
            return (
              <h2 key={`${i}-${j}`} className="mt-3 mb-1 text-base font-medium">
                <Inline text={trimmed.slice(3)} />
              </h2>
            );
          }
          if (trimmed.startsWith("- ")) {
            return (
              <ul key={`${i}-${j}`} className="my-1.5 list-disc space-y-1 pl-4 text-muted">
                {trimmed.split("\n").map((line, k) => (
                  <li key={k}>
                    <Inline text={line.replace(/^- /, "")} />
                  </li>
                ))}
              </ul>
            );
          }
          return (
            <p key={`${i}-${j}`} className="my-1.5 text-pretty text-muted">
              <Inline text={trimmed} />
            </p>
          );
        });
      })}
    </div>
  );
}
