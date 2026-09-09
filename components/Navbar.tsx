"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "@/components/containers";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ThemeToggleButton } from "@/components/ui/skiper-ui/skiper26";
import { CommandMenu } from "@/components/command-menu";
import { site } from "@/lib/site";

const Navbar = () => {
  const navItems = [
    { title: "Projects", href: "/projects" },
    { title: "Blog", href: "/blog" },
    { title: "Contact", href: "/Contact" },
  ];

  const [hovered, setHovered] = useState<number | null>(null);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const pathname = usePathname();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  useEffect(() => {
    const updateViewport = () => {
      if (typeof window === "undefined") return;
      setIsDesktop(window.innerWidth >= 768);
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.toLowerCase().startsWith(href.toLowerCase());

  return (
    <Container>
      <motion.nav
        initial={false}
        animate={{
          width: scrolled ? (isDesktop ? "44rem" : "94%") : (isDesktop ? "52rem" : "94%"),
          top: scrolled ? 10 : 18,
        }}
        transition={{ type: "spring", stiffness: 180, damping: 26, mass: 0.9 }}
        className="fixed inset-x-0 z-50 mx-auto flex w-full items-center justify-between gap-2
        rounded-full px-2 py-1.5 font-custom tracking-wide text-neutral-900 dark:text-neutral-50"
      >
        {/* Chrome lives on its own layer so it can fade in on scroll while the
            pill is still resizing — at the top of the page the nav floats bare. */}
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-full
          border border-neutral-200/80 bg-neutral-50/80 backdrop-blur-xl backdrop-saturate-150
          shadow-[0_8px_30px_rgba(0,0,0,0.06)]
          dark:border-white/10 dark:bg-neutral-900/60 dark:shadow-[0_10px_34px_rgba(0,0,0,0.55)]"
        />

        {/* Identity */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3 transition-colors duration-300 hover:bg-neutral-200/40 dark:hover:bg-neutral-800/40"
        >
          <span className="relative shrink-0">
            <Image
              className="h-8 w-8 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800"
              src={site.avatar}
              width={96}
              height={96}
              alt={site.name}
            />
            <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-70 animate-[statusDotPulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-neutral-50 dark:ring-neutral-950" />
            </span>
          </span>

          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-50">
              {site.name}
            </span>
            {/* The role line is context you only need before you start reading. */}
            <motion.span
              initial={false}
              animate={{ opacity: scrolled ? 0 : 1, height: scrolled ? 0 : "auto" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="block overflow-hidden font-custom2 text-[10px] text-neutral-500 dark:text-neutral-400"
            >
              {site.role} @ {site.company}
            </motion.span>
          </span>
        </Link>

        {/* Navigation links on the right */}
        <div className="ml-auto flex items-center justify-end gap-1" onMouseLeave={() => setHovered(null)}>
          {navItems.map((item, idx) => (
            <Link
              className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive(item.href)
                  ? "text-neutral-900 dark:text-neutral-50"
                  : "text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-50"
              }`}
              href={item.href}
              key={idx}
              onMouseEnter={() => setHovered(idx)}
            >
              {hovered === idx && (
                <motion.span
                  layoutId="nav-item-pill"
                  className="absolute inset-0 rounded-md bg-neutral-300/25 dark:bg-neutral-800/50 -z-10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {item.title}
              {isActive(item.href) && (
                <motion.span
                  layoutId="nav-active-underline"
                  className="absolute inset-x-3 -bottom-0.5 h-px bg-neutral-900 dark:bg-neutral-50"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </Link>
          ))}

          {/* Separator */}
          <div className="h-5 w-px bg-neutral-300/40 dark:bg-neutral-700/50 mx-1" />

          {/* Theme Toggle */}
          <div
            className="relative px-1 py-1"
            onMouseEnter={() => setHovered(3)}
          >
            {hovered === 3 && (
              <motion.span
                layoutId="nav-item-pill"
                className="absolute inset-0 rounded-md bg-neutral-300/25 dark:bg-neutral-800/50 -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <motion.div
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.2, type: "spring", stiffness: 300 }}
            >
              <ThemeToggleButton variant="circle" start="top-right" />
            </motion.div>
          </div>

          {/* Command Menu */}
          <div
            className="relative px-1 py-1 hidden sm:block"
            onMouseEnter={() => setHovered(4)}
          >
            {hovered === 4 && (
              <motion.span
                layoutId="nav-item-pill"
                className="absolute inset-0 rounded-md bg-neutral-300/25 dark:bg-neutral-800/50 -z-10"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <CommandMenu />
          </div>
        </div>
      </motion.nav>

    </Container>
  );
};

export default Navbar;
