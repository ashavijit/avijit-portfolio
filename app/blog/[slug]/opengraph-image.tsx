import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, OgFrame, ogFonts } from "@/lib/og";
import { getAllBlogs, getSingleBlog } from "@/util/mdx_clean";

export const alt = "Blog post";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

// Prerender one card per post so nothing has to render on Workers.
export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((p) => ({ slug: p.slug! })).filter((p) => p.slug);
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let title = slug;
  let meta = "";
  try {
    const { data } = await getSingleBlog(slug);
    title = data.title ?? slug;
    meta = [
      data.date
        ? new Date(data.date).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        : null,
      data.readingTime ? `${data.readingTime} min read` : null,
    ]
      .filter(Boolean)
      .join(" · ");
  } catch {
    // Fall back to the slug rather than failing the build over one bad post.
  }

  return new ImageResponse(<OgFrame eyebrow="Writing" title={title} meta={meta} />, {
    ...size,
    fonts: await ogFonts(title + meta),
  });
}
