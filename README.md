# CRUCIBLE — crucible.camp

A one-page teaser / interest-capture site for **Crucible**, a Bitcoin hackathon at Network School.

Static HTML/CSS/JS. No build step, no framework, no backend — optimized for instant Vercel deploys.

```
index.html      # all content + every TODO_ lives here
styles.css      # "cold steel, forged hot" design system
main.js         # form handling (Formspree-ready) + scroll reveal
favicon.svg     # crucible glyph
og.svg          # social share card (1200×630)
vercel.json     # clean URLs + security headers
robots.txt / sitemap.xml
```

**Design concept — "Cold steel, forged hot."** A disciplined cold-charcoal base
against a single accent system: the real blackbody color ramp metal glows through
as it heats (dull ember → orange → amber → white-hot). The signature element is the
`CRUCIBLE` wordmark *forging* on load. Type: Archivo Expanded (display) · IBM Plex
Mono (instrument/labels) · Archivo (body).

---

## ✅ Swap these in tonight (each is one line — search for `TODO_`)

All edits are in **`index.html`** unless noted. Total time: well under 10 minutes.

| Marker | Where | What to do |
|---|---|---|
| `TODO_FORM_ENDPOINT` | `index.html` `<form action>` (and the form works automatically once changed) | Create a form at [formspree.io](https://formspree.io), copy its ID, set `action="https://formspree.io/f/XXXXXXXX"`. Until then the form runs in safe "demo mode". |
| `TODO_DATE` | hero `<dd>` | Real dates, e.g. `14–15 SEP 2026`. |
| `TODO_THESIS` | hero `.thesis` | The one-line thesis (currently the brief's placeholder — tighten if you want). |
| `TODO_PARTNERS` | section 04 | Replace the backing sentence + the 4 `PARTNER 0X` placeholders with real names / the capital figure. |
| `TODO_OG` *(optional)* | `<head>` `og:image` | For maximum link-preview compatibility, export `og.svg` → `og.png` (1200×630) and point the tag at `/og.png`. SVG works on most platforms as-is. |
| `TODO_SOCIAL` *(optional)* | footer | Add X / Telegram links. |

> Tip: `grep -rn "TODO_" .` lists every placeholder with its line number.

---

## 🚀 Deploy to Vercel + connect crucible.camp

Vercel CLI is already installed. From this folder:

```bash
# 1. one-time auth
vercel login

# 2. first deploy — links/creates the project (accept the defaults; framework = Other)
vercel

# 3. ship to production
vercel --prod

# 4. attach your domain (do apex + www)
vercel domains add crucible.camp
vercel domains add www.crucible.camp
```

### DNS records to set at your registrar

If your domain's DNS is **NOT** on Vercel, add these at your current registrar/DNS host:

| Type | Name / Host | Value | TTL |
|---|---|---|---|
| `A` | `@` (apex `crucible.camp`) | `76.76.21.21` | Auto / 3600 |
| `CNAME` | `www` | `cname.vercel-dns.com` | Auto / 3600 |

Then redirect `www → apex` (or vice-versa) in **Vercel → Project → Settings → Domains**.

**Source of truth:** run `vercel domains inspect crucible.camp` — it prints the *exact*
records Vercel wants for your account (the apex IP and the `www` target, e.g.
`cname.vercel-dns-0.com`, occasionally differ). If they differ from the table above, use what `inspect` shows.

*Alternative (zero DNS editing):* point your registrar's **nameservers** at Vercel
(`ns1.vercel-dns.com`, `ns2.vercel-dns.com`) and let Vercel manage DNS. `vercel domains inspect` will confirm.

HTTPS certs are issued automatically once DNS resolves (usually minutes).

### Or deploy from Git
Push this repo to GitHub and "Import Project" at [vercel.com/new](https://vercel.com/new) —
Framework Preset **Other**, no build command, output dir = repo root. Every push auto-deploys.

---

## Local preview
No tooling needed — open `index.html`, or:
```bash
npx serve .      # http://localhost:3000
```
