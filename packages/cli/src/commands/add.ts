/**
 * `nyra add <slug> [..more]` — install one or more components.
 *
 * Fetches the component manifest from the registry, writes each file to
 * the user's components/ui/ tree (creating subfolders for the category),
 * and offers to install any missing runtime deps.
 */

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import prompts from "prompts";

import {
  componentsDir,
  detectPackageManager,
  findProjectRoot,
  hasDep,
  installCommand,
  readPackageJson,
} from "../lib/project.js";
import {
  fetchComponent,
  LicenseInvalidError,
  LicenseRequiredError,
  type RegistryComponent,
} from "../lib/registry.js";
import { log, c } from "../lib/output.js";

export async function addCommand(args: {
  slugs: string[];
  force?: boolean;
  yes?: boolean;
}) {
  if (args.slugs.length === 0) {
    log.err(`Provide at least one component slug. Try ${c.code("nyra list")}.`);
    process.exit(1);
  }

  log.title(
    `Installing ${args.slugs.length === 1 ? "component" : "components"}`,
  );

  const root = findProjectRoot();
  const pkg = readPackageJson(root);
  const pm = detectPackageManager(root);
  const dest = componentsDir(root);

  const installed: RegistryComponent[] = [];
  for (const slug of args.slugs) {
    try {
      const comp = await fetchComponent(slug);
      writeFiles(comp, dest.abs, args.force);
      installed.push(comp);
      log.ok(
        `${c.bold(comp.name)} → ${c.code(`${dest.rel}/${comp.files[0].path}`)}`,
      );
    } catch (err) {
      if (err instanceof LicenseRequiredError) {
        log.err(
          `${slug} is Pro. Run ${c.code("nyra login")} first, then retry.`,
        );
        process.exit(2);
      }
      if (err instanceof LicenseInvalidError) {
        log.err(
          `Your license key was rejected for ${slug}. Update it with ${c.code("nyra login")}.`,
        );
        process.exit(2);
      }
      log.err((err as Error).message);
      process.exit(1);
    }
  }

  // Aggregate missing deps across all installed components.
  const needed = new Set<string>();
  for (const c of installed) {
    for (const d of c.dependencies) needed.add(d);
  }
  // The cn() helper deps are always required.
  needed.add("clsx");
  needed.add("tailwind-merge");

  const missing = [...needed].filter((d) => !hasDep(pkg, d));
  if (missing.length === 0) return;

  const cmd = installCommand(pm, missing)!;
  let proceed = args.yes ?? false;
  if (!proceed) {
    const response = await prompts(
      {
        type: "confirm",
        name: "ok",
        initial: true,
        message: `Install missing deps: ${missing.map(c.code).join(", ")} via ${c.code(cmd)}?`,
      },
      { onCancel: () => process.exit(1) },
    );
    proceed = Boolean(response.ok);
  }

  if (!proceed) {
    log.info(`Skipped. Run when ready: ${c.code(cmd)}`);
    return;
  }

  await runShell(cmd, root);
}

function writeFiles(comp: RegistryComponent, baseDir: string, force?: boolean) {
  for (const file of comp.files) {
    const target = join(baseDir, file.path);
    if (existsSync(target) && !force) {
      throw new Error(
        `File exists: ${target}. Use --force to overwrite (or remove it manually).`,
      );
    }
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, file.content, "utf8");
  }
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
