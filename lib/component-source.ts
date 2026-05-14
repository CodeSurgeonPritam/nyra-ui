/**
 * Server-only reader for component source files.
 *
 * The detail page renders the actual `components/ui/<slug>.tsx` file as
 * the code block. Reading from disk (rather than baking strings into the
 * registry) keeps the registry tiny and means the code you see is exactly
 * the code you'd copy — no drift possible.
 */

import "server-only";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function readComponentFile(file: string): Promise<string> {
  // Allow a single nested folder (e.g. "button/magnetic-button.tsx") but
  // reject anything that tries to climb out of `components/ui/`.
  if (file.includes("..") || file.startsWith("/")) {
    throw new Error(`Refusing unsafe path: ${file}`);
  }
  const safe = file.replace(/[^a-zA-Z0-9._\-/]/g, "");
  const base = path.join(process.cwd(), "components", "ui");
  const full = path.resolve(base, safe);
  if (!full.startsWith(base + path.sep)) {
    throw new Error(`Refusing path outside components/ui: ${file}`);
  }
  return readFile(full, "utf8");
}
