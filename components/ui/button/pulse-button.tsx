"use client";

import { type ComponentPropsWithoutRef } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type PulseButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** Number of expanding rings emitted from the button. */
  rings?: number;
  /** Loop duration of a single ring, in seconds. */
  duration?: number;
};

/**
 * Attention-grabbing button: concentric accent rings ripple outward on a
 * loop, layered behind a solid pill. Useful for CTAs that need to draw
 * the eye without flashing.
 */
export function PulseButton({
  children,
  className,
  rings = 3,
  duration = 2.2,
  ...props
}: PulseButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="pointer-events-none absolute inset-0">
        {Array.from({ length: rings }).map((_, i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-accent"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 1.9, opacity: 0 }}
            transition={{
              duration,
              delay: (i * duration) / rings,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}
      </span>
      <span className="relative">{children}</span>
    </button>
  );
}
