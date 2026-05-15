"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { cn } from "@/lib/utils";

type AutoHideNavbarProps = {
  children: ReactNode;
  className?: string;
  /** Scroll distance before hiding can start, in pixels. */
  threshold?: number;
  /** Per-tick delta required to flip the hidden state, in pixels. */
  hysteresis?: number;
};

/**
 * Sticky navbar that slides out of view when the user scrolls down and
 * returns the moment they scroll up. Hysteresis on the scroll delta
 * prevents flicker at frame boundaries.
 */
export function AutoHideNavbar({
  children,
  className,
  threshold = 80,
  hysteresis = 5,
}: AutoHideNavbarProps) {
  const { scrollY } = useScroll();
  const lastRef = useRef(0);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const delta = latest - lastRef.current;
    if (latest < threshold) {
      setHidden(false);
    } else if (delta > hysteresis) {
      setHidden(true);
    } else if (delta < -hysteresis) {
      setHidden(false);
    }
    lastRef.current = latest;
  });

  return (
    <motion.div
      animate={{ y: hidden ? "-110%" : "0%" }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={cn("sticky top-0 z-40 w-full", className)}
    >
      {children}
    </motion.div>
  );
}
