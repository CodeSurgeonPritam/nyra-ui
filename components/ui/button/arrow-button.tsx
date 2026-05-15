"use client";

import { type ComponentPropsWithoutRef } from "react";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type ArrowButtonProps = ComponentPropsWithoutRef<"button">;

/**
 * Minimal link-style button: an underline grows beneath the label and the
 * arrow slides to the right on hover. Pure CSS, no JS in the runtime path.
 */
export function ArrowButton({
  children,
  className,
  ...props
}: ArrowButtonProps) {
  return (
    <button
      className={cn(
        "group inline-flex items-center gap-2 text-sm font-medium text-foreground",
        "focus-visible:outline-none focus-visible:[&_.nyra-arrow-underline]:scale-x-100",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="nyra-arrow-underline absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100"
        />
      </span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
    </button>
  );
}
