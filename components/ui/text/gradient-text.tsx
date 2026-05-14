"use client";

import { type ComponentPropsWithoutRef, type ElementType } from "react";

import { cn } from "@/lib/utils";

type GradientTextOwnProps = {
  as?: ElementType;
  /** CSS color (or var) for the gradient start. */
  from?: string;
  /** CSS color (or var) for the gradient middle. */
  via?: string;
  /** CSS color (or var) for the gradient end. */
  to?: string;
  /** Animation duration in seconds. Set to 0 for static. */
  duration?: number;
};

type GradientTextProps = GradientTextOwnProps &
  Omit<ComponentPropsWithoutRef<"span">, keyof GradientTextOwnProps>;

export function GradientText({
  as: Tag = "span",
  from = "var(--lime)",
  via = "var(--bone)",
  to = "var(--rose)",
  duration = 5,
  className,
  style,
  children,
  ...props
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        "bg-clip-text text-transparent",
        duration > 0 && "[background-size:200%_100%]",
        className,
      )}
      style={{
        backgroundImage: `linear-gradient(90deg, ${from}, ${via}, ${to}, ${via}, ${from})`,
        animation: duration > 0 ? `nyra-gt ${duration}s linear infinite` : undefined,
        ...style,
      }}
      {...props}
    >
      <style>{`@keyframes nyra-gt { to { background-position: 200% 0; } }`}</style>
      {children}
    </Tag>
  );
}
