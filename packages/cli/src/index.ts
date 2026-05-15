#!/usr/bin/env node
/**
 * `nyra` CLI entry.
 *
 * Tiny hand-rolled arg parser — no commander/yargs — because the surface
 * is four commands with at most a few flags. If this ever grows past
 * ~5 commands, swap in `commander`.
 */

import { addCommand } from "./commands/add.js";
import { initCommand } from "./commands/init.js";
import { listCommand } from "./commands/list.js";
import { loginCommand, logoutCommand } from "./commands/login.js";
import { log, c } from "./lib/output.js";

const VERSION = "0.0.1";

const HELP = `${c.italic("nyra")} · ${c.dim("Components for interfaces that feel alive.")}

${c.bold("Commands")}
  ${c.code("nyra init")}                   Set up nyra in this project
  ${c.code("nyra add <slug> [...more]")}   Copy components into ./components/ui/
  ${c.code("nyra list")}                   Browse the catalog
  ${c.code("nyra login [--key KEY]")}      Save your Pro license key
  ${c.code("nyra logout")}                 Forget the stored license key

${c.bold("Flags")}
  ${c.code("--yes, -y")}                   Skip prompts
  ${c.code("--force, -f")}                 Overwrite existing files (add)
  ${c.code("--version, -v")}               Print version
  ${c.code("--help, -h")}                  This message

${c.bold("Env")}
  ${c.code("NYRA_REGISTRY_URL")}           Override registry origin (default https://nyra.dev/r)
`;

type Parsed = {
  command: string | undefined;
  positionals: string[];
  flags: Record<string, string | boolean>;
};

function parse(argv: string[]): Parsed {
  const positionals: string[] = [];
  const flags: Record<string, string | boolean> = {};
  let command: string | undefined;

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg.startsWith("--")) {
      const eq = arg.indexOf("=");
      if (eq !== -1) {
        flags[arg.slice(2, eq)] = arg.slice(eq + 1);
      } else {
        const next = argv[i + 1];
        if (next && !next.startsWith("-")) {
          flags[arg.slice(2)] = next;
          i++;
        } else {
          flags[arg.slice(2)] = true;
        }
      }
    } else if (arg.startsWith("-") && arg.length > 1) {
      flags[arg.slice(1)] = true;
    } else if (!command) {
      command = arg;
    } else {
      positionals.push(arg);
    }
  }
  return { command, positionals, flags };
}

async function main() {
  const { command, positionals, flags } = parse(process.argv.slice(2));

  if (flags.version || flags.v) {
    console.log(VERSION);
    return;
  }
  if (!command || flags.help || flags.h) {
    console.log(HELP);
    return;
  }

  const yes = Boolean(flags.yes || flags.y);
  const force = Boolean(flags.force || flags.f);

  try {
    switch (command) {
      case "init":
        await initCommand({ yes });
        return;
      case "add":
        await addCommand({ slugs: positionals, yes, force });
        return;
      case "list":
      case "ls":
        await listCommand();
        return;
      case "login":
        await loginCommand({
          key: typeof flags.key === "string" ? flags.key : undefined,
        });
        return;
      case "logout":
        logoutCommand();
        return;
      default:
        log.err(`Unknown command: ${command}`);
        console.log(HELP);
        process.exit(1);
    }
  } catch (err) {
    log.err((err as Error).message);
    process.exit(1);
  }
}

main();
