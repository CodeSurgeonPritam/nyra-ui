"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type WordRotatorProps = {
  words: string[];
  className?: string;
  /** Time each word stays visible, in ms. */
  interval?: number;
};

/**
 * Cycles through a list of words in place. Each word rises from below
 * and the previous one slides out the top. Inline-flex with fixed
 * line-height so the surrounding sentence never jumps.
 */
export function WordRotator({
  words,
  className,
  interval = 2200,
}: WordRotatorProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (words.length <= 1) return;
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval,
    );
    return () => window.clearInterval(t);
  }, [interval, words.length]);

  const current = words[index] ?? "";

  return (
    <span
      className={cn(
        "relative inline-flex h-[1em] items-center overflow-hidden align-baseline",
        className,
      )}
      aria-live="polite"
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`${current}-${index}`}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          className="block whitespace-nowrap"
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
