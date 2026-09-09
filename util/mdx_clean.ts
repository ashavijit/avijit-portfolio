import matter from "gray-matter";
import { RAW_POSTS } from "@/util/blog-index.generated";

export type BlogMeta = {
  title?: string;
  slug?: string;
  date?: string;
  description?: string;
  image?: string;
  /** Light-theme variant of `image`, if the cover has one. */
  imageLight?: string;
  tags?: string[];
  /** Estimated minutes to read, derived from the body at read time. */
  readingTime?: number;
};

const WORDS_PER_MINUTE = 200;

/** Rough but stable: strip code fences and markup, then count words. */
function readingTime(body: string) {
  const words = body
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`~[\]()|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export type Blog = {
  content: string;
  data: BlogMeta;
};

const CACHE = new Map<string, Blog>();

// Posts never change once a build is out, but during `next dev` the whole point
// is that editing an .mdx file shows up on reload — so the cache is prod-only.
const USE_CACHE = process.env.NODE_ENV === "production";

function normalizeSlug(slug: string) {
  return slug.replace(/\.mdx?$/i, "");
}

export const getSingleBlog = async (slug: string): Promise<Blog> => {
  const key = normalizeSlug(slug);
  if (USE_CACHE && CACHE.has(key)) return CACHE.get(key)!;

  const raw = RAW_POSTS[key];
  if (raw === undefined) throw new Error(`No such post: ${key}`);

  const parsed = matter(raw);
  const data = parsed.data as BlogMeta;
  data.slug = data.slug ?? key;
  // Convert date to string if it's a Date object
  if (data.date && typeof data.date === 'object' && 'toISOString' in data.date) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data.date = (data.date as any).toISOString().split('T')[0];
  }
  data.readingTime = readingTime(parsed.content);

  const result: Blog = { content: parsed.content, data };
  if (USE_CACHE) CACHE.set(key, result);
  return result;
};

export const getAllBlogs = async (): Promise<BlogMeta[]> => {
  const blogs: BlogMeta[] = [];
  for (const [file, raw] of Object.entries(RAW_POSTS)) {
    try {
      const parsed = matter(raw);
      const meta = parsed.data as BlogMeta;
      meta.slug = meta.slug ?? normalizeSlug(file);
      // Convert date to string if it's a Date object
      if (meta.date && typeof meta.date === 'object' && 'toISOString' in meta.date) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        meta.date = (meta.date as any).toISOString().split('T')[0];
      }
      meta.readingTime = readingTime(parsed.content);
      blogs.push(meta);
    } catch (err) {
      console.warn("Failed to read blog", file, err);
    }
  }

  blogs.sort((a, b) => {
    if (!a.date && !b.date) return 0;
    if (!a.date) return 1;
    if (!b.date) return -1;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return blogs;
};

