"use client";

import { useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useTransform,
  type PanInfo,
} from "motion/react";

import { cn } from "@/lib/utils";

type StackCardProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  className?: string;
  /** Horizontal distance (px) needed to commit a swipe. */
  threshold?: number;
  onSwipe?: (item: T, direction: "left" | "right") => void;
};

/**
 * Tinder-style swipe stack. The top card is draggable; cards beneath
 * scale and translate downward to suggest depth. Releases past the
 * threshold fire `onSwipe` and dismiss the card.
 */
export function StackCard<T>({
  items,
  renderItem,
  className,
  threshold = 120,
  onSwipe,
}: StackCardProps<T>) {
  const [stack, setStack] = useState<T[]>(items);

  function dismiss(direction: "left" | "right") {
    const top = stack[stack.length - 1];
    if (!top) return;
    onSwipe?.(top, direction);
    setStack((s) => s.slice(0, -1));
  }

  if (stack.length === 0) {
    return (
      <div
        className={cn(
          "relative flex h-72 w-64 items-center justify-center rounded-2xl border border-dashed border-border text-xs uppercase tracking-[0.18em] text-foreground-muted",
          className,
        )}
      >
        End of stack
      </div>
    );
  }

  return (
    <div className={cn("relative h-72 w-64", className)}>
      <AnimatePresence>
        {stack.map((item, idx) => {
          const isTop = idx === stack.length - 1;
          const depth = stack.length - 1 - idx;
          return (
            <StackItem
              key={(item as { id?: string | number } | null)?.id ?? idx}
              isTop={isTop}
              depth={depth}
              threshold={threshold}
              onDismiss={isTop ? dismiss : undefined}
            >
              {renderItem(item, idx)}
            </StackItem>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function StackItem({
  isTop,
  depth,
  threshold,
  onDismiss,
  children,
}: {
  isTop: boolean;
  depth: number;
  threshold: number;
  onDismiss?: (dir: "left" | "right") => void;
  children: ReactNode;
}) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-12, 12]);
  const opacity = useTransform(x, [-200, -120, 0, 120, 200], [0, 1, 1, 1, 0]);

  function handleEnd(_: unknown, info: PanInfo) {
    if (!isTop || !onDismiss) return;
    if (info.offset.x > threshold) onDismiss("right");
    else if (info.offset.x < -threshold) onDismiss("left");
  }

  return (
    <motion.div
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      onDragEnd={handleEnd}
      style={isTop ? { x, rotate, opacity } : undefined}
      initial={{ scale: 1 - depth * 0.04, y: depth * 10, opacity: 0 }}
      animate={{ scale: 1 - depth * 0.04, y: depth * 10, opacity: 1 }}
      exit={{ x: 360, opacity: 0, transition: { duration: 0.25 } }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className={cn(
        "absolute inset-0 select-none rounded-2xl border border-border bg-surface p-6",
        isTop && "cursor-grab active:cursor-grabbing",
      )}
    >
      {children}
    </motion.div>
  );
}
