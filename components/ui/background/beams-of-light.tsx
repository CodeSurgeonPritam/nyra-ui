"use client";

import { cn } from "@/lib/utils";

type BeamsOfLightProps = {
  className?: string;
  /** Number of vertical beams. */
  count?: number;
};

/**
 * Three vertical beams of light that breathe in opacity. The beams use a
 * vertical linear gradient so they fade into the page top and bottom.
 */
export function BeamsOfLight({ className, count = 3 }: BeamsOfLightProps) {
  const beams = Array.from({ length: count });

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <style>{`@keyframes nyra-beam-breathe { 0%, 100% { opacity: 0.25; } 50% { opacity: 0.85; } }`}</style>
      {beams.map((_, i) => {
        const left = ((i + 1) / (count + 1)) * 100;
        const delay = i * 1.4;
        return (
          <span
            key={i}
            className="absolute top-0 h-full"
            style={{
              left: `${left}%`,
              width: 1.5,
              transform: "translateX(-50%)",
              background:
                "linear-gradient(to bottom, transparent 0%, var(--accent) 35%, var(--accent) 60%, transparent 100%)",
              filter: "blur(0.5px)",
              boxShadow: "0 0 18px color-mix(in oklab, var(--accent) 35%, transparent)",
              animation: `nyra-beam-breathe 6s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
