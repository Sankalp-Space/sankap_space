"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { nowExploring, toolkit } from "@/lib/data";
import { icons } from "@/lib/icons";
import { BrushHeading, Rise } from "./Reveal";

const CYCLE_MS = 6500;
const EASE = [0.16, 1, 0.3, 1] as const;

// Three hand-placed asterisms (x%, y%), cycled per group so each sky looks different.
const LAYOUTS: { pts: [number, number][]; edges: [number, number][] }[] = [
  {
    pts: [[9, 34], [29, 12], [50, 34], [74, 14], [91, 46], [68, 74], [34, 72]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [2, 5], [5, 6], [6, 0]],
  },
  {
    pts: [[10, 66], [22, 22], [45, 46], [60, 12], [86, 30], [80, 76], [46, 84]],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 2]],
  },
  {
    pts: [[8, 42], [28, 16], [46, 58], [62, 20], [88, 16], [90, 66], [60, 86]],
    edges: [[0, 1], [1, 3], [3, 4], [1, 2], [2, 6], [6, 5], [5, 4]],
  },
];

// fixed dust so server and client render the same field
const DUST = Array.from({ length: 46 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 127.1 + n * 311.7) * 43758.5453) % 1 + 1) % 1;
  return { x: r(1) * 100, y: r(2) * 100, s: 1 + r(3) * 1.8, d: r(4) * 4 };
});

function SkillStar({ name, icon, x, y, i }: { name: string; icon?: string; x: number; y: number; i: number }) {
  const reduce = useReducedMotion();
  const glyph = icon ? icons[icon] : undefined;
  return (
    <motion.div
      className="skill-star absolute"
      style={{ left: `${x}%`, top: `${y}%`, ["--brand" as string]: glyph ? `#${glyph.hex}` : "var(--flare)" }}
      initial={reduce ? false : { opacity: 0, scale: 0.2, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={reduce ? undefined : { opacity: 0, scale: 0.6, filter: "blur(6px)", transition: { duration: 0.25 } }}
      transition={{ duration: 0.7, delay: reduce ? 0 : 0.08 * i, ease: EASE }}
    >
      <span className="skill-halo" style={{ animationDelay: `${(i * 0.73) % 3}s` }} aria-hidden="true" />
      <svg className="skill-flare" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0 L13.2 10.8 L24 12 L13.2 13.2 L12 24 L10.8 13.2 L0 12 L10.8 10.8 Z" fill="currentColor" />
      </svg>
      <span className="skill-core">
        {glyph ? (
          <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" aria-hidden="true">
            <path d={glyph.path} fill="currentColor" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-[16px] w-[16px]" aria-hidden="true">
            <path d="M12 0 L13.6 10.4 L24 12 L13.6 13.6 L12 24 L10.4 13.6 L0 12 L10.4 10.4 Z" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="skill-label">{name}</span>
    </motion.div>
  );
}

export function Toolkit() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hover, setHover] = useState(false);
  const field = useRef<HTMLDivElement>(null);
  const inView = useInView(field, { amount: 0.4 });

  const group = toolkit[tab];
  const layout = LAYOUTS[tab % LAYOUTS.length];
  const n = group.skills.length;
  const edges = useMemo(() => layout.edges.filter(([a, b]) => a < n && b < n), [layout, n]);

  useEffect(() => {
    if (!auto || reduce || !inView || hover) return;
    const id = setTimeout(() => setTab((t) => (t + 1) % toolkit.length), CYCLE_MS);
    return () => clearTimeout(id);
  }, [tab, auto, reduce, inView, hover]);

  const playing = auto && !reduce && inView && !hover;

  // draw lines in real pixels so dash maths (draw-in, light pulses) stays even
  const [box, setBox] = useState({ w: 800, h: 360 });
  useEffect(() => {
    const el = field.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox({ w: e.contentRect.width, h: e.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const px = (p: [number, number]) => [(p[0] / 100) * box.w, (p[1] / 100) * box.h] as const;

  return (
    <section id="toolkit" data-stop={2} data-side={1} className="stop scrim-wide min-h-[120svh]">
      <div className="w-full max-w-[50rem]">
        <BrushHeading className="text-[clamp(2.6rem,5.2vw,4.8rem)] text-ink">My tech constellations</BrushHeading>

        <Rise delay={0.2}>
          <div role="tablist" aria-label="Skill groups" className="mt-6 flex flex-wrap gap-2">
            {toolkit.map((g, i) => {
              const on = i === tab;
              return (
                <button
                  key={g.name}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="skill-field"
                  onClick={() => {
                    setTab(i);
                    setAuto(false);
                  }}
                  className={`relative overflow-hidden rounded-full px-4 py-2 text-[14px] transition-colors duration-300 ${
                    on ? "bg-ink text-space" : "border border-[var(--line-strong)] text-ink-dim hover:border-ink hover:text-ink"
                  }`}
                >
                  <span className="relative z-10">{g.name}</span>
                  {on && playing && <span key={`p-${tab}`} className="tab-progress" style={{ animationDuration: `${CYCLE_MS}ms` }} aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </Rise>

        <div
          ref={field}
          id="skill-field"
          role="tabpanel"
          aria-label={`${group.name}: ${group.skills.map((s) => s.name).join(", ")}`}
          className="relative mt-8 h-[clamp(16rem,40vh,23rem)] w-full"
          onPointerEnter={() => setHover(true)}
          onPointerLeave={() => setHover(false)}
        >
          {DUST.map((d, i) => (
            <span key={i} className="dust" style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.s, height: d.s, animationDelay: `${d.d}s` }} aria-hidden="true" />
          ))}

          <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 ${box.w} ${box.h}`} aria-hidden="true">
            <g key={tab}>
              {edges.map(([a, b], i) => {
                const [x1, y1] = px(layout.pts[a]);
                const [x2, y2] = px(layout.pts[b]);
                return (
                  <g key={i}>
                    <motion.line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="rgb(255 255 255 / 0.3)"
                      strokeWidth={1}
                      initial={reduce ? false : { pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.7, delay: reduce ? 0 : 0.35 + i * 0.09, ease: EASE }}
                    />
                    {!reduce && (
                      <line className="edge-pulse" x1={x1} y1={y1} x2={x2} y2={y2} pathLength={100} style={{ animationDelay: `${1 + i * 0.55}s` }} />
                    )}
                  </g>
                );
              })}
            </g>
          </svg>

          <AnimatePresence mode="popLayout">
            {group.skills.map((s, i) => {
              const [x, y] = layout.pts[i];
              return <SkillStar key={`${tab}-${s.name}`} name={s.name} icon={s.icon} x={x} y={y} i={i} />;
            })}
          </AnimatePresence>
        </div>

        {/* full skill list for screen readers and search engines (the field shows one group at a time) */}
        <div className="sr-only">
          <h3>All skills</h3>
          {toolkit.map((g) => (
            <p key={g.name}>
              {g.name}: {g.skills.map((s) => s.name).join(", ")}.
            </p>
          ))}
        </div>

        <Rise delay={0.3} className="mt-8 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <AnimatePresence mode="wait">
            <motion.p
              key={tab}
              className="text-[16px] text-ink"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35 }}
            >
              <span className="font-brush text-[19px] text-flare">{group.name}</span> · {group.tagline}
            </motion.p>
          </AnimatePresence>
          <p className="label">
            Now exploring: <span className="normal-case tracking-normal text-ink-dim">{nowExploring.join(" · ")}</span>
          </p>
        </Rise>
      </div>
    </section>
  );
}
