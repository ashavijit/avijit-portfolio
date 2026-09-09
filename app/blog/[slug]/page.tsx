import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";
import type { Metadata } from "next";
import Link from "next/link";
import Mermaid from "@/components/ui/mermaid";
import { ArrowLeft } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getAllBlogs, getSingleBlog, type BlogMeta } from "@/util/mdx_clean";
import remarkGfm from "remark-gfm";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

// Shiki highlights at build/render time — no client-side highlighter ships.
// Dual themes emit --shiki-light/--shiki-dark vars, switched in globals.css.
const prettyCodeOptions: PrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark" },
  keepBackground: false,
  defaultLang: "text",
};

// Components a post can reach for by name inside its MDX.
const MDX_COMPONENTS = { Mermaid };

type PageParams = Promise<{ slug: string }>;

// Every post is a local .mdx file, so there is nothing to render on demand.
export async function generateStaticParams() {
  const posts = await getAllBlogs();
  return posts.map((p) => ({ slug: p.slug! })).filter((p) => p.slug);
}

export async function generateMetadata({
  params,
}: {
  params: PageParams;
}): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { data } = await getSingleBlog(slug);
    return {
      title: `${data.title ?? slug} | Avijit Sen`,
      description: data.description,
      openGraph: {
        title: data.title ?? slug,
        description: data.description,
        type: "article",
        publishedTime: data.date,
      },
    };
  } catch {
    return { title: "Blog | Avijit Sen" };
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function SingleBlogPage({ params }: { params: PageParams }) {
  // `params` may be a Promise in some Next versions; await to unwrap it safely
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    notFound();
  }

  let content: string;
  let frontmatter: BlogMeta = {};
  try {
    const res = await getSingleBlog(slug);
    content = res.content;
    frontmatter = res.data || {};
  } catch {
    notFound();
  }

  const meta = [
    frontmatter.date ? formatDate(frontmatter.date) : null,
    frontmatter.readingTime ? `${frontmatter.readingTime} min read` : null,
  ].filter(Boolean);

  return (
    <Container className="min-h-screen px-8 pt-32 font-custom2 tracking-tight md:px-20 md:pt-36 md:pb-10">
      <EdgeRails />

      <Link
        href="/blog"
        className="group inline-flex items-center gap-1.5 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        All blogs
      </Link>

      <header className="mt-6">
        <h1 className="font-custom text-4xl font-bold text-neutral-900 md:text-5xl dark:text-neutral-50">
          {frontmatter.title ?? slug}
        </h1>

        {meta.length > 0 && (
          <p className="mt-3 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
            {meta.join(" · ")}
          </p>
        )}

        {frontmatter.description && (
          <p className="mt-4 max-w-2xl font-custom2 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
            {frontmatter.description}
          </p>
        )}

        {frontmatter.tags?.length ? (
          <ul className="mt-5 flex flex-wrap items-center gap-1.5">
            {frontmatter.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-md border border-neutral-200 bg-neutral-100/70 px-2 py-0.5
                           font-custom2 text-[11px] tracking-tight text-neutral-600
                           dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="my-8 w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 -mx-2 md:-mx-14 dark:opacity-15" />

      <article className="prose mx-auto font-custom2 tracking-normal">
        <MDXRemote
          source={content}
          components={MDX_COMPONENTS}
          options={{
            mdxOptions: {
              // GFM gives posts tables, strikethrough and task lists.
              remarkPlugins: [remarkGfm],
              rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
            },
          }}
        />
      </article>

      <div className="mt-12 w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 -mx-2 md:-mx-14 dark:opacity-15" />

      <Link
        href="/blog"
        className="group mt-6 inline-flex items-center gap-1.5 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        Back to all blogs
      </Link>
    </Container>
  );
}
