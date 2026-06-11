"use client";

import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type OdometerProps = {
  value: number;
  className?: string;
  /** Zero-pad to this many digits. */
  digits?: number;
  prefix?: string;
  suffix?: string;
};

/**
 * Digit-flip counter. Each digit lives in its own column of 0–9; on
 * value change, the column slides up to the new digit with a spring.
 * `tabular-nums` keeps widths stable so non-digit chars (commas, decimals)
 * don't reflow.
 */
export function Odometer({
  value,
  className,
  digits,
  prefix,
  suffix,
}: OdometerProps) {
  const str = digits ? String(value).padStart(digits, "0") : String(value);

  return (
    <span className={cn("inline-flex items-baseline tabular-nums", className)}>
      {prefix && <span className="mr-0.5 text-foreground-muted">{prefix}</span>}
      <span className="inline-flex">
        {str.split("").map((ch, i) =>
          /^\d$/.test(ch) ? (
            <Digit key={`${i}-${ch}-${str.length}`} digit={Number(ch)} />
          ) : (
            <span key={`${i}-${ch}`} className="inline-block">
              {ch}
            </span>
          ),
        )}
      </span>
      {suffix && <span className="ml-0.5 text-foreground-muted">{suffix}</span>}
    </span>
  );
}

function Digit({ digit }: { digit: number }) {
  return (
    <span
      className="relative inline-flex h-[1em] overflow-hidden"
      style={{ width: "0.62em" }}
    >
      <motion.span
        animate={{ y: `-${digit * 10}%` }}
        transition={{ type: "spring", stiffness: 110, damping: 22, mass: 0.8 }}
        className="flex flex-col"
      >
        {Array.from({ length: 10 }).map((_, n) => (
          <span
            key={n}
            className="flex h-[1em] items-center justify-center"
          >
            {n}
          </span>
        ))}
      </motion.span>
    </span>
  );
}
