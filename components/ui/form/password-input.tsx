"use client";

import {
  forwardRef,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type InputHTMLAttributes,
} from "react";
import { motion } from "motion/react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";

type PasswordInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type" | "onChange"
> & {
  label?: string;
  hint?: string;
  error?: string;
  /** Show the live strength meter below the field. */
  showStrength?: boolean;
  /** Minimum acceptable strength tier — fires onValid when met. */
  requireTier?: StrengthTier;
  onChange?: (value: string) => void;
  onValid?: (value: string, tier: StrengthTier) => void;
};

export type StrengthTier = "weak" | "fair" | "good" | "strong";

const TIERS: StrengthTier[] = ["weak", "fair", "good", "strong"];
const TIER_LABEL: Record<StrengthTier, string> = {
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
};
const TIER_COLOR: Record<StrengthTier, string> = {
  weak: "var(--rose)",
  fair: "#f5b73c",
  good: "#9be07a",
  strong: "var(--accent)",
};

/**
 * Password input with an eye toggle and a live strength meter. The
 * scoring is intentionally simple and transparent — length + character
 * variety. For real account creation, pair this with server-side
 * `zxcvbn` or a breached-password check; never trust client scoring alone.
 */
export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  function PasswordInput(
    {
      label = "Password",
      hint,
      error,
      className,
      defaultValue,
      showStrength = true,
      requireTier,
      onChange,
      onValid,
      ...props
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const id = useId();
    const [value, setValue] = useState<string>(
      typeof defaultValue === "string" ? defaultValue : "",
    );
    const [revealed, setRevealed] = useState(false);
    const [focused, setFocused] = useState(false);

    const tier = useMemo(() => scoreTier(value), [value]);
    const tierIndex = TIERS.indexOf(tier);
    const showError = Boolean(error);

    function handleChange(next: string) {
      setValue(next);
      onChange?.(next);
      if (requireTier && TIERS.indexOf(scoreTier(next)) >= TIERS.indexOf(requireTier)) {
        onValid?.(next, scoreTier(next));
      }
    }

    return (
      <div className={cn("flex w-full flex-col gap-1.5", className)}>
        <div className="relative">
          <motion.div
            aria-hidden
            animate={{ opacity: focused ? 1 : 0 }}
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
            <label
              htmlFor={id}
              className={cn(
                "pointer-events-none absolute left-3.5 origin-left text-foreground-muted transition-all duration-200",
                focused || value.length > 0
                  ? "top-1.5 text-[10px] uppercase tracking-[0.18em]"
                  : "top-3.5 text-sm",
                showError && "text-rose",
              )}
            >
              {label}
            </label>
            <input
              ref={inputRef}
              id={id}
              type={revealed ? "text" : "password"}
              value={value}
              onChange={(e) => handleChange(e.target.value)}
              onFocus={(e) => {
                setFocused(true);
                props.onFocus?.(e);
              }}
              onBlur={(e) => {
                setFocused(false);
                props.onBlur?.(e);
              }}
              aria-invalid={showError || undefined}
              autoComplete="new-password"
              {...props}
              className="w-full bg-transparent pb-2 pl-3.5 pr-12 pt-5 text-sm text-foreground placeholder:text-foreground-muted/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setRevealed((v) => !v)}
              aria-label={revealed ? "Hide password" : "Show password"}
              className="absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-foreground-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {revealed ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {showStrength && value.length > 0 && (
          <div className="flex items-center gap-2 px-1">
            <div className="flex flex-1 gap-1">
              {TIERS.map((t, i) => (
                <motion.div
                  key={t}
                  className="h-1 flex-1 rounded-full bg-foreground/10"
                  animate={{
                    backgroundColor:
                      i <= tierIndex ? TIER_COLOR[tier] : "var(--border)",
                  }}
                  transition={{ duration: 0.25 }}
                />
              ))}
            </div>
            <span
              className="font-mono text-[10px] uppercase tracking-[0.18em]"
              style={{ color: TIER_COLOR[tier] }}
            >
              {TIER_LABEL[tier]}
            </span>
          </div>
        )}

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
  },
);

function scoreTier(input: string): StrengthTier {
  if (input.length < 4) return "weak";
  let score = 0;
  if (input.length >= 8) score++;
  if (input.length >= 12) score++;
  if (/[a-z]/.test(input) && /[A-Z]/.test(input)) score++;
  if (/[0-9]/.test(input)) score++;
  if (/[^A-Za-z0-9]/.test(input)) score++;
  // Penalty for low diversity.
  const unique = new Set(input).size;
  if (unique <= 3 && input.length < 16) score = Math.max(0, score - 1);
  if (score <= 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "good";
  return "strong";
}
