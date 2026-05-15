"use client";

import * as React from "react";
import { Check, ChevronDown, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

const MANAGERS = [
  { id: "npm", label: "npm", run: "npx" },
  { id: "pnpm", label: "pnpm", run: "pnpm dlx" },
  { id: "yarn", label: "yarn", run: "yarn dlx" },
  { id: "bun", label: "bun", run: "bunx" },
] as const;

type Manager = (typeof MANAGERS)[number]["id"];

type InstallCommandProps = {
  slug: string;
  className?: string;
};

/**
 * Aceternity-style install bar: one-line command that swaps `npx` /
 * `pnpm dlx` / `yarn dlx` / `bunx` based on the user's preferred package
 * manager (persisted to localStorage). Copy button on the right.
 */
export function InstallCommand({ slug, className }: InstallCommandProps) {
  const [manager, setManager] = React.useState<Manager>("npm");
  const [open, setOpen] = React.useState(false);
  const [copied, setCopied] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const stored = (typeof window !== "undefined" &&
      (localStorage.getItem("nyra-pm") as Manager | null)) ||
      null;
    if (stored && MANAGERS.some((m) => m.id === stored)) setManager(stored);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    function onClick(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const active = MANAGERS.find((m) => m.id === manager) ?? MANAGERS[0];
  const command = `${active.run} nyra@latest add ${slug}`;

  function pick(id: Manager) {
    setManager(id);
    setOpen(false);
    try {
      localStorage.setItem("nyra-pm", id);
    } catch {}
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {}
  }

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative inline-flex h-9 items-stretch overflow-hidden rounded-md border border-border bg-surface text-[12px] font-mono",
        className,
      )}
    >
      <div className="flex items-center gap-2 pl-3 pr-2 text-foreground-muted">
        <span className="text-accent">$</span>
        <span className="select-all whitespace-nowrap text-foreground">
          {command}
        </span>
      </div>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy install command"
        className="flex items-center justify-center border-l border-border px-2.5 text-foreground-muted transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-accent" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </button>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select package manager"
        className="flex items-center gap-1 border-l border-border px-2.5 text-foreground-muted transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
      >
        <span className="uppercase tracking-[0.14em] text-[10px]">
          {active.label}
        </span>
        <ChevronDown
          className={cn(
            "h-3 w-3 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+4px)] z-20 min-w-[112px] overflow-hidden rounded-md border border-border bg-surface py-1 shadow-lg"
        >
          {MANAGERS.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => pick(m.id)}
                role="option"
                aria-selected={m.id === manager}
                className={cn(
                  "flex w-full items-center justify-between gap-2 px-3 py-1.5 text-left text-[11px] transition-colors hover:bg-foreground/[0.05]",
                  m.id === manager
                    ? "text-foreground"
                    : "text-foreground-muted",
                )}
              >
                <span className="uppercase tracking-[0.14em]">{m.label}</span>
                {m.id === manager && (
                  <Check className="h-3 w-3 text-accent" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
