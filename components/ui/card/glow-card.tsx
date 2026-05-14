"use client";

import { type ReactNode } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type GlowCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * A card with a rotating conic-gradient border on hover.
 * No global CSS keyframes needed — the rotation is driven by Motion.
 */
export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div className={cn("group relative rounded-2xl p-px", className)}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        style={{
          background:
            "conic-gradient(from 0deg, transparent 0deg, var(--accent) 90deg, transparent 200deg)",
        }}
      />
      <div className="relative h-full rounded-[15px] bg-surface p-6">
        {children}
      </div>
    </div>
  );
}
