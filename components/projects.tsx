"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AnimatedButton from "@/components/ui/AnimatedButton";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Github, Star, X, ArrowUpRight, Play } from "lucide-react";
import { projects } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import { iconMap, techNames, STATUS_META } from "@/components/tech-icons";

/**
 * A project card is a spec sheet, not a screenshot: language and year up top,
 * the pitch in the middle, stack and status along the bottom. Nothing here
 * pretends to be a picture of the thing.
 */
const ProjectCard = ({
  project,
  setActiveVideo,
}: {
  project: Project;
  setActiveVideo: (video: string) => void;
}) => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);
  const status = STATUS_META[project.status ?? "shipped"];

  return (
    <motion.div
      className="group relative flex h-full flex-col rounded-md border border-neutral-200 bg-white/60 p-5
                 transition-all duration-300 hover:border-neutral-300 hover:shadow-2xl hover:shadow-neutral-500/5
                 dark:border-neutral-800 dark:bg-neutral-950/40 dark:hover:border-neutral-700"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* The whole card is the link; the icon buttons below sit above it. */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`${project.title} — project details`}
        className="absolute inset-0 z-10 rounded-md"
      />

      {/* Meta line */}
      <div className="flex items-center justify-between gap-3">
        <span className="font-custom2 text-[10px] uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
          {project.language} · {project.year}
        </span>

        {project.starsText && (
          <span className="inline-flex shrink-0 items-center gap-1.5 font-custom2 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
            <Star
              size={11}
              fill="currentColor"
              className="text-amber-500/90 dark:text-amber-400"
            />
            {project.starsText}
          </span>
        )}
      </div>

      {/* Title */}
      <div className="mt-3 flex items-start justify-between gap-3">
        <h3 className="flex items-start gap-1.5 font-custom text-xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          {project.title}
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </h3>

        <div className="relative z-20 flex shrink-0 items-center gap-3 pt-1">
          {project.live && (
            <button
              type="button"
              aria-label={`${project.title} — live site`}
              title={project.liveLabel ?? "Live"}
              onClick={() => window.open(project.live, "_blank")}
              className="cursor-pointer text-neutral-700 opacity-50 transition hover:opacity-100 dark:text-neutral-300"
            >
              <Globe size={16} />
            </button>
          )}
          <button
            type="button"
            aria-label={`${project.title} — source`}
            title="Source"
            onClick={() => window.open(project.github, "_blank")}
            className="cursor-pointer text-neutral-700 opacity-50 transition hover:opacity-100 dark:text-neutral-300"
          >
            <Github size={16} />
          </button>
        </div>
      </div>

      {/* Pitch */}
      <p className="mt-2 line-clamp-3 font-custom2 text-sm leading-relaxed text-neutral-600 transition-colors duration-300 group-hover:text-neutral-900 dark:text-neutral-400 dark:group-hover:text-neutral-200">
        {project.tagline}
      </p>

      {/* Stack + status pinned to the bottom so cards line up in the grid */}
      <div className="mt-auto pt-5">
        <div className="border-t border-neutral-200/70 dark:border-neutral-800/70" />

        {/* Stacked on phones: wrapping tech chips otherwise shunt the status
            pill out of line. */}
        <div className="flex flex-col items-start gap-3 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {project.tech.map((item) => {
              const key = typeof item === "string" ? item : item.label;
              const isIconItem = typeof item === "string";
              const tooltipText = isIconItem
                ? techNames[item]
                : item.tooltip || item.label;
              const uniqueId = `${project.title}-${key}`;

              return (
                <div
                  key={key}
                  className="relative z-20 flex h-5 items-center"
                  onMouseEnter={() => setHoveredTech(uniqueId)}
                  onMouseLeave={() => setHoveredTech(null)}
                >
                  {isIconItem ? (
                    (() => {
                      const TechIcon = iconMap[item];
                      return (
                        <TechIcon className="h-4 w-4 text-neutral-400 transition-colors hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-100" />
                      );
                    })()
                  ) : (
                    <span className="inline-flex h-5 items-center rounded border border-neutral-200 px-1.5 font-custom2 text-[9px] leading-none text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                      {item.label}
                    </span>
                  )}
                  <AnimatePresence>
                    {hoveredTech === uniqueId && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="pointer-events-none absolute -top-8 left-1/2 z-50 -translate-x-1/2"
                      >
                        <div className="whitespace-nowrap rounded bg-neutral-900 px-2 py-0.5 font-custom2 text-[10px] text-neutral-100 shadow-xl dark:bg-neutral-100 dark:text-neutral-900">
                          {tooltipText}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {project.video && (
              <button
                type="button"
                onClick={() => setActiveVideo(project.video!)}
                className="relative z-20 inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 font-custom2 text-[10px] font-medium text-neutral-700 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-black dark:text-neutral-200 dark:hover:border-neutral-700"
              >
                <Play size={9} fill="currentColor" />
                Demo
              </button>
            )}

            <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1 font-custom2 text-[10px] font-medium text-neutral-700 dark:border-neutral-800 dark:bg-black dark:text-neutral-200">
              <span className="relative flex h-2 w-2">
                <span
                  className={`absolute inline-flex h-full w-full rounded-full ${status.dot} animate-[statusDotPulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none`}
                />
                <span className={`relative inline-flex h-2 w-2 rounded-full ${status.dot}`} />
              </span>
              {status.label}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = ({ showAll = false }: { showAll?: boolean }) => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveVideo(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="mt-8">
      {/* Subtitle */}
      <p
        className="
          font-custom2 text-neutral-700 dark:text-neutral-300 mt-3 px-4 py-[7px]
           text-sm inline-block
          bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border
        "
      >
        Tools I build when a problem annoys me enough — mostly Go, TypeScript and Python.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2">
        {(showAll ? projects : projects.slice(0, 2)).map((project, idx) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <ProjectCard project={project} setActiveVideo={setActiveVideo} />
          </motion.div>
        ))}
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideo(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-black rounded-xl overflow-hidden w-[90%] max-w-3xl shadow-2xl"
            >
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 p-2 bg-neutral-800/80 hover:bg-neutral-700 rounded-full cursor-pointer transition-colors z-50"
              >
                <X size={20} className="text-neutral-200" />
              </button>

              {activeVideo.includes("youtube") ? (
                <iframe
                  src={activeVideo}
                  className="w-full aspect-video border-0"
                  allowFullScreen
                ></iframe>
              ) : (
                <video
                  src={activeVideo}
                  className="w-full h-auto"
                  controls
                  autoPlay
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showAll && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center mt-4"
        >
          <Link href="/projects">
            <AnimatedButton className="group relative overflow-hidden rounded-lg
                      bg-linear-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900
                      border border-neutral-200 dark:border-neutral-800
                      text-neutral-800 dark:text-neutral-200 text-sm font-medium px-6 py-2.5
                      transition-all duration-300
                      hover:from-neutral-50 hover:to-neutral-100 dark:hover:from-neutral-800 dark:hover:to-neutral-800
                      shadow-[0_1px_2px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,1)]
                      dark:shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]"
            >
              View all projects
            </AnimatedButton>
          </Link>
        </motion.div>
      )}
    </div>
  );
};

export default Projects;
