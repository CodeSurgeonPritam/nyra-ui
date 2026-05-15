"use client";

import { VideoHero } from "@/components/ui/hero/video-hero";

export default function VideoHeroPreview() {
  return (
    <VideoHero
      className="h-full w-full"
      src="https://cdn.coverr.co/videos/coverr-lights-on-the-water-7218/1080p.mp4"
      poster="https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=1200&auto=format&fit=crop"
    >
      <div className="flex h-full min-h-[280px] w-full flex-col items-start justify-end gap-3 p-10">
        <span className="text-[10px] uppercase tracking-[0.18em] text-bone/80">
          Looping background
        </span>
        <h3 className="font-serif text-4xl leading-tight text-bone italic">
          Cinema, in a section tag.
        </h3>
      </div>
    </VideoHero>
  );
}
