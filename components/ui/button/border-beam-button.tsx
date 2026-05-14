"use client";

import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type BorderBeamButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** Beam loop duration in seconds. */
  duration?: number;
};

/**
 * Button with a continuous beam traveling around its border. Pure CSS — the
 * beam is a conic-gradient pseudo-element rotating behind a mask, so the
 * button stays click-cheap.
 */
export function BorderBeamButton({
  children,
  className,
  duration = 4,
  ...props
}: BorderBeamButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden rounded-full p-px",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0%, var(--accent) 20%, transparent 35%, transparent 100%)",
          animation: `nyra-beam ${duration}s linear infinite`,
        }}
      />
      <style>{`@keyframes nyra-beam { to { transform: rotate(360deg); } }`}</style>
      <span className="relative inline-flex items-center gap-1.5 rounded-full bg-background px-5 py-2 text-sm font-medium text-foreground">
        {children}
      </span>
    </button>
  );
}
