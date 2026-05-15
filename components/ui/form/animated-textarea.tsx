"use client";

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  type TextareaHTMLAttributes,
} from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type AnimatedTextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "onChange"
> & {
  label?: string;
  maxLength?: number;
  onChange?: (value: string) => void;
};

/**
 * Auto-growing textarea with a floating label, a focus glow ring, and a
 * live character counter that turns accent-rose as it nears the cap.
 */
export const AnimatedTextarea = forwardRef<
  HTMLTextAreaElement,
  AnimatedTextareaProps
>(function AnimatedTextarea(
  { label, maxLength, className, defaultValue, onChange, ...props },
  ref,
) {
  const innerRef = useRef<HTMLTextAreaElement>(null);
  useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);
  const [value, setValue] = useState(
    typeof defaultValue === "string" ? defaultValue : "",
  );
  const [focused, setFocused] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = event.target.value;
    setValue(next);
    onChange?.(next);
    const el = innerRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, 320)}px`;
    }
  }

  const hasValue = value.length > 0;
  const overCapWarn = maxLength
    ? value.length / maxLength >= 0.85
    : false;

  return (
    <div className={cn("relative w-full", className)}>
      <motion.div
        aria-hidden
        animate={{
          opacity: focused ? 1 : 0,
          scale: focused ? 1 : 0.99,
        }}
        transition={{ duration: 0.18 }}
        className="pointer-events-none absolute -inset-0.5 rounded-xl"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--accent) 35%, transparent), transparent 60%)",
          filter: "blur(8px)",
        }}
      />
      <div className="relative rounded-xl border border-border bg-surface focus-within:border-foreground/30">
        {label && (
          <label
            className={cn(
              "pointer-events-none absolute left-3.5 origin-left text-foreground-muted transition-all duration-200",
              focused || hasValue
                ? "top-2 text-[10px] uppercase tracking-[0.18em]"
                : "top-3.5 text-sm",
            )}
          >
            {label}
          </label>
        )}
        <textarea
          ref={innerRef}
          {...props}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          rows={3}
          className={cn(
            "w-full resize-none bg-transparent px-3.5 text-sm text-foreground placeholder:text-foreground-muted/60",
            "focus:outline-none",
            label ? "pb-3 pt-7" : "py-3",
          )}
        />
        {maxLength && (
          <div className="flex items-center justify-end px-3.5 pb-2 text-[10px] uppercase tracking-[0.16em]">
            <span
              className={cn(
                "transition-colors",
                overCapWarn ? "text-rose" : "text-foreground-muted",
              )}
            >
              {value.length} / {maxLength}
            </span>
          </div>
        )}
      </div>
    </div>
  );
});
