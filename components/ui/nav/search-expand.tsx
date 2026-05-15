"use client";

import { useRef, useState, type ChangeEvent } from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

type SearchExpandProps = {
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  /** Width of the expanded field, in pixels. */
  expandedWidth?: number;
};

/**
 * Icon button that expands into a full search input on click. Collapses
 * back to icon on Escape, blur (when empty), or the close button.
 */
export function SearchExpand({
  className,
  placeholder = "Search…",
  onChange,
  expandedWidth = 240,
}: SearchExpandProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function expand() {
    setOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 60);
  }

  function collapse() {
    setOpen(false);
    setValue("");
    onChange?.("");
  }

  function handle(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
    onChange?.(event.target.value);
  }

  return (
    <motion.div
      animate={{ width: open ? expandedWidth : 36 }}
      transition={{ type: "spring", stiffness: 240, damping: 28 }}
      className={cn(
        "relative flex h-9 items-center overflow-hidden rounded-md border border-border bg-surface",
        className,
      )}
    >
      {!open ? (
        <button
          type="button"
          onClick={expand}
          aria-label="Open search"
          className="flex h-full w-full items-center justify-center text-foreground-muted transition-colors hover:text-foreground"
        >
          <Search className="h-4 w-4" />
        </button>
      ) : (
        <>
          <Search className="ml-3 h-3.5 w-3.5 shrink-0 text-foreground-muted" />
          <input
            ref={inputRef}
            value={value}
            onChange={handle}
            placeholder={placeholder}
            onKeyDown={(e) => e.key === "Escape" && collapse()}
            onBlur={() => value === "" && collapse()}
            className="h-full flex-1 bg-transparent px-2 text-sm text-foreground placeholder:text-foreground-muted/60 focus:outline-none"
          />
          <button
            type="button"
            onClick={collapse}
            aria-label="Close search"
            className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-foreground/[0.05] hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </>
      )}
    </motion.div>
  );
}
