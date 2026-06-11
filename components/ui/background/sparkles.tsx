"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

type SparklesProps = {
  count?: number;
  className?: string;
  /** Tailwind class for the sparkle color (uses currentColor). Default: text-accent. */
  colorClassName?: string;
};

type Sparkle = {
  id: number;
  left: number;
  top: number;
  size: number;
  delay: number;
  duration: number;
  repeatDelay: number;
};

export function Sparkles({
  count = 28,
  className,
  colorClassName = "text-accent",
}: SparklesProps) {
  // Generate sparkle positions after mount so server-rendered HTML (empty)
  // matches the client's first paint — then fill in real positions. Avoids
  // a Math.random()-driven hydration mismatch.
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    setSparkles(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 4 + Math.random() * 12,
        delay: Math.random() * 4,
        duration: 1.6 + Math.random() * 2.4,
        repeatDelay: Math.random() * 2,
      })),
    );
  }, [count]);

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        colorClassName,
        className,
      )}
    >
      {sparkles.map((s) => (
        <motion.span
          key={s.id}
          className="absolute"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: s.size,
            height: s.size,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: "easeInOut",
          }}
        >
          <Star size={s.size} />
        </motion.span>
      ))}
    </div>
  );
}

function Star({ size }: { size: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0 C12.6 6 18 11.4 24 12 C18 12.6 12.6 18 12 24 C11.4 18 6 12.6 0 12 C6 11.4 11.4 6 12 0 Z" />
    </svg>
  );
}
