"use client";

import { cn } from "@/lib/utils";

type GlitchTextProps = {
  children: string;
  className?: string;
  /** Glitch continuously (`always`) or only while hovered (`hover`). */
  trigger?: "always" | "hover";
};

/**
 * RGB-channel-split glitch. Two duplicated overlays — one rose-tinted,
 * one accent-tinted — clip-path-jump across the text. Heavy effect; use
 * sparingly. Honors prefers-reduced-motion.
 */
export function GlitchText({
  children,
  className,
  trigger = "hover",
}: GlitchTextProps) {
  const always = trigger === "always";
  return (
    <span
      className={cn(
        "group relative inline-block whitespace-nowrap",
        className,
      )}
    >
      <style>{`
        @keyframes nyra-glitch-r {
          0%, 100% { clip-path: inset(85% 0 0% 0); transform: translate(0, 0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 0); }
          40% { clip-path: inset(45% 0 30% 0); transform: translate(2px, 0); }
          60% { clip-path: inset(70% 0 10% 0); transform: translate(-1px, 1px); }
          80% { clip-path: inset(15% 0 70% 0); transform: translate(2px, -1px); }
        }
        @keyframes nyra-glitch-b {
          0%, 100% { clip-path: inset(0% 0 85% 0); transform: translate(0, 0); }
          25% { clip-path: inset(35% 0 50% 0); transform: translate(2px, 0); }
          50% { clip-path: inset(55% 0 25% 0); transform: translate(-2px, 1px); }
          75% { clip-path: inset(10% 0 75% 0); transform: translate(1px, -1px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nyra-glitch-layer { animation: none !important; opacity: 0 !important; }
        }
      `}</style>
      <span className="relative z-10">{children}</span>
      <span
        aria-hidden
        className={cn(
          "nyra-glitch-layer pointer-events-none absolute inset-0 text-rose mix-blend-screen transition-opacity duration-200",
          always
            ? "opacity-100 [animation:nyra-glitch-r_1.4s_steps(2,end)_infinite]"
            : "opacity-0 group-hover:opacity-100 group-hover:[animation:nyra-glitch-r_1.4s_steps(2,end)_infinite]",
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "nyra-glitch-layer pointer-events-none absolute inset-0 text-accent mix-blend-screen transition-opacity duration-200",
          always
            ? "opacity-100 [animation:nyra-glitch-b_1.6s_steps(2,end)_infinite]"
            : "opacity-0 group-hover:opacity-100 group-hover:[animation:nyra-glitch-b_1.6s_steps(2,end)_infinite]",
        )}
      >
        {children}
      </span>
    </span>
  );
}
