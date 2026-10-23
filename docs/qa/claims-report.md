# Claims Audit Report — Masizo Rebuild

**Agent:** Claims Audit (QA, shop-law pass per REBUILD-HANDOFF.md §6)
**Date:** 2026-10-23
**Audited:** the built output (`npm run build` of HEAD in a clean clone) — the
stripped visible text of all 20 pages in `dist/`, all meta/OG descriptions and
image-alt attributes, every JSON-LD block's values, `dist/llms.txt`, and the
built pages' HTML comments. Cross-checked against `docs/REBUILD-HANDOFF.md`
§2/§6/§7, `src/data/business.ts`, and `content/verify/agent1–3.md`.

**Method notes.** Tags stripped programmatically; greps run against both the
visible text and the JSON-LD serializations, so a claim hiding only in an
`FAQPage` answer or a meta description would still be caught. Phone, email,
license, and year figures were counted exhaustively (every occurrence,
sitewide) rather than sampled.

---

## Verdict summary

| # | Hunt item | Verdict |
|---|---|---|
| 1 | Fabrications (reviews, stories, stats, prices, timelines, response times, named persons, city-project claims) | **CLEAN on fabrication** — but 4 families of *unverified operational claims* found (F1–F4 below) |
| 2 | [VERIFY]-flagged leakage (agent1–3 exclusion lists) | **CLEAN** — zero leakage of any listed item |
| 3 | Facts vs `business.ts` | **CLEAN** — every occurrence exact; JSON-LD matches |
| 4 | Legal-ish copy (guide citations; privacy/terms gates & promises) | **PASS with 2 findings** (F5 gate comments stripped at build; F6 four guide sections cite statutes without in-section links) |
| 5 | Overclaim tone (superlatives as fact) | **CLEAN** |
| 6 | Launch-gate inventory | **60 gates**: 29 `[PHOTO:]`, 29 `[REVIEW]`, 2 `[LAUNCH DATE]` (full list below) |

**Safe to show the client as staging: YES** — see the final section for the
conditions, and F1 for the one claim family the owner must confirm (or the
copy soften) before public launch.

---

## 1 · Fabrications — CLEAN on fabrication; findings F1–F4

What was hunted and what was found:

- **Review/testimonial text.** Zero verbatim or paraphrased review text exists
  anywhere. All 29 review slots (3 homepage + 26 testimonials) are
  launch-gated `[REVIEW — verify against GBP before launch: paste verbatim
  quote …]` markers. No quote text, no star glyphs, no rating numbers. The
  reviewer *names* on the cards (Marina Gamez, Greg Gallagher, Monica Duran,
  A Garcia, Alfred Martinez, Erik Caballero, Daniel Garcia, Amy Turner,
  Matias Romero, Luis Rico, Angela Reyes, Diana Martinez, Tipton Realty,
  Rosendo Rodriguez, Sandra Michele, Arturo Garcia, AJ, Claudio Melvin,
  Jose Saenz, Roque Drywall LLC, Ricardo Herrera, A & A Installments, Chad C,
  Stacy, Erik Vega, CJ P) come from the recon of real GBP reviews and are
  visible outside the bracket. **At paste time, any card whose name has no
  matching verbatim GBP review must be deleted, not filled.**
- **Named persons.** No "Steven Martinez", no "Steve", no "President", no
  founder/owner name anywhere — visible text, attributes, or JSON-LD (no
  `Person` node exists). The only person-names on the site are the gated
  review-card attributions above. **CLEAN.**
- **Stats/counts/percentages.** No "500+ projects", no project counts, no
  invented percentages. The homepage stats row is 28 yrs / 3 licenses /
  10 cities / 24-7 — all derivable from `business.ts`. Percentages appear only
  in the ADU guide as statutory figures (75%, 80% AMI) with citations.
  **CLEAN.**
- **Prices/timelines.** No price promises. Roofing's "$400 repair" is an
  explicitly hypothetical example ("*If* the roof needs a $400 repair, that is
  what the paper says"). Timeline language is hedged and generic ("typically
  runs a couple of weeks", "measured in weeks/months") with the written-
  timeline promise framed as process, not schedule. **CLEAN.**
- **Response-time promises.** Zero. No "60-minute", "within X", "on site in",
  or same-day claims anywhere (competitors' pattern was not copied). **CLEAN.**
- **City-specific project claims.** None. No page claims a completed project
  in any named city; /service-areas states the photo-gate policy openly and
  its city blurbs differentiate on public geography only. Photo placeholders
  that name a city ("tile roof replacement in progress — Gilbert", "finished
  kitchen remodel — Mesa", "completed detached casita — Gilbert") are
  *requests to the owner* inside gated markers, not claims. **CLEAN**, with
  one note: those three captions pre-commit a city — when photos arrive, the
  caption must follow the photo's real city, not the placeholder's.
- **Project-history claims.** The live site's "casita + two garage
  conversions", "recent jobs paired hickory/granite", and "500+ projects" are
  all absent. Portfolio copy ("Every photo here is from a real Masizo
  project") is vacuously true today (zero photos) and becomes the binding
  rule at launch. **CLEAN.**

### Findings — unverified claims presented as fact

**F1 · "The phone is answered 24/7" — the one claim family that leaked past
its gate. (Must fix or confirm before launch; fine for client staging.)**
Handoff §7 gates final emergency-CTA copy on the owner confirming that
(602) 909-7630 actually *answers* 24/7; the factbase supports only the hours
fact "Open 24 hours, 7 days a week". The built copy repeatedly asserts live
answering as fact. Instances (visible text unless noted):

| Page | Exact quote |
|---|---|
| `/` (hero) | "a certified crew that answers at 2 a.m." |
| `/` (card 08) | "Water, fire, and mold emergencies answered around the clock" |
| `/` (why block) | "and whose phone gets answered" |
| `/contact` | "we're a 24 hours a day, 7 days a week operation, and we mean it" |
| `/contact` (form error) | "please call (602) 909-7630 instead. We answer." |
| `/contact` (meta description ×2) | "Restoration answered 24/7." |
| `/service-areas` | "(answered 24 hours a day, 7 days a week)" |
| `/service-areas` (FAQ, also in JSON-LD) | "is answered 24 hours a day, 7 days a week for the service area listed on this page" |
| `/services` | "Emergency response line answered 24 hours a day, 7 days a week" |
| `/services` (FAQ, also in JSON-LD) | "which we answer 24 hours a day, 7 days a week" |
| `/services/commercial` | "answer the phone when the unplanned work happens at 2 a.m." |
| `/services/commercial` (FAQ, also in JSON-LD) | "we answer 24 hours a day, 7 days a week" |
| `/services/restoration` ("first 24 hours") | "You call … Any hour. … we dispatch from there." |
| `/services/adu-construction` | "and we answer our own phone" |
| `/thank-you` | "the line is answered around the clock" |

(The restoration FAQ itself is the careful version — "Our *posted hours* are
24 hours a day" — which is the pattern the rest should follow if the owner
does not confirm.) **Action:** owner confirms the number answers live 24/7
→ keep; otherwise soften every instance to the hours fact.

**F2 · "We also take on select projects in California" (medium).**
Homepage FAQ ("We also take on select projects in California under our
California contractor license"), homepage service-area section ("Under our
California license we also take on select projects out of state"), and the
homepage about block ("CA LIC #1107781 for select out-of-state projects").
The factbase verifies only that the CA license *exists* — not that Masizo
operates in California. Owner must confirm, or trim to "also licensed in
California (CA LIC #1107781)" as the other pages phrase it.

**F3 · Free-inspection/consultation promises (low-medium).**
"Free estimate" is parity-supported (the live site's own contact title is
"Free Estimate in Gilbert, AZ"), but the new copy extends it: roofing FAQ
promises a full-roof inspection with written findings "at no charge and with
no obligation … whether the job turns out to be a small repair, a full
replacement, or an insurance claim" (visible + JSON-LD); ADU page promises a
site walk-through at "No cost, no obligation"; `/services` promises "a free
consultation, a written quote before work starts" on every project. These are
service-price commitments ($0) not in the §2 factbase. Note they skirt the
excluded insurance-"no cost to you" framing without crossing it — the free
thing is the inspection, never the claim help. **Action:** one-line owner
confirmation that estimates/inspections are free; expected yes, but it is a
promise the site makes.

**F4 · "Three decades" overstates 28 years (low).**
Portfolio: "Three decades of building leaves a trail". Homepage: "The
contractors who last three decades in this market are the ones whose work
holds up" (self-referential in context). The factbase says 28 years / since
1998. Change to "28 years" or "nearly three decades".

**Minor notes (no action required for staging):** restoration lists
"Biohazard cleanup" as a capability (not in the factbase service list —
confirm with owner); "unlike most restoration companies" (restoration) and
"most of our whole-home projects", "communities we work in every week",
"Most clients stay home during an addition" are unverifiable but generic
operational color; San Tan Valley blurb claims county permitting is a path
"we work regularly".

---

## 2 · [VERIFY]-flagged leakage — CLEAN

Every exclusion in `content/verify/agent1.md`, `agent2.md`, `agent3.md` was
grepped against the full dist text, attributes, meta/OG, and JSON-LD:

| Excluded item | Result |
|---|---|
| "500+ projects" / any project count | 0 hits |
| 4.7★ / 28 reviews / ANY rating number (4.7, 5.0, 4.9, ★, "stars", `aggregateRating`, `ratingValue`, `reviewCount`) | 0 hits anywhere, including JSON-LD and meta |
| Financing / "financing available" | 0 hits |
| Insurance "no cost to you" / "free of charge" claim-handling framing | 0 hits — restoration copy says document/coordinate and explicitly "coverage decisions always belong to your insurance company" |
| "Deductible-only" framing | 0 hits |
| Street address (Sandy Way, Higley, 85297, 85268, Garden Grove, Fountain Hills address) | 0 hits — schema and footer use locality-only "Gilbert, AZ" |
| Steven/Steve Martinez, "president", any `Person` schema | 0 hits |
| "Licensed *commercial* contractor" classification claim | 0 hits — /services/commercial states only the licenses held and never claims a commercial classification |
| Directory ratings (Yelp 5.0, Angi 5★, BuildZoom 96, Nextdoor) | 0 hits — Yelp appears only as a profile *link* (footer + sameAs), with no rating cited |
| Review excerpts outside gated markers | 0 — see §1 |
| `[[LICENSE_*]]` / `[[PHONE]]` token leaks, `[VERIFY]` strings in dist | 0 hits — all tokens resolved |

**Verdict: CLEAN.** The agents' exclusion lists held through assembly.

---

## 3 · Facts vs `business.ts` — CLEAN

Exhaustive counts across all 20 pages' text + JSON-LD:

- **Phone:** 189 × "(602) 909-7630" + 30 × "+16029097630". Zero variant
  spellings, zero other phone numbers.
- **Email:** 53 × "office@masizodevelopment.com". No other address (the old
  masizoenterprises.com address appears nowhere).
- **Licenses:** only #336058 (AZ general), #347030 (AZ restoration), #1107781
  (CA) — exact label strings "AZ ROC #336058", "AZ ROC #347030",
  "CA LIC #1107781" everywhere, incl. JSON-LD `hasCredential` with the correct
  issuers. No transposed digits found.
- **Hours:** "Open 24 hours, 7 days a week" exactly (footer sitewide);
  JSON-LD `openingHoursSpecification` 00:00–23:59 all seven days. (The
  *answered*-24/7 extension is F1.)
- **Years:** 61 × "28 years", 40 × "since 1998" — consistent and computed
  from `SINCE_YEAR`. Stray figures all benign (roof-lifespan rules of thumb
  15–25/50 yrs, SMS "18 years of age", housing-era decades). Exception: the
  two "three decades" phrasings (F4).
- **City lists:** every full list is exactly the 10 `business.ts` cities in
  `business.ts` order (footer, JSON-LD `areaServed`, service-area copy,
  contact form dropdown, llms.txt). No off-list city is claimed as served
  (checked Apache Junction, Ahwatukee, Glendale, Peoria, Avondale, etc. — 0).
- **Entity:** "Masizo Development LLC" as legal entity, "Masizo Development &
  Restorations" as trade name, consistent; JSON-LD `name`/`alternateName`
  match; one identity throughout (no Fountain Hills/Garden Grove identity).
- **llms.txt:** every fact in it matches `business.ts` verbatim; no ratings,
  no counts, no address. Nit: it says "serving the Phoenix East Valley since
  1998" where the factbase says "in Arizona since 1998" (footer tagline has
  the same East-Valley narrowing) — harmless inference, note only.

---

## 4 · Legal-ish copy — PASS with findings F5, F6

**ADU guide (`/guides/arizona-adu-law`).** Statute claims are cited to
primary sources: azleg.gov (§ 9-461.18, ch. 196/HB 2720, ch. 217/HB 2928,
§ 11-810.01, § 9-500.39), phoenix.gov, mesaaz.gov, gilbertaz.gov, census.gov
— linked inline in "The Short Version", "What Is Arizona's ADU Law?", "Which
Arizona Cities Must Allow ADUs?", "How Many/How Big", "Can I Rent Out My
ADU?", plus a dedicated **Sources** section (9 cites). Legal disclaimer
("general information, not legal advice") appears at both top and bottom;
"Last reviewed: October 23, 2026" is visible. Hedges verified present: Queen
Creek "unclear — ask the town", San Tan Valley "in transition", the Sept 14
2024 date anchored to § 9-500.39(B)(9), no "third Phoenix ADU" claim, no
"10% of lot" formula. The companion claims on /services/adu-construction and
/service-areas stay high-level and link the guide, consistent with it.

> **F6 (minor):** four sections state statute facts citing the § inline but
> with **no hyperlink in the same section**: "What Counts as an ADU?"
> (§ 9-461.18(I)), "What Can't My City Require?", "What Rules Still Apply?"
> (§ 9-461.18(C)/(D)), and the FAQ block (§ 9-461.18, § 9-500.39 — these FAQ
> answers are also in the JSON-LD `FAQPage`). The statutes *are* linked
> earlier on the page and in Sources, so every claim is checkable — but the
> "citation link in the same section" rule is not strictly met there. Cheap
> fix: link the first § mention in each of those sections.

**Privacy policy & terms.** Both describe only what the stack actually does:
GA4 (with dormant Google Ads/Meta slots disclosed conditionally — "If we
later run advertising campaigns … when one is, it measures…"), Cloudflare
hosting, Workers KV form storage, Resend email delivery, and the SMS program
(STOP/HELP, 18+, frequency varies, no sharing of opt-in data) matching the
contact form's consent fine print. No CCPA/GDPR rights are promised beyond
the generic access/correct/delete offer; security language is hedged ("no
website or system is perfectly secure"). Effective dates are visible
"[LAUNCH DATE — set at publication]" placeholders — a working gate.

> **F5 (process, medium):** the "LAUNCH GATE — ATTORNEY REVIEW REQUIRED"
> HTML comments exist in `content/pages/privacy-policy.md` and
> `terms-and-conditions.md` (and the GBP gate in `testimonials.md`, photo
> gate in `portfolio.md`) but are **stripped from the built HTML** — zero
> gate comments survive in `dist/`. The markdown pipeline drops HTML
> comments. Testimonials/portfolio still carry *visible* bracket gates, and
> the legal pages carry the visible `[LAUNCH DATE]` placeholder, so nothing
> ships silently — but the attorney-review instruction itself is invisible
> in the artifact being reviewed. Recommend: keep the gates tracked in the
> launch checklist (this report serves as that record), or emit them as
> visible staging banners until cleared.

---

## 5 · Overclaim tone — CLEAN

No "best", "#1", "fastest", "top-rated", "leading", "premier", "most
trusted", or equivalent presented as fact about Masizo. The grep's "fastest"
hits are idiom about process, not the company ("frequently the fastest path
to a legal, rentable second unit" — about garage conversions; "the fastest
honesty filter in this industry" — about ROC license lookups; "estimates move
fastest when…"). "The best money you can spend is before the season" is
advice. The only competitive comparison is "unlike most restoration
companies — we also hold a general contracting license" (noted in §1), which
is verifiable in kind if not in "most". Tone overall is the opposite of
overclaim — several pages explicitly invite license verification.

---

## 6 · Launch-gate inventory (pre-launch punch list)

**Totals in built output: 29 `[PHOTO:]` + 29 `[REVIEW]` + 2 `[LAUNCH DATE]` = 60 gates.**

### `[PHOTO:]` markers — 29 (all owner-photo gated; zero real images ship today)

| Page | Count | Slots |
|---|---|---|
| `/` | 6 | hero full-bleed project shot; crew on job site; gallery ×4 (kitchen, casita exterior, tile roof, bathroom) |
| `/portfolio` | 16 | kitchens ×3 (wide, detail, before/after); bathrooms ×3 (walk-in shower, tile/vanity, before/after); whole-home ×3 (main living, second interior, structural); ADU ×3 (casita exterior, interior, garage conversion); exterior/roofing ×2 (roof replacement, addition/facade); restoration ×2 (rebuild interior, before/after) — every caption "caption with city" |
| `/services/custom-homes` | 1 | finished custom home exterior, golden hour |
| `/services/home-remodeling` | 1 | whole-home remodel — finished main living space |
| `/services/kitchen-remodeling` | 1 | finished kitchen remodel — wide shot, Mesa |
| `/services/bathroom-remodeling` | 1 | master bathroom remodel — walk-in shower |
| `/services/room-additions` | 1 | room addition — exterior, roofline tie-in complete |
| `/services/adu-construction` | 1 | completed detached casita — exterior, Gilbert |
| `/services/roofing` | 1 | tile roof replacement in progress — Gilbert |

(No photo slots on /services/restoration, /services/commercial, /services,
/service-areas, /contact, legal pages, /thank-you, /404. City pages: none
exist — `hasPhoto: false` for all 10 cities, gate holding. The three
city-named placeholders — Mesa ×1, Gilbert ×2 — must take the real photo's
city at fill time.)

### `[REVIEW]` markers — 29 (all "verify against GBP before launch: paste verbatim quote")

| Page | Count | Cards (name — job signal) |
|---|---|---|
| `/` | 3 | Marina Gamez (remodel, on time in 8 weeks); Greg Gallagher (casita build); Monica Duran (AC-leak restoration, insurance coordination) |
| `/testimonials` | 26 | Remodels ×11: A Garcia, Marina Gamez, Alfred Martinez, Erik Caballero, Daniel Garcia, Amy Turner, Matias Romero, Luis Rico, Angela Reyes, Diana Martinez, Tipton Realty (Jeff Tipton) · ADU ×4: Greg Gallagher, Rosendo Rodriguez, Sandra Michele, Arturo Garcia · Restoration ×3: AJ, Monica Duran, Claudio Melvin · Homeowners & trades ×8: Jose Saenz, Roque Drywall LLC, Ricardo Herrera, A & A Installments, Chad C, Stacy, Erik Vega, CJ P |

Launch rule for every card: paste the verbatim GBP text, keep the name and
profile link, delete any card without a verifiable source review. Also pull
the live rating/count from GBP at that moment if a rating banner is wanted —
none is hardcoded anywhere today (correct).

### Other visible gates — 2

| Page | Gate |
|---|---|
| `/privacy-policy` | "Effective date: [LAUNCH DATE — set at publication]" (+ attorney review, F5) |
| `/terms-and-conditions` | "Effective date: [LAUNCH DATE — set at publication]" (+ attorney review, F5) |

---

## Safe to show the client as staging: **YES**

**Why yes.** The build contains zero fabrications: no invented reviews,
stories, stats, prices, ratings, people, or city projects; every excluded
[VERIFY] item stayed excluded (hunt 2 is completely clean); every hard
business fact matches `business.ts` exactly everywhere it appears; the legal
pages describe the real stack and nothing more; the ADU guide is
primary-source cited and hedged where the agents' own verification found the
live site wrong. Every unshippable element is visibly gated on the page
itself (`[PHOTO:]`, `[REVIEW…]`, `[LAUNCH DATE]`), so the client sees
exactly what is real and what is waiting on them — the gates double as the
ask list for the owner meeting.

**Conditions / what the client conversation must cover (launch blockers,
not staging blockers):**

1. **F1 — confirm (602) 909-7630 is answered live 24/7**, or ~15 instances of
   "answered 24/7 / answers at 2 a.m. / we dispatch" copy (incl. 4 JSON-LD
   FAQ answers and the /contact meta description) get softened to the posted-
   hours fact. This is the §7 gate and the only material unverified claim
   that reads as fact today.
2. **F2 — confirm Masizo actually takes California projects**, or trim the
   three "select projects in California / out of state" sentences on the
   homepage to the bare license fact.
3. **F3 — confirm free estimates/inspections** (expected yes; the roofing
   "full inspection at no charge" FAQ is the strongest version).
4. **F4 — fix "three decades"** → "28 years" on /portfolio and the homepage
   why-block (two-word edit, could be done any time).
5. Owner delivers photos (29 slots + city pages) and GBP verbatim reviews
   (29 cards); ROC/CSLB license status, BBB A+, IICRC, and biohazard-cleanup
   capability confirmed per §7; attorney reviews privacy/terms and the
   [LAUNCH DATE] is set (F5 means this lives in the checklist, not the HTML).
6. F6 (in-section statute links in four guide sections) — cheap polish,
   recommended before launch for the "every claim checkable where it's made"
   standard.

Zero `[VERIFY]` claims and zero `[PHOTO]` placeholders in shipped prod pages
is the §9 definition of done — by that standard the site is **not launchable
today by design**, and correctly so: everything blocking launch is
client-gated, visible, and inventoried above.
