"use client";

import * as React from "react";
import { Check, Copy, EyeOff, Eye } from "lucide-react";

import { cn } from "@/lib/utils";

type LicenseKeyProps = {
  value: string;
  className?: string;
};

/**
 * Masked license key display with copy + reveal toggles. Default state
 * is masked (`NYRA-••••-••••-••••`) so over-the-shoulder viewers
 * can't lift it from a screenshare.
 */
export function LicenseKey({ value, className }: LicenseKeyProps) {
  const [revealed, setRevealed] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const display = revealed ? value : maskKey(value);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable in non-secure contexts.
    }
  }

  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 rounded-xl border border-border bg-surface px-4 py-3",
        className,
      )}
    >
      <code className="truncate font-mono text-sm tracking-[0.16em] text-foreground">
        {display}
      </code>
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() => setRevealed((v) => !v)}
          aria-label={revealed ? "Hide key" : "Reveal key"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:text-foreground"
        >
          {revealed ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Eye className="h-3.5 w-3.5" />
          )}
        </button>
        <button
          type="button"
          onClick={onCopy}
          aria-label={copied ? "Copied" : "Copy key"}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground-muted transition-colors hover:text-foreground"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-accent" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}

function maskKey(key: string) {
  const parts = key.split("-");
  if (parts.length !== 4) return "NYRA-••••-••••-••••";
  return `${parts[0]}-••••-••••-••••`;
}
