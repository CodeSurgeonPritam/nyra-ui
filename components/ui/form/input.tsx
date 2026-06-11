"use client";

import {
  forwardRef,
  useId,
  useImperativeHandle,
  useRef,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> & {
  label?: string;
  /** Optional content rendered before the input (e.g. an icon). */
  leading?: ReactNode;
  /** Optional content rendered after the input (e.g. a unit, action). */
  trailing?: ReactNode;
  /** Helper text below the field. Replaced by `error` when set. */
  hint?: ReactNode;
  /** Error text — switches the field into the rose accent. */
  error?: ReactNode;
  onChange?: (value: string) => void;
};

/**
 * Single-line text input with a floating label, focus glow, and slots for
 * leading / trailing adornments. Sibling of AnimatedTextarea — same
 * editorial tone, fixed height.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    leading,
    trailing,
    hint,
    error,
    className,
    defaultValue,
    onChange,
    type = "text",
    ...props
  },
  ref,
) {
  const inputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
  const id = useId();
  const [value, setValue] = useState(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const labelLifted = focused || hasValue;
  const showError = Boolean(error);

  return (
    <div className={cn("flex w-full flex-col gap-1.5", className)}>
      <div className="relative">
        <motion.div
          aria-hidden
          animate={{ opacity: focused ? 1 : 0, scale: focused ? 1 : 0.99 }}
          transition={{ duration: 0.18 }}
          className="pointer-events-none absolute -inset-0.5 rounded-xl"
          style={{
            background: showError
              ? "linear-gradient(135deg, color-mix(in oklab, var(--rose) 35%, transparent), transparent 60%)"
              : "linear-gradient(135deg, color-mix(in oklab, var(--accent) 35%, transparent), transparent 60%)",
            filter: "blur(8px)",
          }}
        />
        <div
          className={cn(
            "relative flex items-center rounded-xl border bg-surface transition-colors",
            showError
              ? "border-rose/60"
              : focused
                ? "border-foreground/30"
                : "border-border",
          )}
        >
          {leading && (
            <span className="flex h-full shrink-0 items-center pl-3.5 text-foreground-muted">
              {leading}
            </span>
          )}
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "pointer-events-none absolute origin-left text-foreground-muted transition-all duration-200",
                leading ? "left-10" : "left-3.5",
                labelLifted
                  ? "top-1.5 text-[10px] uppercase tracking-[0.18em]"
                  : "top-3.5 text-sm",
                showError && "text-rose",
              )}
            >
              {label}
            </label>
          )}
          <input
            ref={inputRef}
            id={id}
            type={type}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              onChange?.(e.target.value);
            }}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            aria-invalid={showError || undefined}
            {...props}
            className={cn(
              "w-full bg-transparent text-sm text-foreground placeholder:text-foreground-muted/60 focus:outline-none",
              label ? "pb-2 pt-5" : "py-2.5",
              leading ? "pl-2.5" : "pl-3.5",
              trailing ? "pr-2.5" : "pr-3.5",
            )}
          />
          {trailing && (
            <span className="flex h-full shrink-0 items-center pr-3 text-foreground-muted">
              {trailing}
            </span>
          )}
        </div>
      </div>
      {(showError || hint) && (
        <p
          className={cn(
            "px-1 text-xs",
            showError ? "text-rose" : "text-foreground-muted",
          )}
        >
          {showError ? error : hint}
        </p>
      )}
    </div>
  );
});
