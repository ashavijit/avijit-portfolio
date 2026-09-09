import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgFrame, ogFonts } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.role}`;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  const title = "Low-latency backends and fast web clients.";

  return new ImageResponse(
    <OgFrame eyebrow="Portfolio" title={title} meta="Go · TypeScript · Python" />,
    { ...size, fonts: await ogFonts(title) }
  );
}
