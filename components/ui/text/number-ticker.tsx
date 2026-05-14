"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

import { cn } from "@/lib/utils";

type NumberTickerProps = {
  value: number;
  className?: string;
  decimals?: number;
  /** Delay in ms before the count begins after entering the viewport. */
  delay?: number;
};

export function NumberTicker({
  value,
  className,
  decimals = 0,
  delay = 0,
}: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { mass: 0.8, stiffness: 70, damping: 18 });
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => mv.set(value), delay);
    return () => window.clearTimeout(t);
  }, [inView, value, delay, mv]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (!ref.current) return;
      ref.current.textContent = Number(latest).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    });
  }, [spring, decimals]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {Number(0).toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </span>
  );
}
