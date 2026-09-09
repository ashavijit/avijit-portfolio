import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";
import { getAllBlogs, type BlogMeta } from "@/util/mdx_clean";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | Avijit Sen",
  description:
    "Thoughts on software engineering, web development, and technology",
};

const rule =
  "w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 -mx-2 md:-mx-14";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

const META =
  "font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500";

/** Small-caps date and read time — inline on the hero, stacked in the archive. */
function PostMeta({
  post,
  stacked = false,
  className = "",
}: {
  post: BlogMeta;
  stacked?: boolean;
  className?: string;
}) {
  const date = post.date ? formatDate(post.date) : null;
  const read = post.readingTime ? `${post.readingTime} min read` : null;
  if (!date && !read) return null;

  if (stacked) {
    return (
      <div className={`${META} ${className}`}>
        {date && <p className="whitespace-nowrap">{date}</p>}
        {read && (
          <p className="mt-1 whitespace-nowrap opacity-70">{read}</p>
        )}
      </div>
    );
  }

  return (
    <p className={`${META} ${className}`}>
      {[date, read].filter(Boolean).join(" · ")}
    </p>
  );
}

function Tags({ tags, limit = 3 }: { tags?: string[]; limit?: number }) {
  if (!tags?.length) return null;

  return (
    <ul className="flex flex-wrap items-center gap-1.5">
      {tags.slice(0, limit).map((tag) => (
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
  );
}

export default async function BlogIndex() {
  const posts = await getAllBlogs();
  const [featured, ...rest] = posts;

  return (
    <Container className="relative mx-auto min-h-screen px-8 pt-32 md:px-20 md:pt-36 md:pb-10">
      <EdgeRails />

      {/* ---------------------------------------- */}
      {/* HEADER */}
      {/* ---------------------------------------- */}

      <header>
        <p className="font-custom2 text-[11px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
          Writing
        </p>

        <h1 className="mt-1 font-custom text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          <span className="link--elara">All blogs</span>
        </h1>

        <p className="mt-2 max-w-xl font-custom2 text-s leading-relaxed tracking-tight text-neutral-600 dark:text-neutral-400">
          Notes on backend systems, latency, and the tools I build along the way.
          Mostly things I wish someone had written down before I hit them in
          production.
        </p>
      </header>

      <div className={`${rule} my-6`} />

      {/* ---------------------------------------- */}
      {/* LATEST — the newest post, given room to breathe */}
      {/* ---------------------------------------- */}

      {featured && (
        <>
          <Link href={`/blog/${featured.slug}`} className="group block">
            <div>
              <div className="flex items-center gap-3">
                <span className="rounded-md border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-custom2 text-[10px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                  Latest
                </span>
                <PostMeta post={featured} />
              </div>

              <h2 className="mt-4 flex items-start gap-2 font-custom text-3xl font-bold leading-[1.15] tracking-tight text-neutral-900 md:text-4xl dark:text-neutral-50">
                {featured.title ?? featured.slug}
                <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </h2>

              {featured.description && (
                <p className="mt-3 max-w-2xl font-custom2 text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {featured.description}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <Tags tags={featured.tags} limit={4} />
                <span className="inline-flex items-center gap-1.5 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-500 transition-colors group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-100">
                  Read post
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </div>
          </Link>

          <div className={`${rule} my-6`} />
        </>
      )}

      {/* ---------------------------------------- */}
      {/* ARCHIVE */}
      {/* ---------------------------------------- */}

      <ol>
        {rest.map((p, i) => (
          <li key={p.slug}>
            {i > 0 && (
              <div className="border-t border-neutral-200/70 dark:border-neutral-800/60" />
            )}

            <Link
              href={`/blog/${p.slug}`}
              className="group -mx-3 grid gap-x-8 gap-y-2 rounded-lg px-3 py-5
                         transition-colors duration-300
                         hover:bg-neutral-100/60 dark:hover:bg-neutral-900/40
                         md:grid-cols-[8rem_1fr]"
            >
              <PostMeta post={p} stacked className="md:pt-1.5" />

              <div>
                <h2 className="flex items-start gap-1.5 font-custom text-lg font-bold leading-snug tracking-tight text-neutral-900 dark:text-neutral-100 md:text-xl">
                  {p.title ?? p.slug}
                  <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                </h2>

                {p.description && (
                  <p className="mt-1.5 max-w-2xl font-custom2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {p.description}
                  </p>
                )}

                <div className="mt-3">
                  <Tags tags={p.tags} />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ol>

      <div className={`${rule} mt-6`} />

      <p className="mt-4 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
        {posts.length} {posts.length === 1 ? "post" : "posts"}
      </p>
    </Container>
  );
}
