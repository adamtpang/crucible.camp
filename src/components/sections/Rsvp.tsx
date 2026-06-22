import { event, go, links, RSVP_HREF } from "@config";
import { CtaLink } from "@/components/CtaLink";
import { RsvpForm } from "@/components/RsvpForm";

/* The finale — the single most important conversion moment, loaded toward the back.
   Two co-primary apply paths + the RSVP catch-all (backend swappable via config.rsvp.mode). */
export function Rsvp() {
  const { mode, embedUrl } = event.rsvp;

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-h"
      className="reveal border-t border-line px-6 py-24 md:py-32"
      style={{
        background: "radial-gradient(80% 130% at 50% 130%, rgba(255,90,31,0.14), transparent 62%)",
      }}
    >
      <div className="mx-auto max-w-[640px] text-center">
        <p className="kicker mb-4">Applications are open</p>
        <h2 id="rsvp-h" className="display text-4xl leading-[0.98] sm:text-5xl md:text-6xl">
          Step into the crucible.
        </h2>
        <p className="mx-auto mt-4 max-w-[46ch] text-ink-dim">
          50 teams. Pick your lane. Builders ship; investors get the room before anyone else does.
        </p>

        {/* segmented apply paths */}
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CtaLink href={go("apply-builder")} kind="primary" size="lg">
            {links["apply-builder"].label}
          </CtaLink>
          <CtaLink href={go("apply-investor")} kind="secondary" size="lg">
            {links["apply-investor"].label}
          </CtaLink>
        </div>

        {/* RSVP catch-all — backend swaps via config.rsvp.mode */}
        <div className="mt-12 border-t border-line pt-10">
          <p className="mb-5 text-sm text-ink-dim">Not ready to apply? Get the brief and the open call.</p>

          {mode === "email" && <RsvpForm />}

          {mode === "redirect" && (
            <CtaLink href={RSVP_HREF} kind="secondary" size="lg">
              RSVP →
            </CtaLink>
          )}

          {mode === "embed" && (
            <div className="mx-auto max-w-[520px] overflow-hidden rounded border border-line">
              <iframe
                src={embedUrl}
                title="RSVP"
                className="h-[560px] w-full"
                style={{ border: "none" }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
