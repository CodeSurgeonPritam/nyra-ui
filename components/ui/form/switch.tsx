"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
  /** Visual size — `md` is the default; `sm` for compact form rows. */
  size?: "sm" | "md";
};

/**
 * Animated on/off switch. The thumb is a spring-driven `motion.span`;
 * the track recolours to the accent when active. Supports controlled
 * (`checked`) and uncontrolled (`defaultChecked`) usage.
 */
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  label,
  description,
  className,
  size = "md",
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const value = isControlled ? checked : internal;

  function toggle() {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  }

  const dims =
    size === "sm"
      ? { track: "h-5 w-9", thumb: "h-3.5 w-3.5", offset: 16 }
      : { track: "h-6 w-11", thumb: "h-4 w-4", offset: 20 };

  const inner = (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      aria-disabled={disabled || undefined}
      disabled={disabled}
      onClick={toggle}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dims.track,
        value ? "bg-accent" : "bg-foreground/15",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <motion.span
        aria-hidden
        animate={{ x: value ? dims.offset : 4 }}
        transition={{ type: "spring", stiffness: 480, damping: 30 }}
        className={cn(
          "block rounded-full bg-background shadow-sm",
          dims.thumb,
        )}
      />
    </button>
  );

  if (!label && !description) {
    return <span className={className}>{inner}</span>;
  }

  return (
    <label
      className={cn(
        "flex items-start gap-3",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      {inner}
      <span className="flex flex-col gap-0.5">
        {label && <span className="text-sm text-foreground">{label}</span>}
        {description && (
          <span className="text-xs text-foreground-muted">{description}</span>
        )}
      </span>
    </label>
  );
}
