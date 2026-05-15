/**
 * Talks to the Nyra registry endpoint (`https://nyra.dev/r`).
 *
 * - `fetchIndex()` lists every component (metadata only).
 * - `fetchComponent(slug)` returns metadata + raw file contents,
 *   sending the saved license key for Pro components.
 *
 * The registry URL can be overridden via `NYRA_REGISTRY_URL` for local
 * dev against `http://localhost:3000/r`.
 */

import { readCredentials } from "./credentials.js";

export type RegistryIndexEntry = {
  slug: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  pro: boolean;
  dependencies: string[];
  files: string[];
  createdAt: string;
};

export type RegistryComponent = Omit<RegistryIndexEntry, "files"> & {
  files: { path: string; content: string }[];
};

export class LicenseRequiredError extends Error {
  constructor(public slug: string) {
    super(`Component "${slug}" requires Nyra Pro.`);
    this.name = "LicenseRequiredError";
  }
}

export class LicenseInvalidError extends Error {
  constructor(public slug: string) {
    super(`License key was rejected for "${slug}".`);
    this.name = "LicenseInvalidError";
  }
}

function registryBase(): string {
  const fromEnv = process.env.NYRA_REGISTRY_URL;
  if (fromEnv) return fromEnv.replace(/\/+$/, "");
  const fromCreds = readCredentials().registryUrl;
  if (fromCreds) return fromCreds.replace(/\/+$/, "");
  return "https://nyra.dev/r";
}

function authHeaders(): Record<string, string> {
  const { licenseKey } = readCredentials();
  if (!licenseKey) return {};
  return { Authorization: `License ${licenseKey}` };
}

export async function fetchIndex(): Promise<RegistryIndexEntry[]> {
  const res = await fetch(`${registryBase()}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Registry index request failed (${res.status}).`);
  }
  const body = (await res.json()) as { components: RegistryIndexEntry[] };
  return body.components ?? [];
}

export async function fetchComponent(slug: string): Promise<RegistryComponent> {
  const res = await fetch(`${registryBase()}/${slug}`, {
    headers: { Accept: "application/json", ...authHeaders() },
  });

  if (res.status === 402) {
    const body = (await res.json().catch(() => ({}))) as { error?: string };
    if (body.error === "license-invalid") throw new LicenseInvalidError(slug);
    throw new LicenseRequiredError(slug);
  }
  if (res.status === 404) {
    throw new Error(`No component named "${slug}" in the registry.`);
  }
  if (!res.ok) {
    throw new Error(`Registry request failed (${res.status}) for "${slug}".`);
  }
  return (await res.json()) as RegistryComponent;
}
