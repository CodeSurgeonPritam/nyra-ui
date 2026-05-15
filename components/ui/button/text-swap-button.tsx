"use client";

import { type ComponentPropsWithoutRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TextSwapButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** Label revealed on hover. */
  hoverLabel: ReactNode;
};

/**
 * Label rolls vertically on hover — the rest-state text slides out the
 * top, the hover-state text slides in from the bottom. Uses a single
 * `translate-y` on the inner column; the outer button has fixed height
 * and clips overflow.
 */
export function TextSwapButton({
  children,
  hoverLabel,
  className,
  ...props
}: TextSwapButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-10 items-center justify-center overflow-hidden rounded-full bg-accent px-5 text-sm font-medium text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      <span className="relative flex flex-col transition-transform duration-300 ease-out group-hover:-translate-y-1/2">
        <span className="flex h-10 items-center justify-center">
          {children}
        </span>
        <span className="flex h-10 items-center justify-center">
          {hoverLabel}
        </span>
      </span>
    </button>
  );
}
