"use client";

import { useId, useState, type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

export type RadioOption<V extends string = string> = {
  value: V;
  label: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
};

type RadioGroupProps<V extends string = string> = {
  value?: V;
  defaultValue?: V;
  onChange?: (value: V) => void;
  options: RadioOption<V>[];
  className?: string;
  /** Layout style — `segmented` is a single-row chip control, `list` is vertical. */
  variant?: "segmented" | "list";
  /** Aria label for the group. */
  label?: string;
};

/**
 * Two-mode radio group: a segmented control with a sliding accent
 * indicator, or a vertical list of bordered tiles. `layoutId` shares
 * the indicator across options so transitions interpolate, not snap.
 */
export function RadioGroup<V extends string = string>({
  value,
  defaultValue,
  onChange,
  options,
  className,
  variant = "segmented",
  label,
}: RadioGroupProps<V>) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<V | undefined>(
    defaultValue ?? options[0]?.value,
  );
  const current = isControlled ? value : internal;
  const groupId = useId();

  function commit(next: V) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  if (variant === "segmented") {
    return (
      <div
        role="radiogroup"
        aria-label={label}
        className={cn(
          "inline-flex items-center rounded-full border border-border bg-surface p-0.5",
          className,
        )}
      >
        {options.map((opt) => {
          const active = opt.value === current;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={opt.disabled}
              onClick={() => commit(opt.value)}
              className={cn(
                "relative isolate inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                active ? "text-accent-foreground" : "text-foreground-muted hover:text-foreground",
                opt.disabled && "cursor-not-allowed opacity-50",
              )}
            >
              {active && (
                <motion.span
                  aria-hidden
                  layoutId={`radio-${groupId}`}
                  className="absolute inset-0 -z-10 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{opt.label}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn("flex flex-col gap-2", className)}
    >
      {options.map((opt) => {
        const active = opt.value === current;
        return (
          <button
            key={opt.value}
            type="button"
            role="radio"
            aria-checked={active}
            disabled={opt.disabled}
            onClick={() => commit(opt.value)}
            className={cn(
              "flex w-full items-start gap-3 rounded-xl border bg-surface p-4 text-left transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              active
                ? "border-accent/50 bg-accent/[0.06]"
                : "border-border hover:border-foreground/15",
              opt.disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <span
              className={cn(
                "mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                active ? "border-accent" : "border-foreground/30",
              )}
            >
              {active && (
                <motion.span
                  aria-hidden
                  layoutId={`radio-dot-${groupId}`}
                  className="h-2 w-2 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
            </span>
            <span className="flex flex-col gap-0.5">
              <span className="text-sm text-foreground">{opt.label}</span>
              {opt.description && (
                <span className="text-xs text-foreground-muted">
                  {opt.description}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
