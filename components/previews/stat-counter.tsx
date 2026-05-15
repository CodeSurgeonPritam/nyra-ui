"use client";

import { StatCounter } from "@/components/ui/data/stat-counter";

export default function StatCounterPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCounter label="Components" value={40} delta={18.4} />
        <StatCounter label="GitHub Stars" value={10248} delta={32.1} />
        <StatCounter label="MRR" value={5200} prefix="$" delta={-4.2} />
      </div>
    </div>
  );
}
