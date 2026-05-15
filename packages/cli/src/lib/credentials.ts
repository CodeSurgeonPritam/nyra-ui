/**
 * Stores the user's Nyra Pro license key at `~/.nyra/credentials`.
 *
 * The file is plain JSON with file mode 0600. Not encrypted — this is
 * the same threat model as `~/.npmrc` or `~/.config/gh/hosts.yml`.
 * Anyone with shell access can already read your secrets.
 */

import {
  chmodSync,
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

type Credentials = {
  licenseKey?: string;
  registryUrl?: string;
};

function credPath() {
  return join(homedir(), ".nyra", "credentials");
}

export function readCredentials(): Credentials {
  const file = credPath();
  if (!existsSync(file)) return {};
  try {
    return JSON.parse(readFileSync(file, "utf8")) as Credentials;
  } catch {
    return {};
  }
}

export function writeCredentials(creds: Credentials) {
  const file = credPath();
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(creds, null, 2), "utf8");
  try {
    chmodSync(file, 0o600);
  } catch {
    // Windows doesn't honor unix modes; ignore.
  }
}

export function clearCredentials() {
  writeCredentials({});
}
