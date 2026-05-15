"use client";

import { useState, type KeyboardEvent, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /** What triggers the flip. `hover` is purely visual; `click` is keyboard-accessible. */
  trigger?: "hover" | "click";
  /** Flip duration in milliseconds. */
  duration?: number;
};

/**
 * Front-to-back card flip. Sets perspective on the outer container and
 * preserves 3D on the inner wrapper; both faces use `backface-visibility:
 * hidden` so they hide cleanly mid-rotation.
 */
export function FlipCard({
  front,
  back,
  className,
  trigger = "hover",
  duration = 600,
}: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const interactive = trigger === "click";

  function toggle() {
    if (interactive) setFlipped((f) => !f);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!interactive) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  }

  return (
    <div
      onClick={toggle}
      onKeyDown={onKeyDown}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-pressed={interactive ? flipped : undefined}
      className={cn(
        "group relative [perspective:1000px]",
        interactive && "cursor-pointer",
        className,
      )}
    >
      <div
        className={cn(
          "relative h-full w-full [transform-style:preserve-3d]",
          trigger === "hover" &&
            "group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]",
          flipped && "[transform:rotateY(180deg)]",
        )}
        style={{
          transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      >
        <div className="absolute inset-0 [backface-visibility:hidden]">
          {front}
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
