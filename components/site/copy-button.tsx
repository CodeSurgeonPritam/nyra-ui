"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

type CopyButtonProps = {
  text: string;
  className?: string;
  label?: string;
};

export function CopyButton({ text, className, label }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // navigator.clipboard can fail in non-secure contexts; silently no-op.
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-surface/80 px-2.5 py-1.5 text-[11px] uppercase tracking-[0.14em] text-foreground-muted backdrop-blur transition-colors hover:text-foreground hover:border-foreground/30",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        className,
      )}
    >
      {copied ? (
        <Check className="h-3 w-3 text-accent" aria-hidden />
      ) : (
        <Copy className="h-3 w-3" aria-hidden />
      )}
      <span>{copied ? "Copied" : (label ?? "Copy")}</span>
    </button>
  );
}
