"use client";

import Image from "next/image";
import { useTheme } from "next-themes";
import type { Project } from "@/lib/projects";
import { useHydrated } from "@/lib/use-hydrated";

/** Theme-aware hero image for a project detail page. */
export default function ProjectCover({ project }: { project: Project }) {
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const isLight = hydrated && resolvedTheme === "light";

  const src = isLight && project.lightModeSrc ? project.lightModeSrc : project.src;
  const ambient = (isLight && project.lightModeBackgroundImage) || project.backgroundImage;

  return (
    <div className="relative overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 p-[6px]">
      {ambient && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: `url('${ambient}')` }}
        />
      )}
      <div className="relative overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-800">
        <Image
          src={src}
          alt={`${project.title} cover`}
          width={1200}
          height={800}
          priority
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );
}
