/**
 * Server-only Shiki helper.
 *
 * Caches a single highlighter across requests so each component page
 * doesn't pay the bundle-themes-and-grammars cost from scratch. Emits
 * the dual-theme output (vitesse-black / vitesse-light) consumed by the
 * `.nyra-code` CSS bridge in globals.css.
 */

import "server-only";
import { createHighlighter, type Highlighter } from "shiki";

export type CodeLang = "tsx" | "css" | "bash";

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["vesper", "github-light"],
      langs: ["tsx", "css", "bash"],
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: CodeLang = "tsx") {
  const h = await getHighlighter();
  return h.codeToHtml(code.trimEnd(), {
    lang,
    themes: { dark: "vesper", light: "github-light" },
    defaultColor: false,
  });
}
