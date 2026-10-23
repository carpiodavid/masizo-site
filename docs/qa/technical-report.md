# Technical QA report — masizo-site rebuild

Date: 2026-10-23 · QA agent run against a fresh clone + `npm ci && npm run build`
(20 pages built). Tooling: custom DOM validator (cheerio) over every page in
`dist/`, `wrangler pages dev` with a local KV namespace for the lead API, and
Lighthouse 12 (mobile emulation, Chromium 141) against the wrangler-served dist.

## Scoreboard

| # | Suite | Result |
|---|-------|--------|
| 1 | Structured data (JSON-LD) | **PASS** — zero failures on all 20 pages |
| 2 | Head hygiene | **PASS with exceptions** — 3 src-level issues reported below |
| 3 | Links (internal + external) | **PASS internal** (0 broken, 0 hash-only); 1 external 404, 2 external 403s (reported, not removed) |
| 4 | Redirects (`public/_redirects`) | **PASS** — wrangler parses 0 valid rules (comments only); nothing to shadow |
| 5 | robots.txt + llms.txt | **PASS** — parse-clean, sitemap URL correct, llms.txt facts match `src/data/business.ts` (one policy note) |
| 6 | Lead API (`functions/api/lead.ts`) | **PASS** — fully exercised against local KV; one hardening fix applied (in scope) |
| 7 | Performance (Lighthouse, mobile) | **MOSTLY PASS** — home 96/96/100/100; roofing 93/100/100/100; JS budget crushed; roofing perf dip is font-swap CLS (src) |
| 8 | A11y quick pass | **PASS with exceptions** — h1 problems on /, /404, /thank-you; contrast on emergency band (src, reported) |
| 9 | Weight | **PASS** — homepage HTML 66.8 KB raw / 13.2 KB gzipped vs old site's 424 KB (−84% raw) |

Launch blockers: **none** in the layers QA owns (functions/public/config). The
src-level items below should be fixed before cutover but none breaks the build,
indexing of real pages, or lead capture.

---

## 1. Structured data — PASS

Validated per page: exactly one `<script type="application/ld+json">`, exactly
one `@graph`, JSON parses, and **no empty/undefined/null values anywhere in any
node** (recursive scan) — all clean on all 20 pages.

- `GeneralContractor` node on all 20 pages: `telephone` = `+16029097630`,
  `email` = `office@masizodevelopment.com`, `areaServed` = 10 cities,
  `hasCredential` = 3 licenses, `openingHoursSpecification` present,
  `sameAs` = 4 profiles. All match `src/data/business.ts`. ✔
- All 9 service pages (`adu-construction`, `bathroom-remodeling`, `commercial`,
  `custom-homes`, `home-remodeling`, `kitchen-remodeling`, `restoration`,
  `roofing`, `room-additions`): exactly one each of `Service`,
  `BreadcrumbList`, `FAQPage`. ✔
- `/guides/arizona-adu-law`: `Article` + `BreadcrumbList` + `FAQPage`. ✔
- FAQPage `mainEntity` count matches the visible `<details>` accordion count on
  the same page, on every page that has either (home, services index,
  service-areas, guide, 9 service pages); every question has `name` +
  `acceptedAnswer.text`. ✔
- Minor observation (not a failure): `/404` and `/thank-you` carry the full
  org + website graph while being noindex. Harmless.

## 2. Head hygiene — PASS with exceptions

Checked on all 20 pages: exactly one `<title>`, one meta description, one
canonical, OG tags, robots meta.

Pass highlights: every canonical is the correct absolute `https://www.masizodevelopment.com`
URL with no trailing slash (the homepage canonical is the origin root `…com/`,
which is the correct form for `/`); all meta descriptions present are in the
120–165 char window (no outliers); `/thank-you` and `/404` are `noindex` and no
live page is; sitemap (`sitemap-index.xml` → `sitemap-0.xml`) lists exactly the
18 indexable pages — `/thank-you` and `/404` excluded, everything else included.

**Reported (src/ — not fixed by QA):**

1. **Homepage `<title>` is 68 chars** (budget ≤65):
   `Masizo Development | Custom Homes, ADUs & Restoration in Gilbert, AZ`.
   Trim 3+ chars (e.g. drop "Custom ").
2. **`/404` and `/thank-you` have no meta description and no `og:description`**
   (meta description count = 0). Low stakes (noindex), but the base layout
   should still emit one.
3. **`og:image` missing on every page** (WARN). Expected while the photo
   library is undelivered, but add a branded fallback OG image before launch —
   shared links currently render with no card image.

## 3. Links — PASS (internal); external findings reported

- **Internal:** every `href`/`src`/`srcset` on every page resolves to a built
  page or asset in `dist/`. 0 broken. 0 hash-only (`href="#"`) dead links. All
  in-page `#anchor` links have matching `id` targets.
- **External (guide statute citations + profiles), curl status:**

| URL | Status | Verdict |
|---|---|---|
| azleg.gov §9-461.18, Laws 2024 Ch.196, Laws 2025 Ch.217, §11-810.01 | 200 | OK |
| azleg.gov §9-500.39 | 307 on HEAD (Sucuri WAF), 200 content on GET | OK |
| phoenix.gov ADU page, mesaaz.gov ADU page | 200 | OK |
| **gilbertaz.gov/home/showpublisheddocument/50285/…** ("staff report") | **404** | **Broken — content agent should re-source or link Gilbert's ADU page instead** (reported, not removed) |
| census.gov QuickFacts Queen Creek | 403 (bot-blocked; also 403 on www.) | Likely fine in browsers; consider data.census.gov permalink |
| yelp.com business page | 403 (Yelp bot wall) | Fine in browsers — normal |
| Facebook, Instagram, Google Maps CID, Google review link, policies.google.com | 200 | OK |

## 4. Redirects — PASS

`public/_redirects` contains only comments (placeholder for recon-agent legacy
URLs). `wrangler pages dev` confirms: "Parsed 0 valid redirect rules" — syntax
valid, no rule shadows any live page. Note for launch: the file intentionally
relies on zone-level rules for http→https and apex→www; the recon section is
still empty, so any Wayback/GSC legacy paths are not yet redirected.

## 5. robots.txt + llms.txt — PASS

- `robots.txt`: parse-clean; allows all + named AI bots (GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended, CCBot); `Sitemap:` URL matches the built
  `sitemap-index.xml` exactly. ✔
- `llms.txt`: every fact cross-checked against `src/data/business.ts` — legal
  name, trade name, phone, email, Gilbert AZ, 24/7 hours, since 1998, all 3
  licenses, all 9 service URLs (slugs match), all 10 cities, GBP CID + 3
  socials. **No drift.** ✔
- Policy note (deferred, owner decision): llms.txt hard-states the
  `[VERIFY]`-flagged claims from business.ts ("IICRC certified; insured; BBB A+
  accredited", licenses "claimed on site"). business.ts says these must not
  ship as hard prod claims until the owner confirms. Same exposure as the page
  copy — flagging so it's resolved consistently site-wide at confirmation time.

## 6. Lead API — PASS (fully exercised)

Ran `npx wrangler pages dev dist --kv LEADS` (local Miniflare KV) and hit
`POST /api/lead`:

| Test | Result |
|---|---|
| Valid JSON lead (name+phone+city+service+message) | 200 `{"ok":true,"emailSent":false}` + KV record written (verified in local KV blob store, full payload + userAgent + emailSent flag) ✔ |
| Valid form-encoded lead | 200 + KV write ✔ |
| Missing phone | 400 `{"ok":false,"errors":["a valid phone number is required"]}`, no KV write ✔ |
| Phone < 7 digits | 400, no KV write ✔ |
| Honeypot (`company`) filled | fake 200, **no KV write** (store count unchanged) ✔ |
| GET /api/lead | 404 (POST-only handler) ✔ |

KV-first ordering, 500-on-KV-failure path, and Resend best-effort path
confirmed by code review; the **email branch was not executable** (no
`RESEND_API_KEY` in sandbox — expected; it is dashboard-set).

**Fix applied (in scope, functions/):** the honeypot fake success returned
`{ok:true}` while real successes return `{ok:true,emailSent:…}`, letting a bot
distinguish fake from real. Changed to `{ok:true,emailSent:true}` so the fake
is byte-shape-identical to the best-case real response. Re-tested live under
wrangler: fake 200 returned, still no KV write.

Contact form ↔ API contract verified in dist: `POST /api/lead`, field names
`name/phone/city/service/message/company` match exactly, honeypot rendered
with `tabindex="-1" autocomplete="off"`, SMS-consent disclosure (STOP/HELP/18+,
terms + privacy links) present beside the form. ✔

Go-live reminders (config, not code): `wrangler.toml` KV namespace id and
`LEAD_EMAIL_FROM` are intentional placeholders — must be set in the Masizo
Cloudflare/Resend accounts before launch.

## 7. Performance — Lighthouse (mobile emulation, simulated slow-4G throttle)

| Page | Perf | A11y | Best Practices | SEO | FCP | LCP | TBT | CLS | Transfer |
|---|---|---|---|---|---|---|---|---|---|
| `/` | **96** | 96 | 100 | 100 | 2.2 s | 2.2 s | 0 ms | 0.012 | 202 KiB |
| `/services/roofing` | **93** | 100 | 100 | 100 | 1.1 s | 1.1 s | 0 ms | **0.156** | 120 KiB |

Against the handoff budget:

- **≥95 across categories:** met on home except a11y 96 (contrast, below);
  roofing perf 93 — the entire gap is CLS 0.156 from **web-font swap** on the
  hero (`hero-lede`, Fraunces/Archivo load). Src fix: `font-display: optional`
  or size-adjusted fallback metrics, and/or preload the two latin woff2 files.
  (Reported, not fixed — fonts are wired in src/.)
- **LCP < 1.5 s:** 1.1 s on roofing; 2.2 s on home *under Lighthouse's
  simulated slow-4G mobile throttle* (the home LCP element is the text hero;
  no render-blocking resources — fonts/CSS inline or small). Real-world fast
  connections will be well under budget; on the throttled lab metric the home
  page misses. Same font/preload fix is the lever.
- **JS < 50 KB:** **passes by a mile** — zero external JS files in dist; real
  inline JS (excluding JSON-LD) is **1.85 KB per page**.
- Lighthouse a11y flags (home): contrast failures on the orange emergency band
  (`#e3a17b` on `#a14d2a` = 2.67:1 on `.kicker`/links; `#c9c0ad` body text =
  3.22:1) and a `label-content-name-mismatch` on the header wordmark
  `aria-label="Masizo Development — home"` vs its visible text. Both src/.

## 8. A11y quick pass — PASS with exceptions (reported, src/)

Clean across all 20 pages: all imgs have alt/aria, all form inputs labeled
(explicit `label[for]`), exactly one `<main>`, header/footer/nav landmarks
present, no heading-level skips.

Reported:

1. **Homepage has two `<h1>`s** — `home-h1` ("Built, Remodeled, and Restored…")
  and the restoration hero's `hero-title` ("Water, fire, or mold? Call now.").
  The emergency band heading should be an `<h2>` on the homepage.
2. **`/404` and `/thank-you` have no `<h1>`** — top heading is an
  `h2.section-title`. Promote to h1.
3. Emergency-band color contrast (see §7) — 2.67:1 and 3.22:1, below WCAG AA.

## 9. Weight — PASS

- Homepage HTML: **68,376 B raw (66.8 KB), 13,476 B gzipped** vs old site's
  424 KB → **−84 % raw, −97 % over the wire**.
- Largest pages (raw HTML): guide 70.5 KB, home 68.4 KB, adu-construction
  58.4 KB, room-additions 54.5 KB, custom-homes 54.4 KB — everything else
  ≤ 54 KB; smallest 20.7 KB (/thank-you).
- `dist/_astro` assets total 427.9 KB, of which **~402 KB is 9 woff2 font
  files** (Fraunces 4 subsets incl. italic ≈ 280 KB, Archivo 3 subsets, plus
  vietnamese/latin-ext subsets a US local-service site will rarely serve). CSS
  is ~25 KB total. Per-page transfer stays ≤ 202 KiB because only referenced
  subsets load, but dropping the italic/vietnamese/latin-ext subsets is the
  single biggest cheap win (src/ font imports — reported).
- Whole dist: 1.6 MB, 20 HTML pages, 0 JS bundles, 0 images yet.

---

## Fixes applied by QA (in scope: functions/, public/, astro.config.mjs)

1. `functions/api/lead.ts` — honeypot fake-success body now matches the real
   success shape (`{ok:true,emailSent:true}`); re-verified under
   `wrangler pages dev` (fake 200, no KV write). *(Only fix needed — redirects,
   robots, llms, sitemap config all passed as-built.)*

## Deferred to src/content owners (report-only)

| Item | Where | Severity |
|---|---|---|
| Homepage title 68 chars (>65) | src homepage head | Low |
| Homepage double `<h1>` (emergency band) | src homepage/hero component | Medium |
| `/404` + `/thank-you`: no h1, no meta/og description | src layouts/pages | Low |
| Emergency band contrast (2.67:1 / 3.22:1) | src styles | Medium (WCAG AA) |
| Wordmark `aria-label` ≠ visible text | src header | Low |
| Font-swap CLS 0.156 on service heroes (perf 93) | src font loading (`font-display`/preload/fallback metrics) | Medium |
| Font subsets: italic + vietnamese + latin-ext shipped (~150 KB avoidable) | src fontsource imports | Low |
| No `og:image` sitewide | src head component + asset | Medium before launch |
| Gilbert "staff report" citation 404s | content: /guides/arizona-adu-law | Medium |
| census.gov QuickFacts link bot-403s (works in browsers) | content: guide | Info |
| llms.txt ships [VERIFY]-flagged cert/license claims | owner confirmation gate (public/llms.txt + page copy together) | Policy |
| `wrangler.toml`: KV namespace id + `LEAD_EMAIL_FROM` placeholders | Cloudflare/Resend account setup at go-live | Blocking at deploy, not in repo |
