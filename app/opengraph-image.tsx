import { ImageResponse } from "next/og";

import { loadOgFont } from "@/lib/og-font";

export const alt = "Nyra — Components for interfaces that feel alive";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const [serif, serifItalic, mono] = await Promise.all([
    loadOgFont("serif"),
    loadOgFont("serif-italic"),
    loadOgFont("mono"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          padding: 72,
          background: "#0a0a0a",
          color: "#f5f3ee",
          fontFamily: "Instrument Serif",
          backgroundImage:
            "radial-gradient(60% 50% at 80% 0%, rgba(200,255,60,0.18) 0%, transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Mark />
          <span
            style={{
              fontFamily: "Instrument Serif Italic",
              fontStyle: "italic",
              fontSize: 38,
            }}
          >
            nyra
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontFamily: "JetBrains Mono",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#9a9a93",
            }}
          >
            React component library
          </div>
          <h1
            style={{
              fontSize: 104,
              lineHeight: 1.02,
              letterSpacing: -2,
              margin: 0,
              maxWidth: 980,
            }}
          >
            Components for interfaces that feel{" "}
            <span
              style={{
                fontFamily: "Instrument Serif Italic",
                fontStyle: "italic",
                color: "#c8ff3c",
              }}
            >
              alive
            </span>
            .
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: "JetBrains Mono",
            fontSize: 18,
            color: "#9a9a93",
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          <span>nyra.dev</span>
          <span>Copy. Paste. Ship.</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Instrument Serif", data: serif, style: "normal", weight: 400 },
        { name: "Instrument Serif Italic", data: serifItalic, style: "italic", weight: 400 },
        { name: "JetBrains Mono", data: mono, style: "normal", weight: 400 },
      ],
    },
  );
}

function Mark() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="#c8ff3c">
      <path d="M12 0 C12.6 6 18 11.4 24 12 C18 12.6 12.6 18 12 24 C11.4 18 6 12.6 0 12 C6 11.4 11.4 6 12 0 Z" />
    </svg>
  );
}
