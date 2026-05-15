import prompts from "prompts";

import { readCredentials, writeCredentials } from "../lib/credentials.js";
import { log, c } from "../lib/output.js";

const LICENSE_REGEX = /^NYRA(?:-[0-9A-HJKMNP-TV-Z]{4}){3}$/;

export async function loginCommand(args: { key?: string }) {
  log.title("Sign in with your Nyra Pro license");

  let key = args.key?.trim().toUpperCase();
  if (!key) {
    const response = await prompts(
      {
        type: "password",
        name: "key",
        message: "Paste your license key",
      },
      { onCancel: () => process.exit(1) },
    );
    key = (response.key as string | undefined)?.trim().toUpperCase();
  }

  if (!key) {
    log.err("No license key provided.");
    process.exit(1);
  }
  if (!LICENSE_REGEX.test(key)) {
    log.err(
      `That doesn't look like a Nyra license. Format: ${c.code("NYRA-XXXX-XXXX-XXXX")}`,
    );
    process.exit(1);
  }

  const existing = readCredentials();
  writeCredentials({ ...existing, licenseKey: key });
  log.ok(`License saved to ${c.code("~/.nyra/credentials")}.`);
}

export function logoutCommand() {
  const existing = readCredentials();
  if (!existing.licenseKey) {
    log.info("No license key was stored.");
    return;
  }
  writeCredentials({ ...existing, licenseKey: undefined });
  log.ok("Cleared stored license key.");
}
