import type { ReactElement } from "react";
import { site } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Satori needs real font data — it cannot use a CSS font stack. Google's CSS
 * endpoint hands back a URL to the raw TTF, so grab that once per build.
 *
 * These routes are prerendered, so this fetch happens at build time. Nothing
 * here runs on Cloudflare Workers, which matters: `next/og` leans on WASM and
 * Workers blocks runtime WASM instantiation.
 */
async function loadFont(family: string, weight: number, text: string) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&text=${encodeURIComponent(text)}`,
    { headers: { "User-Agent": "Mozilla/5.0 (compatible; og-image-builder)" } }
  ).then((r) => r.text());

  const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
  if (!url) throw new Error(`Could not resolve a font file for ${family}`);

  return fetch(url).then((r) => r.arrayBuffer());
}

export async function ogFonts(text: string) {
  // Only the glyphs actually used get embedded, which keeps each image small.
  const glyphs = text + site.name + site.role + "0123456789·—.,'\"()/:";

  const [serif, sans] = await Promise.all([
    loadFont("Instrument Serif", 400, glyphs),
    loadFont("Instrument Sans", 500, glyphs),
  ]);

  return [
    { name: "Instrument Serif", data: serif, weight: 400 as const, style: "normal" as const },
    { name: "Instrument Sans", data: sans, weight: 500 as const, style: "normal" as const },
  ];
}

/**
 * Shared card: carbon field, spotlight from above, hairline frame — the same
 * language as the site itself, so a shared link looks like where it lands.
 */
export function OgFrame({
  eyebrow,
  title,
  meta,
}: {
  eyebrow: string;
  title: string;
  meta?: string;
}): ReactElement {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        backgroundColor: "#0c0c0c",
        backgroundImage:
          "radial-gradient(circle at 50% -10%, #1f1f1f 0%, #121212 38%, #0c0c0c 70%, #050505 100%)",
        fontFamily: "Instrument Sans",
        color: "#fafafa",
      }}
    >
      {/* top rule + eyebrow */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", height: 1, backgroundColor: "#2a2a2a" }} />
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#10b981",
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          fontFamily: "Instrument Serif",
          fontSize: title.length > 52 ? 68 : 86,
          lineHeight: 1.08,
          letterSpacing: -1.5,
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {meta && (
          <div
            style={{
              display: "flex",
              marginBottom: 24,
              fontSize: 22,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "#8a8a8a",
            }}
          >
            {meta}
          </div>
        )}
        <div style={{ display: "flex", height: 1, backgroundColor: "#2a2a2a" }} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 24,
            fontSize: 26,
          }}
        >
          <div style={{ display: "flex" }}>{site.name}</div>
          <div style={{ display: "flex", color: "#8a8a8a" }}>
            {site.role} @ {site.company}
          </div>
        </div>
      </div>
    </div>
  );
}
