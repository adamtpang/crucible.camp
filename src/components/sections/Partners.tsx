import { event, go, links } from "@config";
import { CtaLink } from "@/components/CtaLink";

export function Partners() {
  const sponsors = event.partners.filter((p) => p.tier === "Sponsor");

  return (
    <section
      id="partners"
      aria-labelledby="partners-h"
      className="reveal mx-auto max-w-[1180px] border-t border-line-soft px-6 py-20 md:px-10 md:py-28"
    >
      <div className="grid gap-8 md:grid-cols-[14rem_1fr] md:gap-12">
        <div className="flex items-baseline gap-3 md:flex-col md:gap-2">
          <span className="mono text-sm font-semibold tracking-[0.1em] text-forge">06</span>
          <span className="mono text-xs uppercase tracking-[0.22em] text-ink-faint">Partners &amp; sponsors</span>
        </div>

        <div>
          <h2 id="partners-h" className="display max-w-[18ch] text-3xl leading-[1.05] sm:text-4xl md:text-[2.9rem]">
            Hosted by The Arc. Three ecosystems, backed by more.
          </h2>

          {/* three equal headline co-hosts */}
          <ul className="mt-8 grid gap-px overflow-hidden rounded-noneborder border-line bg-line sm:grid-cols-3">
            {event.coHosts.map((c) => (
              <li key={c.slug} className="bg-panel">
                <a href={go(c.slug)} className="flex h-full flex-col gap-2 p-6 transition-colors hover:bg-bg-2">
                  <span className="display text-xl text-ink">{c.name}</span>
                  <span className="mono text-[0.7rem] uppercase tracking-[0.16em] text-forge">{c.lane}</span>
                </a>
              </li>
            ))}
          </ul>

          {/* sponsor slots */}
          <ul className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-noneborder border-line bg-line sm:grid-cols-3">
            {sponsors.map((s, i) => (
              <li
                key={i}
                className="flex min-h-[5rem] items-center justify-center bg-bg-2 p-4 text-center"
              >
                {s.slug ? (
                  <a href={go(s.slug)} className="mono text-xs uppercase tracking-[0.14em] text-ink-dim hover:text-forge">
                    {s.name}
                  </a>
                ) : (
                  <span className="mono text-xs uppercase tracking-[0.14em] text-ink-faint">{s.name}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <CtaLink href={go("partner")} kind="secondary">
              {links.partner.label}
            </CtaLink>
            <CtaLink href={go("livestream")} kind="ghost">
              {links.livestream.label} →
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
