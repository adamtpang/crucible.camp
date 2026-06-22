import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

/**
 * POST /api/subscribe, interest capture via Resend.
 * Demo-safe: with no RESEND_API_KEY set, it validates and returns { ok, demo:true }
 * so the form works locally before you add keys. With a key, it adds the contact to
 * an audience (if RESEND_AUDIENCE_ID) and notifies the organizer (if RSVP_NOTIFY_EMAIL).
 */
export async function POST(req: NextRequest) {
  let body: { email?: string; role?: string } = {};
  try {
    body = await req.json();
  } catch {
    /* ignore */
  }

  const email = String(body.email || "").trim();
  const role = String(body.role || "").slice(0, 40);

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid email address." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // No backend wired yet, succeed in demo mode so the UX is testable.
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const resend = new Resend(key);
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    const notify = process.env.RSVP_NOTIFY_EMAIL;
    const from = process.env.RESEND_FROM || "Crucible <onboarding@resend.dev>";

    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
        firstName: role || undefined,
      });
    }
    if (notify) {
      await resend.emails.send({
        from,
        to: notify,
        subject: `Crucible, new ${role || "RSVP"}: ${email}`,
        text: `${email} (${role || "n/a"}) joined the Crucible interest list.`,
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Could not subscribe right now." }, { status: 502 });
  }
}
