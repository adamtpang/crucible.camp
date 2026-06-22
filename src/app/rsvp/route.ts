import { NextRequest, NextResponse } from "next/server";
import { event } from "@config";

export const dynamic = "force-dynamic";

/**
 * /rsvp, the owned, swappable short link fronted everywhere.
 * 302s to a single config value (event.rsvp.destination) with attribution tags.
 * Swap the destination in event.config.ts; the link you've printed never changes.
 */
export function GET(req: NextRequest) {
  const source = req.nextUrl.searchParams.get("source") ?? "rsvp";
  const dest = new URL(event.rsvp.destination);
  dest.searchParams.set("utm_source", "arc-hackathon");
  dest.searchParams.set("utm_medium", "short-link");
  dest.searchParams.set("utm_campaign", source);
  return NextResponse.redirect(dest, 302);
}
