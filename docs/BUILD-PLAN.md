# Masizo — owned rebuild plan (2026-10-23)

## Why rebuild, when the audit said the site is good

The technical verdict stands: the current site passes every quality gate.
The business situation overrides it — **the site is controlled by another
provider and Masizo cannot change it** (reported by owner `[VERIFY the exact
access situation and contract terms]`). Every fix this audit calls for is an
on-site or owner-access change: tracking install, homepage canonical,
llms.txt, legacy-URL redirects, new city pages, review embeds. Captive
platform = none of it can happen. Ownership is the problem, not the code.

**The timing argument:** only ~6 of 17 pages are indexed and Google still
serves the old site's titles. SEO-wise this is the cheapest moment there
will ever be to swap platforms — there is almost no current-site equity to
lose, and we control the index-in of the replacement from day one.

## Gate list — secure these BEFORE building (week 0)

| # | Item | Why it gates |
|---|---|---|
| 1 | **Domain & DNS control** (registrar login in Masizo's name) | The domain is where all equity and citations point. If the provider owns the registration, recovering it is priority one; building on a new domain forfeits existing equity and breaks every citation. |
| 2 | **Provider contract review** | Termination terms, exclusivity, and who owns the site content and photos. |
| 3 | **Content ownership** | If Masizo doesn't own the current copy, we rewrite (improved) rather than reuse — plan for it either way; copying another author's text without rights is not an option. |
| 4 | Project photo library | Owner's own job photos power portfolio, city pages, and GBP. |
| 5 | Google Business Profile + Search Console access | Needed at cutover regardless of platform. |
| 6 | The real 24/7 number | Drives the emergency CTA and every listing. |

## The bar: parity first, then better

**Parity (non-negotiable before cutover):**
- All 17 pages, **same URL slugs** wherever sensible (`/services/roofing`
  etc.) — identical slugs mean zero redirect loss for the little that is
  indexed.
- Service pages at or above current depth (~3,300 words), rewritten in
  Masizo's voice with the same topical coverage.
- Schema parity: GeneralContractor sitewide; Service + FAQPage +
  BreadcrumbList per service page; Article on guides.
- Speed parity or better: static-first build (Astro → Cloudflare Pages, the
  RHS stack, or Next on a Vercel account **owned by Masizo**).
- Licenses + IICRC in crawlable text on every page; hours 24/7 everywhere.

**What the rebuild adds (the "much better"):**
1. **Ownership** — Masizo's registrar, DNS, hosting account, and repo. We
   hold access; the client holds the keys. Never captive again.
2. **Measurement** — GA4 + call tracking + form attribution from day one;
   the current site has zero.
3. **Loss-proof lead capture** (RHS pattern): every submission durably
   stored *and* emailed instantly; emergency-line CTA for restoration;
   tap-to-call; per-service estimate flows; their existing SMS program
   integrated.
4. **City × service coverage** the current site lacks: Gilbert, Mesa,
   Chandler, Queen Creek, San Tan Valley + the rest of the stated service
   area — each page anchored by real local project proof (**no photo, no
   page** — the anti-doorway rule from RHS).
5. **Proof surfaces**: portfolio case studies with photos and outcomes;
   crawlable Google-review content with Review schema.
6. **AI layer complete**: llms.txt, consistent entity facts sitewide, Q&A
   content, AI-crawler access — plus the baseline/re-test answer
   measurement.
7. **A redirect map covering BOTH previous generations of URLs** — the
   current 17 and the old site's `/services/commercial`-era paths that
   still 404.

## SEO-safe cutover

1. **Baseline first** (pre-cutover): indexed pages, rankings on the five
   money searches, AI-assistant answers, GBP stats. Everything after is
   measured against this.
2. Build in parallel on staging; 1:1 URL map reviewed against the live
   sitemap; content parity checklist signed off.
3. Cutover = DNS swap (fast TTL), then immediately: Search Console sitemap
   submission + indexing requests for all pages; monitor coverage daily for
   two weeks.
4. Off-site program runs in parallel, unchanged from the audit: one
   identity across GBP and directories (true 24/7 hours), review
   consolidation and growth, citations pointed at the (same) domain.

## Phases (replaces the renovate framing)

| Phase | Weeks | Delivers |
|---|---|---|
| 0 — Secure & baseline | 1 | Gate list above closed; baselines recorded |
| 1 — The owned rebuild | 2–5 | Parity + additions live under Masizo's keys, same slugs, measured cutover |
| 2 — Visibility | 5–8 | Index-in managed; identity unified; reviews compounding; tracking reporting |
| 3 — Proof & expansion | 8–12 | Re-test vs. baseline (rankings, AI answers); city/guide expansion where data shows demand; quarterly rhythm |

## Risks, stated plainly

- **Domain captivity is the one killer risk.** Everything else is routine.
  If the provider controls the registration, resolve that first — legal
  ownership of a business domain generally favors the business, but it can
  take time.
- Content must be rewritten unless ownership is confirmed — budget for
  copywriting either way; it's also the chance to make the copy Masizo's.
- Index-in of a swapped platform takes days-to-weeks even done right; the
  baseline/re-test framework makes the progress visible instead of anxious.
