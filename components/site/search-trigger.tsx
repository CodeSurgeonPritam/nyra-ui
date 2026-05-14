"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { useSearchPalette } from "./search-palette";
import { cn } from "@/lib/utils";

/**
 * The "Search… ⌘K" affordance shown in headers. Detects whether the user
 * is on macOS to pick the right modifier glyph; falls back to Ctrl
 * elsewhere. Renders a placeholder before hydration to avoid a flash.
 */
export function SearchTrigger({ className }: { className?: string }) {
  const { open } = useSearchPalette();
  const [modifier, setModifier] = React.useState<string | null>(null);

  React.useEffect(() => {
    const isMac =
      typeof navigator !== "undefined" &&
      /Mac|iPod|iPhone|iPad/.test(navigator.platform);
    setModifier(isMac ? "⌘" : "Ctrl");
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open search"
      className={cn(
        "group inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface/60 px-3 text-xs text-foreground-muted transition-colors hover:text-foreground hover:border-foreground/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
    >
      <Search className="h-3.5 w-3.5" />
      <span className="hidden sm:inline">Search…</span>
      <kbd
        aria-hidden
        className="ml-2 hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground-muted sm:inline"
      >
        {modifier ? `${modifier}K` : " "}
      </kbd>
    </button>
  );
}
