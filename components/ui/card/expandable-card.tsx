"use client";

import { useId, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

type ExpandableCardProps = {
  title: ReactNode;
  summary: ReactNode;
  children: ReactNode;
  className?: string;
  /** Open by default. */
  defaultOpen?: boolean;
};

/**
 * Click-to-expand card. Uses a single layout animation on the content
 * region so height changes feel continuous, not jumpy.
 */
export function ExpandableCard({
  title,
  summary,
  children,
  className,
  defaultOpen = false,
}: ExpandableCardProps) {
  const [open, setOpen] = useState(defaultOpen);
  const regionId = useId();

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-surface",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={regionId}
        className="flex w-full items-start justify-between gap-6 rounded-2xl p-6 text-left transition-colors hover:bg-foreground/[0.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="flex flex-col gap-1.5">
          <div className="font-serif text-xl leading-tight">{title}</div>
          <div className="text-sm text-foreground-muted">{summary}</div>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border text-foreground-muted"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={regionId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-6 py-5 text-sm leading-relaxed text-foreground-muted">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
