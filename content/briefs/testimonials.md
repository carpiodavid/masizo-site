# Content brief — `/testimonials`

Recon of https://www.masizodevelopment.com/testimonials — fetched 2026-10-23. Companion to docs/REBUILD-HANDOFF.md (§2 factbase; handoff rule 1: ONLY real, attributed, linked reviews — ever). Live title for reference only: "Reviews | Masizo Development, Gilbert AZ Contractor".

## Page job & search intent
- Intent: "masizo development reviews", reputation checks (incl. AI-assistant queries like "is Masizo Development reputable" — a cutover-baseline question in handoff §8).
- Job: present the complete, verifiable Google-review record with attribution and links; harvest a "leave us a review" action.

## Live page anatomy
1. H1 ("What Our Clients Say") + one-liner (real reviews, Arizona homeowners).
2. Rating banner: **4.7 stars from 28 Google reviews** + "Leave us a review" → Google write-review link (place id `ChIJG5OZKxnMNk8RdOFBNTxaFQ8`).
3. Review wall: 26 full-text Google reviews, each with reviewer name, "Google review" label, and a link to the reviewer's Google Maps profile (maps.google.com/maps/contrib/…). This same wall is embedded on the homepage, every service page, and the guide.
4. Sitewide footer.

## Review inventory (verbatim quotes allowed ONLY as attributed reviews — the words are the reviewers', not the vendor's)
26 reviews shown (claimed count 28 — re-pull from GBP at build; counts drift). Reviewers and job-type signals:
| Reviewer | Job signal |
|---|---|
| Jose Saenz | multi-project partner/contractor |
| A Garcia | 70s home modernization |
| Marina Gamez | client remodel, 8-week on-time delivery |
| Erik Vega | general praise |
| Roque Drywall LLC | trade partner |
| Ricardo Herrera | repeat partner, homeowner+contractor rec |
| Alfred Martinez | master bathroom remodel |
| Greg Gallagher | casita build |
| CJ P | short praise |
| Erik Caballero | shower remodel + tile |
| Rosendo Rodriguez | garage → bedroom conversion |
| Chad C | clear bid, on time |
| AJ | home restoration |
| A & A Installments | multi-project vendor |
| Daniel Garcia | whole-house remodel, 3 months, on budget |
| Amy Turner | kitchen renovation |
| Sandra Michele | 3rd-garage → mother-in-law suite |
| Matias Romero | bathroom + kitchen, early finish |
| Monica Duran | AC-leak restoration, insurance, pack-out, asbestos/lead testing |
| Claudio Melvin | Oct 2022 rental water damage, next-day response |
| Tipton Realty (Jeff Tipton) | counters, roof repair, 16' Arcadia slider |
| Luis Rico | full renovation, Phoenix |
| Stacy | on time, on budget |
| Angela Reyes | master bathroom |
| Diana Martinez | addition + kitchen |
| Arturo Garcia | ground-up ADU casita, Phoenix |

## Topic checklist
- [ ] Current star rating + review count pulled fresh from GBP at build time (never hardcode stale numbers)
- [ ] Full review wall: verbatim quotes, reviewer names, Google attribution, link per review (reviewer profile links exist on the live site; linking each review to the GBP listing per handoff §5 is the minimum)
- [ ] "Leave us a review" CTA with the Google write-review URL (place id above)
- [ ] Framing copy: 100% real, sourced, nothing curated-away dishonest (our one paragraph — fresh words)
- [ ] Optional improvement: group/filter reviews by service (job signals above), since reviews double as service-proof
- [ ] Optional: note Yelp 5.0(2) / Angi 5★ / BuildZoom 96 as secondary sources (factbase "reported" — [VERIFY] before citing numbers)

## FAQ inventory
None live; not needed.

## Facts cited on live page
- 4.7★ / 28 reviews (GBP-verifiable — refresh at build; the wall shows 26).
- Everything else is reviewer speech.

## Word count target
Live total ≈ 2,500 (~2,150 = the reviews themselves). Target: **parity** — the reviews carry the page; add ~150–250 words of our own framing. Do not pad.

## Internal links
- Parity: sitewide header/footer; Google write-review link; per-review reviewer links.
- New: breadcrumb Home › Testimonials; contextual links from job-signal groupings to service pages; CTA → /contact.

## Schema today
WebSite + GeneralContractor only — NO Review/AggregateRating markup on the live page. Improvement per handoff §5: add Review markup ONLY for these verifiably real reviews, each linked to the GBP; AggregateRating matching live GBP numbers. Never fabricate (rule 1).

## Writer notes
- The shared review wall currently repeats ~2,150 identical words on 11 pages (near-duplicate content). Recommendation for the build: full wall ONLY here; homepage + service pages show 3–6 rotated excerpts linking here.
- Quote reviews exactly (typos intact or lightly truncated with ellipsis); attribution + link is what keeps rule 1 satisfied.
