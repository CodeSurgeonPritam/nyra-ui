"use client";

import {
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

type Side = "top" | "right" | "bottom" | "left";

type TooltipProps = {
  /** The content rendered inside the tooltip surface. */
  content: ReactNode;
  /** The trigger element. Receives hover / focus listeners. */
  children: ReactNode;
  /** Where the tooltip is anchored relative to the trigger. */
  side?: Side;
  /** Delay before the tooltip appears, in ms. */
  delay?: number;
  className?: string;
};

const sidePosition: Record<Side, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowPosition: Record<Side, string> = {
  top: "top-full left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
  bottom: "bottom-full left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45",
  left: "left-full top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45",
  right: "right-full top-1/2 translate-x-1/2 -translate-y-1/2 rotate-45",
};

const enterOffset: Record<Side, { x?: number; y?: number }> = {
  top: { y: 4 },
  bottom: { y: -4 },
  left: { x: 4 },
  right: { x: -4 },
};

/**
 * Hover/focus tooltip. Wraps any trigger and renders an accessible
 * floating label on the chosen side. Includes a small arrow notch
 * anchored to the trigger edge.
 */
export function Tooltip({
  content,
  children,
  side = "top",
  delay = 180,
  className,
}: TooltipProps) {
  const [open, setOpen] = useState(false);
  const timerRef = useRef<number | null>(null);
  const id = useId();

  function show() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => setOpen(true), delay);
  }
  function hide() {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setOpen(false);
  }

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      <span aria-describedby={open ? id : undefined} className="inline-flex">
        {children}
      </span>
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            id={id}
            initial={{ opacity: 0, ...enterOffset[side] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...enterOffset[side] }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className={cn(
              "pointer-events-none absolute z-30 whitespace-nowrap rounded-md bg-foreground px-2 py-1 text-[11px] font-medium text-background shadow-md",
              sidePosition[side],
              className,
            )}
          >
            {content}
            <span
              aria-hidden
              className={cn(
                "absolute h-2 w-2 bg-foreground",
                arrowPosition[side],
              )}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
