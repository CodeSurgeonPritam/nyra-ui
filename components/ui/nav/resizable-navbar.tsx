"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { cn } from "@/lib/utils";

type ResizableNavbarProps = {
  children: ReactNode;
  className?: string;
  /** Scroll distance (px) at which the navbar finishes contracting. */
  shrinkAt?: number;
};

/**
 * Sticky top navbar that contracts on scroll: width pulls inward, height
 * shrinks, the surface gains a frosted border. Reverts smoothly when the
 * user scrolls back to the top.
 */
export function ResizableNavbar({
  children,
  className,
  shrinkAt = 80,
}: ResizableNavbarProps) {
  const { scrollY } = useScroll();
  const [shrunk, setShrunk] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShrunk(latest > shrinkAt);
  });

  useEffect(() => {
    setShrunk(window.scrollY > shrinkAt);
  }, [shrinkAt]);

  return (
    <div className="sticky top-3 z-40 flex w-full justify-center px-3">
      <motion.nav
        animate={{
          width: shrunk ? "min(720px, 92%)" : "min(1120px, 100%)",
          paddingTop: shrunk ? 8 : 14,
          paddingBottom: shrunk ? 8 : 14,
          borderRadius: shrunk ? 999 : 16,
        }}
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className={cn(
          "flex items-center justify-between gap-6 border border-border bg-background/70 px-5 backdrop-blur",
          className,
        )}
      >
        {children}
      </motion.nav>
    </div>
  );
}
