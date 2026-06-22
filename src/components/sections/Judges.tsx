import { event, go, links } from "@config";
import { CtaLink } from "@/components/CtaLink";
import type { Person } from "@config";

function PersonCard({ p }: { p: Person }) {
  const tbd = p.confirmed === false;
  return (
    <li className="flex items-center gap-4 rounded border border-line bg-panel p-4">
      <span
        aria-hidden
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-bg-2 text-lg"
      >
        <span className={tbd ? "text-ink-faint/40" : "heat-text"}>▲</span>
      </span>
      <span className="min-w-0">
        <span className={`block truncate ${tbd ? "text-ink-faint" : "text-ink"}`}>{p.name}</span>
        <span className="mono block text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">
          {p.role}
          {p.org ? ` · ${p.org}` : ""}
        </span>
      </span>
    </li>
  );
}

export function Judges() {
  const people = [...event.judges, ...event.mentors];

  return (
    <section
      id="judges"
      aria-labelledby="judges-h"
      className="reveal mx-auto max-w-[1180px] border-t border-line-soft px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid gap-8 md:grid-cols-[14rem_1fr] md:gap-12">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="mono text-sm font-semibold tracking-[0.1em] text-forge">04</span>
          <span className="mono text-xs uppercase tracking-[0.22em] text-ink-faint">Judges &amp; mentors</span>
        </div>

        <div>
          <h2 id="judges-h" className="display max-w-[20ch] text-3xl leading-[1.05] sm:text-4xl md:text-[2.9rem]">
            The people in the room with you.
          </h2>
          <p className="mt-4 max-w-[54ch] text-ink-dim">
            Operators and investors who&apos;ve shipped real Bitcoin products — on the floor while you build,
            on the panel when you demo. Roster locking now.
          </p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {people.map((p, i) => (
              <PersonCard key={i} p={p} />
            ))}
          </ul>

          <div className="mt-8">
            <CtaLink href={go("mentor")} kind="secondary">
              {links.mentor.label}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
