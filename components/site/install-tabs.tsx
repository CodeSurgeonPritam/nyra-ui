"use client";

import * as React from "react";

import { CopyButton } from "./copy-button";
import { cn } from "@/lib/utils";

const MANAGERS = [
  { id: "pnpm", label: "pnpm", cmd: "pnpm add" },
  { id: "npm", label: "npm", cmd: "npm install" },
  { id: "yarn", label: "yarn", cmd: "yarn add" },
  { id: "bun", label: "bun", cmd: "bun add" },
] as const;

type Manager = (typeof MANAGERS)[number]["id"];

export function InstallTabs({ packages }: { packages: string[] }) {
  const [active, setActive] = React.useState<Manager>("pnpm");

  if (packages.length === 0) return null;

  const cmd = `${MANAGERS.find((m) => m.id === active)!.cmd} ${packages.join(" ")}`;

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <div className="flex items-center gap-0.5">
          {MANAGERS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setActive(m.id)}
              className={cn(
                "rounded-md px-2.5 py-1 text-[11px] uppercase tracking-[0.14em] transition-colors",
                m.id === active
                  ? "bg-foreground text-background"
                  : "text-foreground-muted hover:text-foreground",
              )}
            >
              {m.label}
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
