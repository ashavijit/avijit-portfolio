"use client";

import React from "react";
import type { ComponentType } from "react";
import {
    SiReact,
    SiJavascript,
    SiTypescript,
    SiNodedotjs,
    SiNextdotjs,
    SiSolid,
    SiTailwindcss,
    SiNestjs,
    SiExpress,
    SiGin,
    SiGo,
    SiDjango,
    SiFastapi,
    SiPostgresql,
    SiMongodb,
    SiRedis,
    SiPython,
    SiDocker,
    SiKubernetes,
    SiGit,
    SiPosthog,
    SiAmazonwebservices,
} from "react-icons/si";
import { FaDatabase } from "react-icons/fa";
import { KeyRound, Radio, Activity } from "lucide-react";

type Icon = ComponentType<{ className?: string }>;

const groups: { label: string; items: { name: string; icon: Icon }[] }[] = [
    {
        label: "Languages",
        items: [
            { name: "TypeScript", icon: SiTypescript },
            { name: "JavaScript", icon: SiJavascript },
            { name: "Go", icon: SiGo },
            { name: "Python", icon: SiPython },
            { name: "SQL", icon: FaDatabase },
        ],
    },
    {
        label: "Frontend",
        items: [
            { name: "React", icon: SiReact },
            { name: "Next.js", icon: SiNextdotjs },
            { name: "SolidJS", icon: SiSolid },
            { name: "Tailwind CSS", icon: SiTailwindcss },
        ],
    },
    {
        label: "Backend",
        items: [
            { name: "Node.js", icon: SiNodedotjs },
            { name: "NestJS", icon: SiNestjs },
            { name: "Express", icon: SiExpress },
            { name: "Go / Gin", icon: SiGin },
            { name: "Django", icon: SiDjango },
            { name: "FastAPI", icon: SiFastapi },
            { name: "WebSockets", icon: Radio },
        ],
    },
    {
        label: "Data & Tools",
        items: [
            { name: "MongoDB", icon: SiMongodb },
            { name: "PostgreSQL", icon: SiPostgresql },
            { name: "Redis", icon: SiRedis },
            { name: "AWS", icon: SiAmazonwebservices },
            { name: "Docker", icon: SiDocker },
            { name: "Kubernetes", icon: SiKubernetes },
            { name: "PostHog", icon: SiPosthog },
            { name: "Jitsu", icon: Activity },
            { name: "SuperTokens", icon: KeyRound },
            { name: "Git", icon: SiGit },
        ],
    },
];

export default function Skills() {
    return (
        <div className="w-full mt-4 relative">
            <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-2 -mx-2 md:-mx-14"></div>
            <div className="flex flex-col items-start space-y-3">
                <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50 py-2">
                    <span className="link--elara">Skills</span>
                </h1>
            </div>
            <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-4 -mx-2 md:-mx-14"></div>

            <div className="flex flex-col items-start">
                <p className="font-custom2 text-neutral-700 dark:text-neutral-300 mt-3 px-2 py-[7px] text-sm inline-block bg-neutral-100 dark:bg-neutral-900 border-dashed border-neutral-300 dark:border-neutral-700 border mb-6">
                    The stack I reach for — backend-heavy, with enough frontend to ship the whole thing.
                </p>

                <div className="flex w-full flex-col gap-5">
                    {groups.map((group) => (
                        <div key={group.label} className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-6">
                            <span className="shrink-0 w-32 pt-1.5 text-xs font-medium uppercase tracking-widest text-neutral-500 dark:text-neutral-500 font-custom2">
                                {group.label}
                            </span>
                            <div className="flex flex-wrap items-center gap-2">
                                {group.items.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700/50 hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors cursor-default"
                                    >
                                        <skill.icon className="w-4 h-4 text-neutral-600 dark:text-neutral-300" />
                                        <span className="text-xs font-medium text-neutral-700 dark:text-neutral-200">
                                            {skill.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
