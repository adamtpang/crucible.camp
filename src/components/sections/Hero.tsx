import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { event, go, links, RSVP_HREF } from "@config";
import { Countdown } from "@/components/Countdown";
import { CtaLink } from "@/components/CtaLink";

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="wordmark"
      className="relative mx-auto max-w-[1180px] px-6 pb-16 pt-10 md:px-10 md:pb-24 md:pt-14"
    >
      {/* forge glow behind the wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -z-10 left-2 top-24 h-[40vw] max-h-[440px] w-[72vw] max-w-[640px] rounded-full blur-[60px]"
        style={{
          background:
            "radial-gradient(circle at 30% 50%, rgba(255,90,31,0.26), rgba(217,43,9,0.10) 40%, transparent 70%)",
        }}
      />

      <p className="kicker mb-6">A directed Bitcoin hackathon</p>

      <h1 id="wordmark" className="wordmark">
        {event.name}
      </h1>

      <p className="mt-6 max-w-[26ch] text-balance text-xl font-medium leading-snug text-ink sm:text-2xl">
        {event.positioning}
      </p>

      {/* date + location */}
      <div className="mono mt-9 flex flex-wrap gap-x-8 gap-y-2 text-sm">
        <span>
          <span className="text-ink-faint">DATE </span>
          {event.date.display}
        </span>
        <span>
          <span className="text-ink-faint">LOCATION </span>
          {event.location.venue} · {event.location.city}
        </span>
      </div>

      {/* live countdown */}
      <div className="mt-7 border-t border-line pt-7">
        <p className="kicker mb-4">Doors open in</p>
        <Countdown targetISO={event.countdownTargetISO} />
      </div>

      {/* primary CTAs: builder + investor co-primary, RSVP catch-all */}
      <div className="mt-9 flex flex-wrap gap-3">
        <CtaLink href={go("apply-builder")} kind="primary" size="lg">
          {links["apply-builder"].label}
          <ArrowRight size={16} aria-hidden />
        </CtaLink>
        <CtaLink href={go("apply-investor")} kind="secondary" size="lg">
          {links["apply-investor"].label}
        </CtaLink>
      </div>
      <p className="mt-4">
        <Link
          href={RSVP_HREF}
          className="mono text-sm text-ink-dim underline-offset-4 transition-colors hover:text-ink hover:underline"
        >
          Not ready to apply? RSVP to stay in the loop →
        </Link>
      </p>

      {/* co-host bar: three equal headline partners */}
      <div className="mt-12 border-t border-line pt-6">
        <p className="kicker mb-3">Co-produced by</p>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
          {event.coHosts.map((c) => (
            <Link
              key={c.slug}
              href={go(c.slug)}
              className="display text-lg text-ink transition-colors hover:text-white-hot sm:text-xl"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
