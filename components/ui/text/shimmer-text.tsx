"use client";

import { type ComponentPropsWithoutRef, type ElementType } from "react";

import { cn } from "@/lib/utils";

type ShimmerTextOwnProps = {
  as?: ElementType;
  /** Loop duration in seconds. */
  duration?: number;
  /** The "base" color the shimmer travels across. */
  baseColor?: string;
  /** The traveling highlight color. */
  highlight?: string;
};

type ShimmerTextProps = ShimmerTextOwnProps &
  Omit<ComponentPropsWithoutRef<"span">, keyof ShimmerTextOwnProps>;

/**
 * Text with a specular highlight that travels across, looping. Backed by
 * a single linear-gradient + background-position animation — no JS in the
 * hot path.
 */
export function ShimmerText({
  as: Tag = "span",
  duration = 3,
  baseColor = "var(--foreground-muted)",
  highlight = "var(--foreground)",
  className,
  style,
  children,
  ...props
}: ShimmerTextProps) {
  return (
    <Tag
      className={cn("bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 0%, ${baseColor} 40%, ${highlight} 50%, ${baseColor} 60%, ${baseColor} 100%)`,
        backgroundSize: "200% 100%",
        animation: `nyra-shimmer-text ${duration}s linear infinite`,
        ...style,
      }}
      {...props}
    >
      <style>{`@keyframes nyra-shimmer-text { to { background-position: -200% 0; } }`}</style>
      {children}
    </Tag>
  );
}
