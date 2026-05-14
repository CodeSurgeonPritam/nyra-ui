"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";

type MeteorShowerProps = {
  count?: number;
  className?: string;
};

/**
 * Diagonal meteor streaks. Each meteor is a thin gradient line that fades
 * out behind it. Position, delay, duration, and length are randomized
 * once at mount so the field doesn't pulse synchronously.
 */
export function MeteorShower({ count = 24, className }: MeteorShowerProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * -100,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 4,
        length: 80 + Math.random() * 120,
      })),
    [count],
  );

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className,
      )}
    >
      <style>{`@keyframes nyra-meteor { 0% { transform: translate3d(0,0,0) rotate(215deg); opacity: 0; } 10% { opacity: 1; } 100% { transform: translate3d(-120vmax,120vmax,0) rotate(215deg); opacity: 0; } }`}</style>
      {meteors.map((m) => (
        <span
          key={m.id}
          className="absolute rounded-full"
          style={{
            top: `${m.top}%`,
            left: `${m.left}%`,
            width: m.length,
            height: 1,
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--accent) 80%, transparent), transparent)",
            boxShadow: "0 0 6px color-mix(in oklab, var(--accent) 40%, transparent)",
            animation: `nyra-meteor ${m.duration}s linear ${m.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
