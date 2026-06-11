"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type MaskRevealTextProps = {
  lines: ReactNode[];
  className?: string;
  /** Per-line delay, in seconds. */
  stagger?: number;
  /** Animation duration per line, in seconds. */
  duration?: number;
  /** Wait until the element scrolls into view before revealing. */
  inView?: boolean;
};

/**
 * Line-by-line curtain reveal. Each line is wrapped in an
 * `overflow-hidden` box; the inner span translates from below back into
 * view, so the text rises from behind a mask one line at a time.
 */
export function MaskRevealText({
  lines,
  className,
  stagger = 0.08,
  duration = 0.7,
  inView = false,
}: MaskRevealTextProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <motion.span
            initial={{ y: "110%" }}
            {...(inView
              ? { whileInView: { y: "0%" }, viewport: { once: true, amount: 0.4 } }
              : { animate: { y: "0%" } })}
            transition={{
              duration,
              ease: [0.22, 1, 0.36, 1],
              delay: i * stagger,
            }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
