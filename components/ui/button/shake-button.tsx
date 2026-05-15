"use client";

import {
  useEffect,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
} from "react";

import { cn } from "@/lib/utils";

type ShakeButtonProps = ComponentPropsWithoutRef<"button"> & {
  /**
   * Controlled flag. Flip to `true` to trigger one shake — the button
   * auto-clears the animation after `duration` and you can flip it true
   * again on the next failed submission.
   */
  shake?: boolean;
  /** Auto-shake on click. Useful for demos and form-validation patterns. */
  shakeOnClick?: boolean;
  /** Length of the shake, in ms. */
  duration?: number;
};

/**
 * Error-feedback shake. Drives a brief left/right oscillation either on
 * click (`shakeOnClick`) or in response to an external boolean
 * (`shake`). Animation is scoped to a CSS keyframe and runs once.
 */
export function ShakeButton({
  children,
  className,
  shake: controlled,
  shakeOnClick = false,
  duration = 500,
  onClick,
  ...props
}: ShakeButtonProps) {
  const [internal, setInternal] = useState(false);
  const isShaking = controlled ?? internal;

  useEffect(() => {
    if (!controlled) return;
    if (controlled) {
      const t = window.setTimeout(() => setInternal(false), duration);
      return () => window.clearTimeout(t);
    }
  }, [controlled, duration]);

  function handle(event: MouseEvent<HTMLButtonElement>) {
    if (shakeOnClick) {
      setInternal(true);
      window.setTimeout(() => setInternal(false), duration);
    }
    onClick?.(event);
  }

  return (
    <button
      onClick={handle}
      data-shake={isShaking || undefined}
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-rose px-5 py-2.5 text-sm font-medium text-background",
        "transition-colors hover:opacity-95",
        "data-[shake=true]:[animation:nyra-shake_var(--nyra-shake-duration)_ease-in-out]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose",
        className,
      )}
      style={{ ["--nyra-shake-duration" as string]: `${duration}ms` }}
      {...props}
    >
      <style>{`
        @keyframes nyra-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        @media (prefers-reduced-motion: reduce) {
          [data-shake=true] { animation: none !important; }
        }
      `}</style>
      {children}
    </button>
  );
}
