"use client";

import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type BorderDrawButtonProps = ComponentPropsWithoutRef<"button">;

/**
 * Outline button whose border draws itself in around the rectangle on
 * hover — top → right → bottom → left, each segment scaling from 0 to
 * full with a staggered delay. The result feels like a marker tracing
 * the button edge.
 */
export function BorderDrawButton({
  children,
  className,
  ...props
}: BorderDrawButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-foreground",
        "before:absolute before:inset-0 before:rounded-none before:border before:border-border before:opacity-100 before:transition-opacity",
        "hover:before:opacity-0",
        "focus-visible:outline-none focus-visible:before:opacity-0 focus-visible:[&_.nyra-edge]:scale-100",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="nyra-edge absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <span
        aria-hidden
        className="nyra-edge absolute right-0 top-0 h-full w-px origin-top scale-y-0 bg-accent transition-transform duration-300 ease-out [transition-delay:200ms] group-hover:scale-y-100"
      />
      <span
        aria-hidden
        className="nyra-edge absolute right-0 bottom-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 ease-out [transition-delay:400ms] group-hover:scale-x-100"
      />
      <span
        aria-hidden
        className="nyra-edge absolute left-0 bottom-0 h-full w-px origin-bottom scale-y-0 bg-accent transition-transform duration-300 ease-out [transition-delay:600ms] group-hover:scale-y-100"
      />
      <span className="relative">{children}</span>
    </button>
  );
}
