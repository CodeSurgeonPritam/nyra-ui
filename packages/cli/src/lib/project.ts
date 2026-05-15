/**
 * Detects how the user's project is set up so the CLI can write files
 * into the right places and call the right package manager.
 *
 * - `findProjectRoot()` walks up from cwd looking for a `package.json`.
 * - `detectPackageManager()` checks lock files (pnpm, yarn, bun, npm).
 * - `componentsDir()` resolves the canonical `components/ui` destination,
 *    honoring the user's TS path aliases when possible.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

export type PackageManager = "pnpm" | "yarn" | "bun" | "npm";

export function findProjectRoot(start = process.cwd()): string {
  let dir = resolve(start);
  while (true) {
    if (existsSync(join(dir, "package.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) {
      throw new Error(
        "Couldn't find a package.json walking up from the current directory. Are you inside a project?",
      );
    }
    dir = parent;
  }
}

export function detectPackageManager(root: string): PackageManager {
  if (existsSync(join(root, "pnpm-lock.yaml"))) return "pnpm";
  if (existsSync(join(root, "yarn.lock"))) return "yarn";
  if (existsSync(join(root, "bun.lock"))) return "bun";
  return "npm";
}

export function installCommand(pm: PackageManager, packages: string[]) {
  if (packages.length === 0) return null;
  const args = packages.join(" ");
  switch (pm) {
    case "pnpm":
      return `pnpm add ${args}`;
    case "yarn":
      return `yarn add ${args}`;
    case "bun":
      return `bun add ${args}`;
    default:
      return `npm install ${args}`;
  }
}

export type ComponentsDir = {
  /** Absolute path on disk. */
  abs: string;
  /** Display path relative to project root (e.g. "components/ui"). */
  rel: string;
};

export function componentsDir(root: string): ComponentsDir {
  // We don't try to parse tsconfig paths — just respect the conventional
  // `components/ui` layout, with `src/components/ui` as a Next.js src-dir
  // fallback. Anyone using a wildly different layout can move files post-
  // install; the CLI's job is the boring 90% case.
  const candidates = ["components/ui", "src/components/ui"];
  for (const c of candidates) {
    if (existsSync(join(root, dirname(c)))) {
      return { abs: join(root, c), rel: c };
    }
  }
  return { abs: join(root, candidates[0]), rel: candidates[0] };
}

export function readPackageJson(root: string): Record<string, unknown> {
  try {
    return JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
  } catch {
    return {};
  }
}

export function hasDep(pkg: Record<string, unknown>, name: string): boolean {
  const deps = (pkg.dependencies ?? {}) as Record<string, string>;
  const dev = (pkg.devDependencies ?? {}) as Record<string, string>;
  return Boolean(deps[name] || dev[name]);
}
