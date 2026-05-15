"use client";

import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type VideoHeroProps = {
  src: string;
  poster?: string;
  children: ReactNode;
  className?: string;
  /** Overlay strength (0–1) over the video for legibility. */
  overlay?: number;
};

/**
 * Hero with a muted, looping background video. The overlay is a vertical
 * gradient anchored at the bottom so text remains legible regardless of
 * the video's average luminance.
 */
export function VideoHero({
  src,
  poster,
  children,
  className,
  overlay = 0.55,
}: VideoHeroProps) {
  return (
    <section className={cn("relative isolate overflow-hidden", className)}>
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: `linear-gradient(to top, color-mix(in oklab, var(--background) ${
            overlay * 100
          }%, transparent) 0%, color-mix(in oklab, var(--background) ${
            overlay * 50
          }%, transparent) 60%, transparent 100%)`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-1/3"
        style={{
          background:
            "linear-gradient(to top, color-mix(in oklab, var(--accent) 14%, transparent) 0%, transparent 100%)",
        }}
      />
      {children}
    </section>
  );
}
