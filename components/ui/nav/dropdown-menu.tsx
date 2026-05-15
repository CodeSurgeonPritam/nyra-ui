"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

export type DropdownItem = {
  label: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  href?: string;
  onClick?: () => void;
};

type DropdownMenuProps = {
  trigger: ReactNode;
  items: DropdownItem[];
  className?: string;
  align?: "start" | "end";
};

/**
 * Click-triggered dropdown with a fade + slide reveal. Closes on outside
 * click, Escape, or item selection. No popover dep — pure local state.
 */
export function DropdownMenu({
  trigger,
  items,
  className,
  align = "start",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative inline-block", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-foreground-muted transition-colors hover:text-foreground"
      >
        {trigger}
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className={cn(
              "absolute z-20 mt-2 min-w-[220px] overflow-hidden rounded-lg border border-border bg-surface py-1 shadow-lg",
              align === "end" ? "right-0" : "left-0",
            )}
          >
            {items.map((item, i) => {
              const Tag = item.href ? "a" : "button";
              return (
                <li key={i} role="none">
                  <Tag
                    {...(item.href
                      ? { href: item.href }
                      : { type: "button" as const })}
                    role="menuitem"
                    onClick={() => {
                      item.onClick?.();
                      setOpen(false);
                    }}
                    className="flex w-full items-start gap-2.5 px-3 py-2 text-left text-sm transition-colors hover:bg-foreground/[0.05]"
                  >
                    {item.icon && (
                      <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-accent">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex flex-col">
                      <span className="text-foreground">{item.label}</span>
                      {item.description && (
                        <span className="text-xs text-foreground-muted">
                          {item.description}
                        </span>
                      )}
                    </span>
                  </Tag>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
