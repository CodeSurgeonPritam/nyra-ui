"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { UploadCloud, X } from "lucide-react";

import { cn } from "@/lib/utils";

type FileUploadProps = {
  className?: string;
  accept?: string;
  multiple?: boolean;
  /** Max size per file in bytes. */
  maxSize?: number;
  onFilesChange?: (files: File[]) => void;
};

/**
 * Drag-and-drop file zone with previews for accepted files. Rejects
 * anything over `maxSize` silently (the caller can hook `onFilesChange`
 * to surface validation).
 */
export function FileUpload({
  className,
  accept,
  multiple = true,
  maxSize = 10 * 1024 * 1024,
  onFilesChange,
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [hovering, setHovering] = useState(false);

  function commit(next: File[]) {
    const filtered = next.filter((f) => f.size <= maxSize);
    setFiles(filtered);
    onFilesChange?.(filtered);
  }

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;
    commit([
      ...(multiple ? files : []),
      ...Array.from(event.target.files),
    ]);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setHovering(false);
    commit([
      ...(multiple ? files : []),
      ...Array.from(event.dataTransfer.files),
    ]);
  }

  function removeAt(index: number) {
    commit(files.filter((_, i) => i !== index));
  }

  return (
    <div className={cn("flex w-full flex-col gap-3", className)}>
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setHovering(true);
        }}
        onDragLeave={() => setHovering(false)}
        onDrop={handleDrop}
        className={cn(
          "relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border px-6 py-10 text-center transition-colors",
          hovering && "border-accent bg-accent/[0.06]",
        )}
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          onChange={handleSelect}
        />
        <UploadCloud
          className={cn(
            "h-7 w-7 transition-colors",
            hovering ? "text-accent" : "text-foreground-muted",
          )}
        />
        <div className="text-sm">
          <span className="text-foreground">Drop files here</span>{" "}
          <span className="text-foreground-muted">or click to browse</span>
        </div>
        <div className="text-xs text-foreground-muted">
          Max {Math.round(maxSize / 1024 / 1024)}MB per file
        </div>
      </label>

      <AnimatePresence initial={false}>
        {files.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2 overflow-hidden"
          >
            {files.map((file, i) => (
              <li
                key={`${file.name}-${i}`}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              >
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-foreground">{file.name}</span>
                  <span className="text-xs text-foreground-muted">
                    {formatBytes(file.size)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  aria-label={`Remove ${file.name}`}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-foreground-muted transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}
