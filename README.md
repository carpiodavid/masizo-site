# masizo-site

Owned rebuild of **www.masizodevelopment.com** for Masizo Development LLC
(trade name "Masizo Development & Restorations"). Astro v5 static output on
Cloudflare Pages, with a Pages Function for the lead API.

The project constitution is **`docs/REBUILD-HANDOFF.md`** — read it before
changing anything. This README covers running, deploying, and the scaffold's
architecture.

## Run / build

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # static build -> dist/ (includes sitemap-index.xml)
npm run preview    # serve the built dist/ locally
```

Local env: create `.env` (gitignored) for `PUBLIC_GA4_ID=G-XXXXXXXXXX` if you
want to test analytics markup. When unset, Base.astro renders no analytics at
all (GA4 is opt-in by env var).

## Architecture map

```
astro.config.mjs            site URL, static output, @astrojs/sitemap
wrangler.toml               Cloudflare Pages config: LEADS KV binding (id
                            placeholder), LEAD_EMAIL_TO/FROM vars
src/
  data/business.ts          THE single source of truth for every business fact
                            (NAP, hours, licenses, cities, services, GBP,
                            socials). Pages import; never restate a fact.
  components/
    Schema.astro            sitewide JSON-LD @graph (GeneralContractor +
                            Organization + WebSite); accepts per-page nodes
    schema-nodes.ts         typed builders: serviceNode / breadcrumbNode /
                            faqNode / articleNode (+ ORG_ID, WEBSITE_ID)
  layouts/Base.astro        html shell: title/description props, canonical on
                            EVERY page, OG tags, favicon, Schema, GA4 (gated
                            on PUBLIC_GA4_ID), call_click auto-tracking,
                            window.masizoTrack() event helper, minimal reset
  styles/tokens.css         EMPTY — owned by the design agent (all tokens)
  pages/                    one stub per parity slug (handoff §3) +
                            /services/commercial + /thank-you + 404 +
                            gated /service-areas/[city]
functions/
  api/lead.ts               POST /api/lead — KV-first loss-proof lead capture,
                            then Resend email (field contract in file header)
public/
  robots.txt                allow all incl. AI crawlers; sitemap line
  llms.txt                  hand-written business facts / page guide for LLMs
  _redirects                legacy-URL redirects (recon agent extends the
                            marked section)
  favicon.svg               placeholder — design agent replaces
docs/REBUILD-HANDOFF.md     the constitution
content/briefs/             recon agent output (topic checklists per page)
```

### Layout API (for design + content agents)

Every page:

```astro
---
import Base from "../layouts/Base.astro";
import { SERVICES, DISPLAY_NAME, PHONE_TEL } from "../data/business";
import { serviceNode, breadcrumbNode, faqNode } from "../components/schema-nodes";
const service = SERVICES.find((s) => s.slug === "roofing")!;
---
<Base
  title={`Roofing in the Phoenix Valley | ${DISPLAY_NAME}`}
  description="Hand-written meta description."
  schema={[serviceNode(service), breadcrumbNode([...]), faqNode([...])]}
>
  ...page content...
</Base>
```

- `Base` props: `title` (required), `description`, `ogType` ("website" |
  "article"), `ogImage`, `noindex`, `schema` (array of JSON-LD nodes).
- Canonical, OG tags, sitewide schema, and GA4 are automatic — never add them
  per page.
- Phone links: always `<a href={PHONE_TEL}>` — `call_click` fires
  automatically. Lead form success: call `window.masizoTrack("lead_submit")`
  and redirect to `/thank-you`.
- Design tokens live ONLY in `src/styles/tokens.css` (already imported by
  Base). No raw colors/sizes in pages.

## The rules (shop law — handoff §6)

1. **One source of truth.** Business facts live in `src/data/business.ts`
   only. Pages import, never restate. No hardcoded phone numbers, license
   numbers, city lists, anywhere.
2. **No fabricated content.** No invented reviews, stats, response-time
   promises, or customer stories. Testimonials = their real Google reviews,
   attributed and linked. Rewrite everything from scratch; zero sentences
   copied from the current site or competitors.
3. **[VERIFY] gating.** Facts the handoff flags unconfirmed carry `[VERIFY]`
   comments in `business.ts` (license status, IICRC/BBB, 24/7 phone
   answering, street address). They must not ship as hard prod claims until
   the owner confirms. Zero `[VERIFY]` / `[PHOTO]` markers may remain in
   shipped pages (definition of done). Note: `public/llms.txt` mirrors the
   factbase — re-check it against confirmations before cutover.
4. **No photo, no city page.** `/service-areas/<city>` builds only for cities
   with `hasPhoto: true` in `business.ts` (all `false` until owner photos
   arrive). Flip the flag only when a real completed-job photo from that city
   is in the repo.

## Cloudflare Pages setup (deploy)

All under **Masizo-owned** Cloudflare + Resend accounts.

1. **Create the Pages project** (name `masizo-site`), connected to this repo.
   Build command `npm run build`, output directory `dist`. Functions in
   `/functions` are picked up automatically (`POST /api/lead`).
2. **KV namespace** for leads:
   ```bash
   npx wrangler kv namespace create LEADS
   ```
   Paste the returned id into `wrangler.toml` (`[[kv_namespaces]]` → `id`),
   and bind it to the Pages project (Settings → Functions → KV namespace
   bindings → binding name `LEADS`).
3. **Environment variables** (Pages → Settings → Environment variables):
   - `LEAD_EMAIL_TO` = `office@masizodevelopment.com` (also in wrangler.toml)
   - `LEAD_EMAIL_FROM` = sender on a Resend-verified domain (placeholder in
     wrangler.toml is `[VERIFY]` until the Resend domain is verified)
   - `RESEND_API_KEY` = **encrypted secret, dashboard-set only — never
     commit secrets to this repo**
   - `PUBLIC_GA4_ID` = GA4 measurement id (leave unset until the Masizo GA4
     property exists; the site builds and runs fine without it)
4. **Staging:** the project serves at `masizo-site.pages.dev` — build and QA
   there while the domain gate (handoff §7) is open.
5. **Custom domain cutover** (only when DNS is in Masizo's hands — see
   handoff §7/§8): add `www.masizodevelopment.com` as the Pages custom
   domain; set zone-level redirect rules for http→https and apex→www
   (308/301, one canonical host); then follow the cutover runbook (baseline →
   DNS swap → GSC sitemap submit → indexing requests → watch coverage daily
   × 14).

## Status

Scaffold only. Every page renders a `[CONTENT: <slug> — pending content
agent]` placeholder; `tokens.css` is empty pending the design agent. The
build must stay green at every merge.
