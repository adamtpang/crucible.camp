import { event, go, links } from "@config";
import { CtaLink } from "@/components/CtaLink";

export function Tracks() {
  const { tracks, bounties } = event;

  return (
    <section
      id="tracks"
      aria-labelledby="tracks-h"
      className="reveal mx-auto max-w-[1180px] border-t border-line-soft px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid gap-8 md:grid-cols-[14rem_1fr] md:gap-12">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="mono text-sm font-semibold tracking-[0.1em] text-forge">03</span>
          <span className="mono text-xs uppercase tracking-[0.22em] text-ink-faint">Tracks &amp; bounties</span>
        </div>

        <div>
          <h2 id="tracks-h" className="display max-w-[20ch] text-3xl leading-[1.05] sm:text-4xl md:text-[2.9rem]">
            Three tracks. One standard: it has to work.
          </h2>

          {/* tracks */}
          <ul className="mt-8 grid gap-px overflow-hidden rounded border border-line bg-line sm:grid-cols-3">
            {tracks.map((t) => (
              <li key={t.name} className="flex flex-col gap-2 bg-panel p-6">
                <span className="mono text-[0.7rem] uppercase tracking-[0.16em] text-forge">{t.tag}</span>
                <span className="display text-xl">{t.name}</span>
                <span className="text-sm leading-relaxed text-ink-dim">{t.blurb}</span>
              </li>
            ))}
          </ul>

          {/* bounties, a moment, not fine print */}
          <div className="mt-10 rounded border border-line bg-bg-2 p-6 md:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="kicker mb-2">Bounty pool</p>
                <p className="display heat-text text-4xl leading-none sm:text-5xl md:text-6xl">{bounties.pool}</p>
              </div>
              <p className="max-w-[34ch] text-sm text-ink-dim">{bounties.intro}</p>
            </div>

            <ul className="mt-8 divide-y divide-line-soft border-t border-line-soft">
              {bounties.items.map((b, i) => {
                const tbd = !b.sponsor || b.sponsor.startsWith("TODO");
                return (
                  <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4">
                    <span className="display min-w-[5ch] text-xl text-heat-amber">{b.amount}</span>
                    <span className="flex-1 text-ink">{b.title}</span>
                    {b.sponsorSlug ? (
                      <a
                        href={go(b.sponsorSlug)}
                        className="mono text-xs uppercase tracking-[0.14em] text-ink-dim underline-offset-4 hover:text-forge hover:underline"
                      >
                        {b.sponsor}
                      </a>
                    ) : (
                      <span className="mono text-xs uppercase tracking-[0.14em] text-ink-faint">
                        {tbd ? "Sponsor TBA" : b.sponsor}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-7 flex flex-wrap items-center gap-4">
              <CtaLink href={go("sponsor")} kind="secondary">
                {links.sponsor.label}
              </CtaLink>
              <span className="mono text-xs text-ink-faint">
                Capital lane led by{" "}
                <a href={go("fulgur")} className="text-ink-dim hover:text-forge">
                  Fulgur Ventures
                </a>
                .
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
