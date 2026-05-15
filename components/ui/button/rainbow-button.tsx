"use client";

import { type ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

type RainbowButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** Rotation duration of the gradient, in seconds. */
  duration?: number;
};

/**
 * Pill button with an animated multi-stop gradient anchored on Nyra's lime
 * and rose accents. The gradient travels with `background-position`, so the
 * surface itself never repaints — much cheaper than rotating a layer.
 */
export function RainbowButton({
  children,
  className,
  duration = 4,
  ...props
}: RainbowButtonProps) {
  return (
    <button
      className={cn(
        "group relative inline-flex h-11 cursor-pointer items-center justify-center rounded-full px-6 text-sm font-medium text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <style>{`
        @keyframes nyra-rainbow { to { background-position: 200% 50%; } }
      `}</style>
      <span
        aria-hidden
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "linear-gradient(90deg, var(--lime) 0%, var(--lime-soft) 18%, #b5e6ff 36%, #d5b5ff 54%, var(--rose) 72%, var(--lime) 100%)",
          backgroundSize: "200% 100%",
          animation: `nyra-rainbow ${duration}s linear infinite`,
        }}
      />
      <span
        aria-hidden
        className="absolute -inset-1 rounded-full opacity-40 blur-xl transition-opacity duration-300 group-hover:opacity-80"
        style={{
          background:
            "linear-gradient(90deg, var(--lime) 0%, var(--rose) 50%, var(--lime) 100%)",
          backgroundSize: "200% 100%",
          animation: `nyra-rainbow ${duration}s linear infinite`,
        }}
      />
      <span className="relative">{children}</span>
    </button>
  );
}
