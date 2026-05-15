"use client";

import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type LiftButtonProps = ComponentPropsWithoutRef<"button">;

/**
 * Hover lift with a tinted shadow. Press returns the button to baseline
 * so the click reads as a physical press-down. Pure CSS — no JS needed.
 */
export function LiftButton({
  children,
  className,
  ...props
}: LiftButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background",
        "shadow-md shadow-transparent transition-all duration-200 ease-out",
        "hover:-translate-y-0.5 hover:shadow-lg hover:shadow-accent/30",
        "active:translate-y-0 active:shadow-md active:shadow-transparent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
