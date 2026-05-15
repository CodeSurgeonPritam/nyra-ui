"use client";

import { RevealCard } from "@/components/ui/card/reveal-card";

export default function RevealCardPreview() {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <div className="grid w-full max-w-2xl grid-cols-2 gap-5">
        <RevealCard
          image="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=720&auto=format&fit=crop"
          alt="Aurora colors"
          title="Aurora"
          description="Drifting, layered radial-gradient backdrop in Nyra's accent palette."
          cta="Open →"
        />
        <RevealCard
          image="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=720&auto=format&fit=crop"
          alt="Night sky"
          title="Meteors"
          description="Diagonal meteor streaks falling across the page, randomized timing."
          cta="Open →"
        />
      </div>
    </div>
  );
}
