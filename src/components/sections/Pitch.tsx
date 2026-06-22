import { event } from "@config";

export function Pitch() {
  return (
    <section
      id="why"
      aria-labelledby="why-h"
      className="reveal mx-auto max-w-[1180px] border-t border-line-soft px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid gap-8 md:grid-cols-[14rem_1fr] md:gap-12">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="mono text-sm font-semibold tracking-[0.1em] text-forge">01</span>
          <span className="mono text-xs uppercase tracking-[0.22em] text-ink-faint">Why Arc Hackathon</span>
        </div>
        <div>
          <h2 id="why-h" className="display max-w-[16ch] text-3xl leading-[1.05] sm:text-4xl md:text-[2.9rem]">
            Directed, not gathered.
          </h2>
          <div className="mt-6 max-w-[58ch] space-y-5 text-lg">
            {event.pitch.map((p, i) => (
              <p key={i} className={i === 0 ? "text-ink" : "text-ink-dim"}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
