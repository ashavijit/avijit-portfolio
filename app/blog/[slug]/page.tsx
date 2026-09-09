import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";
import type { Metadata } from "next";
import Link from "next/link";
import Mermaid from "@/components/ui/mermaid";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getAllBlogs, getSingleBlog, type BlogMeta } from "@/util/mdx_clean";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode, { type Options as PrettyCodeOptions } from "rehype-pretty-code";

/** Same algorithm rehype-slug uses, so TOC links match the rendered ids. */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Top-level sections only — a two-level TOC on a 7-minute post is noise. */
function tableOfContents(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, "")
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim();
      return { text, id: slugify(text) };
    });
}

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

  const toc = tableOfContents(content);

  // getAllBlogs() is newest-first, so the previous entry is the newer post.
  const all = await getAllBlogs();
  const here = all.findIndex((p) => p.slug === slug);
  const prev = here > 0 ? all[here - 1] : undefined;
  const next = here >= 0 && here < all.length - 1 ? all[here + 1] : undefined;

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
              <li key={tag}>
                <Link
                  href={`/blog/tag/${encodeURIComponent(tag)}`}
                  className="block rounded-md border border-neutral-200 bg-neutral-100/70 px-2 py-0.5
                             font-custom2 text-[11px] tracking-tight text-neutral-600 transition-colors
                             hover:border-neutral-300 hover:text-neutral-900
                             dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-400
                             dark:hover:border-neutral-700 dark:hover:text-neutral-100"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
      </header>

      <div className="my-8 w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 -mx-2 md:-mx-14 dark:opacity-15" />

      {toc.length > 2 && (
        <nav
          aria-label="On this page"
          className="mb-10 rounded-md border border-neutral-200 bg-neutral-50/50 p-5 dark:border-neutral-800 dark:bg-neutral-900/30"
        >
          <p className="font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
            On this page
          </p>
          <ol className="mt-3 flex flex-col gap-2">
            {toc.map((h, i) => (
              <li key={h.id} className="flex gap-3">
                <span className="font-custom2 text-xs tabular-nums text-neutral-300 dark:text-neutral-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <a
                  href={`#${h.id}`}
                  className="font-custom2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <article className="prose mx-auto font-custom2 tracking-normal">
        <MDXRemote
          source={content}
          components={MDX_COMPONENTS}
          options={{
            mdxOptions: {
              // GFM gives posts tables, strikethrough and task lists.
              remarkPlugins: [remarkGfm],
              // rehype-slug must run before pretty-code so headings get ids.
              rehypePlugins: [rehypeSlug, [rehypePrettyCode, prettyCodeOptions]],
            },
          }}
        />
      </article>

      <div className="mt-12 w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 -mx-2 md:-mx-14 dark:opacity-15" />

      {(prev || next) && (
        <nav aria-label="More posts" className="mt-8 grid gap-4 sm:grid-cols-2">
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group rounded-md border border-neutral-200 p-4 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
            >
              <span className="flex items-center gap-1.5 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
                Newer
              </span>
              <p className="mt-2 font-custom text-base font-bold leading-snug text-neutral-900 dark:text-neutral-100">
                {prev.title ?? prev.slug}
              </p>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          {next && (
            <Link
              href={`/blog/${next.slug}`}
              className="group rounded-md border border-neutral-200 p-4 text-right transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:hover:border-neutral-700"
            >
              <span className="flex items-center justify-end gap-1.5 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
                Older
                <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
              <p className="mt-2 font-custom text-base font-bold leading-snug text-neutral-900 dark:text-neutral-100">
                {next.title ?? next.slug}
              </p>
            </Link>
          )}
        </nav>
      )}

      <Link
        href="/blog"
        className="group mt-8 inline-flex items-center gap-1.5 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
      >
        <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
        Back to all blogs
      </Link>
    </Container>
  );
}
