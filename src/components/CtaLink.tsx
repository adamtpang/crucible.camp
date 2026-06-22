import Link from "next/link";
import { buttonVariants, type ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CtaLinkProps = {
  href: string;
  kind?: ButtonProps["kind"];
  size?: ButtonProps["size"];
  className?: string;
  children: React.ReactNode;
};

/**
 * A CTA rendered as a link. Internal hrefs (/go/<slug>, /rsvp, /door, #anchor)
 * use next/link; external hrefs (mailto:, https://) use a plain anchor.
 * Outbound clicks should target internal /go/<slug> routes so they stay attributable.
 */
export function CtaLink({ href, kind, size, className, children }: CtaLinkProps) {
  const classes = cn(buttonVariants({ kind, size }), className);
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}
