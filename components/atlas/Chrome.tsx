"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/lib/data";
import { stops } from "@/lib/journey";
import { ArrowUpRight, useActiveStop } from "./ui";

const index = [
  { chapter: "Origin", href: "#origin" },
  { chapter: "Toolkit", href: "#toolkit" },
  { chapter: "Missions", href: "#missions" },
  { chapter: "Flight log", href: "#log" },
  { chapter: "Contact", href: "#contact" },
];

export function Nav() {
  const active = useActiveStop();
  const chapter = stops[active]?.chapter;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-36 bg-[linear-gradient(180deg,var(--space)_0%,var(--space)_55%,transparent_100%)]" aria-hidden="true" />
      <div className="flex items-center justify-between px-5 py-5 sm:px-8">
        <a href="#top" className="font-brush text-[22px] leading-none text-ink transition-colors hover:text-flare" aria-label="Sankalp Shrivastav, back to top">
          Sankalp<span className="text-flare">.</span>
        </a>

        <nav aria-label="Chapters" className="hidden items-center gap-1 md:flex">
          {index.map((item) => {
            const on = item.chapter === chapter;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={on ? "location" : undefined}
                className={`relative px-3 py-2 text-[14px] transition-colors duration-300 ${on ? "text-ink" : "text-ink-faint hover:text-ink"}`}
              >
                {item.chapter}
                {on && <motion.span layoutId="nav-on" className="absolute inset-x-3 -bottom-0.5 h-px bg-flare" transition={{ type: "spring", stiffness: 380, damping: 34 }} />}
              </a>
            );
          })}
          <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary ml-3 !py-2 !text-[14px]">
            Résumé <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          type="button"
          className="flex h-10 items-center rounded-full border border-[var(--line-strong)] bg-[rgb(2_3_8_/_0.6)] px-4 text-[14px] text-ink md:hidden"
          aria-expanded={open}
          aria-controls="mobile-index"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-index"
            aria-label="Chapters"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 flex flex-col rounded-2xl border border-[var(--line)] bg-[rgb(2_3_8_/_0.94)] p-6 md:hidden"
          >
            {index.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)} className="brush border-b border-[var(--line)] py-3 text-[2rem] last:border-0">
                {item.chapter}
              </a>
            ))}
            <a href={profile.resume} target="_blank" rel="noopener noreferrer" className="btn-primary mt-5 justify-center">
              Open résumé <ArrowUpRight />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Flight telemetry: which body you are passing. */
export function Readout() {
  const active = useActiveStop();
    const s = stops[active] ?? stops[0];
  return (
    <div className="label pointer-events-none fixed left-1/2 top-[30px] z-50 hidden -translate-x-1/2 select-none text-center lg:block" aria-hidden="true">
      <div>
        <span className="text-ink">{s.body}</span> · {s.label}
      </div>
      <div className="mt-2 flex justify-center gap-[3px]">
        {stops.map((st, i) => (
          <span key={st.id} className="h-px w-3 transition-colors duration-500" style={{ background: i <= active ? "var(--flare)" : "rgb(255 255 255 / 0.2)" }} />
        ))}
      </div>
    </div>
  );
}
