"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type MobileDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  className?: string;
  side?: "left" | "right";
  title?: ReactNode;
};

/**
 * Side-anchored drawer with a fade-in backdrop. Locks body scroll while
 * open and dismisses on Escape, backdrop click, or the close button.
 */
export function MobileDrawer({
  open,
  onOpenChange,
  children,
  className,
  side = "left",
  title,
}: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onOpenChange]);

  const xSign = side === "left" ? -1 : 1;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            initial={{ x: `${xSign * 100}%` }}
            animate={{ x: 0 }}
            exit={{ x: `${xSign * 100}%` }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className={cn(
              "fixed inset-y-0 z-50 flex w-80 max-w-[85vw] flex-col border-border bg-background shadow-2xl",
              side === "left" ? "left-0 border-r" : "right-0 border-l",
              className,
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <span className="font-serif text-lg italic">{title}</span>
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                aria-label="Close drawer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">{children}</div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
