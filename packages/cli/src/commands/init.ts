/**
 * `nyra init` — one-time setup for a project.
 *
 * Writes `lib/utils.ts` with the `cn()` helper and a starter
 * `app/globals.css` import line for `@nyra/tailwind-preset`. Detects
 * the package manager and offers to install the runtime dependencies
 * every Nyra component needs (motion / clsx / tailwind-merge /
 * lucide-react / @nyra/tailwind-preset).
 *
 * Idempotent — running it twice is a no-op.
 */

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import prompts from "prompts";

import {
  detectPackageManager,
  findProjectRoot,
  hasDep,
  installCommand,
  readPackageJson,
} from "../lib/project.js";
import { log, c } from "../lib/output.js";

const RUNTIME_DEPS = [
  "motion",
  "clsx",
  "tailwind-merge",
  "lucide-react",
  "@nyra/tailwind-preset",
];

const UTILS_CONTENT = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

const PRESET_IMPORT = `@import "@nyra/tailwind-preset";\n`;

export async function initCommand(args: { yes?: boolean }) {
  log.title("Initialising Nyra in this project");

  const root = findProjectRoot();
  const pkg = readPackageJson(root);
  const pm = detectPackageManager(root);

  log.info(`Project root: ${c.code(root)}`);
  log.info(`Package manager: ${c.code(pm)}`);

  // 1. lib/utils.ts
  ensureUtils(root);

  // 2. globals.css import line
  ensureGlobalsImport(root);

  // 3. Runtime deps
  const missing = RUNTIME_DEPS.filter((d) => !hasDep(pkg, d));
  if (missing.length === 0) {
    log.ok("Runtime dependencies already present.");
    return;
  }

  const cmd = installCommand(pm, missing)!;
  log.info(`Missing dependencies: ${missing.map(c.code).join(", ")}`);

  let proceed = args.yes ?? false;
  if (!proceed) {
    const response = await prompts(
      {
        type: "confirm",
        name: "ok",
        initial: true,
        message: `Run ${c.code(cmd)} now?`,
      },
      { onCancel: () => process.exit(1) },
    );
    proceed = Boolean(response.ok);
  }

  if (!proceed) {
    log.info(`Skipped. When you're ready, run: ${c.code(cmd)}`);
    return;
  }

  await runShell(cmd, root);
  log.ok("Nyra is ready. Try: " + c.code("nyra add magnetic-button"));
}

function ensureUtils(root: string) {
  const candidates = [
    join(root, "lib", "utils.ts"),
    join(root, "src", "lib", "utils.ts"),
  ];
  if (candidates.some((p) => existsSync(p))) {
    log.info(`lib/utils.ts already exists — left untouched.`);
    return;
  }
  const target = candidates[existsSync(join(root, "src")) ? 1 : 0];
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, UTILS_CONTENT, "utf8");
  log.ok(`Wrote ${c.code(target.replace(root + "/", ""))}.`);
}

function ensureGlobalsImport(root: string) {
  const candidates = [
    join(root, "app", "globals.css"),
    join(root, "src", "app", "globals.css"),
    join(root, "styles", "globals.css"),
  ];
  const path = candidates.find((p) => existsSync(p));
  if (!path) {
    log.warn(
      `No globals.css found. Add ${c.code('@import "@nyra/tailwind-preset";')} to your global stylesheet after ${c.code('@import "tailwindcss";')}.`,
    );
    return;
  }
  const content = readFileSync(path, "utf8");
  if (content.includes("@nyra/tailwind-preset")) {
    log.info(`globals.css already imports the preset.`);
    return;
  }
  // Place the import line directly after `@import "tailwindcss";` if present,
  // otherwise prepend.
  let updated: string;
  if (/@import\s+["']tailwindcss["'];?/.test(content)) {
    updated = content.replace(
      /(@import\s+["']tailwindcss["'];?\s*\n?)/,
      `$1${PRESET_IMPORT}`,
    );
  } else {
    updated = PRESET_IMPORT + content;
  }
  writeFileSync(path, updated, "utf8");
  log.ok(`Added preset import to ${c.code(path.replace(root + "/", ""))}.`);
}

function runShell(cmd: string, cwd: string): Promise<void> {
  return new Promise((resolveP, reject) => {
    const child = spawn(cmd, { cwd, shell: true, stdio: "inherit" });
    child.on("close", (code) => {
      if (code === 0) resolveP();
      else reject(new Error(`Command failed (exit ${code}): ${cmd}`));
    });
  });
}
