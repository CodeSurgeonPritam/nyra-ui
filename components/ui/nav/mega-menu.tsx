"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type MegaMenuItem = {
  label: ReactNode;
  description?: ReactNode;
  href?: string;
  icon?: ReactNode;
};

export type MegaMenuColumn = {
  title: string;
  items: MegaMenuItem[];
};

type MegaMenuProps = {
  trigger: ReactNode;
  columns: MegaMenuColumn[];
  /** Optional preview / feature card on the right edge of the menu. */
  feature?: ReactNode;
  className?: string;
};

/**
 * Multi-column dropdown with a curtain-style reveal (`clip-path` from
 * 0 to full). Optional feature slot on the right for a preview image or
 * highlighted promotion.
 */
export function MegaMenu({
  trigger,
  columns,
  feature,
  className,
}: MegaMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    function onDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      onMouseLeave={() => setOpen(false)}
      className={cn("relative inline-block", className)}
    >
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
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
          <motion.div
            initial={{ opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -6, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 z-20 mt-2 overflow-hidden rounded-2xl border border-border bg-surface p-6 shadow-2xl"
            style={{ minWidth: feature ? 720 : 480 }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: feature ? "1fr 280px" : "1fr",
                gap: "1.5rem",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                  gap: "1.5rem",
                }}
              >
                {columns.map((col) => (
                  <div key={col.title} className="flex flex-col gap-3">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
                      {col.title}
                    </span>
                    <ul className="flex flex-col gap-0.5">
                      {col.items.map((item, i) => (
                        <li key={i}>
                          <a
                            href={item.href ?? "#"}
                            className="flex items-start gap-2.5 rounded-md px-2 py-1.5 transition-colors hover:bg-foreground/[0.04]"
                          >
                            {item.icon && (
                              <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center text-accent">
                                {item.icon}
                              </span>
                            )}
                            <span className="flex flex-col">
                              <span className="text-sm text-foreground">
                                {item.label}
                              </span>
                              {item.description && (
                                <span className="text-xs text-foreground-muted">
                                  {item.description}
                                </span>
                              )}
                            </span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {feature && (
                <div className="rounded-xl border border-border bg-background p-4">
                  {feature}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
