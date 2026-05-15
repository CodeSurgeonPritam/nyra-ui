"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

type Step = {
  title: string;
  content: ReactNode;
};

type MultiStepFormProps = {
  steps: Step[];
  className?: string;
  onComplete?: () => void;
};

/**
 * Multi-step form shell: progress bar with step markers, animated
 * left/right step transitions, prev/next navigation, and a completion
 * state. Bring your own inputs inside each step's `content`.
 */
export function MultiStepForm({
  steps,
  className,
  onComplete,
}: MultiStepFormProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [done, setDone] = useState(false);

  function go(delta: number) {
    setDirection(delta);
    const next = Math.max(0, Math.min(steps.length - 1, index + delta));
    setIndex(next);
  }

  function finish() {
    setDone(true);
    onComplete?.();
  }

  const progress = ((index + 1) / steps.length) * 100;
  const isLast = index === steps.length - 1;

  return (
    <div
      className={cn(
        "flex w-full max-w-xl flex-col gap-6 rounded-2xl border border-border bg-surface p-6",
        className,
      )}
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-foreground-muted">
        <span>
          Step {Math.min(index + 1, steps.length)} of {steps.length}
        </span>
        <span>{steps[index]?.title}</span>
      </div>

      <div className="relative h-1 w-full overflow-hidden rounded-full bg-foreground/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-accent"
          initial={false}
          animate={{ width: `${done ? 100 : progress}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 28 }}
        />
      </div>

      <div className="relative min-h-[180px] overflow-hidden">
        <AnimatePresence mode="wait" initial={false} custom={direction}>
          {done ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center gap-3 py-10 text-center"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <Check className="h-5 w-5" />
              </span>
              <div className="font-serif text-2xl">All done.</div>
              <div className="text-sm text-foreground-muted">
                We'll be in touch shortly.
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={index}
              custom={direction}
              initial={{ x: direction * 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -40, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {steps[index]?.content}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!done && (
        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            disabled={index === 0}
            className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-foreground-muted transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
          <button
            type="button"
            onClick={() => (isLast ? finish() : go(1))}
            className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
          >
            {isLast ? "Finish" : "Continue"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
