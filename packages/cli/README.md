# nyra

The Nyra CLI. Copy components from [nyra.dev](https://nyra.dev) into your project in one command.

## Install (no install)

You don't actually install it. Run it on demand:

```bash
pnpm dlx nyra@latest init
pnpm dlx nyra@latest add magnetic-button
```

Or add it as a dev-dep if you'd rather:

```bash
pnpm add -D nyra
pnpm nyra add magnetic-button
```

## Commands

```bash
nyra init                          # one-time project setup
nyra add <slug> [..more]           # copy components into ./components/ui/
nyra list                          # browse the catalog
nyra login [--key NYRA-...]        # save your Pro license key
nyra logout                        # forget the stored license key
```

### Flags

- `--yes, -y` — skip confirmation prompts
- `--force, -f` — overwrite existing files (`add` only)
- `--version, -v` — print version
- `--help, -h` — print help

### Env

- `NYRA_REGISTRY_URL` — override the registry origin (default `https://nyra.dev/r`). Useful for local development against `http://localhost:3000/r`.

## How Pro gating works

Free components are public. Pro components need a license:

1. Buy Nyra Pro at [nyra.dev/pricing](https://nyra.dev/pricing).
2. Your license key (`NYRA-XXXX-XXXX-XXXX`) is shown on your dashboard.
3. `nyra login` saves it to `~/.nyra/credentials` (file mode `0600`).
4. Subsequent `nyra add` calls send it as `Authorization: License NYRA-…`. The registry validates against the active license table and serves the source if valid.

## License

MIT for the CLI itself. The components it fetches carry their own license (free = MIT, Pro = Nyra Pro license).
