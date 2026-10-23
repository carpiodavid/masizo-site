# Verification log — Content Agent 3

Pages covered: `/`, `/guides/arizona-adu-law`, `/testimonials`, `/portfolio`,
`/contact`, `/privacy-policy`, `/terms-and-conditions`. Logged 2026-10-23.

Two lists: (1) live-site claims **excluded** from the new copy pending owner
confirmation, and (2) the ADU guide's legal verification record.

## 1 · [VERIFY] items excluded from copy (owner must confirm before any use)

| Claim (live site) | Where it appeared | Status in new copy |
|---|---|---|
| "500+ projects completed" | homepage stats row | **Excluded.** Not in factbase; no source. Add back only with owner confirmation. |
| Financing available for qualified clients | homepage FAQ | **Excluded** (FAQ dropped). Confirm program actually exists before reinstating. |
| Insurance claim handling "at no cost to you" / "free of charge" | homepage + restoration copy | **Softened.** New copy says we "work directly with / coordinate" the insurer — no cost promise. Owner must confirm the free-of-charge promise before it ships anywhere. |
| Steven Martinez, President | live JSON-LD Person + review mentions | **Nobody named in copy** (per shop law). Confirm name/title with owner before adding a Person to schema or copy. |
| 4.7★ / 28 Google reviews | sitewide review banner | **Not hardcoded anywhere.** Rating + count must be pulled fresh from GBP (cid 1086874099717890420) at launch — see HTML gate comment atop `content/pages/testimonials.md`. All 26 review slots are placeholders; verbatim texts must be pasted from GBP, each with reviewer-profile link. |
| Masizo ADU project history ("one casita built, two garage conversions") | live ADU guide | **Excluded** from the rewritten guide. Confirm with owner; portfolio captions will carry the proof once photos land. |
| Mailing address 3317 S Higley Rd Ste 114-500, Gilbert AZ 85297 | live privacy/terms contact blocks | **Excluded** from new privacy + terms (email/phone/contact page used instead). Conflicts with the 4174 E Sandy Way directory address (handoff §2) — owner must pick ONE canonical address; add it to both legal pages + business.ts when confirmed. |
| 24/7 phone answering on (602) 909-7630 | sitewide | Copy uses [[HOURS]]/[[PHONE]] tokens; emergency CTAs written. Handoff §7 gate: owner must confirm the number actually answers 24/7 before launch. |
| Privacy + terms final text | legal pages | Both pages carry a **LAUNCH GATE: attorney review** HTML comment. Drafts reflect the real stack (GA4, Cloudflare hosting, KV + Resend lead flow, SMS program) but are not counsel-approved. Effective dates are `[LAUNCH DATE]` placeholders. |
| Yelp 5.0 (2) / Angi 5★ / BuildZoom 96 | directories ("reported") | **Not cited** on any of my pages (factbase marks them reported, not verified). |

Portfolio: all images are `[PHOTO: …]` slots; zero project descriptions were
fabricated. Captions may state only owner-confirmed service type + city.

## 2 · ADU guide (`/guides/arizona-adu-law`) — legal verification record

Every statute fact in the rewritten guide was checked against primary sources
on 2026-10-23 (full network fetches, not the live page's say-so).

### Verified, cited inline in the guide

- **A.R.S. § 9-461.18** (azleg.gov/ars/9/00461-18.htm): ADU definition; 1
  attached + 1 detached per single-family lot; 2nd detached on ≥1-acre lots
  with a restricted-affordable unit (≤80% AMI); size floor 75% of main home's
  gross floor area or 1,000 sq ft (lesser); "permitted use" definition (no
  hearing/variance/CUP); subsection B prohibitions (no added parking or
  in-lieu fees, rear/side setbacks capped at 5 ft, no stricter
  height/setback/lot/coverage/frontage than the zone, no design/roof/material
  matching, no owner-occupant relationship requirement, long-term rental +
  advertising protected, no street improvements, no covenant condition);
  subsection C (private/HOA covenants preserved); subsection D (codes apply;
  no commercial code, no sprinkler mandate); subsection E (utility easement
  written consent); subsection F (Jan 1, 2025 deadline; penalty = ADUs on all
  residential lots without limits); subsection G exemptions (tribal land,
  military airport vicinity per § 28-8461, >65 dB airport noise per
  § 28-8486); subsection H (applies to municipality >75,000 persons);
  long-term rental = lease ≥90 days or month-to-month.
- **Laws 2024, ch. 196 (HB 2720)** (azleg.gov/legtext/56leg/2r/laws/0196.htm):
  approved by the Governor May 21, 2024; added § 9-461.18; amended § 9-500.39.
- **Laws 2025, ch. 217 (HB 2928)** (azleg.gov/legtext/57leg/1r/laws/0217.htm):
  approved May 23, 2025; added county ADU statute; amended § 9-461.18,
  § 9-500.39, § 11-269.17.
- **A.R.S. § 11-810.01** (counties): same unit counts + size floor; deadline
  Jan 1, 2026 with the same no-limits penalty; same exemption zones; septic
  sizing allowed; applies to counties (no population threshold in text).
- **A.R.S. § 9-500.39** (STRs): subsection A — cities may not prohibit
  vacation/short-term rentals; subsection B — permitted regulations (permit
  ≤$250, emergency contact, neighbor notice, ≥$500k liability coverage,
  permit # in ads); B(9) — owner-residency may be required where an ADU used
  as an STR got its certificate of occupancy/final approval **on or after
  Sept 14, 2024** (units finaled on/before Sept 13, 2024 exempt).
- **City of Phoenix** (phoenix.gov ADU page): two ADUs permitted in addition
  to the primary dwelling; size 75% of main home capped at 1,000 sq ft on
  lots ≤10,000 sq ft and 3,000 sq ft on larger lots; lot coverage still
  applies; ordinance Z-TA-2-24.
- **City of Mesa** (mesaaz.gov ADU page): 1 attached + 1 detached; extra
  detached on >1 acre w/ affordable unit; 1,000 sq ft / 75% cap; 5-ft
  side/rear setbacks; no additional parking required.
- **Town of Gilbert** (gilbertaz.gov staff report, doc 50285): conforming
  regulations adopted; ADUs a permitted use, no Use Permit.
- **Queen Creek population**: 59,519 at the 2020 census (Census Bureau
  QuickFacts); July 2023 estimate 76,570.
- **San Tan Valley**: incorporated as a town Sept 17, 2025 (Pinal County
  declaration; MAG release) after the Aug 5, 2025 Prop 495 vote.

### Live-page claims NOT confirmed in a primary source → left out / reworded

| Live claim | Finding | Treatment |
|---|---|---|
| Threshold applies "per latest census (2020)" | § 9-461.18(H) says only "more than seventy-five thousand persons" — **no census reference in the statute**. How population is measured is not specified there, and Queen Creek's post-2020 estimates now exceed 75k. | Guide states the bare statutory threshold, gives Queen Creek's census count AND its ≥75k estimate, and says "ask the town." |
| "Effective Sep 14 2024" as the law's effective date | Not printed in ch. 196 itself (standard AZ general-effective-date mechanics). However, § 9-500.39(B)(9) as amended **explicitly names Sept 14, 2024** as the ADU-STR cutoff. | Guide anchors the Sept 14, 2024 date to § 9-500.39(B)(9), which is directly citable; it does not assert a general effective date beyond "signed May 21, 2024" (verified). |
| "Phoenix may allow a third ADU" | phoenix.gov says **two** ADUs in addition to the primary home; a third detached arises from the statute's ≥1-acre affordable provision, not a Phoenix-specific allowance I could confirm. | Guide credits Phoenix with two ADUs (cited) and describes the one-acre third-unit rule as the statute's. |
| Phoenix "3,000 sq ft OR 10% of net lot area, whichever is smaller" (third-party sites) | Only the 1,000/3,000 tiers appear on phoenix.gov. | 10%-of-lot formula omitted. |
| "San Tan Valley incorporated Sep 2025, post-census — ask" (recon brief) | Confirmed Sept 17, 2025 incorporation; its ADU posture is genuinely transitional (county § 11-810.01 governed pre-incorporation; town planning is standing up). | Guide says "in transition — confirm with the town or county." |
| Queen Creek "no (under 75k in 2020)" stated flatly | True at the 2020 census, but 2023+ estimates exceed 75k and the statute names no census. A flat "no" is no longer safely true in 2026. | Guide marks Queen Creek "Unclear — ask the town." |
| Scottsdale/Chandler/Tempe conforming-ordinance details | Coverage by the >75k threshold is beyond doubt; I verified city-level ordinance detail only for Phoenix, Mesa, and Gilbert. | Table marks Scottsdale/Chandler/Tempe covered; no city-specific allowances claimed for them. |

### Freshness

Guide carries "Last reviewed: October 23, 2026" (visible + HTML comment) and
`article.datePublished: 2026-10-23`. Statute pages reflect the law as amended
through Laws 2025, ch. 217; no later amendment found as of the review date —
re-check azleg.gov before any future edit (2026 session).
