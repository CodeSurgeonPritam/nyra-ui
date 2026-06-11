"use client";

import * as React from "react";

import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

/**
 * Tabbed code block for one-shot package-runner commands — the `pnpm dlx`,
 * `npx`, `yarn dlx`, `bunx` variants of the same invocation. Sibling to
 * `InstallTabs` (which is for `pnpm add`-style installs).
 *
 * Pass everything that comes *after* the runner in `args` — typically
 * `nyra@latest add magnetic-button`. The component renders one tab per
 * runner with the appropriate prefix.
 */
const RUNNERS = [
  { id: "pnpm", label: "pnpm", prefix: "pnpm dlx" },
  { id: "npm", label: "npm", prefix: "npx" },
  { id: "yarn", label: "yarn", prefix: "yarn dlx" },
  { id: "bun", label: "bun", prefix: "bunx" },
] as const;

type Runner = (typeof RUNNERS)[number]["id"];

export function DlxTabs({
  args,
  className,
}: {
  args: string;
  className?: string;
}) {
  const [active, setActive] = React.useState<Runner>("pnpm");
  const prefix = RUNNERS.find((r) => r.id === active)!.prefix;
  const cmd = `${prefix} ${args}`;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-0.5">
          {RUNNERS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActive(r.id)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] transition-colors",
                r.id === active
                  ? "bg-foreground text-background"
                  : "text-foreground-muted hover:text-foreground",
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
        <CopyButton text={cmd} />
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 font-mono text-[13px] leading-relaxed">
        <span className="text-foreground-muted">$</span>{" "}
        <span>{cmd}</span>
      </pre>
    </div>
  );
}
