"use client";

import * as Tabs from "@radix-ui/react-tabs";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CodeTabsProps = {
  preview: ReactNode;
  code: ReactNode;
  className?: string;
};

export function CodeTabs({ preview, code, className }: CodeTabsProps) {
  return (
    <Tabs.Root defaultValue="preview" className={cn("w-full", className)}>
      <Tabs.List
        aria-label="Preview or code"
        className="mb-3 inline-flex h-9 items-center rounded-md border border-border bg-surface p-0.5"
      >
        {(
          [
            { id: "preview", label: "Preview" },
            { id: "code", label: "Code" },
          ] as const
        ).map((t) => (
          <Tabs.Trigger
            key={t.id}
            value={t.id}
            className={cn(
              "rounded-[5px] px-3 py-1 text-xs uppercase tracking-[0.14em] transition-colors",
              "text-foreground-muted hover:text-foreground",
              "data-[state=active]:bg-foreground data-[state=active]:text-background",
            )}
          >
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      <Tabs.Content
        value="preview"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {preview}
      </Tabs.Content>
      <Tabs.Content
        value="code"
        className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        {code}
      </Tabs.Content>
    </Tabs.Root>
  );
}
