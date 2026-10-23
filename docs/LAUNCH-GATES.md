# LAUNCH GATES — masizodevelopment.com rebuild

Staging-safe as of 2026-10-23 (claims audit verdict: YES — nothing fabricated,
every unshippable element visibly gated). This file is the single list of
what stands between staging and public cutover. Full detail in docs/qa/*.md.

## 1 · Owner confirmations (kickoff meeting)

| # | Question | Where it lands |
|---|---|---|
| 1 | Does (602) 909-7630 answer LIVE 24/7? | ~15 "we answer" claims across home/services/contact + 4 FAQ schema answers stay, or soften to posted-hours phrasing (pattern: restoration FAQ) |
| 2 | California projects — real and current? | 3 sentences on home |
| 3 | Free inspection / free consultation / no-cost walk-through promises — accurate? | roofing FAQ, ADU page, services index |
| 4 | Biohazard cleanup — offered? (directories say yes, factbase unverified; removed from copy for now) | restoration page list |
| 5 | President's name for the site (Steven Martinez per old vendor's site)? | currently nobody named — by design |
| 6 | Street/mailing address to publish, if any? | contact + schema (locality-only today) |
| 7 | License statuses current (AZ #336058, #347030, CA #1107781)? IICRC + BBB A+ current? | sitewide trust blocks + llms.txt |
| 8 | Logo files + brand assets; who made the current logo, does Masizo own it? | theme pick (Sonoran vs Oxide), favicon, og:image |
| 9 | Theme pick: Sonoran or Oxide (docs/design/themes/) | one-file token swap |

## 2 · Content gates (60 markers, itemized in docs/qa/claims-report.md)

- 29 × [PHOTO:] slots — fill from the owner's photo library (home 6, portfolio 16, one per service page ×7). City-page rule: a city page ships only with a real local job photo.
- 29 × [REVIEW] slots — paste VERBATIM Google review text from the owner's GBP (home 3, testimonials 26); only then add Review schema.
- 2 × [LAUNCH DATE] — privacy + terms, set at launch after attorney review (both pages carry the attorney-review gate).

## 3 · Technical pre-launch (src-level, small)

- og:image sitewide (needs brand image/logo — gated on #8 above)
- Font-swap CLS on service pages (preload + fallback metrics; Lighthouse perf 93→~99) and trim unused font subsets (~150KB)
- /404 and /thank-you: add h1 + meta description
- Wordmark aria-label mismatch (header)
- Guide: four sections cite statutes by § without an in-section link (Sources section covers them; nice-to-have)
- Verify the two gilbertaz.gov citation links open in a normal browser (the town bot-walls curl; unverifiable from CI)

## 4 · Deploy & cutover (per docs/REBUILD-HANDOFF.md §5 + README)

1. Cloudflare account owned by Masizo: Pages project, LEADS KV namespace (replace id in wrangler.toml), secrets RESEND_API_KEY; vars LEAD_EMAIL_FROM (verify a sending domain in Resend), PUBLIC_GA4_ID.
2. Staging on pages.dev → client walkthrough.
3. BASELINE before DNS swap: indexed pages (site:), rankings on the five money searches, GBP review count, verbatim AI-assistant answers (handoff §8.6).
4. Domain/DNS in Masizo's control (THE gate) → swap, then immediately: Search Console property + sitemap submit + indexing requests for all 18 indexable pages; watch coverage daily × 14.
5. GSC 404 report after a week → extend public/_redirects (recon's Wayback enumeration was blocked; the live-site slugs are preserved 1:1 so expected deltas are old-old URLs only).
6. Off-site program (separate from this repo): GBP + directory identity cleanup to the site's facts, review routing, re-test vs baseline.
