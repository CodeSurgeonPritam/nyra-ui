"use client";

import { cn } from "@/lib/utils";

type SkeletonCardProps = {
  className?: string;
  /** Number of body lines (paragraph rows) to render. */
  lines?: number;
  /** Render a title block above the body lines. */
  hasTitle?: boolean;
  /** Render a leading media block (e.g. for image cards). */
  hasMedia?: boolean;
};

/**
 * Loading placeholder. Combines an opacity pulse with a sweeping
 * gradient highlight — together they read as "loading" rather than
 * "broken layout." Respects `prefers-reduced-motion` by holding the
 * mid-pulse state instead of animating.
 */
export function SkeletonCard({
  className,
  lines = 3,
  hasTitle = true,
  hasMedia = false,
}: SkeletonCardProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label="Loading"
      className={cn(
        "flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5",
        className,
      )}
    >
      <style>{`
        @keyframes nyra-skel-pulse {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 0.95; }
        }
        @keyframes nyra-skel-sweep {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(220%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .nyra-skel { animation: none !important; opacity: 0.75 !important; }
          .nyra-skel-sweep { display: none; }
        }
      `}</style>

      {hasMedia && <SkeletonBlock className="aspect-video w-full rounded-md" />}
      {hasTitle && <SkeletonBlock className="h-5 w-2/3 rounded" />}

      <div className="flex flex-col gap-2">
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBlock
            key={i}
            className={cn("h-3 rounded", i === lines - 1 ? "w-5/6" : "w-full")}
          />
        ))}
      </div>
    </div>
  );
}

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "nyra-skel relative overflow-hidden bg-foreground/[0.06]",
        className,
      )}
      style={{ animation: "nyra-skel-pulse 1.6s ease-in-out infinite" }}
    >
      <span
        aria-hidden
        className="nyra-skel-sweep absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, color-mix(in oklab, var(--foreground) 9%, transparent) 50%, transparent 100%)",
          animation: "nyra-skel-sweep 1.6s ease-in-out infinite",
        }}
      />
    </div>
  );
}
