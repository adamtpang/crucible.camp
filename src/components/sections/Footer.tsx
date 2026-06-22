import { event, go } from "@config";
import { CtaLink } from "@/components/CtaLink";

export function Footer() {
  return (
    <footer className="border-t border-line px-6 py-14 md:px-10">
      <div className="mx-auto max-w-[1180px]">
        {/* final CTA repeat */}
        <div className="flex flex-col items-start justify-between gap-6 border-b border-line-soft pb-10 sm:flex-row sm:items-center">
          <p className="display max-w-[18ch] text-2xl leading-tight sm:text-3xl">
            Real problems, real capital, one room.
          </p>
          <CtaLink href={go("apply-builder")} kind="primary" size="lg">
            Apply to build
          </CtaLink>
        </div>

        {/* minimal meta */}
        <div className="mono mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-ink-faint">
          <span className="flex items-center gap-1.5 text-ink-dim">
            <span aria-hidden className="heat-text">▲</span> {event.name}
          </span>
          <span aria-hidden className="text-line">·</span>
          <span>{event.location.venue}</span>
          <span aria-hidden className="text-line">·</span>
          <a href={event.host.url} className="transition-colors hover:text-forge">
            thearccity.com
          </a>

          <span className="flex items-center gap-x-5 sm:ml-auto">
            <a href={event.contact.social.x} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              X
            </a>
            <a href={event.contact.social.telegram} target="_blank" rel="noopener noreferrer" className="hover:text-ink">
              Telegram
            </a>
            <a href={`mailto:${event.contact.email}`} className="hover:text-ink">
              Contact
            </a>
            <a href={`mailto:${event.contact.press}`} className="hover:text-ink">
              Press
            </a>
          </span>
        </div>
        <p className="mono mt-4 text-[0.7rem] text-ink-faint/70">Hosted by Arc.</p>
      </div>
    </footer>
  );
}
