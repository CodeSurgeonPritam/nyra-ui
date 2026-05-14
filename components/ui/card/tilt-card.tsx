"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { cn } from "@/lib/utils";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees on either axis. */
  max?: number;
  /** Depth the inner content lifts toward the viewer, in pixels. */
  depth?: number;
};

export function TiltCard({
  children,
  className,
  max = 12,
  depth = 32,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-max, max]);
  const sx = useSpring(rotateX, { stiffness: 200, damping: 16, mass: 0.5 });
  const sy = useSpring(rotateY, { stiffness: 200, damping: 16, mass: 0.5 });

  function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={reset}
      style={{
        rotateX: sx,
        rotateY: sy,
        transformStyle: "preserve-3d",
        transformPerspective: 800,
      }}
      className={cn("relative will-change-transform", className)}
    >
      <div style={{ transform: `translateZ(${depth}px)` }}>{children}</div>
    </motion.div>
  );
}
