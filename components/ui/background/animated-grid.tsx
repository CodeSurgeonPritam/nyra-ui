"use client";

import { cn } from "@/lib/utils";

type AnimatedGridProps = {
  className?: string;
  /** Size of each cell, in pixels. */
  cellSize?: number;
  /** Speed of the diagonal drift, in seconds. */
  speed?: number;
  /** Override grid line color (defaults to the accent token at low opacity). */
  color?: string;
};

/**
 * Drifting square grid that slowly shifts diagonally. Pure CSS — no JS in
 * the runtime path. A radial mask fades the edges so the pattern dies into
 * the background instead of cutting off.
 */
export function AnimatedGrid({
  className,
  cellSize = 48,
  speed = 24,
  color = "color-mix(in oklab, var(--accent) 14%, transparent)",
}: AnimatedGridProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "[mask-image:radial-gradient(70%_60%_at_50%_40%,#000_30%,transparent_75%)]",
        className,
      )}
    >
      <style>{`@keyframes nyra-grid { to { background-position: ${cellSize}px ${cellSize}px; } }`}</style>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${color} 1px, transparent 1px), linear-gradient(to bottom, ${color} 1px, transparent 1px)`,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          animation: `nyra-grid ${speed}s linear infinite`,
        }}
      />
    </div>
  );
}
