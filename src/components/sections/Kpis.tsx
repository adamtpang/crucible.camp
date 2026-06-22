import { event } from "@config";

/* Proposed target numbers for edition one. Honest framing: targets, not results. */
export function Kpis() {
  return (
    <section
      aria-labelledby="kpis-h"
      className="reveal border-y border-line px-6 py-16 md:py-20"
      style={{ background: "radial-gradient(120% 100% at 50% 0%, rgba(255,90,31,0.06), transparent 60%)" }}
    >
      <div className="mx-auto max-w-[1180px]">
        <div className="mb-9 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 id="kpis-h" className="display text-2xl sm:text-3xl md:text-4xl">
            The first edition, by the numbers.
          </h2>
          <p className="mono text-xs uppercase tracking-[0.16em] text-ink-faint">{event.kpis.caption}</p>
        </div>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded border border-line bg-line md:grid-cols-5">
          {event.kpis.items.map((k, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 bg-panel p-5 md:p-6 [&:last-child]:col-span-2 md:[&:last-child]:col-span-1"
            >
              <dt className="display heat-text text-[1.7rem] leading-none sm:text-4xl md:text-5xl">{k.value}</dt>
              <dd className="mono text-[0.7rem] uppercase tracking-[0.12em] text-ink-faint">{k.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
