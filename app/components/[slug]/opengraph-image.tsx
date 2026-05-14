import { ImageResponse } from "next/og";

import { getCategoryLabel, getComponent, registry } from "@/lib/registry";
import { loadOgFont } from "@/lib/og-font";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateImageMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const component = getComponent(params.slug);
  return [
    {
      id: "default",
      contentType: "image/png",
      size,
      alt: component
        ? `${component.name} — Nyra`
        : "Nyra component",
    },
  ];
}

export async function generateStaticParams() {
  return registry.map((c) => ({ slug: c.slug }));
}

export default async function OG({
  params,
}: {
  params: { slug: string };
}) {
  const component = getComponent(params.slug);

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
            "radial-gradient(50% 60% at 0% 100%, rgba(200,255,60,0.20) 0%, transparent 60%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Mark />
          <span
            style={{
              fontFamily: "Instrument Serif Italic",
              fontStyle: "italic",
              fontSize: 32,
            }}
          >
            nyra
          </span>
          <span
            style={{
              marginLeft: 16,
              fontFamily: "JetBrains Mono",
              fontSize: 14,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#9a9a93",
            }}
          >
            ·{" "}
            {component
              ? getCategoryLabel(component.category)
              : "Components"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h1
            style={{
              fontSize: 120,
              lineHeight: 0.96,
              letterSpacing: -3,
              margin: 0,
              maxWidth: 1000,
            }}
          >
            {component?.name ?? "Component"}
          </h1>
          {component ? (
            <p
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 24,
                lineHeight: 1.4,
                margin: 0,
                color: "#cfcdc4",
                maxWidth: 920,
              }}
            >
              {component.description}
            </p>
          ) : null}
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
          <span>nyra.dev/components/{params.slug}</span>
          <span
            style={{
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(245,243,238,0.18)",
              fontSize: 14,
              color: "#f5f3ee",
            }}
          >
            {component?.pro ? "Pro" : "Free"}
          </span>
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
    <svg width={24} height={24} viewBox="0 0 24 24" fill="#c8ff3c">
      <path d="M12 0 C12.6 6 18 11.4 24 12 C18 12.6 12.6 18 12 24 C11.4 18 6 12.6 0 12 C6 11.4 11.4 6 12 0 Z" />
    </svg>
  );
}
