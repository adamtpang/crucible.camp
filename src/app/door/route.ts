import { NextResponse } from "next/server";
import { event } from "@config";

export const dynamic = "force-dynamic";

/**
 * /door — same destination as /rsvp, tagged as on-site walk-in traffic.
 * Put this behind the door QR so walk-ins are distinguishable from pre-event RSVPs.
 */
export function GET() {
  const dest = new URL(event.rsvp.destination);
  dest.searchParams.set("utm_source", "crucible.camp");
  dest.searchParams.set("utm_medium", "door-qr");
  dest.searchParams.set("utm_campaign", "walk-in");
  dest.searchParams.set("source", "door");
  return NextResponse.redirect(dest, 302);
}
