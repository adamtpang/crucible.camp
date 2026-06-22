/* ============================================================================
 * event.config.ts, ARC OPEN, SINGLE SOURCE OF TRUTH
 * ----------------------------------------------------------------------------
 * Arc Open is an edition of the Crucible hackathon engine: a directed,
 * multi-ecosystem builder weekend hosted by The Arc. The Bitcoin-only version
 * was edition zero; this is the Base x Solana x Bitcoin edition. To run the
 * next one, swap values here, not markup. Search "TODO_" before launch.
 * ========================================================================== */

export type Beat = { time: string; label: string; detail: string };
export type Track = { name: string; tag: string; blurb: string };
export type Bounty = { amount: string; title: string; sponsor?: string; sponsorSlug?: string };
export type Person = { name: string; role: string; org?: string; confirmed?: boolean };
export type CoHost = { name: string; slug: string; lane: string };
export type Audience = { key: string; label: string; value: string; slug: string; cta: string; seats: string };
export type Kpi = { value: string; label: string };
export type Partner = { name: string; slug?: string; tier: string };
export type CtaKind = "primary" | "secondary" | "ghost";
export type LinkEntry = { label: string; destination: string; kind: CtaKind };

/* ---- /go/[slug] destination map, every outbound click is attributable ---- */
export const links: Record<string, LinkEntry> = {
  // ---- primary apply paths ----
  // TODO_APPLY_BUILDER / INVESTOR / INCUBATOR / MEDIA: point at real application forms
  "apply-builder": { label: "Apply as a builder", destination: "https://tally.so/r/TODO_BUILDER_FORM", kind: "primary" },
  "apply-investor": { label: "Apply as an investor", destination: "https://tally.so/r/TODO_INVESTOR_FORM", kind: "primary" },
  "apply-incubator": { label: "Scout as an incubator", destination: "https://tally.so/r/TODO_INCUBATOR_FORM", kind: "secondary" },
  "apply-media": { label: "Apply for media access", destination: "https://tally.so/r/TODO_MEDIA_FORM", kind: "secondary" },

  // ---- secondary CTAs ----
  sponsor: { label: "Sponsor a bounty", destination: "mailto:partners@thearccity.com?subject=Arc%20Open%20sponsorship", kind: "secondary" },
  mentor: { label: "Become a judge or mentor", destination: "https://tally.so/r/TODO_MENTOR_FORM", kind: "secondary" },
  partner: { label: "Partner with us", destination: "mailto:hello@thearccity.com?subject=Arc%20Open%20partnership", kind: "secondary" },
  livestream: { label: "Watch the livestream", destination: "https://youtube.com/@TODO_CHANNEL", kind: "ghost" },

  // ---- host + the three ecosystems, all tracked ----
  arc: { label: "The Arc", destination: "https://thearccity.com", kind: "ghost" },
  base: { label: "Base", destination: "https://base.org", kind: "ghost" },
  solana: { label: "Solana", destination: "https://solana.com", kind: "ghost" },
  // Bitcoin lane is represented by Fulgur Ventures
  bitcoin: { label: "Bitcoin", destination: "https://fulgur.ventures", kind: "ghost" },
};

export const event = {
  /* ---- identity ---- */
  name: "Arc Open",
  // hero kicker line
  kicker: "An Arc hackathon · Base × Solana × Bitcoin",
  positioning: "One weekend. The best builders on Base, Solana, and Bitcoin, in one room. Hosted by The Arc. Forged, not gathered.",
  oneLiner: "One weekend. The best builders across Base, Solana, and Bitcoin. Real problems, real capital, one room.",

  // host of this edition
  host: { name: "The Arc", slug: "arc", url: "https://thearccity.com" },

  /* ---- when + where ---- */
  // TODO_DATE: confirm the month. Reading "the 10th and 11th" as Fri-Sat 10-11 July 2026.
  date: {
    display: "July 10-11, 2026",
    doors: "Doors 18:00 · Friday 10 July",
  },
  // TODO_COUNTDOWN + TODO_TZ: confirm the timezone (defaulting to UTC+8).
  countdownTargetISO: "2026-07-10T18:00:00+08:00",
  // TODO_LOCATION: confirm The Arc's venue + city.
  location: {
    venue: "The Arc",
    city: "Venue TBA",
  },

  /* ---- the three ecosystems in the arena (shown equal) ---- */
  coHosts: [
    { name: "Base", slug: "base", lane: "Coinbase L2" },
    { name: "Solana", slug: "solana", lane: "High-performance L1" },
    { name: "Bitcoin", slug: "bitcoin", lane: "L1 + Lightning, with Fulgur" },
  ] satisfies CoHost[],

  /* ---- who's in the room: four audiences, one switchboard ----
   * TODO_SEATS: confirm capacity numbers (they double as scarcity). */
  connectivity:
    "Arc Open is run like a switchboard. Builders, investors, incubators, and the people who tell the story are in one room on purpose, matched by hand, not left to a name-tag scramble.",
  audiences: [
    { key: "builders", label: "Engineers", value: "Ship something real in one weekend. Mentors on the floor, capital in the room, and a stage that actually gets watched.", slug: "apply-builder", cta: "Apply as a builder", seats: "50 team seats" },
    { key: "investors", label: "Investors", value: "Meet the teams while the code is still warm. First look and first check, before the round is a round.", slug: "apply-investor", cta: "Apply as an investor", seats: "20 investor seats" },
    { key: "incubators", label: "Incubators", value: "Source your next cohort under real pressure. Watch 50 teams build, then take the best ones home.", slug: "apply-incubator", cta: "Scout as an incubator", seats: "10 partner slots" },
    { key: "media", label: "Creators & media", value: "The story builds itself. Get the room, the footage, and the founders before anyone else has them.", slug: "apply-media", cta: "Apply for media access", seats: "12 media passes" },
  ] satisfies Audience[],

  /* ---- KPI band: PROPOSED targets for edition one (not results). TODO_KPIS: tune. ---- */
  kpis: {
    caption: "A proposal for edition one. Targets, not promises.",
    items: [
      { value: "3", label: "ecosystems: Base, Solana, Bitcoin" },
      { value: "50", label: "teams, hand-selected" },
      { value: "$100K+", label: "in bounties and pre-seed capital" },
      { value: "2-4", label: "investable teams, the real metric" },
      { value: "100%", label: "documented and livestreamed" },
    ] satisfies Kpi[],
  },

  /* ---- the pitch ---- */
  pitch: [
    "Most hackathons hand you a room, a deadline, and a sponsor table, then disappear.",
    "Arc Open is directed. Base, Solana, and Bitcoin in one room, a curated problem set, a produced run of show, and no dead air, every hour pulls you toward the next.",
    "Builders, not spectators. You leave with a thing that works and the people who can fund it.",
  ],

  /* ---- tracks = the three ecosystems ---- */
  tracks: [
    { name: "Base", tag: "Coinbase L2", blurb: "Onchain consumer apps, payments, and the EVM L2 pushing hardest for mainstream adoption." },
    { name: "Solana", tag: "High-performance L1", blurb: "High-throughput apps, DePIN, and anything that needs raw speed and low fees." },
    { name: "Bitcoin", tag: "L1 + Lightning, with Fulgur", blurb: "Lightning, self-custody, and the hard problems on the original chain." },
  ] satisfies Track[],

  /* ---- bounties: each ecosystem brings its own capital ---- */
  bounties: {
    intro: "Each ecosystem brings its own capital. Bounties are won on the stage, not in a spreadsheet.",
    // TODO_BOUNTIES: confirm amounts + sponsors. sponsorSlug links the logo via /go/<slug>.
    pool: "$100K+",
    items: [
      { amount: "$30,000", title: "Best Base app", sponsor: "Base", sponsorSlug: "base" },
      { amount: "$30,000", title: "Best Solana app", sponsor: "Solana", sponsorSlug: "solana" },
      { amount: "$30,000", title: "Best Bitcoin / Lightning build", sponsor: "Fulgur Ventures", sponsorSlug: "bitcoin" },
      { amount: "$10,000", title: "Best cross-ecosystem build", sponsor: "The Arc", sponsorSlug: "arc" },
    ] satisfies Bounty[],
  },

  /* ---- run of show: the produced-experience curve (Doors to Finale) ---- */
  runOfShow: [
    { time: "Fri 18:00", label: "Doors", detail: "Walk in, badge up, first real conversation. No milling, no lanyard limbo." },
    { time: "Fri 19:00", label: "Kickoff", detail: "Lights down. The problem set, the bounties, and the clock, presented like a premiere, not a briefing." },
    { time: "The weekend", label: "The Build", detail: "Heads-down. Mentors on the floor, capital in the room, checkpoints that keep the energy from sagging." },
    { time: "Sat 14:00", label: "Demo Theater", detail: "Every team on a real stage with real production. The audience is judges, founders, and investors, not a hallway." },
    { time: "Sat 17:00", label: "Judging", detail: "Live and on the record. Scored against problems that matter, not slide polish." },
    { time: "Sat 19:00", label: "The Finale", detail: "Bounties awarded, capital conversations opened, the night documented. You leave with momentum, not a tote bag." },
  ] satisfies Beat[],

  /* ---- judges + mentors (fill in as people confirm) ---- */
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

  /* ---- partners + sponsors (Arc hosts; ecosystems shown equal; slots fill in) ---- */
  partners: [
    { name: "The Arc", slug: "arc", tier: "Host" },
    { name: "Base", slug: "base", tier: "Ecosystem" },
    { name: "Solana", slug: "solana", tier: "Ecosystem" },
    { name: "Bitcoin / Fulgur", slug: "bitcoin", tier: "Ecosystem" },
    // TODO_SPONSORS: add sponsors with a `slug` present in `links` so clicks are tracked.
    { name: "Sponsor slot", tier: "Sponsor" },
    { name: "Sponsor slot", tier: "Sponsor" },
    { name: "Sponsor slot", tier: "Sponsor" },
  ] satisfies Partner[],

  /* ---- RSVP: mode "email" | "embed" | "redirect" ---- */
  rsvp: {
    mode: "email" as "email" | "embed" | "redirect",
    // TODO_RSVP_DESTINATION: the owned short link /rsvp (and /door) 302s here.
    destination: "https://lu.ma/TODO_ARC_OPEN",
    embedUrl: "https://lu.ma/embed/event/TODO/simple",
  },

  /* ---- contact + social ---- */
  contact: {
    // TODO_CONTACT: confirm Arc's addresses + socials
    email: "hello@thearccity.com",
    press: "press@thearccity.com",
    social: {
      x: "https://x.com/TODO_ARC",
      telegram: "https://t.me/TODO_ARC",
    },
  },

  /* ---- SEO ---- */
  seo: {
    url: "https://archackathon.vercel.app",
    description:
      "Arc Open, a directed multi-ecosystem hackathon hosted by The Arc. The best builders on Base, Solana, and Bitcoin, one weekend, one room. Documented and livestreamed.",
  },
};

/* ---- helpers ---- */
export const go = (slug: string) => `/go/${slug}`;
export const RSVP_HREF = "/rsvp";
export const DOOR_HREF = "/door";

export type EventConfig = typeof event;
