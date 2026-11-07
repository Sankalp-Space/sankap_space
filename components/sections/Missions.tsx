"use client";

import Image from "next/image";
import { archive, missions, type Mission } from "@/lib/data";
import { stops } from "@/lib/journey";
import { ArrowUpRight, CodeIcon, StatusDot } from "@/components/atlas/ui";
import { BrushHeading, Rise } from "./Reveal";

const FIRST = stops.findIndex((s) => s.id === missions[0].id);

function MissionBody({ m, index }: { m: Mission; index: number }) {
  const stop = stops[FIRST + index];
  return (
    <div className="w-full max-w-[38rem]">
      <BrushHeading as="h3" className="text-[clamp(2.8rem,6vw,5.4rem)] text-ink">
        {m.name}
      </BrushHeading>
      <Rise>
        <p className="mt-4 text-[clamp(1.15rem,1.6vw,1.4rem)] font-medium leading-snug tracking-tight text-ink">{m.summary}</p>
        <p className="mt-2 text-[16px] leading-relaxed text-ink-dim">{m.detail}</p>
      </Rise>

      {m.shot && (
        <Rise delay={0.25}>
          <a
            href={m.live ?? m.code}
            target="_blank"
            rel="noopener noreferrer"
            className="group/shot relative mt-5 block max-w-[32rem] overflow-hidden rounded-xl border border-[var(--line-strong)] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.9)]"
            aria-label={`Open ${m.name}`}
          >
            <Image
              src={m.shot}
              alt={`${m.name} home screen`}
              width={1280}
              height={800}
              sizes="(max-width: 768px) 92vw, 512px"
              className="aspect-[16/8.5] w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shot:scale-[1.04]"
            />
          </a>
        </Rise>
      )}

      <Rise delay={0.35}>
        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Built with">
          {m.stack.map((s) => (
            <li key={s} className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[13px] text-ink">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex flex-wrap items-center gap-3">
          {m.live && (
            <a href={m.live} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Visit live site <ArrowUpRight />
            </a>
          )}
          {m.code && (
            <a href={m.code} target="_blank" rel="noopener noreferrer" className={m.live ? "btn-quiet" : "btn-primary"}>
              <CodeIcon /> Read the code
            </a>
          )}
          <span className="label ml-1 flex items-center gap-2">
            <StatusDot color={m.live ? "var(--signal)" : "var(--flare)"} pulse={!!m.live} />
            {m.live ? "Live" : "Open source"} · {stop.body} flyby
          </span>
        </div>
      </Rise>
    </div>
  );
}

export function Missions() {
  return (
    <>
      <section id="missions" data-side={-1} className="stop min-h-[85svh]" aria-labelledby="missions-title">
        <div className="w-full max-w-[40rem]">
          <BrushHeading className="text-[clamp(3.2rem,8vw,7.4rem)] text-ink">
            <span id="missions-title">Missions flown</span>
          </BrushHeading>
          <Rise>
            <p className="mt-5 max-w-[30rem] text-[17px] leading-relaxed text-ink-dim">
              Six things I built and shipped, each parked at its own world. Scroll to fly the route.
            </p>
          </Rise>
          <Rise delay={0.3}>
            <p className="label mt-8">Side quests</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {archive.map((a) => (
                <li key={a.name}>
                  <a
                    href={a.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 rounded-full border border-[var(--line-strong)] px-3 py-1.5 text-[14px] text-ink transition-colors hover:border-flare hover:text-flare"
                  >
                    {a.name} <span className="text-ink-faint group-hover:text-flare">{a.note}</span> <ArrowUpRight size={12} />
                  </a>
                </li>
              ))}
            </ul>
          </Rise>
        </div>
      </section>
      {missions.map((m, i) => {
        const idx = FIRST + i;
        return (
          <section key={m.id} id={`mission-${m.id}`} data-stop={idx} data-side={stops[idx].side} className="stop min-h-[115svh]">
            <MissionBody m={m} index={i} />
          </section>
        );
      })}
    </>
  );
}
