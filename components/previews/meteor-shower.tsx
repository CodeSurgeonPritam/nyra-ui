"use client";

import { MeteorShower } from "@/components/ui/background/meteor-shower";

export default function MeteorShowerPreview() {
  return (
    <div className="relative flex h-full min-h-[280px] w-full items-center justify-center overflow-hidden">
      <MeteorShower count={20} />
      <h3 className="relative font-serif text-4xl italic">A quiet rain.</h3>
    </div>
  );
}
