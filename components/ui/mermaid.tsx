"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useHydrated } from "@/lib/use-hydrated";

/**
 * Renders a Mermaid diagram inside MDX.
 *
 * Mermaid is ~500KB, so it is imported dynamically and only on the client —
 * pages without a diagram never pay for it. The chart is re-rendered when the
 * theme flips because Mermaid bakes colours into the SVG at parse time.
 *
 * Authoring, two rules that are not obvious:
 *   1. Pass `chart` as a quoted string, NOT an expression — next-mdx-remote's
 *      RSC path drops `chart={`...`}` and the component arrives with no props.
 *      Single-quote the attribute so the chart can contain double quotes.
 *   2. No blank lines inside the chart. A blank line ends the JSX block in MDX
 *      and the element gets cut in half.
 */
export default function Mermaid({
  chart,
  caption,
}: {
  chart?: string;
  caption?: string;
}) {
  const source = chart?.trim() ?? "";
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const [svg, setSvg] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const holder = useRef<HTMLDivElement>(null);
  // Mermaid needs a DOM-safe unique id per render target.
  const id = `mermaid-${useId().replace(/[:«»]/g, "")}`;

  useEffect(() => {
    if (!hydrated || !source) return;
    let cancelled = false;

    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        const isDark = resolvedTheme === "dark";

        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          fontFamily: "var(--font-custom2), ui-sans-serif, system-ui",
          themeVariables: isDark
            ? {
                background: "transparent",
                primaryColor: "#171717",
                primaryTextColor: "#e5e5e5",
                primaryBorderColor: "#404040",
                secondaryColor: "#0f0f0f",
                tertiaryColor: "#0a0a0a",
                lineColor: "#525252",
                textColor: "#d4d4d4",
                mainBkg: "#171717",
                nodeBorder: "#404040",
                clusterBkg: "#0f0f0f",
                clusterBorder: "#2a2a2a",
                edgeLabelBackground: "#0c0c0c",
                actorBkg: "#171717",
                actorBorder: "#404040",
                actorTextColor: "#e5e5e5",
                signalColor: "#a3a3a3",
                signalTextColor: "#d4d4d4",
                labelBoxBkgColor: "#171717",
                labelBoxBorderColor: "#404040",
                labelTextColor: "#e5e5e5",
                loopTextColor: "#d4d4d4",
                noteBkgColor: "#1c1c1c",
                noteBorderColor: "#404040",
                noteTextColor: "#d4d4d4",
                sequenceNumberColor: "#0c0c0c",
              }
            : {
                background: "transparent",
                primaryColor: "#ffffff",
                primaryTextColor: "#171717",
                primaryBorderColor: "#d4d4d4",
                secondaryColor: "#fafafa",
                tertiaryColor: "#f5f5f5",
                lineColor: "#a3a3a3",
                textColor: "#404040",
                mainBkg: "#ffffff",
                nodeBorder: "#d4d4d4",
                clusterBkg: "#fafafa",
                clusterBorder: "#e5e5e5",
                edgeLabelBackground: "#fafafa",
                actorBkg: "#ffffff",
                actorBorder: "#d4d4d4",
                actorTextColor: "#171717",
                signalColor: "#737373",
                signalTextColor: "#404040",
                labelBoxBkgColor: "#ffffff",
                labelBoxBorderColor: "#d4d4d4",
                labelTextColor: "#171717",
                loopTextColor: "#404040",
                noteBkgColor: "#f5f5f5",
                noteBorderColor: "#d4d4d4",
                noteTextColor: "#404040",
                sequenceNumberColor: "#ffffff",
              },
        });

        const { svg: rendered } = await mermaid.render(id, source);
        if (!cancelled) {
          setSvg(rendered);
          setFailed(false);
        }
      } catch {
        // A malformed chart shouldn't take the whole post down — fall back to
        // showing the source, which is still readable.
        if (!cancelled) setFailed(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [source, hydrated, resolvedTheme, id]);

  if (!source) return null;

  if (failed) {
    return (
      <pre className="not-prose overflow-x-auto rounded-md border border-neutral-200 bg-neutral-50 p-4 text-[13px] dark:border-neutral-800 dark:bg-neutral-900/70">
        <code>{source}</code>
      </pre>
    );
  }

  return (
    <figure className="not-prose my-8">
      <div
        className="overflow-x-auto rounded-md border border-neutral-200 bg-neutral-50/60 px-4 py-6
                   dark:border-neutral-800 dark:bg-neutral-900/40"
      >
        {svg ? (
          <div
            ref={holder}
            className="[&_svg]:mx-auto [&_svg]:h-auto [&_svg]:max-h-[32rem] [&_svg]:max-w-full"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        ) : (
          // Reserve height so the post doesn't jump when the diagram lands.
          <div className="h-48 animate-pulse rounded bg-neutral-200/40 dark:bg-neutral-800/40" />
        )}
      </div>

      {caption && (
        <figcaption className="mt-3 text-center font-custom2 text-xs text-neutral-500 dark:text-neutral-500">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
