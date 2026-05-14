"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { ArrowRight, BookOpen, Layers, Search, X } from "lucide-react";

import {
  filterEntries,
  getSearchEntries,
  type SearchEntry,
} from "@/lib/search-index";
import { cn } from "@/lib/utils";

type SearchPaletteContext = {
  open: () => void;
};

const SearchCtx = React.createContext<SearchPaletteContext | null>(null);

export function useSearchPalette() {
  const ctx = React.useContext(SearchCtx);
  if (!ctx) {
    throw new Error("useSearchPalette must be used inside SearchProvider");
  }
  return ctx;
}

/**
 * Mounts the palette and exposes `open()` via context. Place once near
 * the top of the tree (e.g. in `app/layout.tsx`).
 */
export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const open = React.useCallback(() => setIsOpen(true), []);
  const value = React.useMemo(() => ({ open }), [open]);

  // Global ⌘K / Ctrl+K shortcut.
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((v) => !v);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <SearchCtx.Provider value={value}>
      {children}
      <SearchPalette open={isOpen} onOpenChange={setIsOpen} />
    </SearchCtx.Provider>
  );
}

function SearchPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [activeIndex, setActiveIndex] = React.useState(0);

  const entries = React.useMemo(() => getSearchEntries(), []);
  const results = React.useMemo(
    () => filterEntries(entries, query).slice(0, 24),
    [entries, query],
  );

  // Reset state on open.
  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActiveIndex(0);
      // Defer focus until the dialog has mounted.
      const t = window.setTimeout(() => inputRef.current?.focus(), 30);
      return () => window.clearTimeout(t);
    }
  }, [open]);

  // Clamp active index when results shrink.
  React.useEffect(() => {
    setActiveIndex((i) => Math.min(i, Math.max(results.length - 1, 0)));
  }, [results]);

  function go(entry: SearchEntry) {
    onOpenChange(false);
    router.push(entry.href);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const entry = results[activeIndex];
      if (entry) go(entry);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0" />
        <Dialog.Content
          className={cn(
            "fixed left-1/2 top-[20%] z-50 w-[92%] max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-surface shadow-2xl",
            "data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95",
            "data-[state=closed]:animate-out data-[state=closed]:fade-out-0",
          )}
          onKeyDown={onKey}
        >
          <Dialog.Title className="sr-only">Search Nyra</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search components and documentation.
          </Dialog.Description>

          <div className="flex items-center gap-2 border-b border-border px-4">
            <Search className="h-4 w-4 shrink-0 text-foreground-muted" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search components, docs…"
              aria-label="Search"
              className="h-12 w-full bg-transparent text-sm placeholder:text-foreground-muted focus:outline-none"
            />
            <Dialog.Close className="rounded-md p-1 text-foreground-muted transition-colors hover:text-foreground">
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <ul className="max-h-[60vh] overflow-y-auto p-2">
            {results.length === 0 ? (
              <li className="px-4 py-10 text-center text-sm text-foreground-muted">
                No results for{" "}
                <span className="font-mono text-foreground">"{query}"</span>.
              </li>
            ) : (
              results.map((entry, i) => (
                <ResultRow
                  key={entry.id}
                  entry={entry}
                  active={i === activeIndex}
                  onMouseEnter={() => setActiveIndex(i)}
                  onSelect={() => go(entry)}
                />
              ))
            )}
          </ul>

          <div className="flex items-center justify-between gap-3 border-t border-border bg-background/40 px-4 py-2 text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
            <span className="inline-flex items-center gap-1.5">
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                ↑↓
              </kbd>
              navigate
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                ↵
              </kbd>
              open
            </span>
            <span className="inline-flex items-center gap-1.5">
              <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 font-mono text-[10px]">
                esc
              </kbd>
              close
            </span>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function ResultRow({
  entry,
  active,
  onMouseEnter,
  onSelect,
}: {
  entry: SearchEntry;
  active: boolean;
  onMouseEnter: () => void;
  onSelect: () => void;
}) {
  const Icon = entry.kind === "docs" ? BookOpen : Layers;
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        onMouseEnter={onMouseEnter}
        className={cn(
          "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
          active
            ? "bg-foreground/[0.06] text-foreground"
            : "text-foreground-muted hover:text-foreground",
        )}
      >
        <Icon className="h-4 w-4 shrink-0 text-foreground-muted" />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm text-foreground">
              {entry.title}
            </span>
            {entry.pro ? (
              <span className="rounded-full border border-accent/40 bg-accent/10 px-1.5 py-0 text-[9px] uppercase tracking-[0.16em] text-accent">
                Pro
              </span>
            ) : null}
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              · {entry.kind === "docs" ? "Docs" : (entry.category ?? "")}
            </span>
          </div>
          <span className="truncate text-xs text-foreground-muted">
            {entry.description}
          </span>
        </div>
        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-foreground-muted/60" />
      </button>
    </li>
  );
}
