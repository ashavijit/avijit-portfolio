"use client";

import React from "react";
import { GraduationCap } from "lucide-react";
import { site } from "@/lib/site";

export default function Education() {
  const { school, degree, grade, dates, location } = site.education;

  return (
    <div className="w-full mt-4 relative">
      <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-2 -mx-2 md:-mx-14"></div>
      <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-950 dark:text-neutral-50 py-2">
        <span className="link--elara">Education</span>
      </h1>
      <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-4 -mx-2 md:-mx-14"></div>

      <div className="flex items-center gap-4 py-3">
        <div className="w-12 h-12 rounded-lg border border-neutral-200/80 dark:border-neutral-700 p-[2px] bg-neutral-50 dark:bg-neutral-900 shrink-0">
          <div className="flex w-full h-full items-center justify-center rounded-md border border-neutral-200/60 dark:border-neutral-700/70 bg-neutral-100 dark:bg-neutral-800/60">
            <GraduationCap className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-base md:text-lg text-neutral-950 dark:text-neutral-50 truncate">
              {school}
            </span>
            <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-neutral-700 text-xs text-neutral-100 font-medium border border-neutral-600">
              {grade}
            </span>
          </div>
          <span className="block text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-custom2 truncate">
            {degree}
          </span>
        </div>

        <div className="text-right min-w-[120px]">
          <div className="text-xs md:text-sm font-semibold text-neutral-950 dark:text-neutral-50">
            {dates}
          </div>
          <div className="text-xs text-neutral-600 dark:text-neutral-400">{location}</div>
        </div>
      </div>
    </div>
  );
}
