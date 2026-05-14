import { cn } from "@/lib/utils";
import { highlight, type CodeLang } from "@/lib/shiki";

import { CopyButton } from "./copy-button";

type CodeBlockProps = {
  code: string;
  lang?: CodeLang;
  filename?: string;
  className?: string;
  /** Hide the floating copy button (useful for inline install snippets). */
  hideCopy?: boolean;
};

/**
 * Server-rendered code block. Uses Shiki's dual-theme output so tokens
 * carry both `--shiki-light` and `--shiki-dark` styles; site CSS swaps
 * between them based on `[data-theme]`.
 */
export async function CodeBlock({
  code,
  lang = "tsx",
  filename,
  className,
  hideCopy = false,
}: CodeBlockProps) {
  const html = await highlight(code, lang);

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-border bg-surface",
        className,
      )}
    >
      {filename ? (
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-foreground-muted">
            {filename}
          </span>
          {!hideCopy ? (
            <CopyButton text={code} />
          ) : null}
        </div>
      ) : (
        !hideCopy && (
          <div className="pointer-events-none absolute right-3 top-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
            <div className="pointer-events-auto">
              <CopyButton text={code} />
            </div>
          </div>
        )
      )}
      <div
        className="nyra-code overflow-x-auto px-4 py-4 text-[13px] leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
