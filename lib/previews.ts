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
  vortex: dynamic(() => import("@/components/previews/vortex")),
  "rainbow-button": dynamic(
    () => import("@/components/previews/rainbow-button"),
  ),
  "confetti-button": dynamic(
    () => import("@/components/previews/confetti-button"),
  ),
  "expandable-card": dynamic(
    () => import("@/components/previews/expandable-card"),
  ),
  "stack-card": dynamic(() => import("@/components/previews/stack-card")),
  "bento-grid-card": dynamic(
    () => import("@/components/previews/bento-grid-card"),
  ),
  "scroll-reveal-text": dynamic(
    () => import("@/components/previews/scroll-reveal-text"),
  ),
  "video-hero": dynamic(() => import("@/components/previews/video-hero")),
  "animated-grid-hero": dynamic(
    () => import("@/components/previews/animated-grid-hero"),
  ),
  "split-screen-hero": dynamic(
    () => import("@/components/previews/split-screen-hero"),
  ),
  "resizable-navbar": dynamic(
    () => import("@/components/previews/resizable-navbar"),
  ),
  sidebar: dynamic(() => import("@/components/previews/sidebar")),
  "multi-step-form": dynamic(
    () => import("@/components/previews/multi-step-form"),
  ),
  "file-upload": dynamic(() => import("@/components/previews/file-upload")),
  "animated-textarea": dynamic(
    () => import("@/components/previews/animated-textarea"),
  ),
  combobox: dynamic(() => import("@/components/previews/combobox")),
  "stat-counter": dynamic(() => import("@/components/previews/stat-counter")),
  "comparison-table": dynamic(
    () => import("@/components/previews/comparison-table"),
  ),
  "logo-cloud": dynamic(() => import("@/components/previews/logo-cloud")),
  "pulse-button": dynamic(() => import("@/components/previews/pulse-button")),
  "scale-button": dynamic(() => import("@/components/previews/scale-button")),
  "arrow-button": dynamic(() => import("@/components/previews/arrow-button")),
  "loading-button": dynamic(
    () => import("@/components/previews/loading-button"),
  ),
  tooltip: dynamic(() => import("@/components/previews/tooltip")),
  "flip-card": dynamic(() => import("@/components/previews/flip-card")),
  "shine-card": dynamic(() => import("@/components/previews/shine-card")),
  "reveal-card": dynamic(() => import("@/components/previews/reveal-card")),
  "skeleton-card": dynamic(
    () => import("@/components/previews/skeleton-card"),
  ),
  "stagger-group": dynamic(
    () => import("@/components/previews/stagger-group"),
  ),
  "lift-button": dynamic(() => import("@/components/previews/lift-button")),
  "glow-button": dynamic(() => import("@/components/previews/glow-button")),
  "border-draw-button": dynamic(
    () => import("@/components/previews/border-draw-button"),
  ),
  "fill-sweep-button": dynamic(
    () => import("@/components/previews/fill-sweep-button"),
  ),
  "text-swap-button": dynamic(
    () => import("@/components/previews/text-swap-button"),
  ),
  "shake-button": dynamic(() => import("@/components/previews/shake-button")),
  "ripple-button": dynamic(
    () => import("@/components/previews/ripple-button"),
  ),
  "animated-nav-link": dynamic(
    () => import("@/components/previews/animated-nav-link"),
  ),
  breadcrumbs: dynamic(() => import("@/components/previews/breadcrumbs")),
  "hamburger-button": dynamic(
    () => import("@/components/previews/hamburger-button"),
  ),
  "search-expand": dynamic(
    () => import("@/components/previews/search-expand"),
  ),
  "auto-hide-navbar": dynamic(
    () => import("@/components/previews/auto-hide-navbar"),
  ),
  "dropdown-menu": dynamic(
    () => import("@/components/previews/dropdown-menu"),
  ),
  "mega-menu": dynamic(() => import("@/components/previews/mega-menu")),
  "mobile-drawer": dynamic(
    () => import("@/components/previews/mobile-drawer"),
  ),
};

export function getPreview(slug: string): PreviewLoader | undefined {
  return previews[slug];
}
