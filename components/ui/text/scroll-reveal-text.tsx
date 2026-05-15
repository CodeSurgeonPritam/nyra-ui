"use client";

import { useRef, type ElementType } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

import { cn } from "@/lib/utils";

type ScrollRevealTextProps = {
  text: string;
  className?: string;
  as?: ElementType;
};

/**
 * Word-by-word reveal that fades each word in as it crosses a scroll
 * threshold. Each word receives its own slice of the scroll progress —
 * the result is a phrase that "writes itself" as the reader scrolls past.
 */
export function ScrollRevealText({
  text,
  className,
  as: Tag = "p",
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["start 0.85", "start 0.15"],
  });

  const words = text.split(/\s+/);

  return (
    <Tag
      ref={ref}
      className={cn(
        "flex flex-wrap gap-x-2 gap-y-1 font-serif text-3xl leading-tight sm:text-5xl",
        className,
      )}
    >
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
        >
          {word}
        </Word>
      ))}
    </Tag>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [10, 0]);
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  );
}
