"use client";

import { Children, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  className?: string;
  /** Duration in seconds for one full loop. Lower = faster. */
  speed?: number;
  /** Reverse direction. */
  reverse?: boolean;
  /** Pause animation on hover. */
  pauseOnHover?: boolean;
  /** Gap between items as a CSS length. */
  gap?: string;
};

export function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
  pauseOnHover = true,
  gap = "2rem",
}: MarqueeProps) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className,
      )}
    >
      <style>{`
        @keyframes nyra-marquee { to { transform: translateX(-50%); } }
        @keyframes nyra-marquee-r { to { transform: translateX(50%); } }
      `}</style>
      <div
        className={cn(
          "flex w-max shrink-0",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
        style={{
          gap,
          animation: `${reverse ? "nyra-marquee-r" : "nyra-marquee"} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center" style={{ gap }}>
          {items}
        </div>
        <div aria-hidden className="flex shrink-0 items-center" style={{ gap }}>
          {items}
        </div>
      </div>
    </div>
  );
}
