"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

type Status = { kind: "idle" | "ok" | "err"; msg?: string };

const ROLES = ["Builder", "Founder", "Investor", "Just curious"];

export function RsvpForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = String(data.get("email") || "").trim();
    const role = String(data.get("role") || "");
    const company = String(data.get("company") || ""); // honeypot

    if (company) {
      setStatus({ kind: "ok", msg: "You're on the list." });
      return;
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus({ kind: "err", msg: "Enter a valid email address." });
      return;
    }

    setBusy(true);
    setStatus({ kind: "idle" });
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role }),
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) {
        form.reset();
        setStatus({
          kind: "ok",
          msg: json.demo
            ? "Captured (demo mode — add RESEND_API_KEY to send for real)."
            : "You're on the list. We'll send the brief when applications open.",
        });
      } else {
        setStatus({ kind: "err", msg: json.error || "Something went wrong. Try again." });
      }
    } catch {
      setStatus({ kind: "err", msg: "Network error. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-[520px]" noValidate>
      <div className="flex flex-col gap-2 sm:flex-row">
        <label className="sr-only" htmlFor="rsvp-email">
          Email address
        </label>
        <input
          id="rsvp-email"
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@domain.com"
          required
          className="mono min-w-0 flex-1 rounded-[2px] border border-line bg-bg-2 px-4 py-3 text-sm text-ink placeholder:text-ink-faint focus-visible:border-forge focus-visible:outline-none"
        />
        <Button type="submit" kind="primary" disabled={busy}>
          {busy ? "Sending…" : "Join the list"}
        </Button>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
        <span className="mono text-[0.7rem] uppercase tracking-[0.16em] text-ink-faint">I&apos;m a</span>
        {ROLES.map((r, i) => (
          <label key={r} className="mono flex cursor-pointer items-center gap-1.5 text-xs text-ink-dim">
            <input
              type="radio"
              name="role"
              value={r}
              defaultChecked={i === 0}
              className="accent-forge"
            />
            {r}
          </label>
        ))}
      </div>

      {/* honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <p className="mono mt-3 min-h-[1.2em] text-center text-sm" aria-live="polite" role="status">
        {status.kind === "ok" && <span className="text-heat-gold">{status.msg}</span>}
        {status.kind === "err" && <span className="text-[#ff7a5c]">{status.msg}</span>}
        {status.kind === "idle" && (
          <span className="text-ink-faint">No spam. One email when applications open.</span>
        )}
      </p>
    </form>
  );
}
