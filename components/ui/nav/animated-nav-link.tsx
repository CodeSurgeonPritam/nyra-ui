"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type AnimatedNavLinkProps = {
  href: string;
  children: ReactNode;
  active?: boolean;
  /**
   * Hover treatment. `underline` grows an accent line beneath; `pill`
   * paints a rounded background.
   */
  variant?: "underline" | "pill";
  className?: string;
};

/**
 * Primitive nav link with two hover treatments. Wrap with your router's
 * Link component (e.g. `next/link`) if you need client-side navigation.
 */
export function AnimatedNavLink({
  href,
  children,
  active = false,
  variant = "underline",
  className,
}: AnimatedNavLinkProps) {
  if (variant === "pill") {
    return (
      <a
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "inline-flex items-center rounded-full px-3 py-1.5 text-sm transition-colors duration-200 ease-out",
          active
            ? "bg-foreground/[0.08] text-foreground"
            : "text-foreground-muted hover:bg-foreground/[0.05] hover:text-foreground",
          className,
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <a
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group inline-flex items-center py-1.5 text-sm transition-colors duration-200",
        active ? "text-foreground" : "text-foreground-muted hover:text-foreground",
        className,
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className={cn(
            "absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-300 ease-out",
            active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
          )}
        />
      </span>
    </a>
  );
}
