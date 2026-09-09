import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";
import { getAllBlogs } from "@/util/mdx_clean";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

type PageParams = Promise<{ tag: string }>;

const rule =
  "w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 -mx-2 md:-mx-14";

const META =
  "font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500";

// One static page per tag — no searchParams, so this still prerenders.
export async function generateStaticParams() {
  const posts = await getAllBlogs();
  const tags = new Set(posts.flatMap((p) => p.tags ?? []));
  return [...tags].map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Posts tagged “${decodeURIComponent(tag)}” | Avijit Sen`,
    description: `Everything written about ${decodeURIComponent(tag)}.`,
  };
}

export default async function TagPage({ params }: { params: PageParams }) {
  const { tag: raw } = await params;
  const tag = decodeURIComponent(raw);

  const posts = (await getAllBlogs()).filter((p) => p.tags?.includes(tag));
  if (posts.length === 0) notFound();

  return (
    <Container className="relative mx-auto min-h-screen px-8 pt-32 md:px-20 md:pt-36 md:pb-10">
      <EdgeRails />

      <header>
        <Link
          href="/blog"
          className="group inline-flex items-center gap-1.5 font-custom2 text-[11px] uppercase tracking-[0.18em] text-neutral-400 transition-colors hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
          All blogs
        </Link>

        <h1 className="mt-5 font-custom text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          <span className="link--elara">{tag}</span>
        </h1>

        <p className={`mt-2 ${META}`}>
          {posts.length} {posts.length === 1 ? "post" : "posts"}
        </p>
      </header>

      <div className={`${rule} my-6`} />

      <ol>
        {posts.map((p, i) => (
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
              <div className={`${META} md:pt-1.5`}>
                {p.date && (
                  <p className="whitespace-nowrap">
                    {new Date(p.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                )}
                {p.readingTime && (
                  <p className="mt-1 whitespace-nowrap opacity-70">{p.readingTime} min read</p>
                )}
              </div>

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
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </Container>
  );
}
