"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type SliderProps = {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  /** Show a floating value bubble above the thumb while dragging. */
  showBubble?: boolean;
  /** Disabled state. */
  disabled?: boolean;
  /** Format the bubble value (e.g. add a unit suffix). */
  formatValue?: (value: number) => string;
};

/**
 * Range slider with a spring-driven thumb. Drag, click-to-jump, and
 * keyboard nav (arrows / home / end) all supported. Optional value
 * bubble appears while the user interacts.
 */
export function Slider({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  className,
  showBubble = true,
  disabled,
  formatValue,
}: SliderProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value! : internal;
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const commit = useCallback(
    (next: number) => {
      const clamped = Math.max(min, Math.min(max, next));
      const stepped = Math.round((clamped - min) / step) * step + min;
      const rounded = Number.parseFloat(stepped.toFixed(8));
      if (!isControlled) setInternal(rounded);
      onChange?.(rounded);
    },
    [min, max, step, isControlled, onChange],
  );

  function valueFromClientX(clientX: number): number {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return current;
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return min + ratio * (max - min);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (disabled) return;
    (event.target as Element).setPointerCapture?.(event.pointerId);
    setDragging(true);
    commit(valueFromClientX(event.clientX));
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!dragging || disabled) return;
    commit(valueFromClientX(event.clientX));
  }

  function handlePointerUp() {
    setDragging(false);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (disabled) return;
    const big = (max - min) / 10;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        event.preventDefault();
        commit(current + step);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        event.preventDefault();
        commit(current - step);
        break;
      case "PageUp":
        event.preventDefault();
        commit(current + big);
        break;
      case "PageDown":
        event.preventDefault();
        commit(current - big);
        break;
      case "Home":
        event.preventDefault();
        commit(min);
        break;
      case "End":
        event.preventDefault();
        commit(max);
        break;
    }
  }

  useEffect(() => {
    if (!dragging) return;
    const onPointerUp = () => setDragging(false);
    window.addEventListener("pointerup", onPointerUp);
    return () => window.removeEventListener("pointerup", onPointerUp);
  }, [dragging]);

  const pct = ((current - min) / (max - min)) * 100;
  const bubbleText = formatValue ? formatValue(current) : String(current);

  return (
    <div
      className={cn(
        "relative flex h-10 w-full items-center select-none",
        disabled && "opacity-50",
        className,
      )}
    >
      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onKeyDown={handleKeyDown}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={current}
        aria-disabled={disabled || undefined}
        className={cn(
          "relative h-1.5 w-full cursor-pointer rounded-full bg-foreground/10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background",
        )}
      >
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
          style={{ width: `${pct}%` }}
        />
        <motion.div
          aria-hidden
          className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 border-accent bg-background shadow-sm"
          style={{ left: `${pct}%`, x: "-50%" }}
          animate={{ scale: dragging ? 1.15 : 1 }}
          transition={{ type: "spring", stiffness: 480, damping: 28 }}
        />
        {showBubble && (
          <motion.div
            aria-hidden
            initial={false}
            animate={{
              opacity: dragging ? 1 : 0,
              y: dragging ? 0 : 4,
            }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute -top-9 -translate-x-1/2 rounded-md bg-foreground px-2 py-1 font-mono text-[11px] text-background"
            style={{ left: `${pct}%` }}
          >
            {bubbleText}
          </motion.div>
        )}
      </div>
    </div>
  );
}
