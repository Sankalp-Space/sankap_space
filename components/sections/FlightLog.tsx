import { certifications, education, flightLog } from "@/lib/data";
import { stops } from "@/lib/journey";
import { BrushHeading, Rise } from "./Reveal";

const IDX = stops.findIndex((s) => s.id === "log");

export function FlightLog() {
  return (
    <section id="log" data-stop={IDX} data-side={stops[IDX].side} className="stop min-h-[120svh]">
      <div className="w-full max-w-[40rem]">
        <BrushHeading className="text-[clamp(2.8rem,6vw,5.4rem)] text-ink">Flight log</BrushHeading>

        <Rise>
          <ol className="relative mt-7 border-l border-[var(--line-strong)] pl-6">
            {flightLog.map((e, i) => (
              <li key={e.place} className="relative pb-6 last:pb-0">
                <span
                  className={`absolute -left-[29px] top-[7px] h-[9px] w-[9px] rounded-full ${i === 0 ? "bg-signal shadow-[0_0_12px_var(--signal)]" : "border border-ink-faint bg-space"}`}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                  <h3 className="text-[18px] font-medium tracking-tight text-ink">
                    {e.title} <span className="text-flare">@ {e.place.split(" · ")[0]}</span>
                  </h3>
                  <p className="label tabular">{e.when}</p>
                </div>
                <p className="mt-1 text-[15px] leading-relaxed text-ink-dim">{e.note}</p>
              </li>
            ))}
          </ol>
        </Rise>

        <Rise delay={0.3} className="mt-8 grid gap-6 border-t border-[var(--line)] pt-6 sm:grid-cols-[1fr_1.3fr]">
          <div>
            <p className="label">Education</p>
            <p className="mt-2 text-[16px] text-ink">{education.degree}</p>
            <p className="text-[14px] text-ink-dim">
              {education.school} · {education.when} · {education.grade}
            </p>
          </div>
          <div>
            <p className="label">Badges unlocked</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {certifications.map((c) => (
                <li key={c.name} className="rounded-full border border-[var(--line-strong)] px-2.5 py-1 text-[13px] text-ink">
                  {c.name} <span className="text-ink-faint">· {c.by}</span>
                </li>
              ))}
            </ul>
          </div>
        </Rise>
      </div>
    </section>
  );
}
