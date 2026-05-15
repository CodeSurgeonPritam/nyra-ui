"use client";

import { motion, type HTMLMotionProps } from "motion/react";

import { cn } from "@/lib/utils";

type ScaleButtonProps = Omit<
  HTMLMotionProps<"button">,
  "whileHover" | "whileTap" | "transition"
> & {
  /** Scale value on hover. */
  hover?: number;
  /** Scale value on press. */
  press?: number;
};

/**
 * Spring-eased scale on hover and press — the iOS-style physical feel.
 * Stiffness is high enough that the bounce reads as crisp rather than
 * floaty.
 */
export function ScaleButton({
  children,
  className,
  hover = 1.05,
  press = 0.96,
  ...props
}: ScaleButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: hover }}
      whileTap={{ scale: press }}
      transition={{ type: "spring", stiffness: 360, damping: 22, mass: 0.6 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
