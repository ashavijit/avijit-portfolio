"use client";

import Container from "@/components/containers";
import EdgeRails from "@/components/ui/edge-rails";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";
import { SiLeetcode } from "react-icons/si";
import { site } from "@/lib/site";
import { toast } from "sonner";
import { FlightButton } from "@/components/ui/flight-button";
import { ChangeEvent, FormEvent, useState } from "react";

const EYEBROW =
  "font-custom2 text-[11px] uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500";

const FIELD =
  "w-full rounded-md border border-neutral-200 bg-neutral-50 px-4 py-2.5 font-custom2 text-sm " +
  "text-neutral-900 outline-none transition-all placeholder:text-neutral-400 " +
  "focus:border-transparent focus:ring-2 focus:ring-neutral-400 " +
  "dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100 dark:focus:ring-neutral-600";

const SOCIALS = [
  { label: "GitHub", handle: `@${site.handle}`, href: site.socials.github, Icon: Github },
  { label: "LinkedIn", handle: "avijit-sen", href: site.socials.linkedin, Icon: Linkedin },
  { label: "X", handle: "@Avijitsen123", href: site.socials.x, Icon: Twitter },
  { label: "LeetCode", handle: "shellpy03", href: site.socials.leetcode, Icon: SiLeetcode },
];

const FACTS = [
  { label: "Based in", value: site.location },
  { label: "Reply time", value: "Usually within a day" },
  { label: "Best for", value: "Backend, systems, performance" },
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "";

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const payload = new FormData(form);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
        method: "POST",
        body: payload,
      });

      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        form.reset();
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative flex min-h-screen justify-center font-sans">
      <Container className="min-h-screen px-8 pt-32 md:px-20 md:pt-36 md:pb-10 mx-auto">
        <EdgeRails />

        {/* ---------------------------------------- */}
        {/* HEADER */}
        {/* ---------------------------------------- */}

        <header>
          <p className={EYEBROW}>Contact</p>

          <h1 className="mt-1 font-custom text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            <span className="link--elara">Say hello</span>
          </h1>

          <p className="mt-2 max-w-lg font-custom2 text-sm leading-relaxed tracking-tight text-neutral-600 md:text-base dark:text-neutral-400">
            Backend work, systems problems, or something that needs to be fast —
            I read everything that lands here.
          </p>
        </header>

        <div className="my-9 -mx-2 w-auto border-t border-solid border-[var(--pattern-fg)] opacity-100 md:-mx-14 dark:opacity-15" />

        <div className="grid gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-14">
          {/* ---------------------------------------- */}
          {/* DIRECT — for people who'd rather not use a form */}
          {/* ---------------------------------------- */}

          <div>
            <p className={EYEBROW}>Direct</p>

            <a
              href={site.socials.email}
              className="group mt-3 inline-flex items-start gap-1.5 font-custom2 text-sm text-neutral-900 transition-colors hover:text-neutral-600 dark:text-neutral-100 dark:hover:text-neutral-400"
            >
              {site.email}
              <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-neutral-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>

            <dl className="mt-8 flex flex-col gap-4">
              {FACTS.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-4">
                  <dt className={EYEBROW}>{f.label}</dt>
                  <dd className="text-right font-custom2 text-sm text-neutral-700 dark:text-neutral-300">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 border-t border-neutral-200/70 dark:border-neutral-800/70" />

            <ul className="mt-2">
              {SOCIALS.map(({ label, handle, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group -mx-3 flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 transition-colors hover:bg-neutral-100/60 dark:hover:bg-neutral-900/40"
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon
                        size={14}
                        className="shrink-0 text-neutral-400 transition-colors group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
                      />
                      <span className="font-custom2 text-sm text-neutral-700 dark:text-neutral-300">
                        {label}
                      </span>
                    </span>

                    <span className="flex items-center gap-1.5 font-custom2 text-xs text-neutral-400 dark:text-neutral-500">
                      {handle}
                      <ArrowUpRight className="h-3 w-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ---------------------------------------- */}
          {/* FORM */}
          {/* ---------------------------------------- */}

          <div className="rounded-md border border-neutral-200 bg-white/50 p-6 md:p-7 dark:border-neutral-800 dark:bg-neutral-950/40">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* FormSubmit configuration */}
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input
                type="hidden"
                name="_subject"
                value="New Submission from Portfolio"
              />
              <input type="text" name="_honey" style={{ display: "none" }} />

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="font-custom2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tyler Durden"
                  className={FIELD}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="font-custom2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tyler@projectmayhem.com"
                  className={FIELD}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="font-custom2 text-sm font-medium text-neutral-700 dark:text-neutral-300"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="You're crazy good, never change."
                  className={`${FIELD} resize-none`}
                />
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <p className="font-custom2 text-[11px] leading-relaxed text-neutral-400 dark:text-neutral-500">
                  Goes straight to my inbox. No list, no follow-up sequence.
                </p>
                <FlightButton
                  type="submit"
                  className="w-32 shrink-0"
                  disabled={isSubmitting || !isFormValid}
                />
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
