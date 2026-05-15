"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type StatCounterProps = {
  label: ReactNode;
  value: number;
  /** Optional prefix / suffix, e.g. "$" or "%". */
  prefix?: string;
  suffix?: string;
  /** Percent change vs. prior period — drives the trend arrow + color. */
  delta?: number;
  className?: string;
  /** Decimal places to display. */
  precision?: number;
};

/**
 * Animated metric tile: spring-eased number ticker, optional trend
 * indicator. Fires once when the tile scrolls into view.
 */
export function StatCounter({
  label,
  value,
  prefix,
  suffix,
  delta,
  className,
  precision = 0,
}: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    stiffness: 60,
    damping: 18,
    mass: 1,
  });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(v));
  }, [spring]);

  const trendPositive = (delta ?? 0) >= 0;

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6",
        className,
      )}
    >
      <span className="text-[11px] uppercase tracking-[0.18em] text-foreground-muted">
        {label}
      </span>
      <div className="flex items-baseline gap-2">
        <span className="font-serif text-5xl tracking-tight">
          {prefix}
          {display.toFixed(precision)}
          {suffix}
        </span>
        {typeof delta === "number" && (
          <motion.span
            initial={{ opacity: 0, y: 4 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.4 }}
            className={cn(
              "inline-flex items-center gap-0.5 text-xs",
              trendPositive ? "text-accent" : "text-rose",
            )}
          >
            {trendPositive ? (
              <ArrowUpRight className="h-3.5 w-3.5" />
            ) : (
              <ArrowDownRight className="h-3.5 w-3.5" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </motion.span>
        )}
      </div>
    </div>
  );
}
