"use client";

import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

type LoadingState = "idle" | "loading" | "success";

type LoadingButtonProps = Omit<ComponentPropsWithoutRef<"button">, "onClick"> & {
  /** Async handler; the button stays in `loading` until this resolves. */
  onClick?: () => void | Promise<unknown>;
  /** How long the success state holds before reverting to idle, in ms. */
  successHold?: number;
  loadingLabel?: ReactNode;
  successLabel?: ReactNode;
  /** Externally control the state instead of letting the button manage it. */
  state?: LoadingState;
};

/**
 * Three-state button: idle → loading (spinner) → success (check) → idle.
 * Wrap an async handler and the button drives itself, or pass `state`
 * to drive it from outside.
 */
export function LoadingButton({
  children,
  className,
  onClick,
  successHold = 1200,
  loadingLabel = "Loading",
  successLabel = "Done",
  state: controlledState,
  ...props
}: LoadingButtonProps) {
  const [internal, setInternal] = useState<LoadingState>("idle");
  const state = controlledState ?? internal;
  const isControlled = controlledState !== undefined;

  async function handle() {
    if (state !== "idle") return;
    if (!isControlled) setInternal("loading");
    try {
      await onClick?.();
      if (!isControlled) {
        setInternal("success");
        window.setTimeout(() => setInternal("idle"), successHold);
      }
    } catch {
      if (!isControlled) setInternal("idle");
    }
  }

  return (
    <button
      onClick={handle}
      disabled={state !== "idle"}
      data-state={state}
      className={cn(
        "relative inline-flex min-w-[120px] items-center justify-center overflow-hidden rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground",
        "transition-colors disabled:cursor-not-allowed",
        "data-[state=success]:bg-accent-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      {...props}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {state === "idle" && (
          <motion.span
            key="idle"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-1.5"
          >
            {children}
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key="loading"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="inline-flex items-center gap-2"
          >
            <Loader2 className="h-4 w-4 animate-spin" />
            {loadingLabel}
          </motion.span>
        )}
        {state === "success" && (
          <motion.span
            key="success"
            initial={{ y: 12, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="inline-flex items-center gap-1.5"
          >
            <Check className="h-4 w-4" />
            {successLabel}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
