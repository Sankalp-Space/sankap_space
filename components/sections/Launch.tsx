"use client";

import { motion, useReducedMotion } from "motion/react";
import { profile, stickers } from "@/lib/data";
import { ArrowUpRight } from "@/components/atlas/ui";
import { BrushHeading, Swash } from "./Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;
const TILT = [-7, 5, -3];

export function Launch() {
  const reduce = useReducedMotion();
  const [first, ...rest] = profile.name.split(" ");
  return (
    <section id="top" data-stop={0} data-side={1} className="stop min-h-[100svh] !items-end pb-[9svh] pt-32">
      <div className="relative w-full max-w-[52rem]">
        <div className="relative inline-block">
          <BrushHeading as="h1" immediate delay={0.35} className="text-[clamp(3.6rem,10.5vw,9.5rem)] text-ink">
            {first}{" "}
            <br />
            {rest.join(" ")}
          </BrushHeading>
          {/* stickers slapped onto the name */}
          <div className="pointer-events-auto absolute -right-4 top-[0.4em] hidden flex-col items-start gap-2 md:flex" aria-label="Quick facts">
            {stickers.map((s, i) => (
              <motion.span
                key={s}
                className="sticker"
                style={{ rotate: TILT[i % TILT.length] }}
                initial={reduce ? false : { opacity: 0, scale: 1.6, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 18, delay: 1.5 + i * 0.14 }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </div>
        <Swash delay={1.3} className="-mt-1 mb-2 ml-1" />

        <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.9, ease: EASE }}>
          <p className="mt-4 text-[clamp(1.3rem,2.2vw,1.75rem)] font-medium tracking-tight text-ink">{profile.role}.</p>
          <p className="mt-2 max-w-[36rem] text-[17px] leading-relaxed text-ink-dim">{profile.tagline}</p>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Open résumé <ArrowUpRight />
            </a>
            <a href="#contact" className="btn-quiet">
              Say hi
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap items-center gap-3"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
        >
          <span className="signal">
            <span className="signal-bars" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>
              <span className="text-signal">{profile.signal.label}</span> · {profile.signal.text}
            </span>
          </span>
          <span className="label">
            {profile.location} · {profile.timezone}
          </span>
          <span className="flex gap-2 md:hidden">
            {stickers.map((s, i) => (
              <span key={s} className="sticker !text-[12px]" style={{ transform: `rotate(${TILT[i % TILT.length]}deg)` }}>
                {s}
              </span>
            ))}
          </span>
        </motion.div>
      </div>

      <motion.a
        href="#origin"
        className="label absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        Scroll to launch
        <svg className="scroll-cue" width="14" height="22" viewBox="0 0 14 22" fill="none" aria-hidden="true">
          <path d="M7 1v19M1 14l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.a>
    </section>
  );
}
