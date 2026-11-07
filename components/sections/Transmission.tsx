"use client";

import { useState } from "react";
import { profile, socials } from "@/lib/data";
import { stops } from "@/lib/journey";
import { ArrowUpRight, CheckIcon, CopyIcon } from "@/components/atlas/ui";
import { BrushHeading, Rise, Swash } from "./Reveal";

const IDX = stops.findIndex((s) => s.id === "contact");

export function Transmission() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" data-stop={IDX} data-side={stops[IDX].side} className="stop min-h-[100svh] flex-col !items-start !justify-end pb-8 pt-28">
      <div className="w-full max-w-[52rem]">
        <BrushHeading className="text-[clamp(3.4rem,10vw,8.5rem)] text-ink">Let&rsquo;s build.</BrushHeading>
        <Swash delay={0.9} className="ml-1" />
        <Rise>
          <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-ink-dim sm:text-lg">
            Got a role, a product, or a slightly unhinged idea? Slide into my inbox. I reply within a day or two, usually at 2 AM.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={`mailto:${profile.email}`} className="link break-all text-[clamp(1.2rem,2.8vw,2rem)] font-medium tracking-tight">
              {profile.email}
            </a>
            <button
              type="button"
              onClick={copy}
              className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-[14px] text-ink-dim transition-colors hover:border-ink hover:text-ink"
              aria-live="polite"
            >
              {copied ? <CheckIcon size={14} /> : <CopyIcon size={14} />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}?subject=Hello%20Sankalp`} className="btn-primary">
              Send an email <ArrowUpRight />
            </a>
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-quiet">
              Open résumé
            </a>
          </div>
        </Rise>

        <Rise delay={0.3}>
          <ul className="mt-9 grid sm:grid-cols-3 sm:gap-x-8">
            {socials.map((s) => (
              <li key={s.label} className="border-b border-[var(--line)]">
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between py-3">
                  <span className="text-ink transition-colors group-hover:text-flare">{s.label}</span>
                  <span className="flex items-center gap-1.5 text-[14px] text-ink-faint transition-colors group-hover:text-flare">
                    {s.handle} <ArrowUpRight size={14} />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Rise>
      </div>

      <footer className="mt-10 flex w-full flex-wrap justify-between gap-x-6 gap-y-2 text-[13px] text-ink-faint">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <span>
          Planet maps{" "}
          <a className="link text-ink-faint" href="https://www.solarsystemscope.com/textures/" target="_blank" rel="noopener noreferrer">
            Solar System Scope
          </a>{" "}
          (CC BY 4.0) · Z-2 spacesuit model courtesy NASA
        </span>
      </footer>
    </section>
  );
}
