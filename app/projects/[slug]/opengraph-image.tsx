import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgFrame, ogFonts } from "@/lib/og";
import { projects, getProject } from "@/lib/projects";

export const alt = "Project";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);

  const title = project?.title ?? slug;
  const meta = project
    ? [project.language, project.year, project.starsText].filter(Boolean).join(" · ")
    : "";

  return new ImageResponse(<OgFrame eyebrow="Project" title={title} meta={meta} />, {
    ...size,
    fonts: await ogFonts(title + meta),
  });
}
