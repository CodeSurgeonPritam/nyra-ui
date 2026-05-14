"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type HoverLiftCardProps = {
  children: ReactNode;
  className?: string;
  /** How many pixels the card lifts. */
  lift?: number;
};

/**
 * Card that lifts and emits a soft accent halo on hover. Falls back to a
 * static state on touch devices via Tailwind's `hover:` (which only
 * applies when a pointer can hover).
 */
export function HoverLiftCard({
  children,
  className,
  lift = 6,
}: HoverLiftCardProps) {
  return (
    <motion.div
      whileHover={{ y: -lift }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "group relative rounded-2xl border border-border bg-surface transition-shadow",
        "hover:shadow-[0_18px_40px_-20px_color-mix(in_oklab,var(--accent)_30%,transparent)]",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -bottom-1 h-2 rounded-full bg-accent/40 opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100"
      />
      {children}
    </motion.div>
  );
}
