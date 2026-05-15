"use client";

import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type GlowButtonProps = ComponentPropsWithoutRef<"button">;

/**
 * Colored shadow halo blooms outward on hover. Animates `box-shadow` only,
 * which composes off the main thread on modern browsers — keeps 60fps
 * even on busy pages.
 */
export function GlowButton({
  children,
  className,
  ...props
}: GlowButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground",
        "shadow-[0_0_0_0_color-mix(in_oklab,var(--accent)_0%,transparent)] transition-shadow duration-300 ease-out",
        "hover:shadow-[0_0_28px_4px_color-mix(in_oklab,var(--accent)_55%,transparent)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
