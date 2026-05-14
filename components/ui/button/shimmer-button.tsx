"use client";

import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type ShimmerButtonProps = ComponentPropsWithoutRef<"button">;

export function ShimmerButton({
  children,
  className,
  ...props
}: ShimmerButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-md",
        "border border-border bg-surface px-5 py-2.5 text-sm font-medium text-foreground",
        "transition-transform duration-300 ease-out hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-y-0 left-0 w-1/3 -translate-x-full",
          "bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--accent)_45%,transparent)] to-transparent",
          "transition-transform duration-700 ease-out group-hover:translate-x-[400%]",
        )}
      />
      <span className="relative z-10">{children}</span>
    </button>
  );
}
