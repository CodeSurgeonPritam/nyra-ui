import pc from "picocolors";

const mark = pc.green("✦");
const arrow = pc.dim("›");

export const log = {
  info(msg: string) {
    console.log(`${pc.dim(arrow)} ${msg}`);
  },
  ok(msg: string) {
    console.log(`${mark} ${msg}`);
  },
  warn(msg: string) {
    console.warn(`${pc.yellow("!")} ${msg}`);
  },
  err(msg: string) {
    console.error(`${pc.red("✗")} ${msg}`);
  },
  title(msg: string) {
    console.log(`\n${pc.green(pc.italic("nyra"))} ${pc.dim("·")} ${msg}\n`);
  },
};

export const c = {
  accent: (s: string) => pc.green(s),
  dim: (s: string) => pc.dim(s),
  bold: (s: string) => pc.bold(s),
  italic: (s: string) => pc.italic(s),
  code: (s: string) => pc.cyan(s),
};
