"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type FadeFrom = "up" | "down" | "left" | "right" | "scale" | "blur" | "none";

type FadeInTextProps = {
  children: ReactNode;
  className?: string;
  /** Direction the text travels from as it fades in. */
  from?: FadeFrom;
  /** Delay before animation starts, in seconds. */
  delay?: number;
  /** Animation duration, in seconds. */
  duration?: number;
  /** Trigger on viewport entry instead of on mount. */
  inView?: boolean;
};

const initial: Record<FadeFrom, Record<string, number | string>> = {
  up: { y: 24 },
  down: { y: -24 },
  left: { x: 24 },
  right: { x: -24 },
  scale: { scale: 0.94 },
  blur: { filter: "blur(12px)" },
  none: {},
};

const settled = {
  x: 0,
  y: 0,
  scale: 1,
  filter: "blur(0px)",
};

/**
 * Generic text entrance. Pick a direction (`up`, `down`, `left`, `right`),
 * a transform (`scale`), or a focus effect (`blur`). On mount by default;
 * pass `inView` to wait until the element scrolls into view.
 */
export function FadeInText({
  children,
  className,
  from = "up",
  delay = 0,
  duration = 0.6,
  inView = false,
}: FadeInTextProps) {
  const initialState = { opacity: 0, ...initial[from] };
  const animateState = { opacity: 1, ...settled };

  const motionProps = inView
    ? {
        initial: initialState,
        whileInView: animateState,
        viewport: { once: true, amount: 0.3 },
      }
    : {
        initial: initialState,
        animate: animateState,
      };

  return (
    <motion.div
      {...motionProps}
      transition={{ duration, ease: [0.22, 1, 0.36, 1], delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
