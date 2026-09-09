"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import { useHydrated } from "@/lib/use-hydrated";

/**
 * Theme-aware hero for a blog post. Mirrors ProjectCover so posts and
 * projects share one visual system.
 */
export default function PostCover({
  src,
  lightSrc,
  alt,
}: {
  src: string;
  lightSrc?: string;
  alt: string;
}) {
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const isLight = hydrated && resolvedTheme === "light";

  return (
    <div className="my-8 overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800">
      <Image
        src={isLight && lightSrc ? lightSrc : src}
        alt={alt}
        width={1200}
        height={400}
        priority
        className="w-full h-auto"
      />
    </div>
  );
}
