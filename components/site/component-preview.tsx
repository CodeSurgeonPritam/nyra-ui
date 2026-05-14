import { cn } from "@/lib/utils";
import { getPreview } from "@/lib/previews";

type ComponentPreviewProps = {
  slug: string;
  className?: string;
  /** Minimum height for the framed preview. */
  minHeight?: number;
};

/**
 * Frames a registry preview in a consistent surface. Renders the
 * dynamic-imported preview module for the given slug — falls back to a
 * placeholder if no preview is registered.
 */
export function ComponentPreview({
  slug,
  className,
  minHeight = 320,
}: ComponentPreviewProps) {
  const Preview = getPreview(slug);

  return (
    <div
      style={{ minHeight }}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-surface",
        className,
      )}
    >
      {Preview ? (
        <Preview />
      ) : (
        <div className="flex h-full w-full items-center justify-center p-10 text-xs text-foreground-muted">
          Preview unavailable.
        </div>
      )}
    </div>
  );
}
