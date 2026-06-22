import Link from "next/link";
import { event, go } from "@config";
import { CtaLink } from "@/components/CtaLink";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-bg/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1180px] items-center justify-between px-6 py-3 md:px-10">
        <Link href="#top" className="flex items-center gap-2" aria-label="Crucible, back to top">
          <span aria-hidden className="heat-text text-base leading-none">
            ▲
          </span>
          <span className="display text-base tracking-wide">{event.name}</span>
        </Link>
        <nav className="flex items-center gap-4" aria-label="Primary">
          <span className="mono hidden text-[0.7rem] uppercase tracking-[0.18em] text-ink-faint sm:inline">
            {event.location.venue}
          </span>
          <CtaLink href={go("apply-builder")} kind="primary" size="sm">
            Apply
          </CtaLink>
        </nav>
      </div>
    </header>
  );
}
