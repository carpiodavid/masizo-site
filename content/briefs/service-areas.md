# Content brief — `/service-areas`

Recon of https://www.masizodevelopment.com/service-areas — fetched 2026-10-23. Companion to docs/REBUILD-HANDOFF.md (§2 factbase; rule 4: zero copied sentences). Live title for reference only: "Service Areas | Masizo Development, Phoenix Valley Contractor".

## Page job & search intent
- Intent: "contractor serving <city>", "does Masizo serve <city>"; also feeds local relevance signals for all 10 cities.
- Job: hub for geography — confirm coverage per city, route to services (today) and to gated city pages (as they ship, per handoff §5 anti-doorway rule).

## Live page anatomy
1. H1 "Service Areas" + one-liner: build/remodel/roof/restore across Gilbert, the East Valley, Phoenix metro.
2. "Cities We Serve" — 10 city blocks (H3 each): Gilbert, Mesa, Chandler, Queen Creek, San Tan Valley, Tempe, Scottsdale, Phoenix, Fountain Hills, Paradise Valley. Each block: for the 6 HB 2720 cities only, a one-line note that Arizona's ADU law covers that city; then the same 8 service links + "All Services".
3. Free-estimate CTA band (form link + phone).
4. Sitewide footer.

## Topic checklist
- [ ] All 10 cities named as H2/H3-level entries (exact list = factbase service area)
- [ ] Per-city: which services (all 8 + commercial), link to each
- [ ] ADU-law note for the 6 covered cities (Phoenix, Scottsdale, Mesa, Gilbert, Chandler, Tempe) with link to the guide — the live page's only differentiating content; keep + improve
- [ ] Gilbert = home base framing (licensed Gilbert contractor serving outward)
- [ ] CTA: free estimate + phone
- [ ] NEW: as gated city pages ship (`/service-areas/<city>`), each city block links to its city page; cities without pages keep service links only. NEVER ship templated doorway text per city (handoff rule 3 + §5 gate)
- [ ] Optional improvements: brief honest geography framing (East Valley vs Phoenix metro), 24/7 restoration coverage across all listed cities ([VERIFY] response coverage before claiming)

## FAQ inventory
None on the live page. Optional: 2–3 real questions ("do you charge travel fees?" [VERIFY], "do you serve outside these cities?" [VERIFY]) — only with owner answers.

## Facts cited on live page
- 10 cities — factbase.
- HB 2720 applicability per city — statute-verifiable (match the guide's table; see guides brief).
- Nothing else; no [VERIFY] beyond the optional additions above.

## Word count target
Live unique ≈ 310 words (569 counted with chrome) — thin. Target: **≥ 600 words** now (a real paragraph of coverage framing + the city grid), growing as city pages ship.

## Internal links
- Parity: 8 service links per city block (80 links today — consider consolidating to one services-link set + per-city page links to avoid link dilution), /services, form/contact, sitewide header/footer.
- New: `/service-areas/<city>` links as pages pass the photo gate; `/guides/arizona-adu-law` from the ADU-law notes; `/services/commercial`.
- Breadcrumb: Home › Service Areas.

## Schema today
WebSite + GeneralContractor (areaServed already lists the 10 cities). Replicate; optionally add ItemList of places.

## Writer notes
- This page is the parent of the future city-page tree — structure headings/URLs so `/service-areas/gilbert` etc. slot in without reshuffling.
- The live page's repetition (identical 8 links × 10 cities) is lazy; ours should differentiate city blocks only with true facts (ADU law coverage, completed-job links once city pages exist) — never invented local color.
