import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Not found | Avijit Sen",
  description: "That page does not exist.",
};

const DESTINATIONS = [
  { href: "/", label: "Home", hint: "Projects, experience, contact" },
  { href: "/blog", label: "Writing", hint: "Backend systems and latency notes" },
  { href: "/projects", label: "Projects", hint: "Tools, queues, developer tooling" },
  { href: "/Contact", label: "Contact", hint: "Email and socials" },
];

export default function NotFound() {
  return (
    <Container className="relative mx-auto min-h-screen px-8 pt-32 md:px-20 md:pt-36 md:pb-10">
      <EdgeRails />

      <header>
        <p className="font-custom2 text-[11px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
          Error 404
        </p>

        <h1 className="mt-1 font-custom text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50">
          <span className="link--elara">Nothing here</span>
        </h1>

        <p className="mt-3 max-w-lg font-custom2 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400">
          The page you asked for does not exist — moved, renamed, or never
          written. Nothing is broken on your end.
        </p>
      </header>

      <div className="my-9 -mx-2 w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 md:-mx-14 dark:opacity-15" />

      <nav aria-label="Where to go instead">
        <p className="font-custom2 text-[11px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">
          Try one of these
        </p>

        <ul className="mt-2">
          {DESTINATIONS.map(({ href, label, hint }) => (
            <li key={href} className="border-b border-neutral-200/70 last:border-b-0 dark:border-neutral-800/60">
              <Link
                href={href}
                className="group -mx-3 flex items-center justify-between gap-4 rounded-lg px-3 py-4 transition-colors hover:bg-neutral-100/60 dark:hover:bg-neutral-900/40"
              >
                <span className="min-w-0">
                  <span className="flex items-center gap-1.5 font-custom text-lg font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                    {label}
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                  </span>
                  <span className="mt-0.5 block font-custom2 text-sm text-neutral-600 dark:text-neutral-400">
                    {hint}
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Container>
  );
}
