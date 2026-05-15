"use client";

import { cn } from "@/lib/utils";

type VortexProps = {
  className?: string;
  /** Rotation duration in seconds. */
  speed?: number;
  /** Override the streak color (defaults to the accent token). */
  color?: string;
};

/**
 * A slow rotating spiral made from two opposing conic-gradients. Pure CSS
 * so it costs nothing at runtime — radial mask fades the edges so the
 * pattern dies into the surrounding background.
 */
export function Vortex({
  className,
  speed = 36,
  color = "color-mix(in oklab, var(--accent) 30%, transparent)",
}: VortexProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "[mask-image:radial-gradient(60%_55%_at_50%_50%,#000_30%,transparent_75%)]",
        className,
      )}
    >
      <style>{`
        @keyframes nyra-vortex-cw { to { transform: rotate(360deg); } }
        @keyframes nyra-vortex-ccw { to { transform: rotate(-360deg); } }
      `}</style>
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[180%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `conic-gradient(from 0deg, ${color}, transparent 30%, ${color} 60%, transparent 90%, ${color})`,
          animation: `nyra-vortex-cw ${speed}s linear infinite`,
          filter: "blur(28px)",
        }}
      />
      <div
        className="absolute left-1/2 top-1/2 aspect-square w-[140%] -translate-x-1/2 -translate-y-1/2"
        style={{
          background:
            "conic-gradient(from 90deg, color-mix(in oklab, var(--rose) 28%, transparent), transparent 40%, color-mix(in oklab, var(--rose) 28%, transparent) 80%, transparent)",
          animation: `nyra-vortex-ccw ${speed * 1.4}s linear infinite`,
          filter: "blur(36px)",
          opacity: 0.65,
        }}
      />
    </div>
  );
}
