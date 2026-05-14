/**
 * Inline font loader for `opengraph-image` routes.
 *
 * Satori (the engine behind Next.js's ImageResponse) needs TTF/OTF data.
 * Rather than hard-coding gstatic URLs (which rotate as Google rebuilds
 * fonts), we hit the Google Fonts CSS API and grep out the current TTF
 * URL. Results are memoized in-process for a free across-route cache.
 *
 * Server-only.
 */

import "server-only";

type FontKey = "serif" | "serif-italic" | "mono";

const FAMILIES: Record<FontKey, { name: string; query: string }> = {
  serif: { name: "Instrument Serif", query: "Instrument+Serif:ital,wght@0,400" },
  "serif-italic": {
    name: "Instrument Serif",
    query: "Instrument+Serif:ital,wght@1,400",
  },
  mono: { name: "JetBrains Mono", query: "JetBrains+Mono:wght@400" },
};

const cache = new Map<FontKey, ArrayBuffer>();

export async function loadOgFont(key: FontKey): Promise<ArrayBuffer> {
  const cached = cache.get(key);
  if (cached) return cached;

  const { query } = FAMILIES[key];
  const cssUrl = `https://fonts.googleapis.com/css2?family=${query}&display=swap`;

  const cssRes = await fetch(cssUrl, {
    // Default User-Agent returns woff2 (which Satori can't always read);
    // an older UA gets us TTF, which Satori always accepts.
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_7; en-US) AppleWebKit/525.27.1 (KHTML, like Gecko) Version/3.2.1 Safari/525.27.1",
    },
  });
  if (!cssRes.ok) {
    throw new Error(`Google Fonts CSS fetch failed (${cssRes.status}) for ${key}`);
  }
  const css = await cssRes.text();
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)\s+format\('(?:truetype|opentype)'\)/);
  if (!match) {
    throw new Error(`Couldn't find TTF URL for ${key} in Google Fonts CSS`);
  }

  const fontRes = await fetch(match[1]);
  if (!fontRes.ok) {
    throw new Error(`Font fetch failed (${fontRes.status}) for ${key}`);
  }
  const buf = await fontRes.arrayBuffer();
  cache.set(key, buf);
  return buf;
}
