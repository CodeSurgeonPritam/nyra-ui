"use client";

import { useEffect, useState } from "react";

import { Odometer } from "@/components/ui/text/odometer";

export default function OdometerPreview() {
  const [count, setCount] = useState(10248);

  useEffect(() => {
    const t = window.setInterval(() => {
      setCount((c) => c + Math.floor(Math.random() * 7) + 1);
    }, 1400);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 p-10">
      <Odometer
        value={count}
        className="font-serif text-6xl tracking-tight"
        digits={6}
      />
      <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
        GitHub stars · ticks every second
      </span>
    </div>
  );
}
