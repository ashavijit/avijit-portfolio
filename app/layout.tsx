import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/footer";
import Navbar from "@/components/Navbar";
import { Instrument_Serif } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { ThemeProvider } from "@/components/theme-provider";
import GridFlow from "@/components/ui/grid-flow";
import { Toaster } from "sonner";
import { site } from "@/lib/site";
import { projects } from "@/lib/projects";
import { getAllBlogs } from "@/util/mdx_clean";


const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  subsets: ["latin"], // 🛠 Fix missing subsets
});

// Without this, Next resolves og:image against localhost:3000 and every shared
// link points somewhere unreachable. site.url (ashavijit.dev) is not serving
// yet, so default to where this actually deploys; override once DNS is live.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://avijit-portfolio.avijit-sen.workers.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${site.name} — ${site.role}`,
  description: site.description,
  openGraph: {
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: SITE_URL,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.description,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Titles and slugs only — the command menu is a client component, and
  // shipping post bodies to the browser to power a search box would be absurd.
  const posts = await getAllBlogs();
  const searchIndex = {
    posts: posts
      .filter((p) => p.slug)
      .map((p) => ({ title: p.title ?? p.slug!, slug: p.slug! })),
    projects: projects.map((p) => ({
      title: p.title,
      slug: p.slug,
      language: p.language,
    })),
  };

  return (
    <html lang="en" suppressHydrationWarning>{/* 🛠 Important for dark mode */}
      <body
        className={`${instrumentSerif.className} antialiased bg-neutral-50 dark:bg-[#0c0c0c] transition-colors duration-300 [--pattern-fg:var(--color-neutral-200)]`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Analytics />
          <SpeedInsights />
          <GridFlow />
          <Navbar searchIndex={searchIndex} />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
