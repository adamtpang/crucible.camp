/* ============================================================================
 * event.config.ts — CRUCIBLE — SINGLE SOURCE OF TRUTH
 * ----------------------------------------------------------------------------
 * Everything event-specific lives here. Components read from this file and
 * hardcode nothing. To run the NEXT edition, swap values here — not markup.
 *
 * Search "TODO_" for every value to confirm before launch.
 * ========================================================================== */

export type Beat = { time: string; label: string; detail: string };
export type Track = { name: string; tag: string; blurb: string };
export type Bounty = { amount: string; title: string; sponsor?: string; sponsorSlug?: string };
export type Person = { name: string; role: string; org?: string; confirmed?: boolean };
export type CoHost = { name: string; slug: string; lane: string };
export type Partner = { name: string; slug?: string; tier: string };
export type CtaKind = "primary" | "secondary" | "ghost";
export type LinkEntry = { label: string; destination: string; kind: CtaKind };

/* ---- /go/[slug] destination map — every outbound click is attributable ----
 * UI buttons link to internal /go/<slug>; the redirect route appends UTM tags
 * and 302s to `destination`. Edit destinations here without touching markup. */
export const links: Record<string, LinkEntry> = {
  // ---- primary apply paths (the segmented entry) ----
  // TODO_APPLY_BUILDER: point at your builder application (Tally/Typeform/Luma/etc.)
  "apply-builder": { label: "Apply as a builder", destination: "https://tally.so/r/TODO_BUILDER_FORM", kind: "primary" },
  // TODO_APPLY_INVESTOR: point at your investor / capital-seat application
  "apply-investor": { label: "Apply as an investor", destination: "https://tally.so/r/TODO_INVESTOR_FORM", kind: "primary" },

  // ---- secondary CTAs ----
  // TODO_SPONSOR: Fulgur's capital/partnerships lane — bounty sponsorship inbound
  sponsor: { label: "Sponsor a bounty", destination: "mailto:partners@crucible.camp?subject=Crucible%20bounty%20sponsorship", kind: "secondary" },
  // TODO_MENTOR: judge/mentor application
  mentor: { label: "Become a judge or mentor", destination: "https://tally.so/r/TODO_MENTOR_FORM", kind: "secondary" },
  // TODO_PARTNER: org partnership / co-host inquiry
  partner: { label: "Partner with us", destination: "mailto:hello@crucible.camp?subject=Crucible%20partnership", kind: "secondary" },
  // TODO_LIVESTREAM: the documented/livestreamed feed (or a "notify me" link pre-event)
  livestream: { label: "Watch the livestream", destination: "https://youtube.com/@TODO_CHANNEL", kind: "ghost" },

  // ---- the three co-hosts (equal headline partners), tracked ----
  // TODO_COHOST_URLS: confirm the canonical URLs
  viber: { label: "Viber", destination: "https://viber.global", kind: "ghost" },
  arc: { label: "The Arc", destination: "https://thearccity.com", kind: "ghost" },
  fulgur: { label: "Fulgur Ventures", destination: "https://fulgur.ventures", kind: "ghost" },
};

export const event = {
  /* ---- identity ---- */
  name: "CRUCIBLE",
  // hero positioning line (one sentence). TODO_POSITIONING: tighten if you want.
  positioning: "A directed 36-hour Bitcoin hackathon. Builders, founders, and capital in one room — forged, not gathered.",
  // used in meta + a one-liner under the pitch
  oneLiner: "36 hours. The best builders in Bitcoin. Real problems, real capital, one room.",

  /* ---- when + where ---- */
  // TODO_DATE: real dates. Kept as a Fri–Sun placeholder ~1 month out.
  date: {
    display: "25–27 July 2026",
    doors: "Doors 18:00 · Friday 25 July",
  },
  // TODO_COUNTDOWN: ISO 8601 with timezone offset. Network School is UTC+8 (Malaysia).
  countdownTargetISO: "2026-07-25T19:00:00+08:00",
  // TODO_LOCATION: confirm venue + city.
  location: {
    venue: "Network School",
    city: "Forest City, Malaysia",
  },

  /* ---- the three co-hosts: equal headline partners ---- */
  coHosts: [
    { name: "Viber", slug: "viber", lane: "Community & reach" },
    { name: "The Arc", slug: "arc", lane: "Host city & venue" },
    { name: "Fulgur Ventures", slug: "fulgur", lane: "Capital & partnerships" },
  ] satisfies CoHost[],

  /* ---- the pitch: why this is directed, not a room with deadlines ---- */
  pitch: [
    "Most hackathons hand you a room, a deadline, and a sponsor table, then disappear.",
    "Crucible is directed. The problem set is curated, the run of show is produced, and there is no dead air — every hour pulls you toward the next.",
    "Builders, not spectators. You leave with a thing that works and the people who can fund it.",
  ],

  /* ---- tracks (Bitcoin-focused) — add/remove freely ---- */
  tracks: [
    { name: "Lightning", tag: "L2 / payments", blurb: "Payments, streaming sats, and the rails that make Bitcoin spendable at scale." },
    { name: "On-chain", tag: "Protocol / L1", blurb: "Covenants, scripts, mining, and the base layer's genuinely hard problems." },
    { name: "Tooling", tag: "DevEx / infra", blurb: "Wallets, libraries, node infra — the developer experience the next 10,000 builders need." },
    // TODO_TRACKS: add more (Privacy, Custody, AI×BTC…) as the program firms up.
  ] satisfies Track[],

  /* ---- bounties: shown as a moment, not fine print. Fulgur leads the lane. ---- */
  bounties: {
    intro: "Capital is committed before you arrive. Bounties are won on the stage, not in a spreadsheet.",
    // TODO_BOUNTIES: real amounts + sponsors. sponsorSlug links the logo via /go/<slug>.
    pool: "$50,000+",
    items: [
      { amount: "$15,000", title: "Best Lightning experience", sponsor: "Fulgur Ventures", sponsorSlug: "fulgur" },
      { amount: "$15,000", title: "Hardest on-chain problem, solved", sponsor: "TODO_SPONSOR" },
      { amount: "$10,000", title: "Most useful tool for builders", sponsor: "TODO_SPONSOR" },
      { amount: "$10,000", title: "Judges' pick", sponsor: "TODO_SPONSOR" },
    ] satisfies Bounty[],
  },

  /* ---- run of show: the produced-experience curve (Doors → Finale) ---- */
  runOfShow: [
    { time: "Fri 18:00", label: "Doors", detail: "Walk in, badge up, first real conversation. No milling, no lanyard limbo." },
    { time: "Fri 19:00", label: "Kickoff", detail: "Lights down. The problem set, the bounties, and the clock — presented like a premiere, not a briefing." },
    { time: "36 hrs", label: "The Build", detail: "Heads-down. Mentors on the floor, capital in the room, checkpoints that keep the energy from sagging." },
    { time: "Sun 14:00", label: "Demo Theater", detail: "Every team on a real stage with real production. The audience is judges, founders, and investors — not a hallway." },
    { time: "Sun 17:00", label: "Judging", detail: "Live and on the record. Scored against problems that matter, not slide polish." },
    { time: "Sun 19:00", label: "The Finale", detail: "Bounties awarded, capital conversations opened, the night documented. You leave with momentum, not a tote bag." },
  ] satisfies Beat[],

  /* ---- judges + mentors (grid fills in as people confirm) ---- */
  // TODO_JUDGES / TODO_MENTORS: replace placeholders as names lock.
  judges: [
    { name: "To be announced", role: "Judge", confirmed: false },
    { name: "To be announced", role: "Judge", confirmed: false },
    { name: "To be announced", role: "Judge", confirmed: false },
    { name: "To be announced", role: "Judge", confirmed: false },
  ] satisfies Person[],
  mentors: [
    { name: "To be announced", role: "Mentor", confirmed: false },
    { name: "To be announced", role: "Mentor", confirmed: false },
    { name: "To be announced", role: "Mentor", confirmed: false },
  ] satisfies Person[],

  /* ---- partners + sponsors (co-hosts shown equal; sponsor slots fill in) ---- */
  partners: [
    { name: "Viber", slug: "viber", tier: "Co-host" },
    { name: "The Arc", slug: "arc", tier: "Co-host" },
    { name: "Fulgur Ventures", slug: "fulgur", tier: "Co-host" },
    // TODO_SPONSORS: add sponsors with a `slug` present in `links` so clicks are tracked.
    { name: "Sponsor slot", tier: "Sponsor" },
    { name: "Sponsor slot", tier: "Sponsor" },
    { name: "Sponsor slot", tier: "Sponsor" },
  ] satisfies Partner[],

  /* ---- RSVP: the single most important conversion point ----
   * mode: "email"    -> on-site capture via Resend (/api/subscribe)
   *       "embed"    -> drop in a Luma/Tally iframe (embedUrl)
   *       "redirect" -> button bounces through /rsvp to `destination`
   * Swap the backend by changing `mode` + `destination` — markup stays put. */
  rsvp: {
    mode: "email" as "email" | "embed" | "redirect",
    // TODO_RSVP_DESTINATION: the owned short link /rsvp (and /door) 302s here.
    destination: "https://lu.ma/TODO_CRUCIBLE",
    // TODO_RSVP_EMBED: only used when mode === "embed"
    embedUrl: "https://lu.ma/embed/event/TODO/simple",
  },

  /* ---- contact + social (footer) ---- */
  contact: {
    // TODO_CONTACT
    email: "hello@crucible.camp",
    press: "press@crucible.camp",
    social: {
      x: "https://x.com/TODO_CRUCIBLE",
      telegram: "https://t.me/TODO_CRUCIBLE",
    },
  },

  /* ---- SEO ---- */
  seo: {
    url: "https://crucible.camp",
    description:
      "CRUCIBLE — a directed 36-hour Bitcoin hackathon at Network School. Builders, founders, and capital in one room. Fully documented and livestreamed.",
  },
};

/* ---- helpers ---- */
export const go = (slug: string) => `/go/${slug}`;
export const RSVP_HREF = "/rsvp";
export const DOOR_HREF = "/door";

export type EventConfig = typeof event;
