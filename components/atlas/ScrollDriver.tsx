"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { emitActive, journey } from "@/lib/journey";

const ease = (x: number) => x * x * (3 - 2 * x);

/**
 * Turns page scroll into a continuous position along the route.
 * Each stop holds while its section is read, then the hop to the next
 * planet plays out as the following section scrolls in.
 */
export default function ScrollDriver() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    journey.reducedMotion = mq.matches;
    const onMq = () => (journey.reducedMotion = mq.matches);
    mq.addEventListener("change", onMq);

    let tops: number[] = [];
    const measure = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>("[data-stop]"));
      tops = els.map((el) => el.getBoundingClientRect().top + window.scrollY);
    };

    let lastActive = -1;
    const update = () => {
      if (!tops.length) return;
      const probe = window.scrollY + window.innerHeight * 0.35;
      let i = 0;
      while (i < tops.length - 1 && probe >= tops[i + 1]) i++;
      let t = i;
      if (i < tops.length - 1) {
        const frac = (probe - tops[i]) / (tops[i + 1] - tops[i]);
        const fly = Math.min(Math.max((frac - 0.42) / 0.58, 0), 1);
        t = i + ease(fly);
      }
      journey.t = t;
      const active = Math.round(t);
      if (active !== lastActive) {
        lastActive = active;
        journey.active = active;
        emitActive(active);
      }
    };

    // inertial smooth scroll; native scroll stays for reduced motion
    let lenis: Lenis | null = null;
    let raf = 0;
    if (!mq.matches) {
      lenis = new Lenis({ duration: 1.25, easing: (x) => 1 - Math.pow(1 - x, 4), smoothWheel: true, anchors: { offset: 0 } });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    measure();
    update();
    const ro = new ResizeObserver(() => {
      measure();
      update();
    });
    ro.observe(document.body);
    window.addEventListener("scroll", update, { passive: true });

    // drag (mouse only) spins the sky with inertia; pointer adds parallax
    let dragging = false;
    let lastX = 0;
    const isInteractive = (el: EventTarget | null) =>
      el instanceof Element && !!el.closest("a, button, input, textarea, [data-no-drag]");
    const down = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" || isInteractive(e.target)) return;
      dragging = true;
      lastX = e.clientX;
      document.documentElement.style.cursor = "grabbing";
    };
    const move = (e: PointerEvent) => {
      journey.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      journey.pointerY = -((e.clientY / window.innerHeight) * 2 - 1);
      if (!dragging) return;
      journey.spin += (e.clientX - lastX) * 0.012;
      journey.spin = Math.max(-3, Math.min(3, journey.spin));
      lastX = e.clientX;
    };
    const up = () => {
      dragging = false;
      document.documentElement.style.cursor = "";
    };
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerup", up);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      mq.removeEventListener("change", onMq);
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, []);
  return null;
}
