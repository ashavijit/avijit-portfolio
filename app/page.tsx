"use client";

import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";

import Projects from "@/components/projects";
import { Github, Linkedin, Mail } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import Timeline from "@/components/timeline";
import Education from "@/components/education";
import GithubGraph from "@/components/githubgraph";
import Skills from "@/components/skills";
import GetInTouch from "@/components/get-in-touch";
import SectionIndex from "@/components/section-index";
import { site } from "@/lib/site";

const SECTIONS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "open-source", label: "Open Source" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export default function Home() {

  const socials = [
    {
      name: "GitHub",
      icon: Github,
      action: () => window.open(site.socials.github, "_blank"),
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      action: () => window.open(site.socials.linkedin, "_blank"),
    },
    {
      name: "LeetCode",
      icon: SiLeetcode,
      action: () => window.open(site.socials.leetcode, "_blank"),
    },
    {
      name: "Email",
      icon: Mail,
      action: () => (window.location.href = site.socials.email),
    },
  ];

  return (
    <div className="relative flex min-h-screen justify-center font-sans overflow-hidden">
      <Container className="min-h-screen px-8 pt-32 md:px-20 md:pt-36 md:pb-10 mx-auto ">
        <EdgeRails />




        {/* ---------------------------------------- */}
        {/* HEADING + SOCIALS (FIXED SAME LINE) */}
        {/* ---------------------------------------- */}

        <div className="flex w-full flex-wrap items-center justify-between gap-4">
          <h1 className="text-3xl md:text-3xl font-bold font-custom tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="link--elara">{site.name}</span>
          </h1>

          <div className="flex flex-wrap gap-4 sm:justify-end">
            {socials.map((social) => (
              <button
                key={social.name}
                type="button"
                aria-label={social.name}
                title={social.name}
                className="relative cursor-alias group"
                onClick={social.action}
              >
                <social.icon
                  size={20}
                  className="text-neutral-900 dark:text-neutral-50 opacity-70 hover:opacity-100 transition"
                />
              </button>
            ))}
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* SUBTEXT */}
        {/* ---------------------------------------- */}

        <div className="text-secondary font-custom2 text-s mt-4 space-y-1 leading-relaxed">
          {site.bio.map((line) => (
            <p key={line}>
              <span className="text-neutral-700 dark:text-neutral-300">{line}</span>
            </p>
          ))}
        </div>

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-9 -mx-2 md:-mx-14"></div>

        <section id="projects" className="scroll-mt-28">
          <Projects />
        </section>

        <div className="w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 dark:opacity-15 my-4 -mx-2 md:-mx-14"></div>

        <section id="experience" className="scroll-mt-28">
          <Timeline />
        </section>

        <section id="education" className="scroll-mt-28">
          <Education />
        </section>

        <section id="open-source" className="scroll-mt-28">
          <GithubGraph />
        </section>

        <section id="skills" className="scroll-mt-28">
          <Skills />
        </section>

        <section id="contact" className="scroll-mt-28">
          <GetInTouch />
        </section>

      </Container>

      <SectionIndex items={SECTIONS} />
    </div>
  );
}