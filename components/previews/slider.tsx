"use client";

import { useState } from "react";

import { Slider } from "@/components/ui/form/slider";

export default function SliderPreview() {
  const [budget, setBudget] = useState(60);
  const [opacity, setOpacity] = useState(0.4);
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="flex w-full max-w-md flex-col gap-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              Monthly budget
            </span>
            <span className="font-mono text-sm">${budget}</span>
          </div>
          <Slider
            value={budget}
            onChange={setBudget}
            min={0}
            max={200}
            step={5}
            formatValue={(v) => `$${v}`}
          />
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em] text-foreground-muted">
              Accent halo opacity
            </span>
            <span className="font-mono text-sm">{Math.round(opacity * 100)}%</span>
          </div>
          <Slider
            value={opacity}
            onChange={setOpacity}
            min={0}
            max={1}
            step={0.05}
            formatValue={(v) => `${Math.round(v * 100)}%`}
          />
        </div>
      </div>
    </div>
  );
}
