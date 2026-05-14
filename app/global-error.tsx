"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface to Sentry / console for now.
    console.error(error);
  }, [error]);

  return (
    <html lang="en" data-theme="dark">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          background: "#0a0a0a",
          color: "#f5f3ee",
          fontFamily: "ui-monospace, SFMono-Regular, monospace",
        }}
      >
        <div style={{ maxWidth: "28rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <span
            style={{
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#6b6b66",
            }}
          >
            500 — Something tilted too hard
          </span>
          <h1
            style={{
              fontFamily: "ui-serif, Georgia, serif",
              fontSize: "3rem",
              lineHeight: 0.95,
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            An unexpected error.
          </h1>
          <p style={{ fontSize: 14, color: "#9a9a93", margin: 0 }}>
            We've logged it. Try reloading — most one-offs clear themselves.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              alignSelf: "flex-start",
              background: "#c8ff3c",
              color: "#0a0a0a",
              border: "none",
              padding: "0.65rem 1.25rem",
              borderRadius: "9999px",
              fontSize: 14,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Reload
          </button>
        </div>
      </body>
    </html>
  );
}
