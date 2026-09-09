"use client";

import React, { useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

type Role = {
  title: string;
  company: string;
  href?: string;
  monogram: string;
  accent: string;
  points: string[];
  tech: string[];
  type?: string;
  dates: string;
  location: string;
};

export const Timeline = () => {
  // Track which experience is open (by index)
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const roles: Role[] = [
    {
      title: "Software Engineer",
      company: "Hoichoi",
      href: "https://www.hoichoi.tv/",
      monogram: "hc",
      accent: "#E11D48",
      type: "Full Time",
      dates: "Apr 2026 — Present",
      location: "India",
      points: [
        "Migrated core web pages and clients from Next.js to SolidJS/SolidStart, improving performance by 15% and consolidating builds into a single repo for LG webOS, Samsung Tizen OS and Hisense VIDAA TV.",
        "Built an in-house, self-hosted analytics stack with PostHog and Jitsu; created SDK wrappers for browser, Node.js server and Go, then integrated tracking across backend payment services and web clients.",
        "Developing backend services with Go/Gin, NestJS, TypeScript, MongoDB, PostgreSQL and SuperTokens, resolving production bugs and shipping reliability and product improvements.",
      ],
      tech: ["SolidJS", "Next.js", "TypeScript", "Go / Gin", "NestJS", "MongoDB", "PostgreSQL", "PostHog"],
    },
    {
      title: "Software Development Engineer I",
      company: "Derivix",
      monogram: "dx",
      accent: "#0EA5E9",
      type: "Founding Team",
      dates: "Feb 2024 — Mar 2026",
      location: "Noida, India",
      points: [
        "Architected a low-latency options trading engine using Node.js, Python, Redis and WebSockets, processing 10K+ market ticks/sec with sub-100ms latency for real-time F&O strategy execution.",
        "Built an automated index strike ratio system (TrackYourTheta) with Python, Redis pub/sub and an event-driven architecture, achieving 99.9% uptime during market hours.",
        "Developed a backtesting platform using React, FastAPI and MongoDB, enabling strategy testing against 5+ years of historical data with full P&L analytics.",
        "Led the backend migration from Node.js/Express to Golang/Gin, improving throughput by 40% and cutting memory usage by 30% through optimized goroutine patterns.",
      ],
      tech: ["Go / Gin", "Node.js", "Python", "Redis", "WebSockets", "React", "FastAPI", "MongoDB"],
    },
    {
      title: "Full Stack Developer Intern",
      company: "Latracal Solutions",
      monogram: "lt",
      accent: "#8B5CF6",
      type: "Internship",
      dates: "Feb 2023 — Mar 2023",
      location: "IIT Bombay Research Park, Mumbai",
      points: [
        "Optimized AWS Lambda functions through profiling and refactoring, reducing execution time by 25% and adding connection pooling to minimize cold starts.",
        "Designed DynamoDB access patterns using composite keys (PK-SK) and GSI optimizations, improving query performance by 15% and reducing cost by 20%.",
      ],
      tech: ["AWS Lambda", "DynamoDB", "Node.js", "Serverless"],
    },
    {
      title: "Backend Engineering Intern",
      company: "Seeders Media LLP",
      href: "https://www.shethepeople.tv/",
      monogram: "sm",
      accent: "#F59E0B",
      type: "Internship",
      dates: "Jul 2022 — Dec 2022",
      location: "Gurugram, India",
      points: [
        "Developed 10+ RESTful APIs with Django REST Framework on AWS EC2, optimizing queries with Redis caching for 40% faster response times.",
        "Managed CI/CD pipelines for 4 microservices using Docker, Kubernetes and Travis CI, cutting deployment time from 30 min to 8 min at a 99.5% success rate.",
      ],
      tech: ["Django REST", "Python", "Redis", "Docker", "Kubernetes", "AWS EC2"],
    },
  ];

  return (
    <div>

      <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-950 dark:text-neutral-50 pb-2 mt-2">
        <span className="link--elara">Experience</span>
      </h1>
      <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 mb-4 -mx-2 md:-mx-14"></div>
      <div className="flex flex-col gap-4">
        {roles.map((role, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={role.company} className="relative pb-2 -mx-2 md:-mx-14 px-2 md:px-14">
              <div
                className="flex items-center gap-4 group py-3 cursor-pointer"
                onClick={() => setOpenIdx(isOpen ? null : idx)}
              >
                {/* Monogram */}
                <div className="w-12 h-12 rounded-lg border border-neutral-200/80 dark:border-neutral-700 p-[2px] bg-neutral-50 dark:bg-neutral-900 shrink-0">
                  <div
                    className="flex w-full h-full items-center justify-center rounded-md border border-neutral-200/60 dark:border-neutral-700/70 font-custom font-bold text-lg lowercase tracking-tight"
                    style={{
                      color: role.accent,
                      backgroundColor: `color-mix(in oklab, ${role.accent} 12%, transparent)`,
                    }}
                  >
                    {role.monogram}
                  </div>
                </div>
                {/* Main summary info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-base md:text-lg text-neutral-950 dark:text-neutral-50 truncate">
                      {role.company}
                    </span>
                    {role.type && (
                      <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded bg-neutral-700 text-xs text-neutral-100 font-medium border border-neutral-600">
                        {role.type}
                      </span>
                    )}
                  </div>
                  <span className="block text-xs md:text-sm text-neutral-600 dark:text-neutral-400 font-custom2 truncate">
                    {role.title}
                  </span>
                </div>
                {/* Dates and location */}
                <div className="text-right min-w-[120px]">
                  <div className="text-xs md:text-sm font-semibold text-neutral-950 dark:text-neutral-50">
                    {role.dates}
                  </div>
                  <div className="text-xs text-neutral-600 dark:text-neutral-400">
                    {role.location}
                  </div>
                </div>
                {/* Arrow */}
                <div className="ml-2 flex items-center justify-center w-7 h-7 p-0 bg-transparent border-none shadow-none focus:outline-none group">
                  <FiChevronDown
                    className={`w-5 h-5 transition-transform duration-300 stroke-[2.2] ${isOpen ? 'rotate-180 text-neutral-950 dark:text-neutral-50' : 'text-neutral-500 dark:text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-neutral-50'}`}
                    aria-hidden="true"
                  />
                  <span className="sr-only">{isOpen ? 'Hide details' : 'Show details'}</span>
                </div>
              </div>
              {/* Details section with smooth accordion animation */}
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
              >
                <div className="overflow-hidden">
                  <div className={`${isOpen ? 'py-4 opacity-100 translate-y-0' : 'py-0 opacity-0 -translate-y-2'} transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]`}>
                    <ul className="mb-4 list-disc list-outside pl-4 text-neutral-800 dark:text-neutral-200 text-sm space-y-2 font-custom2">
                      {role.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {role.tech.map((name) => (
                        <div
                          key={name}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-950 dark:text-neutral-200 shadow-sm"
                        >
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {idx !== roles.length - 1 && (
                <div
                  className="absolute bottom-0 left-0 w-full h-[1px] opacity-100 dark:opacity-15"
                  style={{
                    backgroundImage: "linear-gradient(to right, var(--pattern-fg) 50%, transparent 50%)",
                    backgroundSize: "15px 1px",
                    backgroundRepeat: "repeat-x"
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
