import { event, go } from "@config";
import { CtaLink } from "@/components/CtaLink";

/* Four stakeholder tracks on one page: each audience sees its own payoff and its
   own door. The coordination layer (event.connectivity) is the point of the section. */
export function Audiences() {
  return (
    <section
      id="who"
      aria-labelledby="who-h"
      className="reveal mx-auto max-w-[1180px] border-t border-line-soft px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid gap-8 md:grid-cols-[14rem_1fr] md:gap-12">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="mono text-sm font-semibold tracking-[0.1em] text-forge">02</span>
          <span className="mono text-xs uppercase tracking-[0.22em] text-ink-faint">Who&apos;s in the room</span>
        </div>

        <div>
          <h2 id="who-h" className="display max-w-[20ch] text-3xl leading-[1.05] sm:text-4xl md:text-[2.9rem]">
            Something to win for everyone in the room.
          </h2>
          <p className="mt-4 max-w-[58ch] text-ink-dim">{event.connectivity}</p>

          <ul className="mt-8 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-2">
            {event.audiences.map((a) => (
              <li key={a.key} className="flex flex-col gap-3 bg-panel p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="mono text-[0.72rem] uppercase tracking-[0.18em] text-forge">{a.label}</span>
                  <span className="mono text-[0.66rem] uppercase tracking-[0.14em] text-ink-faint">{a.seats}</span>
                </div>
                <p className="flex-1 text-ink-dim">{a.value}</p>
                <CtaLink href={go(a.slug)} kind="secondary" size="sm" className="self-start">
                  {a.cta}
                </CtaLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
