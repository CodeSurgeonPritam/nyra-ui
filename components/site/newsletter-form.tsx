"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

type NewsletterFormProps = {
  className?: string;
  variant?: "inline" | "stacked";
};

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm({
  className,
  variant = "inline",
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMessage(undefined);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setErrorMessage(prettyError(data?.error));
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setErrorMessage("Network blip — try again in a moment.");
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "flex w-full max-w-md flex-col gap-2",
        className,
      )}
    >
      <div
        className={cn(
          "flex w-full overflow-hidden rounded-full border border-border bg-surface focus-within:border-foreground/30",
          variant === "stacked" && "flex-col rounded-2xl",
        )}
      >
        <label className="sr-only" htmlFor="newsletter-email">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@nyra.dev"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          className={cn(
            "min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-foreground-muted/60",
            "focus:outline-none disabled:opacity-60",
          )}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={cn(
            "inline-flex items-center justify-center gap-1.5 bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground",
            "transition-opacity disabled:opacity-60",
            variant === "inline" ? "rounded-r-full" : "rounded-b-2xl",
          )}
        >
          <AnimatePresence mode="wait" initial={false}>
            {status === "success" ? (
              <motion.span
                key="ok"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5"
              >
                <Check className="h-4 w-4" />
                Subscribed
              </motion.span>
            ) : status === "loading" ? (
              <motion.span
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Sending…
              </motion.span>
            ) : (
              <motion.span
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-1.5"
              >
                Subscribe
                <ArrowRight className="h-3.5 w-3.5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
      <AnimatePresence>
        {status === "error" && errorMessage && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-rose"
          >
            {errorMessage}
          </motion.p>
        )}
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-foreground-muted"
          >
            Welcome — check your inbox for the first email.
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function prettyError(code?: string): string {
  switch (code) {
    case "invalid-email":
      return "That doesn't look like a valid address.";
    case "send-failed":
      return "Couldn't send the welcome email — try again in a minute.";
    default:
      return "Something went wrong. Try again?";
  }
}
