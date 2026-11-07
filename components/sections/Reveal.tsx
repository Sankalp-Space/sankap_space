"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Brush headline that paints in left to right, like one loaded stroke. */
export function BrushHeading({
  as: Tag = "h2",
  children,
  className = "",
  delay = 0,
  immediate = false,
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.4 });
  const on = reduce || immediate || seen;
  return (
    <div ref={ref}>
      <Tag className={`brush ${className}`}>
        <motion.span
          className="block pb-[0.08em] pr-[0.12em]"
          initial={reduce ? false : { clipPath: "inset(-10% 100% -20% 0%)", x: -14 }}
          animate={on ? { clipPath: "inset(-10% -5% -20% 0%)", x: 0 } : undefined}
          transition={{ duration: 1.25, delay, ease: EASE }}
        >
          {children}
        </motion.span>
      </Tag>
    </div>
  );
}

/** Painted swash under a headline. */
export function Swash({ delay = 0.6, className = "" }: { delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <svg viewBox="0 0 420 26" className={`h-auto w-[min(26rem,70%)] overflow-visible ${className}`} aria-hidden="true">
      <motion.path
        d="M4 17 C 70 6, 150 4, 230 11 S 360 22, 414 8"
        fill="none"
        stroke="var(--flare)"
        strokeWidth={5}
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 0.95 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, delay, ease: EASE }}
      />
    </svg>
  );
}

/** Body copy that settles in after the headline. */
export function Rise({ children, delay = 0.25, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
