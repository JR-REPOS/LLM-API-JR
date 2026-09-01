import type { ReactNode } from "react";
import {
  Activity,
  BookOpen,
  Folder,
  Globe,
  Sparkles,
  SquareTerminal,
} from "lucide-react";
import { cn } from "@/lib/cn";

const RAIL = [
  { id: "term", icon: SquareTerminal, label: "Terminal", active: false },
  { id: "files", icon: Folder, label: "Files", active: false },
  { id: "web", icon: Globe, label: "Web", active: false },
  { id: "ai", icon: Sparkles, label: "Wave AI", active: false },
  { id: "sys", icon: Activity, label: "Sysinfo", active: false },
  { id: "c7", icon: BookOpen, label: "Context7", active: true },
] as const;

export function WaveShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh min-h-0 bg-bg text-fg">
      <aside className="hidden w-14 shrink-0 flex-col items-center border-r border-border py-3 md:flex">
        <div className="mb-4 flex size-8 items-center justify-center rounded-sm bg-raised font-mono text-xs font-medium text-primary">
          W
        </div>
        <nav className="flex flex-1 flex-col items-center gap-1" aria-label="Wave widgets">
          {RAIL.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                title={item.label}
                className={cn(
                  "flex size-10 items-center justify-center rounded-sm transition-colors duration-150",
                  item.active
                    ? "bg-raised text-primary shadow-border"
                    : "text-subtle hover:bg-surface hover:text-muted",
                )}
              >
                <Icon className="size-4" strokeWidth={1.75} />
              </div>
            );
          })}
        </nav>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex h-9 shrink-0 items-center gap-2 border-b border-border px-3">
          <span className="size-2 rounded-full bg-ok/80" />
          <span className="text-xs font-medium tracking-tight text-muted">workspace</span>
          <span className="text-subtle">/</span>
          <span className="text-xs text-fg">Context7</span>
        </header>
        <div className="min-h-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
