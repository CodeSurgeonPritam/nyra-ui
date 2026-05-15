import { fetchIndex } from "../lib/registry.js";
import { log, c } from "../lib/output.js";

export async function listCommand() {
  log.title("Components in the Nyra registry");

  const entries = await fetchIndex();
  if (entries.length === 0) {
    log.warn("Registry is empty.");
    return;
  }

  // Group by category for readability.
  const byCategory = new Map<string, typeof entries>();
  for (const e of entries) {
    const arr = byCategory.get(e.category) ?? [];
    arr.push(e);
    byCategory.set(e.category, arr);
  }

  for (const [category, items] of byCategory) {
    console.log(c.dim(`── ${category} ──`));
    for (const item of items) {
      const proTag = item.pro ? ` ${c.accent("[pro]")}` : "";
      console.log(
        `  ${c.bold(item.slug.padEnd(22))} ${c.dim(item.description)}${proTag}`,
      );
    }
    console.log();
  }

  console.log(
    c.dim(`  ${entries.length} components · `) +
      `nyra add ${c.code("<slug>")}`,
  );
}
