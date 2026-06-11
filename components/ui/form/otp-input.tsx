"use client";

import {
  useEffect,
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type OtpInputProps = {
  length?: number;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  /** Restrict input to digits (default) or any alphanumeric character. */
  pattern?: "digits" | "alphanumeric";
};

/**
 * Multi-cell one-time-password input. Auto-advances on type, backspace
 * jumps to the previous cell, paste fills every cell at once, and
 * `onComplete` fires the moment the last cell receives input. The
 * underlying state is a single string; cells are derived.
 */
export function OtpInput({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  className,
  disabled,
  pattern = "digits",
}: OtpInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string>(
    sanitize(defaultValue, length, pattern),
  );
  const current = isControlled ? sanitize(value!, length, pattern) : internal;
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (current.length === length) onComplete?.(current);
  }, [current, length, onComplete]);

  function commit(next: string) {
    const cleaned = sanitize(next, length, pattern);
    if (!isControlled) setInternal(cleaned);
    onChange?.(cleaned);
  }

  function handleChange(index: number, raw: string) {
    const ch = filterChar(raw, pattern);
    if (!ch) return;
    const arr = current.split("");
    arr[index] = ch;
    const next = arr.join("").slice(0, length);
    commit(next);
    const nextEl = refs.current[Math.min(index + 1, length - 1)];
    nextEl?.focus();
  }

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Backspace") {
      event.preventDefault();
      const arr = current.split("");
      if (arr[index]) {
        arr[index] = "";
        commit(arr.join(""));
      } else if (index > 0) {
        arr[index - 1] = "";
        commit(arr.join(""));
        refs.current[index - 1]?.focus();
      }
    } else if (event.key === "ArrowLeft" && index > 0) {
      event.preventDefault();
      refs.current[index - 1]?.focus();
    } else if (event.key === "ArrowRight" && index < length - 1) {
      event.preventDefault();
      refs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event: ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const text = event.clipboardData.getData("text");
    const cleaned = sanitize(text, length, pattern);
    if (!cleaned) return;
    commit(cleaned);
    const last = Math.min(cleaned.length, length - 1);
    refs.current[last]?.focus();
  }

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      aria-disabled={disabled || undefined}
    >
      {Array.from({ length }).map((_, i) => {
        const ch = current[i] ?? "";
        const isFocused = focusedIndex === i;
        return (
          <div key={i} className="relative">
            {isFocused && (
              <motion.span
                aria-hidden
                layoutId="otp-glow"
                className="pointer-events-none absolute -inset-1 rounded-xl"
                style={{
                  background:
                    "linear-gradient(135deg, color-mix(in oklab, var(--accent) 35%, transparent), transparent 60%)",
                  filter: "blur(8px)",
                }}
              />
            )}
            <input
              ref={(el) => {
                refs.current[i] = el;
              }}
              type="text"
              inputMode={pattern === "digits" ? "numeric" : "text"}
              autoComplete={i === 0 ? "one-time-code" : "off"}
              maxLength={1}
              disabled={disabled}
              value={ch}
              onFocus={(e) => {
                setFocusedIndex(i);
                e.target.select();
              }}
              onBlur={() => setFocusedIndex(null)}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className={cn(
                "relative h-12 w-10 rounded-xl border bg-surface text-center font-mono text-lg text-foreground transition-colors sm:h-14 sm:w-12 sm:text-xl",
                "focus:outline-none focus:border-foreground/30",
                ch ? "border-foreground/40" : "border-border",
                disabled && "cursor-not-allowed opacity-50",
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

function filterChar(input: string, pattern: "digits" | "alphanumeric"): string {
  const re = pattern === "digits" ? /[0-9]/ : /[a-zA-Z0-9]/;
  const ch = input.slice(-1);
  return re.test(ch) ? ch : "";
}

function sanitize(
  input: string,
  length: number,
  pattern: "digits" | "alphanumeric",
): string {
  const re = pattern === "digits" ? /[^0-9]/g : /[^a-zA-Z0-9]/g;
  return input.replace(re, "").slice(0, length);
}
