# Content brief — `/` (Homepage)

Recon of https://www.masizodevelopment.com/ — fetched 2026-10-23 with curl (raw HTML archived in recon scratchpad). Read with docs/REBUILD-HANDOFF.md; facts in §2 of the handoff are the source of truth. **Never copy a sentence from the live page** (handoff rule 4). Live title for reference only (do not reuse verbatim): "Masizo Development | Gilbert AZ Custom Homes, ADUs & Roofing".

## Page job & search intent
- Primary job: convert "general contractor near me / Gilbert AZ" searchers and brand searchers into calls and form leads; route everyone else to the right service page within one scroll.
- Search intent served: brand ("masizo development"), broad local commercial ("general contractor Gilbert AZ", "custom home builder Gilbert", "home remodeling Gilbert"). The live H1 is a custom-home-builder + general-contractor + Gilbert claim; keep that intent pairing.
- Secondary job: establish the trust stack (28 years, three licenses, IICRC, BBB A+, real Google reviews) that every other page borrows.

## Live page anatomy (match the coverage, not the layout)
1. Hero: all-caps H1 naming custom home building + general contracting + Gilbert AZ; sub-line sweeping all services (luxury custom homes → remodels → ADUs → emergency restoration) + licensed/insured/reputation claim; phone CTA + portfolio CTA; "28 Years of Building Arizona" kicker.
2. About band ("Every Phase of Your Project, Handled"): one-paragraph firm intro (licensed GC + restoration firm, ~3 decades) + team photo. This is the `/#about` anchor the nav's "About Us" points to — there is NO separate about page.
3. Stats row: 28+ years in business · 500+ projects completed · 100% licensed and insured.
4. Project gallery band ("Built by the Masizo Team") with job photos (and oddly, audio-player embeds).
5. 3-step process ("From First Call to Final Walkthrough"): ① free on-site consultation ② detailed proposal w/ scope, timeline, transparent pricing, no hidden fees ③ company handles permits/coordination/communication.
6. Services grid, all 8 services, each with 1-line pitch + 3 "what's included" bullets + link:
   - Roofing: installs/repairs for AZ climate; replacement, tile/shingle/flat, leak repair & inspections
   - ADU Construction: permitted ADUs; detached/attached builds, permit+zoning coordination, interior buildout
   - Custom Home Builds: ground-up; design-to-build coordination, permits+inspections, high-end finishes
   - Restoration: 24/7 water/mold/fire + insurance claim coordination at no cost; mitigation + full rebuild
   - Full Home Remodels: whole-home planning, structural/layout changes, electrical/plumbing/finish
   - Kitchen Remodels: cabinetry/countertops, appliance+electrical, flooring/lighting/backsplash
   - Bathroom Remodels: shower/tub install, tile+vanity, plumbing+ventilation
   - Room Additions: bedroom/living additions, foundation/structural, finishing+HVAC tie-in
7. Reviews band: "4.7 stars from 28 Google reviews" + carousel of real Google reviews (shared sitewide block — see testimonials brief for the inventory).
8. Instagram feed embed (social proof grid).
9. FAQ section (6 questions, see below) with FAQPage schema.
10. Footer: identity sentence, license block (AZ ROC #336058, CA LIC #1107781, restoration AZ ROC #347030), BBB A+ line, quick links, services links, contact (Gilbert AZ, email, phone, 24/7 hours), socials, privacy/terms.

## Topic checklist (new copy must cover every box — fresh words)
- [ ] Who Masizo is: licensed GC + 24/7 restoration firm, Gilbert AZ base, serving the Phoenix Valley/East Valley
- [ ] 28 years / since 1998 experience claim
- [ ] One-contractor-for-everything positioning (build, remodel, restore under one roof / one number to call)
- [ ] All 8 services introduced with concrete scope bullets (see grid above) and links
- [ ] 24/7 emergency restoration path, visually distinct (handoff §5 lead machine; number answering 24/7 is [VERIFY])
- [ ] The 3-step engagement process (free on-site consult → written scope/price → they run permits & build)
- [ ] Free estimates / free on-site consultation
- [ ] Licenses stated in crawlable text: AZ ROC #336058 (GC), AZ ROC #347030 (restoration), CA LIC #1107781 — owner to confirm status per handoff §7
- [ ] IICRC certified, insured, BBB A+ accredited
- [ ] Real Google reviews with star rating + count (live: 4.7★/28 — re-check GBP at build time, never hardcode)
- [ ] Service area: the 10 handoff cities, with link to /service-areas
- [ ] CA licensing = "select projects" nuance (live FAQ says licensed in California for select projects)
- [ ] Financing availability (live FAQ claims it — [VERIFY] with owner before shipping)
- [ ] Insurance claims handled for restoration "at no cost to you" ([VERIFY] wording with owner — it's a legal-ish promise)
- [ ] Project timeline expectations (bathroom = weeks, custom home = months, set at consult)
- [ ] Team/owner presence: reviews name Steve (Steven Martinez, President per site schema). Old site named Anthony Ardizzone as president — [VERIFY] who should be named before naming anyone.

## FAQ inventory (live page answers these — paraphrased; rewrite Q&A fresh)
1. Which cities/areas do they serve? (A: East Valley cities + greater Phoenix metro; CA for select projects)
2. Are estimates free? (A: yes — free on-site consult, no-obligation quote)
3. How do insurance claims work for restoration jobs? (A: they file, communicate with the insurer, manage documentation, free of charge)
4. How long do projects take? (A: scope-dependent; bath=weeks, custom home=months; timeline given at consult)
5. Are they licensed and insured? (A: AZ ROC #336058, CA #1107781, restoration ROC #347030, IICRC, insured)
6. Is financing available? (A: possibly, for qualified clients, discussed at estimate) — [VERIFY]

## Facts cited on live page
| Fact | In handoff factbase? |
|---|---|
| Phone (602) 909-7630, office@masizodevelopment.com, 24/7 hours, Gilbert AZ | yes |
| AZ ROC #336058 / #347030, CA LIC #1107781, IICRC, BBB A+ | yes (owner to re-confirm) |
| 28 years / nearly three decades | yes |
| 10 service-area cities | yes |
| **500+ projects completed** | **NO — [VERIFY] with owner** |
| **4.7 stars / 28 Google reviews** | NO — verifiable against GBP (cid 1086874099717890420); re-pull at build |
| **Financing for qualified clients** | **NO — [VERIFY]** |
| **Claim help at no cost** | **NO — [VERIFY] exact promise** |
| **Steven Martinez, President** (in JSON-LD Person + review mentions) | **NO — [VERIFY]; old site said Anthony Ardizzone** |

## Word count target
Live body ≈ 2,900 words, BUT ~2,150 of that is the sitewide Google-review wall. Unique homepage copy ≈ 750 words. Target: **≥ 3,250 words total** with **≥ 1,100 words unique copy** (hero, about, services grid, process, FAQ) + the real-review block. Equal-or-better ground, more of it actually ours.

## Internal links the page carries (parity minimum)
- Header nav (sitewide): Home(logo), About Us→`/#about`, Services dropdown→ all 8 `/services/*` + `/services`, Locations dropdown→`/service-areas` (city labels are NOT links today — ours will link to gated city pages as they ship), Portfolio→`/portfolio`, Testimonials→`/testimonials`, Contact→`/contact`, Call Now→`tel:6029097630`.
- Body: View Our Work→`/portfolio`, 8× View Details→each service page, See all testimonials→`/testimonials`, All service areas→`/service-areas`.
- Footer (sitewide): quick links (about anchor, portfolio, services, service-areas, contact, testimonials), all 8 service links, privacy, terms; socials: Google Maps (cid above), Facebook /Masizodevelopment, Instagram masizo_development, Yelp (masizo-development-and-restorations-fountain-hills-2), BBB profile, Nextdoor page.
- New-build additions: link `/services/commercial` in services nav/footer; link `/guides/arizona-adu-law` from an ADU teaser (live homepage does NOT link the guide — beat that).

## Schema today (replicate + improve per handoff §5)
WebSite, GeneralContractor (NAP, areaServed 10 cities, 24/7 openingHours, sameAs 6 profiles, 3 hasCredential entries w/ ROC + CSLB issuers, Person "Steven Martinez — President"), FAQPage. Canonical present (`https://www.masizodevelopment.com`, no trailing slash).

## Writer notes
- Banned-pattern check (handoff §4) applies hardest here; the live hero is photo-background + centered text — ours must clear the same bar with a different, fresh identity.
- Reviews must be quoted verbatim-as-review WITH attribution + GBP link (they're the reviewers' words, not the vendor's copy — allowed and required by handoff rule 1). Everything else: fresh.
- Placeholder all photography as `[PHOTO: …]` until owner supplies images (handoff §7).
