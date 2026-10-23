# Masizo Development & Restorations — website & SEO audit (2026-10-17)

> **CORRECTION PASS (2026-10-22) — direct crawl completed.** Network access
> was opened and all 17 pages were fetched and analyzed directly. Several
> index-based findings below were artifacts of a stale Google index and are
> superseded by the "Direct-crawl findings" section. **Read that section
> first**; items marked ~~struck~~ or [SUPERSEDED] no longer hold.

## Direct-crawl findings (2026-10-22, observed)

**The live site is good. The problem is that Google is still serving the old
site.**

| Area | Observed |
|---|---|
| Platform | Next.js on Vercel, prerendered (x-nextjs-prerender: 1) — fast (TTFB 0.25–0.6s), fully server-rendered, crawlable |
| Pages | **17 in sitemap, all HTTP 200**: home, services index, **8 service pages** (roofing, ADU, custom homes, restoration, home remodeling, kitchen, bathroom, room additions), service-areas, an Arizona ADU-law guide (4,184 words), portfolio, testimonials, contact, privacy, terms |
| Content depth | Service pages ~3,250–3,330 words each, hand-written, with FAQ sections |
| Titles/descriptions | Written, service + geography on every page (e.g. "Roofing Contractor in the Phoenix Valley \| Masizo Development") |
| Schema | WebSite + GeneralContractor sitewide; Service + BreadcrumbList + FAQPage on every service page; Article + FAQPage on the guide |
| Licenses | AZ ROC #336058, #347030, CA #1107781 in crawlable text on every page |
| Redirects | Clean: http→https and apex→www all 308 to one canonical origin |
| robots.txt / sitemap | Open (`User-Agent: * Allow: /` — AI crawlers allowed); sitemap declared and accurate |
| 404 behavior | Real 404s |
| Hours | Site says "Open 24 hours, 7 days a week" — consistent with the 24/7 restoration claim |
| Entity on site | Masizo Development LLC; email office@masizodevelopment.com (on-domain) |
| GBP / socials | Google Business Profile exists (maps cid 1086874099717890420, embedded on contact page); Facebook, Instagram, Yelp linked; testimonials page quotes Google reviews |

**Supersedes:** "no service pages" (8 exist), "titles say nothing" (they're
well-written), "site competes with itself" (redirects are clean; the
apex-indexed page was stale index), "email on a different domain" (the
masizoenterprises.com address is old-site data), "24/7 vs weekday hours
conflict *on the site*" (the site is consistent — the conflict persists only
on third-party listings), and the renovate-vs-rebuild question (**resolved:
no rebuild justified — the platform passes every gate criterion**).

**Confirmed gaps (all observed directly):**

1. **Indexation lag — the core problem.** Only ~6 of 17 pages appear in
   Google's results, and the indexed titles are the *old* site's. Google has
   not fully crawled/indexed the relaunched site. `[VERIFY with owner: is
   Search Console set up and the sitemap submitted? When did the new site go
   live?]`
2. **Legacy URLs 404 with no redirects** (`/services/commercial`,
   `/who-we-are/...`): whatever equity and bookmarks the old site had dies at
   a 404 instead of forwarding.
3. **Zero analytics or tracking** on any page — no GA4, GTM, Ads tag, or
   Meta pixel. Leads are unmeasurable.
4. **No llms.txt** (404); homepage is the one page missing a canonical tag.
5. **Off-site problems all stand:** absent from all five tested money-keyword
   SERPs; entity split across three names/addresses in directories; third-
   party listings show outdated hours and the old identity; reviews scattered
   thin across platforms.

**Revised diagnosis:** the content and technical foundation exist and are
strong. The work is **indexation + authority + entity consolidation +
measurement**, not a rebuild: submit and monitor via Search Console, build
the legacy-URL redirect map, fix the homepage canonical, add llms.txt,
consolidate the off-site entity (GBP, directories, hours), grow reviews on
the one GBP, install tracking, and measure rankings + AI answers before/after.

> **OWNERSHIP UPDATE (2026-10-23).** Owner reports the current site is
> controlled by another provider with no access for Masizo to change it
> `[VERIFY contract + who owns domain/DNS/content]`. Since every item in the
> revised diagnosis is an on-site or owner-access change, the business
> recommendation flips to an **owned rebuild at content/technical parity,
> same URL slugs, on Masizo's own domain and hosting** — see
> `BUILD-PLAN.md` in this directory. The technical verdict on the current
> site is unchanged; the problem is captivity, not code. Timing favors the
> swap: with only ~6 of 17 pages indexed, platform-change SEO risk is at a
> minimum.


> **Status: PRELIMINARY.** Direct fetches are still unavailable from this
> environment (all outbound hosts fail at the egress layer — now surfacing as
> DNS `ENOTFOUND` rather than the earlier `EGRESS_BLOCKED`, verified against
> known-good hosts like dns.google before drawing any conclusion about the
> client's domain). Everything below is search-index data, tiered
> observed / reported / claimed. On-page sections are **[BLOCKED — needs
> direct fetch]** pending `masizodevelopment.com` being allowlisted in the
> environment's network settings.

## Executive summary

Masizo has the strongest fundamentals of any client we've audited: active
licenses on both sides of the business (site claims AZ ROC #336058 general,
#347030 restoration, CA #1107781), a BuildZoom score of 96, BBB **A+
accredited**, a 5.0 on Yelp, five 5-star reviews on Angi, praise on Nextdoor,
and a verifiable 28-year history (in Arizona since 1998). Nobody can find any
of it. The identity is split across at least **three business names** (Masizo
Development LLC / Masizo Development & Restorations / Masizo Restorations),
several addresses in two states (Gilbert, Fountain Hills, Garden Grove CA),
and email addresses on a *different domain* (masizoenterprises.com). The
website is ~6 indexed pages with no dedicated pages for its own services
(custom homes, ADUs, roofing, water/fire/mold restoration), and in the two
money-keyword SERPs we tested — ADU/remodel Gilbert and 24/7 water damage
Gilbert/Mesa — Masizo appears zero times while a dozen competitors with
per-service pages fill page one. One listing conflict is urgent for a
restoration business: the site advertises **24/7 restoration** while indexed
contact data shows **weekday hours, weekends closed**. This is a
consolidation-and-content engagement: the trust assets already exist; they
need one identity and pages that let them rank.

## Factbase

| Fact | Value | Tier / source |
|---|---|---|
| Name variants | Masizo Development LLC (Nextdoor, BuildZoom) · Masizo Development & Restorations (site, Yelp, BuildRated) · Masizo Restorations (Angi, Yahoo Local, MapQuest) | observed/reported — 3+ variants |
| Phone | (602) 909-7630 | claimed (site, via SERP snippets) |
| Email | office@masizoenterprises.com (+ separate GC & restoration emails on commercial page) — **different domain than the website** | claimed `[VERIFY intent]` |
| Addresses | Gilbert mailing address (site); 4174 E Sandy Way, Gilbert 85297 (MapQuest "Masizo Restorations"); Fountain Hills 85268 (Yelp/MapQuest); Garden Grove, CA (Yelp) | reported — 4 location variants |
| Licenses | AZ LIC #336058 (general), AZ LIC #347030 (restoration), CA LIC #1107781 | claimed (site) `[VERIFY at ROC + CSLB]`; BuildZoom reports "General Dual + 3 other licenses," active |
| Experience | 28 years; in AZ since 1998 (site + portfolio page agree) | claimed `[VERIFY]` |
| Certifications | IICRC certified; fully insured | claimed (homepage snippet) `[VERIFY]` |
| Services | Custom homes, remodels, ADUs, roofing, 24/7 restoration (water/mold/biohazard); commercial | claimed |
| Service area | Gilbert, Mesa, Chandler, Queen Creek, Phoenix metro; CA (Orange/LA counties via Garden Grove) | claimed/reported |
| Hours | Weekdays, weekends closed (indexed contact data) — **conflicts with "24/7 restoration"** | observed (snippet) `[VERIFY]` |
| Ratings | BBB **A+ accredited**; Yelp Fountain Hills 5.0 (2 reviews); Angi 5 reviews all 5-star (listed under a Garden Grove URL, titled Gilbert); BuildZoom 96 (no reviews); Nextdoor praise; BuildRated clean/no verified reviews | reported |
| GBP | Not determinable with the tools used — `[VERIFY with owner: how many profiles exist across the name/address variants]` | — |

## Technical SEO

**[BLOCKED — needs direct fetch]**: redirect hygiene, robots.txt, sitemap,
canonicals, schema, platform, page weight, meta descriptions, AI-crawler
access.

Observable from the index:

- **~6 pages indexed**: `/` ("Masizo Development" — bare brand title),
  `/portfolio`, `/testimonials`, `/contact` ("Contact Us" — no brand),
  `/terms-and-conditions` ("Terms and Conditions" — no brand), and
  `/services/commercial/`. No residential service pages (custom homes, ADU,
  roofing, restoration) and no city pages are indexed — the services that pay
  have no pages to rank.
- **Host inconsistency**: five pages are indexed on `www.`, but the
  commercial page is indexed on the bare apex (`masizodevelopment.com/services/commercial/`)
  — suggests canonical/redirect inconsistency between hosts. [Confirm on fetch.]
- **Weak titles**: homepage is just "Masizo Development"; utility pages carry
  no brand; no title contains a service + city.

## Search & local presence

- **Reviews are excellent but scattered thin.** Every rating found is 5-star
  or A+, but the volume is tiny and split across entity variants: 2 on Yelp
  (Fountain Hills), 5 on Angi (filed under "Masizo Restorations" with a
  Garden Grove URL), zero on BuildZoom, none verified on BuildRated. After 28
  years in business, the review base should be an order of magnitude larger —
  the clients exist; they've never been systematically asked, and what they
  did write is fragmented across profiles that don't reinforce each other.
- **The 24/7 conflict.** For an emergency restoration brand, indexed hours
  saying "weekends closed" is a direct lead-killer: emergency searches happen
  at 2am on a Saturday. `[VERIFY: is there a real 24/7 line?]`
- **Money-keyword SERPs tested (observed):**
  - *ADU / custom home / remodeling Gilbert*: Revival Contracting (ROC
    365368 displayed), ERC, CactusNectar, Western Skies, Pride Remodeling,
    Cheyenne Construction, RG Pro Builders. Masizo: absent.
  - *Water damage restoration Gilbert/Mesa 24/7*: Flow State ("60-min
    response"), Unified, Elite Gilbert, Drip (IICRC-certified messaging),
    Rocky Mountain, Restore Master, 1-800 Water Damage. Masizo: absent.
  - Winners pair per-service-per-city pages with explicit license/IICRC
    trust copy and emergency-response promises.

## AI search readiness

- **Entity coherence: the core problem.** Three names, four addresses, two
  states, and an email on a different domain give AI assistants three weak
  entities instead of one strong one. Asked about "Masizo," an assistant may
  describe the Gilbert GC, the Fountain Hills restoration outfit, or the
  Garden Grove company — unaware they're the same business — and attribute
  licenses or reviews to the wrong one.
- **What assistants will repeat: nothing bad, little at all.** The record is
  clean (A+, 96, 5.0s) — ideal raw material — but restoration-intent
  questions get answered from the directory pages where Masizo is absent.
- **Citable substance: thin.** No service pages stating service + city +
  license in plain text; testimonials live on-site only; license numbers
  appear (good) but the 24/7 hours conflict is exactly the kind of
  contradiction that makes an assistant hedge or omit.
- **Crawler access / llms.txt / schema:** [BLOCKED — needs direct fetch].
- **Live answer test:** [VERIFY — run "best ADU builder in Gilbert AZ" /
  "24/7 water damage restoration Gilbert" / "is Masizo Development reputable"
  against ChatGPT, Claude, Perplexity, Google AI Mode from an unblocked
  environment; record verbatim.]

## SEO / GEO / LLMO deep dive (added 2026-10-19 — the client's stated ask was "SEO help")

### Keyword coverage: 0 for 5

Five money-intent searches tested (observed SERPs, 2026-10-17/19). Masizo
appeared in none, organic or local:

| Search intent | Who owns it today | Masizo | Winning pattern |
|---|---|---|---|
| ADU / custom home / remodel, Gilbert | Revival (ROC # displayed), ERC, Pride, RG Pro Builders, Cheyenne | **Absent** | per-service pages + license copy |
| 24/7 water damage, Gilbert/Mesa | Flow State ("60-min response"), Drip (IICRC), Elite, Rocky Mountain, Unified | **Absent** | emergency promise + city pages |
| Roofing contractor, Gilbert | Stonecreek (**4.9★, 530+ Google reviews claimed**), Overson, Scott (since 1982), Roof Rite, Tip Top | **Absent** | `/service-locations/gilbert/` URLs + review mass |
| Kitchen/bath remodeling, Mesa | Phoenix Home Remodeling (`/home-remodeling/mesa-az/`), Premier (since 1994), 123, Mustache Approved | **Absent** | per-city service pages |
| Mold remediation, Gilbert | Flow State, AZ Total Home (IICRC S520 copy), ServPro, ServiceMaster, + Expertise.com "16 Best" list | **Absent** (also absent from the "16 Best" list) | standards/cert copy + directory listings |

The pattern across all five: winners rank with a dedicated page per service
per city, explicit license/certification copy, and review mass. Masizo has
zero pages of that kind.

### Classic SEO — the deficit inventory

| Layer | State | Evidence |
|---|---|---|
| Rankable pages | **0** service- or city-targeted pages (6 pages total; one commercial page) | `site:` searches incl. service-keyword variants — no blog, no guides, no FAQ |
| Title tags | Bare brand ("Masizo Development") / unbranded utility titles | SERP titles |
| Canonical origin | Split: 5 pages indexed on `www.`, commercial page on apex | observed index |
| Local landing pages | None (serves 5+ cities, has 0 city pages) | `site:` |
| Content depth | No cost guides, FAQs, comparisons, project write-ups indexed | `site:` |
| Entity/citations | Authority split across 3 business names, 4 addresses, 2 states | directories (see Factbase) |
| Review mass | ~7 reviews scattered across variants vs. 530+ claimed by one roofing rival | Yelp/Angi/BuildZoom vs Stonecreek claim |
| On-page tech (schema, speed, robots, sitemap, meta descriptions) | **[BLOCKED — needs direct fetch]** | — |

The on-site trust copy that *does* exist is good raw material: license
numbers (AZ #336058, #347030, CA #1107781), **IICRC certified**, insured,
28 years — stated on the homepage per SERP snippets. It just has no pages to
work on.

### GEO (generative engine optimization) — being the answer

What AI Overviews / assistants need and Masizo lacks:

1. **Retrievable answers.** Assistants quote pages that plainly state
   service + city + proof. Masizo has no such pages; every tested intent gets
   answered from competitor pages and directories where Masizo is absent.
2. **One resolvable entity.** Three names/addresses mean retrieval may pull
   the Fountain Hills, Gilbert, or Garden Grove fragment — or hedge and skip
   the brand. The email domain (masizoenterprises.com) adds a fourth token.
3. **Corroboration.** Engines weight claims echoed by third parties. The A+/
   5.0/96 signals exist but sit on mismatched entity names, so they don't
   stack.
4. **Crawlable reviews.** Testimonials are on-site only; no review schema
   detectable from SERPs `[confirm on fetch]`.

### LLMO (LLM optimization) — the checklist, current state

| Item | State |
|---|---|
| AI-crawler access (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot in robots.txt) | [BLOCKED — needs fetch] |
| `llms.txt` | [BLOCKED — needs fetch; no indexed trace] |
| Structured data (LocalBusiness/GeneralContractor, Service, FAQPage, Review) | [BLOCKED — needs fetch] |
| Plain-text fact statements (license #s, IICRC, service area) on crawlable pages | Partial — homepage only |
| Q&A-formatted content for answer extraction | None indexed |
| Entity consistency across the citation graph | Failing (3 names) |
| Live answer baseline (ChatGPT/Claude/Perplexity/Google AI Mode) | [VERIFY — run from unblocked environment; baseline before work, re-test after] |

### Does this justify a new site build?

The deficit is **structural, not cosmetic**. Retitling six pages cannot
produce rankings for four service lines across five cities; that requires
~25–35 pages that do not exist (4 service lines × 4–5 cities, plus guides,
FAQ, and case studies), one canonical host, schema throughout, crawlable
reviews, and AI-crawler-friendly rendering. That is a build no matter what.
The open question is only *where* to build it:

- **Renovate in place** if the current platform (unconfirmed — fetch blocked)
  supports clean canonicals/redirects, schema injection, fast pages, and a
  30-page architecture without fighting it.
- **Rebuild** on the stack used for RHS (where those are defaults, and which
  produced top-3 listings + leads in week one) if the platform resists any
  of the above. The observed www/apex canonical split and default titles are
  early warning signs of platform neglect or limits, not yet proof.

**Decision gate: week 1 of the engagement — confirm the platform, then
commit.** Either way the entity cleanup and all content work carry over
unchanged, so nothing is wasted by starting before the gate.

## Content & conversion

**[BLOCKED — needs direct fetch]** for CTAs, forms, tap-to-call, tracking,
photo quality. From the index: portfolio and testimonials pages exist (good
bones — real projects since 1998 to draw on), an SMS program with opt-out
exists per the terms page, but there is no emergency-CTA signal and no
service-specific landing page for any of the four service lines.

## Areas of opportunity (ranked by effect on leads)

| # | Opportunity | Impact | Effort | First step |
|---|---|---|---|---|
| 1 | **One identity.** Choose the canonical name, address, phone, and email (on the brand domain); propagate across GBP, BBB, Yelp, Angi, Nextdoor, BuildZoom, MapQuest/Yahoo | Very high | Medium | Owner decides the go-forward name; inventory every live profile across all 3 names |
| 2 | **Consolidate + compound reviews.** Merge/retire duplicate profiles; route 28 years of clients to one Google profile with a simple ask | Very high | Low–Med | Identify primary GBP; build the ask list from past clients |
| 3 | **Fix the 24/7 conflict everywhere** + emergency line CTA on site and listings | High | Low | Confirm the real after-hours answering setup |
| 4 | **Service pages that can rank**: water/fire/mold restoration (highest intent), ADU, custom homes, roofing — each × Gilbert/Mesa/Chandler/Queen Creek pattern like the SERP winners | High | Medium | Start with restoration × Gilbert |
| 5 | **Architect the two business lines** (Development vs Restoration) so each has a clear home, instead of blurring one small site | Med–High | Medium | Site map decision with owner |
| 6 | **Titles, canonical host, schema** with the verified license numbers | Medium | Low | After #1 fixes the NAP |
| 7 | **AI answer readiness**: coherent entity + citable pages + crawler access; baseline and re-test assistant answers | Medium | Low | After #1/#4 |
| 8 | **Complete the technical audit** once the domain is allowlisted | Enabler | Low | Allowlist masizodevelopment.com |

## Open questions

1. Which business name is the legal, go-forward identity — and is
   "Masizo Enterprises" (the email domain) a third entity we should know about?
2. License check: are AZ #336058, #347030, and CA #1107781 all current, and
   under which entity name? (ROC + CSLB lookups.)
3. Is restoration truly 24/7 — what number answers at 2am Saturday, and
   should it differ from the main line?
4. How many Google Business Profiles exist across the names/addresses
   (Gilbert, Fountain Hills, Garden Grove)? Who has access to each?
5. Is the Garden Grove, CA operation active and a marketing priority, or
   legacy?
6. What platform is the site on, and is there analytics/tracking installed?
7. Do the five Angi reviewers and two Yelp reviewers have Google reviews too —
   and can we re-route future asks to one profile?

## Sources (observed via web search, 2026-10-17)

- https://www.masizodevelopment.com/ (+ /portfolio, /testimonials, /contact,
  /terms-and-conditions, /services/commercial/) — SERP titles/snippets only
- https://www.buildzoom.com/contractor/masizo-development-llc
- https://www.yelp.com/biz/masizo-development-and-restorations-fountain-hills-2
- https://www.yelp.com/biz/masizo-development-and-restorations-garden-grove
- https://www.angi.com/companylist/us/ca/garden-grove/masizo-restorations-reviews-11436092.htm
- https://nextdoor.com/pages/masizo-development-llc-gilbert-az/
- https://buildrated.com/contractor/masizo-development-restorations/
- https://www.mapquest.com/us/arizona/masizo-restorations-644043380
- https://www.mapquest.com/us/arizona/masizo-development-and-restorations-543007828
- https://local.yahoo.com/info-235598117-Masizo-Restorations/
- Competitor SERPs: erc.build, revivalcontractingaz.com, cactusnectarllc.com,
  wsraz.com, prideremodelingaz.com, cheyenneconstructionaz.com,
  rgprobuildersaz.com, flowstaterestoration.com, unifiedaz.com,
  driprestoration.com, elitegilbertwaterdamage.com, rapidrestoreaz.com,
  rmraz.com, restoremaster.biz, 1800waterdamage.com
