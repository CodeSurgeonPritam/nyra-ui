"use client";

import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type FillSweepButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** Side the fill sweeps in from. */
  from?: "left" | "right" | "top" | "bottom";
};

const originMap: Record<NonNullable<FillSweepButtonProps["from"]>, string> = {
  left: "origin-left scale-x-0 group-hover:scale-x-100",
  right: "origin-right scale-x-0 group-hover:scale-x-100",
  top: "origin-top scale-y-0 group-hover:scale-y-100",
  bottom: "origin-bottom scale-y-0 group-hover:scale-y-100",
};

/**
 * Outline-at-rest button whose accent background sweeps in from a chosen
 * edge on hover. Text color crossfades so contrast holds throughout the
 * sweep.
 */
export function FillSweepButton({
  children,
  className,
  from = "left",
  ...props
}: FillSweepButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full border border-accent bg-transparent px-5 py-2.5 text-sm font-medium text-accent",
        "transition-colors duration-300 ease-out hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-accent transition-transform duration-300 ease-out",
          originMap[from],
        )}
      />
      <span className="relative">{children}</span>
    </button>
  );
}
