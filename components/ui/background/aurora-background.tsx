"use client";

import { motion } from "motion/react";
import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type AuroraBackgroundProps = {
  children?: ReactNode;
  className?: string;
};

export function AuroraBackground({ children, className }: AuroraBackgroundProps) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-[20%] -z-10 opacity-70"
        initial={{ transform: "translate3d(0,0,0) rotate(0deg)" }}
        animate={{
          transform: [
            "translate3d(0%,0%,0) rotate(0deg)",
            "translate3d(3%,-2%,0) rotate(3deg)",
            "translate3d(-2%,2%,0) rotate(-2deg)",
            "translate3d(0%,0%,0) rotate(0deg)",
          ],
        }}
        transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        style={{
          background: [
            "radial-gradient(40% 50% at 20% 30%, color-mix(in oklab, var(--lime) 30%, transparent) 0%, transparent 60%)",
            "radial-gradient(40% 50% at 80% 20%, color-mix(in oklab, var(--rose) 22%, transparent) 0%, transparent 60%)",
            "radial-gradient(50% 60% at 60% 75%, color-mix(in oklab, var(--lime) 18%, transparent) 0%, transparent 60%)",
            "radial-gradient(40% 50% at 30% 80%, color-mix(in oklab, var(--rose) 16%, transparent) 0%, transparent 60%)",
          ].join(", "),
          filter: "blur(40px)",
        }}
      />
      {children}
    </div>
  );
}
