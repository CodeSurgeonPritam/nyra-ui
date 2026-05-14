"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type TypingAnimationProps = {
  text: string;
  className?: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Delay before the typing starts. */
  startDelay?: number;
  /** Show a blinking caret after the last character. */
  caret?: boolean;
};

/**
 * Typewriter effect — reveals one character at a time. Skips the
 * animation entirely if the user prefers reduced motion.
 */
export function TypingAnimation({
  text,
  className,
  speed = 50,
  startDelay = 0,
  caret = true,
}: TypingAnimationProps) {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(text.length);
      return;
    }
    let cancelled = false;
    const start = window.setTimeout(() => {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        i += 1;
        setVisible(i);
        if (i < text.length) window.setTimeout(tick, speed);
      };
      tick();
    }, startDelay);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
  }, [text, speed, startDelay]);

  return (
    <span
      className={cn("inline-flex items-baseline tabular-nums", className)}
      aria-label={text}
    >
      <span aria-hidden>{text.slice(0, visible)}</span>
      {caret ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.1em] bg-accent"
          style={{ animation: "nyra-caret 1.05s steps(1) infinite" }}
        />
      ) : null}
      <style>{`@keyframes nyra-caret { 50% { opacity: 0; } }`}</style>
    </span>
  );
}
