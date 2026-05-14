/**
 * Dynamic preview map.
 *
 * Keyed by registry slug. Importing this module gives you the dynamic
 * loader, so the catalog grid can mount previews lazily and the detail
 * page can server-render the right one without bundling all of them.
 */

import dynamic from "next/dynamic";
import type { ComponentType } from "react";

type PreviewLoader = ComponentType;

export const previews: Record<string, PreviewLoader> = {
  "magnetic-button": dynamic(
    () => import("@/components/previews/magnetic-button"),
  ),
  "shimmer-button": dynamic(
    () => import("@/components/previews/shimmer-button"),
  ),
  "aurora-background": dynamic(
    () => import("@/components/previews/aurora-background"),
  ),
  sparkles: dynamic(() => import("@/components/previews/sparkles")),
  "tilt-card": dynamic(() => import("@/components/previews/tilt-card")),
  "glow-card": dynamic(() => import("@/components/previews/glow-card")),
  "word-reveal": dynamic(() => import("@/components/previews/word-reveal")),
  "number-ticker": dynamic(
    () => import("@/components/previews/number-ticker"),
  ),
  "gradient-text": dynamic(
    () => import("@/components/previews/gradient-text"),
  ),
  marquee: dynamic(() => import("@/components/previews/marquee")),
  "spotlight-hero": dynamic(
    () => import("@/components/previews/spotlight-hero"),
  ),
  "animated-grid": dynamic(
    () => import("@/components/previews/animated-grid"),
  ),
  "floating-dock": dynamic(
    () => import("@/components/previews/floating-dock"),
  ),
  "border-beam-button": dynamic(
    () => import("@/components/previews/border-beam-button"),
  ),
  "pricing-card": dynamic(
    () => import("@/components/previews/pricing-card"),
  ),
  "meteor-shower": dynamic(
    () => import("@/components/previews/meteor-shower"),
  ),
  "beams-of-light": dynamic(
    () => import("@/components/previews/beams-of-light"),
  ),
  "hover-lift-card": dynamic(
    () => import("@/components/previews/hover-lift-card"),
  ),
  "typing-animation": dynamic(
    () => import("@/components/previews/typing-animation"),
  ),
  "shimmer-text": dynamic(() => import("@/components/previews/shimmer-text")),
  "animated-tabs": dynamic(
    () => import("@/components/previews/animated-tabs"),
  ),
};

export function getPreview(slug: string): PreviewLoader | undefined {
  return previews[slug];
}
