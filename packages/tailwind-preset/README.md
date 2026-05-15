# @nyra/tailwind-preset

Nyra's design tokens as a Tailwind v4 CSS preset. Drop-in for any Tailwind v4 + Next.js project.

## Install

```bash
pnpm add -D @nyra/tailwind-preset
```

## Use

In your app's global stylesheet, **after** `@import "tailwindcss"`:

```css
@import "tailwindcss";
@import "@nyra/tailwind-preset";
```

That gives you:

- Raw palette: `--ink`, `--bone`, `--muted`, `--lime`, `--lime-soft`, `--rose`, `--border-dark`, `--border-light`
- Semantic tokens: `--background`, `--foreground`, `--foreground-muted`, `--accent`, `--accent-foreground`, `--border`, `--surface`
- Tailwind utilities: `bg-background`, `text-accent`, `border-border`, `bg-surface`, etc.
- Light-theme override on `[data-theme="light"]`
- A `light:` variant for explicit light-mode-only utilities

## Rebrand in one variable

Want to use your own brand color instead of Nyra's lime? Override `--accent` in your CSS:

```css
:root {
  --accent: #5b8def;        /* your brand */
  --accent-foreground: #ffffff;
}
```

Every Nyra component picks up the change immediately — buttons, focus rings, badges, code-block selections.

## License

MIT
