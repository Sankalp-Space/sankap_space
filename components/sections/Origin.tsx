import { origin, profile } from "@/lib/data";
import { BrushHeading, Rise } from "./Reveal";

export function Origin() {
  return (
    <section id="origin" data-stop={1} data-side={-1} className="stop min-h-[115svh]">
      <div className="w-full max-w-[38rem]">
        <BrushHeading className="text-[clamp(2.8rem,6vw,5.4rem)] text-ink">{origin.heading}</BrushHeading>
        <Rise className="mt-6 space-y-3 text-[17px] leading-relaxed text-ink-dim">
          {origin.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </Rise>
        <Rise delay={0.35}>
          <dl className="mt-8 grid grid-cols-3 border-y border-[var(--line)]">
            {origin.facts.map((f, i) => (
              <div key={f.k} className={`py-4 ${i > 0 ? "border-l border-[var(--line)] pl-4" : ""}`}>
                <dt className="label">{f.k}</dt>
                <dd className="mt-1 text-[16px] text-ink">{f.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 font-brush text-[1.25rem] leading-snug text-flare">&ldquo;{profile.funFact}&rdquo;</p>
        </Rise>
      </div>
    </section>
  );
}
