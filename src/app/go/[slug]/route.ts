import { NextRequest, NextResponse } from "next/server";
import { links } from "@config";

export const dynamic = "force-dynamic";

/**
 * /go/[slug], attributable outbound redirects for every CTA, sponsor, and partner.
 * Slug → destination map lives in event.config.ts (`links`). Unknown slug → home.
 */
export async function GET(req: NextRequest, ctx: { params: Promise<{ slug: string }> }) {
  const { slug } = await ctx.params;
  const entry = links[slug];

  if (!entry) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  // mailto: / tel: pass through untouched
  if (!/^https?:\/\//i.test(entry.destination)) {
    return NextResponse.redirect(entry.destination, 302);
  }

  const dest = new URL(entry.destination);
  dest.searchParams.set("utm_source", "arc-open");
  dest.searchParams.set("utm_medium", "go");
  dest.searchParams.set("utm_campaign", slug);
  return NextResponse.redirect(dest, 302);
}
