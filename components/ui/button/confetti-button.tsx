"use client";

import { useState, type ComponentPropsWithoutRef } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type ConfettiButtonProps = ComponentPropsWithoutRef<"button"> & {
  /** Number of particles to fire on each click. */
  particleCount?: number;
};

type Burst = {
  id: number;
  particles: { x: number; y: number; rotate: number; color: string }[];
};

const COLORS = ["var(--lime)", "var(--lime-soft)", "var(--rose)", "var(--bone)"];

export function ConfettiButton({
  children,
  className,
  onClick,
  particleCount = 16,
  ...props
}: ConfettiButtonProps) {
  const [bursts, setBursts] = useState<Burst[]>([]);

  function handleClick(event: React.MouseEvent<HTMLButtonElement>) {
    const id = Date.now() + Math.random();
    const particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 60 + Math.random() * 80;
      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        rotate: (Math.random() - 0.5) * 540,
        color: COLORS[Math.floor(Math.random() * COLORS.length)] as string,
      };
    });
    setBursts((b) => [...b, { id, particles }]);
    window.setTimeout(() => {
      setBursts((b) => b.filter((x) => x.id !== id));
    }, 900);
    onClick?.(event);
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground",
        "transition-transform hover:-translate-y-0.5 active:translate-y-0",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
      <AnimatePresence>
        {bursts.map((burst) => (
          <span
            key={burst.id}
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2"
          >
            {burst.particles.map((p, i) => (
              <motion.span
                key={i}
                initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 0.6 }}
                animate={{
                  x: p.x,
                  y: p.y,
                  rotate: p.rotate,
                  opacity: 0,
                  scale: 1,
                }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="absolute block h-1.5 w-1.5 rounded-sm"
                style={{ backgroundColor: p.color }}
              />
            ))}
          </span>
        ))}
      </AnimatePresence>
    </button>
  );
}
