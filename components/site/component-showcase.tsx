"use client";

import * as React from "react";
import { Expand, Minimize } from "lucide-react";

import { InstallCommand } from "./install-command";
import { cn } from "@/lib/utils";

type ComponentShowcaseProps = {
  slug: string;
  preview: React.ReactNode;
  code: React.ReactNode;
  className?: string;
};

/**
 * Detail-page showcase shell: Preview / Code tabs on the left, install
 * command + expand toggle on the right. Matches Aceternity's component
 * page pattern; styling stays on Nyra's editorial palette.
 */
export function ComponentShowcase({
  slug,
  preview,
  code,
  className,
}: ComponentShowcaseProps) {
  const [tab, setTab] = React.useState<"preview" | "code">("preview");
  const [expanded, setExpanded] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div
          role="tablist"
          aria-label="Preview or code"
          className="inline-flex items-center gap-0.5 rounded-md border border-border bg-surface p-0.5"
        >
          <TabButton
            active={tab === "preview"}
            onClick={() => setTab("preview")}
          >
            Preview
          </TabButton>
          <TabButton active={tab === "code"} onClick={() => setTab("code")}>
            Code
          </TabButton>
        </div>

        <div className="flex items-center gap-2">
          <InstallCommand slug={slug} className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-label={expanded ? "Collapse preview" : "Expand preview"}
            aria-pressed={expanded}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground-muted transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          >
            {expanded ? (
              <Minimize className="h-3.5 w-3.5" />
            ) : (
              <Expand className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      <InstallCommand slug={slug} className="w-full sm:hidden" />

      <div
        className={cn(
          "relative overflow-hidden rounded-2xl border border-border bg-surface",
          expanded && "fixed inset-4 z-50 bg-background sm:inset-8",
        )}
      >
        <div role="tabpanel" hidden={tab !== "preview"}>
          <div style={{ minHeight: expanded ? "calc(100dvh - 8rem)" : 460 }}>
            {preview}
          </div>
        </div>
        <div role="tabpanel" hidden={tab !== "code"}>
          <div
            className={cn(
              "p-4 sm:p-5",
              expanded
                ? "max-h-[calc(100dvh-8rem)] overflow-y-auto"
                : "max-h-[460px] overflow-y-auto",
            )}
          >
            {code}
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "rounded-[5px] px-3 py-1.5 text-xs transition-colors",
        active
          ? "bg-foreground text-background"
          : "text-foreground-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
