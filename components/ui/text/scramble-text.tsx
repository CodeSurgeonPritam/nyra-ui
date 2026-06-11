"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";

type ScrambleTextProps = {
  text: string;
  className?: string;
  /** Approximate ms between each character locking into place. */
  speed?: number;
  /** Wait for the element to enter the viewport before starting. */
  inView?: boolean;
};

/**
 * Decode-style reveal — each character starts as a random glyph from
 * the charset and locks into the real character left-to-right over
 * time. Drives the animation on `requestAnimationFrame`.
 */
export function ScrambleText({
  text,
  className,
  speed = 60,
  inView = true,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(() => randomize(text));
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    startedRef.current = false;
    setDisplay(randomize(text));

    function run() {
      if (startedRef.current) return;
      startedRef.current = true;
      const start = performance.now();
      let raf = 0;
      const tick = (now: number) => {
        const elapsed = now - start;
        const revealed = Math.min(text.length, Math.floor(elapsed / speed));
        const next = text
          .split("")
          .map((ch, i) => {
            if (i < revealed) return ch;
            if (ch === " ") return " ";
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("");
        setDisplay(next);
        if (revealed < text.length) {
          raf = requestAnimationFrame(tick);
        }
      };
      raf = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(raf);
    }

    if (!inView) {
      return run();
    }

    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [text, speed, inView]);

  return (
    <span
      ref={ref}
      aria-label={text}
      className={cn("font-mono tabular-nums", className)}
    >
      {display}
    </span>
  );
}

function randomize(text: string): string {
  return text
    .split("")
    .map((c) =>
      c === " " ? " " : (CHARS[Math.floor(Math.random() * CHARS.length)] ?? c),
    )
    .join("");
}
