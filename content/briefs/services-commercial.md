# Content brief — `/services/commercial` (REBUILD — page is a 404 today)

Status: this URL 404s on the live site (confirmed by curl 2026-10-23) but existed on the PREVIOUS site generation and is still indexed per the audit. Handoff §5 requires rebuilding it. Companion to docs/REBUILD-HANDOFF.md (§2 factbase; rule 4 applies — though here there is nothing to copy even if we wanted to).

## What we could recover about the old page (recon honesty section)
- Old title (from the audit/handoff): "Commercial – Masizo Development & Restorations" — a WordPress-style title from the prior site generation.
- Handoff §5 scope note: the page covered **commercial GC / tenant-improvement work and 24-hour emergency services**.
- Recovery attempts, all dead ends, documented so nobody repeats them:
  - Wayback Machine: the CDX API host (web.archive.org) is blocked by this build environment's egress policy; the archive.org availability API reports **no snapshot of /services/commercial** (nor of any path except the homepage).
  - Common Crawl: zero captures of masizodevelopment.com in any index sampled 2019–2026.
  - Web search: no cached copies or third-party descriptions of Masizo's commercial page surfaced.
- Consequence: **everything on the new page must come from the owner interview or the factbase.** There is no old copy to match, only the known scope (commercial GC, TI, 24h emergency).

## Page job & search intent
- Intent: "commercial general contractor Gilbert AZ", "tenant improvement contractor East Valley", "commercial water damage restoration 24 hour" — small-business owners, property managers, landlords, facility managers.
- Job: (1) resolve the indexed 404 with a real 200 page; (2) open the commercial lead channel; (3) give the 24/7 restoration offer a commercial-property framing (property managers are repeat callers — high LTV).

## Topic checklist (proposed coverage — every capability claim below is [VERIFY] with the owner before shipping; the gate list at the bottom is the interview script)
- [ ] Commercial GC services under AZ ROC #336058 — confirm the license classification covers commercial scope [VERIFY — ROC lookup + owner]
- [ ] Tenant improvements / build-outs (retail, office, restaurant? — [VERIFY] which property types they actually take)
- [ ] 24/7 commercial emergency response: water/mold/fire in commercial buildings, after-hours flooding, business-interruption urgency (restoration license ROC #347030 + IICRC apply)
- [ ] Commercial insurance claims cooperation (same pattern as residential restoration — [VERIFY] it extends to commercial policies)
- [ ] Working around open businesses: after-hours scheduling, phased work, containment ([VERIFY] as practice claims)
- [ ] Permits + inspections for commercial work (plan review differs from residential — generic facts fine)
- [ ] Property-manager relationship pitch: one licensed contractor for repairs, TI turns, and emergencies ([VERIFY])
- [ ] Portfolio proof: any completed commercial jobs + photos ([PHOTO]/[VERIFY] — handoff rule 3 spirit: no proof, soft-pedal)
- [ ] Trust block: three licenses, IICRC, BBB A+, 28 years, insured (factbase)
- [ ] Service area: same 10 cities; link /service-areas
- [ ] FAQ (propose): do they handle TI permits; minimum/maximum job size [VERIFY]; after-hours work; commercial emergency response; licensing for commercial; how estimates work for commercial

## FAQ inventory
No live FAQ exists (page is gone). Build 4–6 from the checklist above once owner answers are in; do not publish speculative answers.

## Facts available without the owner
Only the factbase (licenses, hours, contact, area) + the old title's evidence that the firm marketed commercial work + handoff's "commercial GC/TI, emergency services 24h" scope note. Everything else requires the owner interview.

## Word count target
No live baseline (old page's size unknown). Target: **≥ 1,200 words unique copy** — enough to be a real service page in the new system; do NOT pad to 3,300 with unverified claims. Grow after owner input/photos arrive.

## Internal links
- Breadcrumb: Home › Services › Commercial.
- From: /services index (new 9th card), footer services list, /services/restoration (commercial emergency cross-link), homepage services grid (optional 9th tile).
- To: /services/restoration, /services/roofing (commercial roofs [VERIFY]), /contact, /service-areas, /portfolio.
- Redirect note: once this page ships, the legacy URL resolves itself (same slug) — see docs/recon/legacy-urls.md.

## Schema
Service + BreadcrumbList (+ FAQPage once real FAQs exist) + sitewide GeneralContractor graph.

## Owner interview gate (blockers for final copy — mirror of handoff §7 discipline)
1. Do you actively want commercial leads? Which: TI, remodels, emergency restoration, roofing, ground-up?
2. Which property types and job sizes?
3. Commercial references/completed projects we can name + photograph?
4. Does the 24/7 line serve commercial emergencies the same way?
5. ROC classification check: does #336058 cover commercial contracting (B vs B-2/KB classifications)?
Ship a lean, honest page if answers lag; never a padded speculative one.
