"use client";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type HighlightTextProps = {
  children: ReactNode;
  className?: string;
  /** When the highlight bar paints in. */
  trigger?: "hover" | "inview" | "always";
  /** Highlight color — any CSS color. Defaults to Nyra's lime at 50%. */
  color?: string;
  /** Vertical extent of the highlight, 0–1 (fraction of line height). */
  thickness?: number;
};

/**
 * Marker-style highlight that paints in beneath the text. The highlight
 * lives in the element's `background-size`, which transitions cheaply.
 * Three triggers — `hover`, `inview` (paints when the text scrolls in),
 * or `always`.
 */
export function HighlightText({
  children,
  className,
  trigger = "hover",
  color = "color-mix(in oklab, var(--accent) 50%, transparent)",
  thickness = 0.55,
}: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [filled, setFilled] = useState(trigger === "always");

  useEffect(() => {
    if (trigger !== "inview" || !ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setFilled(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [trigger]);

  const startPercent = `${(1 - thickness) * 100}%`;

  return (
    <span
      ref={ref}
      data-filled={filled || undefined}
      className={cn(
        "relative inline transition-[background-size] duration-700 ease-out",
        trigger === "hover"
          ? "[background-size:0%_100%] hover:[background-size:100%_100%]"
          : "[background-size:0%_100%] data-[filled]:[background-size:100%_100%]",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(180deg, transparent ${startPercent}, ${color} ${startPercent})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 100%",
        paddingLeft: "0.18em",
        paddingRight: "0.18em",
      }}
    >
      {children}
    </span>
  );
}
