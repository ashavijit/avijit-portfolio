import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";
import { projects, getProject } from "@/lib/projects";
import { iconMap, techNames, STATUS_META } from "@/components/tech-icons";
import { site } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, Globe, Star } from "lucide-react";

type PageParams = Promise<{ slug: string }>;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: PageParams }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: `Project not found | ${site.name}` };

  return {
    title: `${project.title} | ${site.name}`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: PageParams }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const status = STATUS_META[project.status ?? "shipped"];
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const facts: { label: string; value: string }[] = [
    { label: "Year", value: project.year },
    { label: "Language", value: project.language },
    { label: "Status", value: status.label },
  ];
  if (project.starsText) facts.push({ label: "Stars", value: project.starsText });

  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-screen px-8 pt-32 md:px-20 md:pt-36 md:pb-10 mx-auto">
        <EdgeRails />

        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-xs font-custom2 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          All projects
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-3xl md:text-4xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
              <span className="link--elara">{project.title}</span>
            </h1>
            <p className="mt-2 max-w-2xl text-sm md:text-base font-custom2 text-neutral-600 dark:text-neutral-400 tracking-tight">
              {project.summary}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-linear-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 px-4 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
            >
              <Github className="w-4 h-4" />
              Source
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-linear-to-b from-white to-neutral-100 dark:from-neutral-800 dark:to-neutral-900 px-4 py-2 text-sm font-medium text-neutral-800 dark:text-neutral-200 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
              >
                <Globe className="w-4 h-4" />
                {project.liveLabel ?? "Live"}
              </a>
            )}
          </div>
        </div>

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-6 -mx-2 md:-mx-14" />

        {/* Facts */}
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-neutral-200 dark:border-neutral-800 bg-neutral-200 dark:bg-neutral-800 sm:grid-cols-4">
          {facts.map((f) => (
            <div key={f.label} className="bg-white dark:bg-black px-4 py-3">
              <dt className="text-[10px] uppercase tracking-widest font-custom2 text-neutral-500 dark:text-neutral-500">
                {f.label}
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 text-sm font-medium text-neutral-900 dark:text-neutral-100">
                {f.label === "Status" && (
                  <span className={`inline-block h-2 w-2 shrink-0 rounded-full ${status.dot}`} />
                )}
                {f.label === "Stars" && (
                  <Star size={12} fill="currentColor" className="shrink-0 text-amber-500/90 dark:text-amber-400" />
                )}
                <span className="truncate">{f.value}</span>
              </dd>
            </div>
          ))}
        </dl>

        {/* What it does */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="link--elara">What it does</span>
          </h2>
          <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-4 -mx-2 md:-mx-14" />
          <ul className="flex flex-col gap-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 text-sm font-custom2 leading-relaxed text-neutral-700 dark:text-neutral-300">
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>

        {project.notes && project.notes.length > 0 && (
          <section className="mt-10">
            <h2 className="text-2xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
              <span className="link--elara">Design notes</span>
            </h2>
            <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-4 -mx-2 md:-mx-14" />
            <div className="flex flex-col gap-3">
              {project.notes.map((n) => (
                <p
                  key={n}
                  className="border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 text-sm font-custom2 leading-relaxed text-neutral-600 dark:text-neutral-400"
                >
                  {n}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Stack */}
        <section className="mt-10">
          <h2 className="text-2xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="link--elara">Stack</span>
          </h2>
          <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-4 -mx-2 md:-mx-14" />
          <div className="flex flex-wrap gap-2">
            {project.tech.map((item) => {
              const isKey = typeof item === "string";
              const label = isKey ? techNames[item] : item.label;
              const Icon = isKey ? iconMap[item] : null;
              return (
                <span
                  key={label}
                  className="flex items-center gap-1.5 rounded-md border border-neutral-200 dark:border-neutral-700/50 bg-neutral-100 dark:bg-neutral-800/80 px-2.5 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200"
                >
                  {Icon && <Icon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />}
                  {label}
                </span>
              );
            })}
          </div>
        </section>

        {/* Next project */}
        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mt-12 mb-6 -mx-2 md:-mx-14" />
        <Link
          href={`/projects/${next.slug}`}
          className="group mb-10 flex items-center justify-between gap-4 rounded-md border border-neutral-200 dark:border-neutral-800 p-5 transition-colors hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <div className="min-w-0">
            <span className="text-[10px] uppercase tracking-widest font-custom2 text-neutral-500 dark:text-neutral-500">
              Next project
            </span>
            <p className="mt-1 text-lg font-bold font-custom text-neutral-900 dark:text-neutral-100">
              {next.title}
            </p>
          </div>
          <span className="shrink-0 text-neutral-400 transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </Container>
    </div>
  );
}
