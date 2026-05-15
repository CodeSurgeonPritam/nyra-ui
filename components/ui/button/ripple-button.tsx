"use client";

import { useState, type ComponentPropsWithoutRef, type MouseEvent } from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type Ripple = { id: number; x: number; y: number; size: number };

type RippleButtonProps = ComponentPropsWithoutRef<"button">;

/**
 * Material-style click ripple. On every press, a circle expands and
 * fades from the click point. Multiple ripples can stack — each
 * lives on its own timer.
 */
export function RippleButton({
  children,
  className,
  onClick,
  ...props
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  function handle(event: MouseEvent<HTMLButtonElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const ripple: Ripple = {
      id: Date.now() + Math.random(),
      x: event.clientX - rect.left - size / 2,
      y: event.clientY - rect.top - size / 2,
      size,
    };
    setRipples((r) => [...r, ripple]);
    window.setTimeout(() => {
      setRipples((r) => r.filter((x) => x.id !== ripple.id));
    }, 700);
    onClick?.(event);
  }

  return (
    <button
      onClick={handle}
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground",
        "transition-transform active:scale-[0.98]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            aria-hidden
            initial={{ scale: 0, opacity: 0.55 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute rounded-full bg-accent-foreground/35"
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </AnimatePresence>
      <span className="relative">{children}</span>
    </button>
  );
}
