"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";

import { cn } from "@/lib/utils";

type SpotlightHeroProps = {
  children: ReactNode;
  className?: string;
  /** Radius of the spotlight in pixels. */
  radius?: number;
  /** Color of the spotlight; defaults to the accent token. */
  color?: string;
};

/**
 * Hero section with a soft radial spotlight that follows the cursor.
 * Falls back to a static centered glow on touch / no-pointer devices.
 */
export function SpotlightHero({
  children,
  className,
  radius = 380,
  color = "var(--accent)",
}: SpotlightHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-9999);
  const y = useMotionValue(-9999);
  const sx = useSpring(x, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 120, damping: 18, mass: 0.6 });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  }

  function onLeave() {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(rect.width / 2);
    y.set(rect.height * 0.3);
  }

  const background = useMotionTemplate`radial-gradient(${radius}px ${radius}px at ${sx}px ${sy}px, color-mix(in oklab, ${color} 22%, transparent) 0%, transparent 70%)`;

  return (
    <section
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onLeave}
      className={cn(
        "relative isolate overflow-hidden bg-background",
        className,
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background }}
      />
      {children}
    </section>
  );
}
