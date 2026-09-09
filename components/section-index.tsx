"use client";

import { useEffect, useState } from "react";

export type IndexItem = { id: string; label: string };

/**
 * Fixed table-of-contents in the right gutter. Tracks the section currently
 * in view and scrolls to it on click. Hidden below xl, where there's no gutter.
 */
export default function SectionIndex({ items }: { items: IndexItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const nodes = items
      .map((i) => document.getElementById(i.id))
      .filter((n): n is HTMLElement => n !== null);
    if (!nodes.length) return;

    // Pick the section whose top is closest to (but still above) the reading line.
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = nodes[0].id;
      for (const node of nodes) {
        if (node.getBoundingClientRect().top <= line) current = node.id;
        else break;
      }
      // At the very bottom, the last section wins even if it's short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
        current = nodes[nodes.length - 1].id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-8 top-32 z-30 hidden xl:block 2xl:right-16"
    >
      <span className="block pl-5 text-[10px] font-custom2 uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-600">
        Index
      </span>
      <ul className="mt-3 flex flex-col gap-1">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => go(item.id)}
                aria-current={isActive ? "true" : undefined}
                className={`group flex items-center gap-2 py-1 text-left text-sm transition-colors duration-200 ${
                  isActive
                    ? "text-neutral-900 dark:text-neutral-50"
                    : "text-neutral-400 dark:text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-300 ${
                    isActive
                      ? "w-3 bg-neutral-900 dark:bg-neutral-50"
                      : "w-0 bg-neutral-400 group-hover:w-2"
                  }`}
                />
                <span className={isActive ? "font-medium" : ""}>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
