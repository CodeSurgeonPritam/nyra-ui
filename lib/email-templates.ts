/**
 * Welcome series templates — inline HTML so we don't pull `react-email`
 * just yet. Each template returns { subject, html, text } and references
 * `${baseUrl}` for any links so previews work in dev too.
 *
 * When the catalog of templates grows past three, migrate to `react-email`
 * and render these as JSX components.
 */

type Template = {
  subject: string;
  html: string;
  text: string;
};

const SHELL_STYLES = `
  font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, monospace;
  background: #0a0a0a;
  color: #f5f3ee;
  padding: 32px 24px;
  max-width: 560px;
  margin: 0 auto;
  border: 1px solid #1f1f1d;
  border-radius: 16px;
`;

const HEADING_STYLES = `
  font-family: 'Instrument Serif', Georgia, serif;
  font-style: italic;
  font-size: 36px;
  line-height: 1.05;
  letter-spacing: -0.01em;
  margin: 0 0 16px;
  color: #f5f3ee;
`;

const ACCENT = "#c8ff3c";
const MUTED = "#6b6b66";

function shell(body: string): string {
  return `<!doctype html>
<html lang="en">
  <head><meta charset="utf-8"></head>
  <body style="margin:0;background:#000;padding:32px 16px">
    <div style="${SHELL_STYLES}">
      <div style="font-size:11px;letter-spacing:0.18em;text-transform:uppercase;color:${MUTED};margin-bottom:24px">
        <span style="color:${ACCENT}">✦</span> Nyra
      </div>
      ${body}
      <hr style="border:none;border-top:1px solid #1f1f1d;margin:32px 0">
      <p style="font-size:11px;color:${MUTED};margin:0">
        You're receiving this because you signed up at nyra.dev.
        <a href="{{unsubscribe}}" style="color:${MUTED};text-decoration:underline">Unsubscribe</a>.
      </p>
    </div>
  </body>
</html>`;
}

export function welcomeEmail(baseUrl: string): Template {
  const subject = "Welcome to Nyra";
  const html = shell(`
    <h1 style="${HEADING_STYLES}">Welcome to Nyra.</h1>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee">
      You're in. Here's the short tour.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0 8px">
      Nyra is a copy-paste component library with electric lime, editorial
      type, and motion that means something. Free for the bulk of the catalog;
      <a href="${baseUrl}/pricing" style="color:${ACCENT}">Pro</a> for the
      parts that take a weekend.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0 16px">
      Three places to start:
    </p>
    <ul style="font-size:14px;line-height:1.7;color:#f5f3ee;padding-left:18px">
      <li><a href="${baseUrl}/components" style="color:${ACCENT}">The catalog</a> — 40 components at launch, more weekly.</li>
      <li><a href="${baseUrl}/docs/installation" style="color:${ACCENT}">Installation</a> — copy-paste in two minutes.</li>
      <li><a href="${baseUrl}/blog/why-nyra" style="color:${ACCENT}">Why Nyra exists</a> — the bet behind the brand.</li>
    </ul>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0 0">
      We'll send you two more emails this week — one on theming, one on
      motion. After that, releases and writing only.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0 0">
      — Pritam
    </p>
  `);
  const text = `Welcome to Nyra.

You're in. Three places to start:

The catalog — ${baseUrl}/components
Installation — ${baseUrl}/docs/installation
Why Nyra exists — ${baseUrl}/blog/why-nyra

We'll send two more emails this week. After that, releases and writing only.

— Pritam`;
  return { subject, html, text };
}

export function themingEmail(baseUrl: string): Template {
  const subject = "How Nyra theming actually works";
  const html = shell(`
    <h1 style="${HEADING_STYLES}">Tokens, not themes.</h1>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee">
      Quick note about how to make Nyra look like <em>your</em> brand instead
      of ours.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0">
      Every Nyra component reads from a small set of CSS variables. Override
      one and every component picks it up. No <code style="background:#1f1f1d;padding:2px 6px;border-radius:4px;color:${ACCENT}">ThemeProvider</code>,
      no config file, no rebuild.
    </p>
    <pre style="background:#111110;border:1px solid #1f1f1d;border-radius:8px;padding:16px;font-size:12px;line-height:1.55;color:#f5f3ee;overflow-x:auto">:root {
  --accent: #c8ff3c;   /* swap this for your brand */
  --background: #0a0a0a;
  --foreground: #f5f3ee;
}</pre>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0">
      That's most of it. <a href="${baseUrl}/docs/theming" style="color:${ACCENT}">The theming guide</a>
      has the full token list and a worked example.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0">
      — Pritam
    </p>
  `);
  const text = `Tokens, not themes.

Every Nyra component reads from CSS variables. Override one and every
component picks it up.

:root {
  --accent: #c8ff3c;
  --background: #0a0a0a;
  --foreground: #f5f3ee;
}

Full guide: ${baseUrl}/docs/theming

— Pritam`;
  return { subject, html, text };
}

export function proPitchEmail(baseUrl: string): Template {
  const subject = "What's in Nyra Pro";
  const html = shell(`
    <h1 style="${HEADING_STYLES}">When free isn't enough.</h1>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee">
      The free catalog covers most landing-page needs. Pro is for the parts
      that take a weekend.
    </p>
    <ul style="font-size:14px;line-height:1.7;color:#f5f3ee;padding-left:18px;margin:24px 0">
      <li>Every Pro component (10 at launch, more shipping monthly)</li>
      <li>Full-page templates — drop-in landings, SaaS pages, portfolios</li>
      <li>Lifetime updates, one-time payment</li>
      <li>Commercial license, priority Discord support</li>
    </ul>
    <p style="margin:24px 0">
      <a href="${baseUrl}/pricing" style="display:inline-block;background:${ACCENT};color:#0a0a0a;padding:12px 20px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:500">Get Nyra Pro →</a>
    </p>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0 0">
      That's it for the welcome series. From here on you only hear from us
      when something ships.
    </p>
    <p style="font-size:14px;line-height:1.6;color:#f5f3ee;margin:24px 0 0">
      — Pritam
    </p>
  `);
  const text = `When free isn't enough.

Pro includes:
• Every Pro component (10 at launch, more monthly)
• Full-page templates
• Lifetime updates, one-time payment
• Commercial license, priority Discord support

Get Pro: ${baseUrl}/pricing

— Pritam`;
  return { subject, html, text };
}
