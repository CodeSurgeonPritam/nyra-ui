/**
 * Nyra component registry — the single source of truth for the catalog.
 * Drives the grid, the detail page, search, and (later) the Nyra CLI.
 *
 * Pure metadata, no React imports, so it can be consumed from server and
 * client components without ballooning bundles. Previews are mapped via
 * dynamic imports in `lib/previews.tsx`; raw source is read from disk by
 * `lib/component-source.ts` (server-only).
 */

export type Category =
  | "background"
  | "card"
  | "button"
  | "text"
  | "hero"
  | "nav"
  | "form"
  | "data";

export type NyraComponent = {
  slug: string;
  name: string;
  description: string;
  category: Category;
  tags: string[];
  pro: boolean;
  /** Source files this component ships, relative to `components/ui/`. */
  files: string[];
  /** npm packages the user must install. */
  dependencies: string[];
  /** ISO date string — drives "new" badges and sort order. */
  createdAt: string;
};

export const categories: { id: Category; label: string }[] = [
  { id: "background", label: "Backgrounds" },
  { id: "card", label: "Cards" },
  { id: "button", label: "Buttons" },
  { id: "text", label: "Text Effects" },
  { id: "hero", label: "Heroes" },
  { id: "nav", label: "Navigation" },
  { id: "form", label: "Forms" },
  { id: "data", label: "Data Display" },
];

export const registry: NyraComponent[] = [
  {
    slug: "magnetic-button",
    name: "Magnetic Button",
    description: "A button that pulls toward the cursor on hover.",
    category: "button",
    tags: ["interactive", "animated", "cursor"],
    pro: false,
    files: ["button/magnetic-button.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "shimmer-button",
    name: "Shimmer Button",
    description: "A button with a traveling specular highlight on hover.",
    category: "button",
    tags: ["animated", "subtle"],
    pro: false,
    files: ["button/shimmer-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "aurora-background",
    name: "Aurora Background",
    description:
      "A drifting, layered radial-gradient backdrop in Nyra's accent palette.",
    category: "background",
    tags: ["animated", "ambient"],
    pro: false,
    files: ["background/aurora-background.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "sparkles",
    name: "Sparkles",
    description: "Twinkling four-point stars scattered across a region.",
    category: "background",
    tags: ["animated", "decorative"],
    pro: false,
    files: ["background/sparkles.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "tilt-card",
    name: "Tilt Card",
    description: "A card that tilts in 3D toward the pointer.",
    category: "card",
    tags: ["interactive", "3d"],
    pro: false,
    files: ["card/tilt-card.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "glow-card",
    name: "Glow Card",
    description: "A card with a rotating conic-gradient accent border on hover.",
    category: "card",
    tags: ["animated", "border"],
    pro: true,
    files: ["card/glow-card.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "word-reveal",
    name: "Word Reveal",
    description: "Scroll-linked text that fades in one word at a time.",
    category: "text",
    tags: ["scroll", "animated", "typography"],
    pro: false,
    files: ["text/word-reveal.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "number-ticker",
    name: "Number Ticker",
    description: "A count-up number animation that fires on viewport entry.",
    category: "text",
    tags: ["animated", "data"],
    pro: false,
    files: ["text/number-ticker.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "gradient-text",
    name: "Gradient Text",
    description:
      "Animated linear-gradient text fill that loops through Nyra's lime → rose palette.",
    category: "text",
    tags: ["animated", "gradient", "typography"],
    pro: false,
    files: ["text/gradient-text.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "marquee",
    name: "Marquee",
    description:
      "Seamless infinite horizontal scroll for logos or testimonials, with hover pause.",
    category: "data",
    tags: ["animated", "scroll", "logos"],
    pro: true,
    files: ["data/marquee.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "spotlight-hero",
    name: "Spotlight Hero",
    description:
      "Hero section with a soft, spring-smoothed spotlight that follows the cursor.",
    category: "hero",
    tags: ["interactive", "cursor", "animated"],
    pro: false,
    files: ["hero/spotlight-hero.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "animated-grid",
    name: "Animated Grid",
    description: "A drifting square grid with a radial fade, pure CSS.",
    category: "background",
    tags: ["animated", "ambient", "css-only"],
    pro: false,
    files: ["background/animated-grid.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "floating-dock",
    name: "Floating Dock",
    description:
      "macOS-style dock with icons that magnify as the cursor approaches.",
    category: "nav",
    tags: ["interactive", "cursor", "animated"],
    pro: true,
    files: ["nav/floating-dock.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "border-beam-button",
    name: "Border Beam Button",
    description:
      "Button with a continuous accent beam traveling around the border.",
    category: "button",
    tags: ["animated", "border", "css-only"],
    pro: false,
    files: ["button/border-beam-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "pricing-card",
    name: "Pricing Card",
    description:
      "Three-plan pricing grid with monthly/yearly toggle and a featured plan accent.",
    category: "data",
    tags: ["interactive", "pricing"],
    pro: true,
    files: ["data/pricing-card.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "meteor-shower",
    name: "Meteor Shower",
    description:
      "Diagonal meteor streaks falling across the page — randomized timing for a quiet sky.",
    category: "background",
    tags: ["animated", "ambient", "css-only"],
    pro: false,
    files: ["background/meteor-shower.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "beams-of-light",
    name: "Beams of Light",
    description: "Vertical accent beams that breathe in opacity, offset in time.",
    category: "background",
    tags: ["animated", "ambient", "css-only"],
    pro: false,
    files: ["background/beams-of-light.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "hover-lift-card",
    name: "Hover Lift Card",
    description:
      "Card that springs upward on hover and emits a soft accent halo beneath it.",
    category: "card",
    tags: ["interactive", "hover", "animated"],
    pro: false,
    files: ["card/hover-lift-card.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "typing-animation",
    name: "Typing Animation",
    description:
      "Typewriter reveal with a blinking accent caret. Respects prefers-reduced-motion.",
    category: "text",
    tags: ["animated", "typewriter", "a11y"],
    pro: false,
    files: ["text/typing-animation.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "shimmer-text",
    name: "Shimmer Text",
    description:
      "Heading text with a slow specular highlight traveling across the glyphs.",
    category: "text",
    tags: ["animated", "css-only", "typography"],
    pro: false,
    files: ["text/shimmer-text.tsx"],
    dependencies: [],
    createdAt: "2026-05-14",
  },
  {
    slug: "animated-tabs",
    name: "Animated Tabs",
    description:
      "Tab strip with a single sliding indicator that interpolates between tabs.",
    category: "nav",
    tags: ["animated", "interactive"],
    pro: false,
    files: ["nav/animated-tabs.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-14",
  },
  {
    slug: "vortex",
    name: "Vortex",
    description:
      "A slow rotating spiral made from two opposing conic-gradients. Pure CSS, edge-faded.",
    category: "background",
    tags: ["animated", "ambient", "css-only"],
    pro: false,
    files: ["background/vortex.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "rainbow-button",
    name: "Rainbow Button",
    description:
      "Pill button with a traveling multi-stop gradient anchored on Nyra's lime and rose.",
    category: "button",
    tags: ["animated", "gradient", "css-only"],
    pro: false,
    files: ["button/rainbow-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "confetti-button",
    name: "Confetti Button",
    description:
      "Button that bursts confetti from its center on every click.",
    category: "button",
    tags: ["animated", "interactive", "playful"],
    pro: true,
    files: ["button/confetti-button.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "expandable-card",
    name: "Expandable Card",
    description:
      "Click-to-expand card with a continuous height transition and rotating chevron.",
    category: "card",
    tags: ["interactive", "animated"],
    pro: false,
    files: ["card/expandable-card.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "stack-card",
    name: "Stack Card",
    description:
      "Tinder-style swipe stack with drag-to-dismiss and depth scaling.",
    category: "card",
    tags: ["interactive", "drag", "animated"],
    pro: true,
    files: ["card/stack-card.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "bento-grid-card",
    name: "Bento Grid Card",
    description:
      "Variable-span bento layout with a pointer-tracked accent halo on each cell.",
    category: "card",
    tags: ["layout", "interactive"],
    pro: true,
    files: ["card/bento-grid-card.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "scroll-reveal-text",
    name: "Scroll Reveal Text",
    description:
      "Word-by-word reveal driven by scroll progress — the phrase writes itself as you scroll.",
    category: "text",
    tags: ["scroll", "animated", "typography"],
    pro: false,
    files: ["text/scroll-reveal-text.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "video-hero",
    name: "Video Hero",
    description:
      "Hero with a muted, looping background video and a luminance-safe overlay.",
    category: "hero",
    tags: ["video", "media"],
    pro: false,
    files: ["hero/video-hero.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "animated-grid-hero",
    name: "Animated Grid Hero",
    description:
      "Hero shell pairing the drifting grid background with an accent halo bloom.",
    category: "hero",
    tags: ["animated", "ambient"],
    pro: false,
    files: ["hero/animated-grid-hero.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "split-screen-hero",
    name: "Split Screen Hero",
    description:
      "Two-column hero — editorial copy on one side, the visual that earns it on the other.",
    category: "hero",
    tags: ["layout", "responsive"],
    pro: true,
    files: ["hero/split-screen-hero.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "resizable-navbar",
    name: "Resizable Navbar",
    description:
      "Sticky top navbar that contracts on scroll: width pulls in, height shrinks, border curls to a pill.",
    category: "nav",
    tags: ["scroll", "animated", "responsive"],
    pro: false,
    files: ["nav/resizable-navbar.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "sidebar",
    name: "Sidebar",
    description:
      "Vertical sidebar that collapses to an icon rail. Labels fade out as the width contracts.",
    category: "nav",
    tags: ["interactive", "responsive"],
    pro: false,
    files: ["nav/sidebar.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "multi-step-form",
    name: "Multi-Step Form",
    description:
      "Multi-step form shell with progress bar, animated step transitions, and a completion state.",
    category: "form",
    tags: ["form", "animated", "interactive"],
    pro: true,
    files: ["form/multi-step-form.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "file-upload",
    name: "File Upload",
    description:
      "Drag-and-drop file zone with per-file previews, size limits, and remove controls.",
    category: "form",
    tags: ["form", "interactive", "drag"],
    pro: false,
    files: ["form/file-upload.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "animated-textarea",
    name: "Animated Textarea",
    description:
      "Auto-growing textarea with a floating label, focus glow, and a live character counter.",
    category: "form",
    tags: ["form", "animated", "a11y"],
    pro: false,
    files: ["form/animated-textarea.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "combobox",
    name: "Combobox",
    description:
      "Filterable, keyboard-navigable combobox. No Radix dep — safe to copy into any project.",
    category: "form",
    tags: ["form", "interactive", "a11y"],
    pro: false,
    files: ["form/combobox.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "stat-counter",
    name: "Stat Counter",
    description:
      "Animated metric tile: spring-eased number ticker and an optional trend arrow.",
    category: "data",
    tags: ["animated", "data"],
    pro: false,
    files: ["data/stat-counter.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "comparison-table",
    name: "Comparison Table",
    description:
      "Feature-comparison table for pricing tiers, with row groups and a featured column highlight.",
    category: "data",
    tags: ["pricing", "table"],
    pro: true,
    files: ["data/comparison-table.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "logo-cloud",
    name: "Logo Cloud",
    description:
      "Static grid of partner logos with low-opacity rest and full-opacity hover.",
    category: "data",
    tags: ["logos", "data"],
    pro: false,
    files: ["data/logo-cloud.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "pulse-button",
    name: "Pulse Button",
    description:
      "CTA with concentric accent rings that ripple outward on a loop — attention without flashing.",
    category: "button",
    tags: ["animated", "attention"],
    pro: false,
    files: ["button/pulse-button.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "scale-button",
    name: "Scale Button",
    description:
      "Spring-eased scale on hover and press. The iOS-style physical feel for any CTA.",
    category: "button",
    tags: ["animated", "hover", "spring"],
    pro: false,
    files: ["button/scale-button.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "arrow-button",
    name: "Arrow Button",
    description:
      "Link-style button with a growing underline and a sliding arrow on hover. Pure CSS.",
    category: "button",
    tags: ["hover", "css-only", "subtle"],
    pro: false,
    files: ["button/arrow-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "loading-button",
    name: "Loading Button",
    description:
      "Three-state button: idle → loading (spinner) → success (check) → idle. Async-aware.",
    category: "button",
    tags: ["state", "async", "animated"],
    pro: true,
    files: ["button/loading-button.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "tooltip",
    name: "Tooltip",
    description:
      "Hover and focus tooltip with directional placement, arrow notch, and accessible aria-describedby wiring.",
    category: "form",
    tags: ["hover", "a11y", "overlay"],
    pro: false,
    files: ["form/tooltip.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "flip-card",
    name: "Flip Card",
    description:
      "Front-to-back rotation reveal — perspective on the wrapper, preserve-3d on the inner. Hover or click trigger.",
    category: "card",
    tags: ["3d", "hover", "interactive"],
    pro: false,
    files: ["card/flip-card.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "shine-card",
    name: "Shine Card",
    description:
      "Diagonal specular streak sweeps across the surface on hover. Pure CSS — one pseudo-element, one transform.",
    category: "card",
    tags: ["hover", "css-only", "subtle"],
    pro: false,
    files: ["card/shine-card.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "reveal-card",
    name: "Reveal Card",
    description:
      "Image card that zooms its photo and fades description + CTA in from below on hover.",
    category: "card",
    tags: ["hover", "image", "editorial"],
    pro: true,
    files: ["card/reveal-card.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "skeleton-card",
    name: "Skeleton Card",
    description:
      "Loading placeholder with combined opacity pulse and a sweeping highlight. Respects prefers-reduced-motion.",
    category: "card",
    tags: ["loading", "a11y", "css-only"],
    pro: false,
    files: ["card/skeleton-card.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "stagger-group",
    name: "Stagger Group",
    description:
      "Wrapper that staggers the entrance animation of its direct children. Works for text, cards, list items.",
    category: "text",
    tags: ["animated", "layout", "utility"],
    pro: false,
    files: ["text/stagger-group.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "lift-button",
    name: "Lift Button",
    description:
      "Hover translates up with a tinted shadow, press returns to baseline. Pure CSS, tactile feel.",
    category: "button",
    tags: ["hover", "press", "css-only"],
    pro: false,
    files: ["button/lift-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "glow-button",
    name: "Glow Button",
    description:
      "Colored shadow halo blooms outward on hover. Animates `box-shadow` only — composes off the main thread.",
    category: "button",
    tags: ["hover", "css-only", "shadow"],
    pro: false,
    files: ["button/glow-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "border-draw-button",
    name: "Border Draw Button",
    description:
      "Outline button whose border draws itself in segment by segment on hover — like a marker tracing the edge.",
    category: "button",
    tags: ["hover", "animated", "css-only"],
    pro: false,
    files: ["button/border-draw-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "fill-sweep-button",
    name: "Fill Sweep Button",
    description:
      "Outline-at-rest pill whose accent fill sweeps in from a chosen edge. Text crossfades for contrast.",
    category: "button",
    tags: ["hover", "css-only", "directional"],
    pro: false,
    files: ["button/fill-sweep-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "text-swap-button",
    name: "Text Swap Button",
    description:
      "Label rolls vertically on hover — rest text slides out the top, hover text slides up from below.",
    category: "button",
    tags: ["hover", "animated", "css-only"],
    pro: false,
    files: ["button/text-swap-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "shake-button",
    name: "Shake Button",
    description:
      "Error-feedback oscillation, driven by an external boolean or click. Respects prefers-reduced-motion.",
    category: "button",
    tags: ["error", "animated", "form"],
    pro: false,
    files: ["button/shake-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "ripple-button",
    name: "Ripple Button",
    description:
      "Material-style click ripple — a circle expands and fades from each click point. Multiple ripples can stack.",
    category: "button",
    tags: ["interactive", "animated", "click"],
    pro: true,
    files: ["button/ripple-button.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "animated-nav-link",
    name: "Animated Nav Link",
    description:
      "Nav link primitive with two hover treatments — accent underline that scales in, or a soft pill background.",
    category: "nav",
    tags: ["hover", "css-only", "primitive"],
    pro: false,
    files: ["nav/animated-nav-link.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "breadcrumbs",
    name: "Breadcrumbs",
    description:
      "Accessible breadcrumb trail with chevron separators and an animated underline on hover.",
    category: "nav",
    tags: ["a11y", "hover"],
    pro: false,
    files: ["nav/breadcrumbs.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "hamburger-button",
    name: "Hamburger Button",
    description:
      "Three-bar icon that morphs into an X — top drops + rotates 45°, middle fades, bottom rises + rotates -45°.",
    category: "nav",
    tags: ["animated", "css-only", "a11y"],
    pro: false,
    files: ["nav/hamburger-button.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "search-expand",
    name: "Search Expand",
    description:
      "Icon button that springs open into a full search input. Collapses on Escape, blur, or close.",
    category: "nav",
    tags: ["interactive", "animated", "input"],
    pro: false,
    files: ["nav/search-expand.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "auto-hide-navbar",
    name: "Auto Hide Navbar",
    description:
      "Sticky navbar that slides out on scroll-down and returns on scroll-up. Hysteresis on the delta prevents flicker.",
    category: "nav",
    tags: ["scroll", "animated", "sticky"],
    pro: false,
    files: ["nav/auto-hide-navbar.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "dropdown-menu",
    name: "Dropdown Menu",
    description:
      "Click-triggered dropdown with a fade + slide reveal. Closes on outside click, Escape, or item selection.",
    category: "nav",
    tags: ["interactive", "animated", "a11y"],
    pro: false,
    files: ["nav/dropdown-menu.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "mega-menu",
    name: "Mega Menu",
    description:
      "Multi-column dropdown with a curtain-style clip-path reveal and an optional feature slot on the right.",
    category: "nav",
    tags: ["interactive", "animated", "layout"],
    pro: true,
    files: ["nav/mega-menu.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "mobile-drawer",
    name: "Mobile Drawer",
    description:
      "Side-anchored drawer with a fade-in backdrop. Locks body scroll while open; dismisses on Escape or backdrop click.",
    category: "nav",
    tags: ["overlay", "animated", "a11y"],
    pro: true,
    files: ["nav/mobile-drawer.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "fade-in-text",
    name: "Fade In Text",
    description:
      "Directional text entrance — fades from up, down, left, right, scale, or blur. Mount or viewport-triggered.",
    category: "text",
    tags: ["entrance", "animated", "primitive"],
    pro: false,
    files: ["text/fade-in-text.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "mask-reveal-text",
    name: "Mask Reveal Text",
    description:
      "Line-by-line curtain reveal — each line rises into view from behind an overflow mask, staggered.",
    category: "text",
    tags: ["entrance", "editorial", "animated"],
    pro: false,
    files: ["text/mask-reveal-text.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "scramble-text",
    name: "Scramble Text",
    description:
      "Decode-style reveal — characters tumble through a random charset and lock into place left to right.",
    category: "text",
    tags: ["animated", "interactive"],
    pro: true,
    files: ["text/scramble-text.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "glitch-text",
    name: "Glitch Text",
    description:
      "RGB-channel-split glitch. Rose and accent overlays clip-path-jump across the text. Hover or always-on.",
    category: "text",
    tags: ["animated", "css-only", "effect"],
    pro: false,
    files: ["text/glitch-text.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "word-rotator",
    name: "Word Rotator",
    description:
      "Cycles through a list of words in place — each rises from below, the previous slides out the top.",
    category: "text",
    tags: ["animated", "hero"],
    pro: false,
    files: ["text/word-rotator.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "odometer",
    name: "Odometer",
    description:
      "Digit-flip counter. Each digit lives in its own 0–9 column; the column springs up to the new value.",
    category: "text",
    tags: ["animated", "data", "numbers"],
    pro: true,
    files: ["text/odometer.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "highlight-text",
    name: "Highlight Text",
    description:
      "Marker-style highlight that paints in beneath the text. Hover, in-view, or always-on triggers.",
    category: "text",
    tags: ["hover", "css-only", "editorial"],
    pro: false,
    files: ["text/highlight-text.tsx"],
    dependencies: [],
    createdAt: "2026-05-15",
  },
  {
    slug: "input",
    name: "Input",
    description:
      "Single-line text input with a floating label, focus glow, and leading / trailing slots.",
    category: "form",
    tags: ["form", "animated", "a11y"],
    pro: false,
    files: ["form/input.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "otp-input",
    name: "OTP Input",
    description:
      "Multi-cell one-time-password input. Auto-advance, backspace step-back, paste-fill.",
    category: "form",
    tags: ["form", "auth", "animated"],
    pro: false,
    files: ["form/otp-input.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "switch",
    name: "Switch",
    description:
      "Animated on/off toggle. Spring-driven thumb, accent track when active.",
    category: "form",
    tags: ["form", "animated", "a11y"],
    pro: false,
    files: ["form/switch.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "checkbox",
    name: "Checkbox",
    description:
      "Checkbox with an animated stroke-drawn check tick. Keyboard-accessible.",
    category: "form",
    tags: ["form", "animated", "a11y"],
    pro: false,
    files: ["form/checkbox.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "radio-group",
    name: "Radio Group",
    description:
      "Segmented control or vertical-tile radio group with a sliding accent indicator.",
    category: "form",
    tags: ["form", "animated", "a11y"],
    pro: false,
    files: ["form/radio-group.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "slider",
    name: "Slider",
    description:
      "Range slider with a spring-driven thumb, click-to-jump track, and a value bubble on drag.",
    category: "form",
    tags: ["form", "animated", "a11y"],
    pro: false,
    files: ["form/slider.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "password-input",
    name: "Password Input",
    description:
      "Password field with a reveal toggle and a live strength meter (weak → strong).",
    category: "form",
    tags: ["form", "auth", "animated"],
    pro: true,
    files: ["form/password-input.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
  {
    slug: "tag-input",
    name: "Tag Input",
    description:
      "Multi-value chip input — type, press Enter to commit; backspace removes; paste splits on commas.",
    category: "form",
    tags: ["form", "animated", "interactive"],
    pro: true,
    files: ["form/tag-input.tsx"],
    dependencies: ["motion"],
    createdAt: "2026-05-15",
  },
];

export function adjacentEntries(slug: string) {
  const i = registry.findIndex((c) => c.slug === slug);
  if (i === -1) return { prev: undefined, next: undefined };
  return {
    prev: i > 0 ? registry[i - 1] : undefined,
    next: i < registry.length - 1 ? registry[i + 1] : undefined,
  };
}

export function getComponent(slug: string): NyraComponent | undefined {
  return registry.find((c) => c.slug === slug);
}

export function getCategoryLabel(id: Category): string {
  return categories.find((c) => c.id === id)?.label ?? id;
}

/** Categories that actually have components — used to filter the catalog chips. */
export function activeCategories(): { id: Category; label: string }[] {
  const used = new Set(registry.map((c) => c.category));
  return categories.filter((c) => used.has(c.id));
}
