"use client";

import { Children, type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type StaggerGroupProps = {
  children: ReactNode;
  className?: string;
  /** Per-child delay, in seconds. */
  stagger?: number;
  /** Delay before the sequence starts, in seconds. */
  delay?: number;
  /** Distance each child travels into place, in pixels. */
  distance?: number;
  /** Trigger on viewport entry instead of on mount. */
  inView?: boolean;
};

/**
 * Wrapper that staggers entrance animations across its direct children.
 * Each child fades + rises in place, offset by `stagger` seconds from the
 * previous one. Works with anything — text, cards, list items — but
 * cheapest on small element counts.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  delay = 0,
  distance = 16,
  inView = false,
}: StaggerGroupProps) {
  const items = Children.toArray(children);
  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };
  const item = {
    hidden: { opacity: 0, y: distance },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
  };

  const viewportProps = inView
    ? { whileInView: "show" as const, viewport: { once: true, amount: 0.25 } }
    : { animate: "show" as const };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      {...viewportProps}
      className={cn("flex flex-col gap-3", className)}
    >
      {items.map((child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
