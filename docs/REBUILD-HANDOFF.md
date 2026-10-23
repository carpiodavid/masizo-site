# MASIZO REBUILD — HANDOFF BRIEF

**For:** a fresh orchestration session beginning the build (no prior context —
this document is everything).
**From:** the audit engagement, October 2026 (David Carpio).
**Mission:** build Masizo Development & Restorations a new website they own —
at full parity with their current site, measurably better in function, and at
or above its visual bar — then cut over safely and get it indexed.

---

## 1 · Context in 60 seconds

Masizo is a licensed Gilbert, AZ general contractor + 24/7 restoration firm
(28 years, since 1998). They asked for SEO help. The audit found: their
current site (masizodevelopment.com) is **well built but vendor-captive** —
another provider controls it and Masizo cannot change anything. Meanwhile
**only ~6 of its 17 pages are indexed**; Google still shows the *previous*
site's titles; old URLs 404; there is **zero analytics**; and the business
appeared in **0 of 5** money-keyword searches tested. Off-site, their
identity is fragmented across three business-name variants with outdated
listings.

Decision made with the client-facing proposal: **owned rebuild at full
parity, same URL slugs, on Masizo's own domain/hosting/keys**, with a
measured cutover. Timing favors this: with so little indexed, platform-swap
SEO risk is at a historic minimum.

**Decisions already locked (do not relitigate):**
- Stack: **Astro + Cloudflare Pages** (static-first), Pages Functions for the
  lead API. Everything under accounts Masizo owns.
- Design: **fresh premium design** — match or beat the current site's polish;
  do NOT clone its design (another shop made it).
- Workspace: **new dedicated repo** (suggest `masizo-site`). Do not build
  inside any other client's repo.

---

## 2 · Verified factbase (single source of truth)

Put these in one `src/data/business.ts` and never hardcode a business fact in
a page (pattern proven on a prior build).

| Fact | Value | Status |
|---|---|---|
| Entity | **Masizo Development LLC** (site footer) — trade name "Masizo Development & Restorations" | observed on live site |
| Phone | **(602) 909-7630** | observed |
| Email | **office@masizodevelopment.com** | observed |
| Hours | **Open 24 hours, 7 days a week** | observed on live site |
| Licenses | **AZ ROC #336058** (general), **AZ ROC #347030** (restoration), **CA LIC #1107781** | claimed on site — owner to re-confirm current status |
| Certifications | IICRC certified; insured; **BBB A+ accredited** | claimed/reported |
| Experience | 28 years, in Arizona since 1998 | claimed — consistent across site |
| Service area | Gilbert, Mesa, Chandler, Queen Creek, San Tan Valley, Tempe, Scottsdale, Phoenix, Fountain Hills, Paradise Valley | observed (site footer/service-areas) |
| Services | Custom homes, full/kitchen/bath remodels, room additions, ADUs & casitas, roofing, 24/7 water/mold/fire restoration | observed |
| GBP | Exists: Google Maps **cid 1086874099717890420** (embedded on their contact page) | observed |
| Socials | facebook.com/Masizodevelopment · instagram.com/masizo_development · yelp.com/biz/masizo-development-and-restorations-fountain-hills-2 | observed |
| Third-party ratings | Yelp 5.0 (2 reviews), Angi 5×5★, BuildZoom 96, Nextdoor praise | reported (directories) |
| SMS program | They run one (opt-out STOP, 18+, disclosed in their terms) — keep the disclosure pattern on the new form | observed |

**Known identity fragmentation (context, mostly handled off-site, but the new
site must state one identity consistently):** directories variously list
"Masizo Development LLC" / "Masizo Development & Restorations" / "Masizo
Restorations", addresses in Gilbert (incl. 4174 E Sandy Way 85297), Fountain
Hills 85268, and Garden Grove CA, and an old email on masizoenterprises.com.
The site is the canonical source: LLC entity, Gilbert, the phone/email above,
24/7 hours.

---

## 3 · The current site — the parity bar

Live at https://www.masizodevelopment.com (Next.js on Vercel; the **design
originated in Framer** — asset paths `/images/framer/<hash>-*.webp`). Crawl it
yourself for calibration before designing anything.

**All 17 pages (sitemap-verified, all HTTP 200). Keep these slugs EXACTLY in
the new build — identical slugs mean near-zero redirect loss at cutover:**

| Slug | Title (live) | Words | Schema today |
|---|---|---|---|
| `/` | Masizo Development \| Gilbert AZ Custom Homes, ADUs & Roofing | 3,243 | WebSite, GeneralContractor, FAQPage |
| `/services` | Services \| Masizo Development, Gilbert AZ Contractor | 664 | + ItemList |
| `/services/roofing` | Roofing Contractor in the Phoenix Valley \| … | 3,301 | + Service, Breadcrumb, FAQPage |
| `/services/adu-construction` | ADU and Casita Builder in the Phoenix Valley \| … | 3,322 | same |
| `/services/custom-homes` | Custom Home Builder in Phoenix, Arizona \| … | 3,317 | same |
| `/services/restoration` | Water Damage Restoration, Phoenix Valley \| … ("Open 24/7…IICRC") | 3,328 | same |
| `/services/home-remodeling` | Full Home Remodels in the Phoenix Valley \| … | 3,280 | same |
| `/services/kitchen-remodeling` | Kitchen Remodeling in the Phoenix Valley \| … | 3,251 | same |
| `/services/bathroom-remodeling` | Bathroom Remodeling in Gilbert, AZ \| … | 3,293 | same |
| `/services/room-additions` | Room Additions in the Phoenix Valley \| … | 3,284 | same |
| `/service-areas` | Service Areas \| Masizo Development, Phoenix Valley Contractor | 569 | WebSite, GC |
| `/guides/arizona-adu-law` | Arizona ADU Law HB 2720: What You Can Build \| … | 4,184 | + Article, Breadcrumb, FAQPage |
| `/portfolio` | Our Work: Remodels, Kitchens & Baths \| … | 277 | WebSite, GC |
| `/testimonials` | Reviews \| Masizo Development, Gilbert AZ Contractor (quotes Google reviews) | 2,499 | WebSite, GC |
| `/contact` | Contact Masizo Development \| Free Estimate in Gilbert, AZ | 380 | WebSite, GC |
| `/privacy-policy` | Privacy Policy \| … | 986 | WebSite, GC |
| `/terms-and-conditions` | Terms and Conditions \| … | 840 | WebSite, GC |

**Technical state (verified):** clean 308s http→https and apex→www; open
robots.txt with sitemap; real 404s; TTFB 0.25–0.6s; OG tags everywhere;
`max-image-preview:large`. **Defects to beat:** homepage missing canonical;
no llms.txt; **zero tracking of any kind**; legacy URLs from the generation
before this one 404 with no redirects (known: `/services/commercial`,
`/who-we-are/anthony-ardizzone-president`; discover more via Wayback Machine
and Search Console once access exists).

**⚠️ Content ownership is unconfirmed.** The copy belongs, until proven
otherwise, to the current provider. **Rewrite every page from scratch** —
same topical coverage, equal or better depth (~3,300+ words on service
pages), Masizo's voice, zero copied sentences. Crawl the live pages to build
a *topic checklist* per page (what questions each answers, which FAQs, which
cities named), then write fresh against that checklist. Photos: use only
images Masizo supplies and owns; until then, clearly-marked placeholders.

---

## 4 · The design bar (read twice)

The current site **does not look AI-generated**, and the client notices this.
The new site must clear the same bar with a fresh identity. Hard rules:

- **Banned patterns** (the "obviously generated" tells): generic hero with
  centered H1 + two gradient buttons over a stock photo; emoji icons; card
  grids of three with identical drop shadows everywhere; purple/indigo
  gradients; cookie-cutter Tailwind component look; placeholder-feeling stock
  imagery of smiling hardhat models; walls of centered text; accent-stripe
  decorations.
- **Target feel:** premium Arizona construction — confident, warm, material.
  Real project photography does the talking (full-bleed, art-directed crops);
  restrained palette drawn from desert/material tones chosen fresh (do NOT
  reuse the current site's exact palette or layouts); strong editorial
  typography (a characterful display face + a quiet text face, licensed/free
  e.g. via Fontsource); generous whitespace; asymmetric layouts; subtle
  scroll-reveal motion at most — never parallax carnival.
- **Design-system first:** tokens in one CSS file (colors, type scale,
  spacing, radii); every page composed from the same system. Build 2–3
  homepage design candidates as static comps, screenshot them, pick the
  strongest, then systematize. Review every page visually at 390px and
  1440px before calling anything done.
- Mobile is the primary viewport — contractors' customers search from phones;
  tap-to-call everywhere, sticky mobile call bar pattern.

---

## 5 · Build spec

**Stack:** Astro (static output) on Cloudflare Pages; Pages Functions for
`POST /api/lead`; repo in Masizo-reachable ownership (start under
carpiodavid, transfer later). No CMS required; content in `.astro`/MD + data
files. Images: owner photos → AVIF/WebP via Astro assets, explicit
dimensions, lazy-loaded below the fold.

**Information architecture:** the 17 parity slugs above, plus:
- `/services/commercial` — rebuild this page (it existed, is still indexed,
  and 404s today; the old title was "Commercial – Masizo Development &
  Restorations"); covers commercial GC/TI work, emergency services 24h.
- City pages `/service-areas/<city>` for the 10 listed cities — **gated: a
  city page ships only with a real, completed job photo from that city**
  (anti-doorway rule). Hand-written, non-templated copy per city. Ship the
  gate-passing ones at launch; the rest as photos arrive.
- 2–3 more guides over time (e.g. "roof insurance claims in AZ", "what a
  kitchen remodel costs in the East Valley") — guide #1 (ADU law) must be
  rewritten fresh and kept, it's their best AI-search asset.
- A real 404 page.

**Lead machine (the RHS pattern, proven):**
1. `POST /api/lead` Pages Function → write to **KV first** (a lead can never
   be lost to a mail outage) → then email notification (Resend) to the owner.
2. Forms: short (name, phone, city, service, message), with the SMS-consent
   disclosure text pattern their current terms use.
3. **24/7 emergency path:** restoration gets a distinct, always-visible
   emergency CTA (phone-first); confirm with owner whether (602) 909-7630
   answers 24/7 or a separate line exists — until confirmed mark `[VERIFY]`.
4. Thank-you page (conversion event target). Tap-to-call `tel:` links
   sitewide; sticky call bar on mobile.

**Tracking (currently zero — a headline selling point of the rebuild):**
GA4 via gtag with events for call clicks, form submit, thank-you page;
Google Ads tag slot (dormant until an ID exists); optional Meta pixel slot
(dormant). Disclose in the privacy policy.

**SEO/GEO/LLMO spec:**
- Title pattern `"{Service} in {Geo} | Masizo Development"`; hand-written
  meta descriptions; canonical on EVERY page including home; one host
  (`https://www.masizodevelopment.com`), 308/301 everything else.
- JSON-LD graph: Organization + `GeneralContractor` (NAP, `areaServed`,
  licenses in `hasCredential`, 24/7 `openingHoursSpecification`, sameAs →
  GBP/Facebook/Instagram/Yelp) sitewide; `Service` + `BreadcrumbList` +
  `FAQPage` per service page; `Article` + `FAQPage` on guides; genuine
  review content with `Review` markup ONLY for reviews verifiably real
  (their Google reviews — link each to the GBP; never fabricate).
- Visible trust block on every page: all three license numbers, IICRC, BBB
  A+, 28 years — plain crawlable text (assistants cite verifiable facts).
- FAQ sections on every service page (real questions customers ask —
  harvest from the live pages' topics, competitor pages, and "People Also
  Ask").
- `robots.txt`: allow all incl. GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot; sitemap line. Add **`llms.txt`** (business facts,
  services, licenses, service area, page guide).
- `_redirects`: both legacy generations → new pages (old-old URLs above +
  anything Wayback/GSC reveals; `/services/commercial` now resolves by being
  rebuilt).

**Performance budget:** beat the current site — Lighthouse ≥95 mobile
perf/SEO/a11y; LCP < 1.5s on 4G; total JS < 50KB (Astro default ~0);
homepage weight well under the current 424KB HTML.

**Competitive targets (the five searches the site must eventually win —
write service pages *at* these intents):**
1. ADU / custom home / remodel, Gilbert — currently: Revival (shows ROC#),
   ERC, Pride, RG Pro Builders
2. 24/7 water damage, Gilbert/Mesa — Flow State ("60-min response"), Drip
   (IICRC copy), Elite, Rocky Mountain
3. Roofing contractor, Gilbert — Stonecreek (4.9★, 530+ reviews advertised),
   Overson, Scott, Roof Rite
4. Kitchen & bath remodeling, Mesa — Phoenix Home Remodeling
   (`/home-remodeling/mesa-az/` pattern), Premier, 123
5. Mold remediation, Gilbert — Flow State, AZ Total Home (IICRC S520 copy),
   ServPro, ServiceMaster
Pattern to match: per-service-per-city pages, license/cert copy in text,
response-time promises (only promise what the owner confirms).

---

## 6 · Non-negotiable rules (shop law — from prior engagements)

1. **No fabricated reviews, testimonials, customer stories, stats, or
   response-time promises. Ever.** Testimonials page carries only their real
   Google reviews, attributed and linked.
2. **No claim ships unverified.** Anything not confirmed by the owner gets a
   `[VERIFY]` source comment and stays out of prod copy until confirmed.
3. **No photo, no city page.** Real completed-job photo from that city or
   the page doesn't exist.
4. **Rewrite, never copy.** Zero sentences lifted from the current site
   (ownership unconfirmed) or competitors.
5. **One source of truth** for business facts (`business.ts`); pages import,
   never restate.
6. **Everything measured.** Baseline before cutover; events on every
   conversion path.

---

## 7 · Open gates (client-blocked — build around them, never fake past them)

| Gate | Status | Build impact |
|---|---|---|
| Domain/DNS control | UNKNOWN — the single critical question | Build on staging (`masizo-site.pages.dev`); cutover only when DNS is in Masizo's hands |
| Provider contract (termination, content/photo ownership) | UNKNOWN | Rewrite copy regardless; use only owner-supplied photos |
| Photo library | Not yet delivered | Placeholders marked `[PHOTO: …]`; city pages wait |
| GBP + Search Console access | Not yet granted | Needed at cutover, not for build |
| 24/7 number confirmation | `[VERIFY]` | Blocks the emergency-CTA copy final |
| License status confirmation (ROC lookup) | `[VERIFY]` | Numbers shown as on current site until owner confirms |

---

## 8 · Suggested orchestration (subagents)

Orchestrator stays lean; delegate bulk work. Suggested split — adjust freely:

1. **Recon agent** (one, early): crawl all 17 live pages + Wayback for the
   old-old site; produce per-page topic checklists, FAQ inventories, and the
   full legacy-URL list for redirects. Output: `content/briefs/*.md`.
2. **Design agent** (one): design tokens + 2–3 homepage comps as real Astro
   pages; screenshot both viewports; orchestrator picks; then the chosen
   system documented in `src/styles/` + a components inventory.
3. **Scaffold agent** (one): Astro project, layouts, schema component
   (JSON-LD graph from `business.ts`), redirects, robots, llms.txt, sitemap,
   lead API + KV + email, tracking wiring, 404.
4. **Content agents** (parallel, 3–4): service pages split among them, each
   writing from the recon briefs + competitive targets; guides; core pages.
   Every page = copy + FAQ + meta + schema props filled.
5. **QA agents** (parallel, after assembly): (a) visual review of every page
   at 390/1440px against §4's banned list; (b) technical: schema validation,
   Lighthouse, link check, redirect tests, forms E2E to KV+email; (c) copy:
   claims audit against §6 (hunt fabrications and unverified claims),
   tone/consistency pass.
6. **Cutover runbook** (orchestrator): baseline (indexed pages via `site:`,
   the 5 searches, AI-assistant answers to "best ADU builder Gilbert" /
   "24/7 water damage Gilbert" / "is Masizo Development reputable" — record
   verbatim), then DNS swap → GSC sitemap submit → indexing requests → watch
   coverage daily × 14; re-test vs. baseline.

Verification is not optional: every agent's output gets checked by a
different agent or the orchestrator before merge.

## 9 · Definition of done

- [ ] All 17 parity slugs live with equal-or-better depth, rewritten copy
- [ ] `/services/commercial` rebuilt; both legacy URL generations redirect
- [ ] Design passes the §4 bar at both viewports on every page (reviewed, not assumed)
- [ ] Schema valid on every page (Rich Results test clean); canonical everywhere
- [ ] Lead path E2E: form → KV → email → thank-you event; emergency CTA live
- [ ] GA4 events firing; llms.txt + robots + sitemap correct
- [ ] Lighthouse ≥95 ×4 on mobile for home + one service page
- [ ] Zero `[VERIFY]` claims and zero `[PHOTO]` placeholders in shipped prod pages
- [ ] Baseline doc written; cutover runbook ready; everything in Masizo-ownable accounts

**The one-line brief if you forget everything else:** build the site a
28-year, five-star, triple-licensed contractor deserves — one they own, one
Google can finally see, one that doesn't look generated — and prove the
difference with numbers.
