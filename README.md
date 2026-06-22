# CRUCIBLE, crucible.camp

Landing page for **Crucible**, a directed 36-hour Bitcoin hackathon at Network School,
co-produced by **Viber · The Arc · Fulgur Ventures**.

Next.js 15 (App Router) · TypeScript · Tailwind v4 · shadcn-style components · Resend.
Built as a **config-driven template**: the next edition is a `event.config.ts` swap, not a rebuild.

```
src/
  app/
    page.tsx              # composes the run-of-show curve
    layout.tsx            # fonts + metadata
    globals.css           # "cold steel, forged hot" design system
    rsvp/route.ts         # 302 → one config destination (the owned short link)
    door/route.ts         # 302 → same, tagged as on-site walk-in
    go/[slug]/route.ts    # attributable outbound redirects (config slug map)
    api/subscribe/route.ts# Resend interest capture (demo-safe without keys)
    icon.svg robots.ts sitemap.ts
  components/
    sections/             # Header, Hero, Pitch, Tracks, RunOfShow, Judges, Rsvp, Partners, Footer
    Countdown.tsx CtaLink.tsx RsvpForm.tsx Reveal.tsx
event.config.ts           # ← SINGLE SOURCE OF TRUTH (everything event-specific)
scripts/generate-qr.mjs   # QR codes for /door + /rsvp
```

## Quickstart
```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (type-checked)
```

## Everything lives in `event.config.ts`
Name, dates, countdown target, city, the three co-hosts, tracks, bounties, judges,
mentors, partners, the CTA/`links` slug→destination map, and the RSVP destination/mode.
Components hardcode nothing. **`grep -rn "TODO_" event.config.ts`** lists every value to fill.

## CTAs & attribution (the business lever)
Every outbound click is routed through an internal redirect so it's trackable, and every
destination is one config value:

| Route | Goes to | Notes |
|---|---|---|
| `/rsvp` | `event.rsvp.destination` | The owned short link you front everywhere. Swap the destination, the printed link never changes. |
| `/door` | `event.rsvp.destination` | Same, tagged `utm_medium=door-qr&source=door` so walk-ins are distinguishable. |
| `/go/[slug]` | `links[slug].destination` | Apply-builder, apply-investor, sponsor, mentor, partner, livestream, the 3 co-hosts, and any sponsor logo. Unknown slug → home. |

All redirects append `utm_source=crucible.camp` + a per-route `utm_campaign`. `mailto:` passes through untouched.

**CTA set:** Apply as a builder + Apply as an investor (co-primary) · RSVP (catch-all) ·
Sponsor a bounty · Become a judge/mentor · Partner with us · Watch the livestream. Edit labels/destinations in `links`.

## RSVP backend (swap without touching markup)
`event.rsvp.mode`:
- `"email"` → on-site capture via Resend (`/api/subscribe`). **Demo-safe**: with no
  `RESEND_API_KEY`, it validates and returns success but sends nothing.
- `"embed"` → drops a Luma/Tally iframe (`event.rsvp.embedUrl`).
- `"redirect"` → a button that bounces through `/rsvp` to the destination.

Copy `.env.example` → `.env.local` and add `RESEND_API_KEY` (+ optional `RESEND_AUDIENCE_ID`,
`RSVP_NOTIFY_EMAIL`, `RESEND_FROM`) to send for real.

## QR codes
```bash
npm run qr     # writes public/qr/{door,rsvp}.{png,svg}  (uses SITE_URL or https://crucible.camp)
```
Print `door.png` at the entrance; share `rsvp.png` anywhere.

## Deploy to Vercel + crucible.camp
```bash
vercel            # first deploy (links/creates project; framework auto-detected = Next.js)
vercel --prod     # production
vercel domains add crucible.camp
vercel domains add www.crucible.camp
```
Add your env vars in **Vercel → Project → Settings → Environment Variables** (same keys as `.env.example`).

**DNS** (at your registrar, if DNS isn't already on Vercel):

| Type | Name | Value |
|---|---|---|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

`vercel domains inspect crucible.camp` prints the exact records for your account (use those if they differ).

---

## TODO before launch, swap in `event.config.ts`
- `TODO_APPLY_BUILDER` / `TODO_APPLY_INVESTOR`, real application form URLs (Tally/Typeform/Luma)
- `TODO_RSVP_DESTINATION`, where `/rsvp` and `/door` point (Luma event, etc.)
- `TODO_DATE` / `TODO_COUNTDOWN`, real dates + ISO countdown target (with TZ offset)
- `TODO_LOCATION`, confirm venue + city
- `TODO_BOUNTIES`, real amounts + sponsors (`sponsorSlug` links the logo via `/go/<slug>`)
- `TODO_JUDGES` / `TODO_MENTORS`, names as they confirm
- `TODO_SPONSORS`, sponsor names + add their slug to `links`
- `TODO_COHOST_URLS`, confirm viber.global / thearccity.com / fulgur.ventures URLs
- `TODO_CONTACT` / `TODO_LIVESTREAM` / social, footer links
- Resend env vars (above) to take the RSVP form live

> Note: the previous static prototype (`index.html`, `styles.css`, `main.js`, and root-level
> `favicon.svg`/`og.svg`/`robots.txt`/`sitemap.xml`) is superseded by this app and inert, but a
> safety guard blocked automated deletion. Remove them when convenient:
> `git rm index.html styles.css main.js favicon.svg og.svg robots.txt sitemap.xml`
