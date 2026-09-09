"use client";

import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";
import Link from "next/link";
import { useEffect } from "react";
import { RotateCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container className="relative mx-auto min-h-screen px-8 pt-32 md:px-20 md:pt-36 md:pb-10">
      <EdgeRails />

      <p className="font-custom2 text-[11px] uppercase tracking-[0.22em] text-neutral-400 dark:text-neutral-500">
        Something broke
      </p>

      <h1 className="mt-1 font-custom text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl dark:text-neutral-50">
        <span className="link--elara">That is on me</span>
      </h1>

      <p className="mt-3 max-w-lg font-custom2 text-sm leading-relaxed text-neutral-600 md:text-base dark:text-neutral-400">
        This page failed to render. Retrying often works — it may have been a
        transient failure.
      </p>

      {/* The digest is the only handle on a production stack trace. */}
      {error.digest && (
        <p className="mt-4 font-mono text-[11px] text-neutral-400 dark:text-neutral-600">
          digest {error.digest}
        </p>
      )}

      <div className="my-9 -mx-2 w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 md:-mx-14 dark:opacity-15" />

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex cursor-pointer items-center gap-2 rounded-md border border-neutral-200 px-4 py-2 font-custom2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:text-neutral-200 dark:hover:border-neutral-700"
        >
          <RotateCw className="h-4 w-4" />
          Try again
        </button>

        <Link
          href="/"
          className="inline-flex items-center rounded-md px-4 py-2 font-custom2 text-sm text-neutral-500 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          Go home
        </Link>
      </div>
    </Container>
  );
}
