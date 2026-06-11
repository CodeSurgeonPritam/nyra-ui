"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type TagInputProps = {
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  className?: string;
  /** Keys that commit the current input as a tag. */
  delimiters?: string[];
  /** Maximum number of tags. */
  max?: number;
  /** Reject duplicates (case-insensitive). */
  dedupe?: boolean;
  /** Optional validator — return false to reject an entry. */
  validate?: (tag: string) => boolean;
};

/**
 * Multi-value input: type a tag, press Enter (or any delimiter) to commit
 * it as a chip. Backspace on an empty input removes the last chip. Chips
 * animate in/out via `AnimatePresence` so layout shifts feel intentional.
 */
export function TagInput({
  value,
  defaultValue = [],
  onChange,
  placeholder = "Add tag…",
  className,
  delimiters = ["Enter", ",", "Tab"],
  max,
  dedupe = true,
  validate,
}: TagInputProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const tags = isControlled ? value! : internal;
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  function commit(next: string[]) {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  }

  function tryAdd(raw: string): boolean {
    const trimmed = raw.trim();
    if (!trimmed) return false;
    if (max && tags.length >= max) return false;
    if (dedupe && tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      return false;
    }
    if (validate && !validate(trimmed)) return false;
    commit([...tags, trimmed]);
    return true;
  }

  function removeAt(index: number) {
    commit(tags.filter((_, i) => i !== index));
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (delimiters.includes(event.key)) {
      if (draft.trim()) {
        event.preventDefault();
        if (tryAdd(draft)) setDraft("");
      }
      return;
    }
    if (event.key === "Backspace" && draft === "" && tags.length > 0) {
      event.preventDefault();
      removeAt(tags.length - 1);
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    const text = event.clipboardData.getData("text");
    if (!/[,\n\t]/.test(text)) return;
    event.preventDefault();
    const parts = text
      .split(/[,\n\t]+/)
      .map((p) => p.trim())
      .filter(Boolean);
    let acc = [...tags];
    for (const part of parts) {
      if (max && acc.length >= max) break;
      if (dedupe && acc.some((t) => t.toLowerCase() === part.toLowerCase())) continue;
      if (validate && !validate(part)) continue;
      acc.push(part);
    }
    commit(acc);
  }

  const atMax = max !== undefined && tags.length >= max;

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={cn(
        "flex w-full flex-wrap items-center gap-2 rounded-xl border bg-surface px-3 py-2.5 transition-colors",
        focused ? "border-foreground/30" : "border-border",
        "cursor-text",
        className,
      )}
    >
      <AnimatePresence initial={false}>
        {tags.map((tag, i) => (
          <motion.span
            key={`${tag}-${i}`}
            layout
            initial={{ opacity: 0, scale: 0.9, y: 2 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -2 }}
            transition={{ duration: 0.16 }}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-0.5 text-xs"
          >
            <span className="text-foreground">{tag}</span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                removeAt(i);
              }}
              aria-label={`Remove ${tag}`}
              className="text-foreground-muted transition-colors hover:text-rose"
            >
              <X className="h-3 w-3" />
            </button>
          </motion.span>
        ))}
      </AnimatePresence>

      <input
        ref={inputRef}
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false);
          if (draft.trim()) {
            if (tryAdd(draft)) setDraft("");
          }
        }}
        placeholder={atMax ? `Limit reached (${max})` : tags.length === 0 ? placeholder : ""}
        disabled={atMax}
        className="min-w-[8ch] flex-1 bg-transparent text-sm text-foreground placeholder:text-foreground-muted/60 focus:outline-none disabled:opacity-50"
      />

      {max !== undefined && (
        <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-foreground-muted">
          {tags.length} / {max}
        </span>
      )}
    </div>
  );
}
