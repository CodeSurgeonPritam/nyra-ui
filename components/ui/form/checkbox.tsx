"use client";

import { useId, useState, type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  description?: ReactNode;
  className?: string;
};

/**
 * Checkbox with an animated check stroke. Uses an SVG path with a
 * dasharray-style draw-on motion driven by the `pathLength` value —
 * crisper than a CSS scale on a static glyph.
 */
export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  label,
  description,
  className,
}: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const value = isControlled ? checked : internal;
  const id = useId();

  function toggle() {
    if (disabled) return;
    const next = !value;
    if (!isControlled) setInternal(next);
    onCheckedChange?.(next);
  }

  const box = (
    <span
      role="checkbox"
      aria-checked={value}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === " " || e.key === "Enter") {
          e.preventDefault();
          toggle();
        }
      }}
      className={cn(
        "relative inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        value
          ? "border-accent bg-accent"
          : "border-border bg-surface hover:border-foreground/30",
        disabled && "cursor-not-allowed opacity-50",
      )}
    >
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
        <motion.path
          d="M5 12.5 L10 17 L19 7"
          fill="none"
          stroke="var(--accent-foreground)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={false}
          animate={{ pathLength: value ? 1 : 0, opacity: value ? 1 : 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </svg>
    </span>
  );

  if (!label && !description) {
    return <span className={className}>{box}</span>;
  }

  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-start gap-3",
        disabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      {box}
      <span className="flex flex-col gap-0.5">
        {label && <span className="text-sm text-foreground">{label}</span>}
        {description && (
          <span className="text-xs text-foreground-muted">{description}</span>
        )}
      </span>
    </label>
  );
}
