# Internal link map — new site

Recon date: 2026-10-23. Derived from the live site's nav/footer/contextual links (curl crawl of all 17 pages) + the handoff IA (17 parity slugs + `/services/commercial` + gated `/service-areas/<city>` pages). Guides every page's linking; the scaffold agent wires header/footer once, content agents add the contextual links listed per page.

## Live-site baseline (what exists today)
- Header (all pages): logo→`/`, About Us→`/#about` (NO about page exists), Services dropdown→`/services` + 8 service pages, Locations dropdown→`/service-areas` (city names NOT links), Portfolio, Testimonials, Contact, tel CTA.
- Footer (all pages): Quick Links (About anchor, Portfolio, Services, Service Areas, Contact, Testimonials), all 8 service links, Privacy, Terms, socials (Google Maps cid 1086874099717890420, Facebook, Instagram, Yelp, BBB, Nextdoor), tel + mailto.
- Breadcrumbs: service pages (Home›Services›X) and the guide (Home›ADUs›X) only.
- Contextual: each service page → 3 related services + portfolio + testimonials; ADU page ⇄ ADU-law guide (the only content-to-content link on the site); testimonials → Google write-review.
- Gap we inherit-and-fix: homepage never links the guide; city names never link anywhere; portfolio links nothing.

## Global header (sitewide)
- Logo → `/`
- Services (dropdown) → `/services`, then: `/services/custom-homes`, `/services/adu-construction`, `/services/home-remodeling`, `/services/kitchen-remodeling`, `/services/bathroom-remodeling`, `/services/room-additions`, `/services/roofing`, `/services/restoration`, **`/services/commercial`**
- Service Areas → `/service-areas` (dropdown lists only cities WITH live pages → `/service-areas/<city>`)
- Portfolio → `/portfolio`
- Reviews → `/testimonials`
- Guides → `/guides/arizona-adu-law` (becomes a dropdown as guides 2–3 ship)
- Contact → `/contact`
- Persistent: `tel:6029097630` CTA; distinct 24/7 emergency link → `/services/restoration` (copy gated on [VERIFY] per handoff §7)
- Mobile: sticky call bar (tel) on every page
- "About Us" → keep as `/#about` anchor (no about page in the IA) or drop from nav; decision for the design agent — do not invent an /about URL without adding it to the IA.

## Global footer (sitewide)
- Column 1 — identity: one-sentence description, license block (AZ ROC #336058 · AZ ROC #347030 · CA LIC #1107781), IICRC + BBB A+ + insured line, 28-years line (all crawlable text — handoff §5 trust block)
- Column 2 — company: `/portfolio`, `/testimonials`, `/service-areas`, `/contact`, `/guides/arizona-adu-law`, `/privacy-policy`, `/terms-and-conditions`
- Column 3 — services: all 9 service pages
- Column 4 — contact/NAP: Gilbert AZ, `tel:`, `mailto:office@masizodevelopment.com`, 24/7 hours; socials: Google Maps (cid 1086874099717890420), facebook.com/Masizodevelopment, instagram.com/masizo_development, Yelp listing, BBB profile, Nextdoor page
- Cities line: live city pages only (anti-doorway: no dead-text city lists pretending to be links)

## Breadcrumbs (BreadcrumbList schema on all)
- Service pages: Home › Services › {Service} (incl. Commercial)
- Guide(s): Home › Guides › {Guide}  ← fix of the live "ADUs" crumb; "Guides" crumb may point to `/guides/arizona-adu-law` until a /guides index exists
- City pages: Home › Service Areas › {City}
- Other: Home › {Page} (services, service-areas, portfolio, testimonials, contact)

## Per-page contextual links (beyond header/footer/breadcrumb)

| Page | Must link to |
|---|---|
| `/` | all 9 services (grid), `/services`, `/service-areas`, `/portfolio` (hero CTA), `/testimonials` (review excerpts), `/guides/arizona-adu-law` (ADU teaser — NEW, live site misses this), `/contact`, emergency → `/services/restoration` |
| `/services` | all 9 service pages, `/guides/arizona-adu-law` (from ADU card), `/service-areas`, `/contact` |
| `/services/custom-homes` | related: adu-construction, room-additions, home-remodeling · `/portfolio`, `/testimonials`, `/service-areas`, `/contact` |
| `/services/adu-construction` | **`/guides/arizona-adu-law` (prominent, both directions)** · related: custom-homes, room-additions, home-remodeling · portfolio, testimonials, contact · covered-city pages when live |
| `/services/home-remodeling` | related: kitchen-remodeling, bathroom-remodeling, room-additions · `/services/restoration` (hidden-damage tie-in) · portfolio, testimonials, contact |
| `/services/kitchen-remodeling` | related: bathroom-remodeling, home-remodeling, room-additions · portfolio, testimonials, contact · Mesa/Gilbert city pages when live |
| `/services/bathroom-remodeling` | related: kitchen-remodeling, home-remodeling, restoration · portfolio, testimonials, contact |
| `/services/room-additions` | related: adu-construction, home-remodeling, custom-homes · `/guides/arizona-adu-law` (addition-vs-ADU FAQ) · portfolio, testimonials, contact |
| `/services/roofing` | related: restoration (one-claim tie-in — prominent), home-remodeling, room-additions · portfolio, testimonials, contact |
| `/services/restoration` | related: roofing (leak source), home-remodeling, bathroom-remodeling · `/services/commercial` (commercial emergencies) · testimonials (restoration reviews), contact |
| `/services/commercial` | restoration (24/7 commercial), roofing, home-remodeling (TI adjacency) · portfolio, contact, service-areas |
| `/service-areas` | all 9 services (once, not ×10 like the live page), each live city page, `/guides/arizona-adu-law` (from ADU-law notes on the 6 covered cities), contact |
| `/service-areas/<city>` (gated) | parent `/service-areas`, 3–5 services relevant to that city's proof, the city-tagged portfolio item(s), contact; ADU-law guide for the 6 covered cities |
| `/guides/arizona-adu-law` | `/services/adu-construction` (primary CTA), `/services/custom-homes`, `/service-areas`, `/contact`; future guides cross-link |
| `/portfolio` | each project/category → its service page; city-tagged projects → city pages when live; `/contact` |
| `/testimonials` | Google write-review URL (place id ChIJG5OZKxnMNk8RdOFBNTxaFQ8); job-signal groupings → service pages; `/contact` |
| `/contact` | `/privacy-policy` + `/terms-and-conditions` (SMS disclosure), `/services/restoration` (emergency callout), `/service-areas` |
| `/privacy-policy` ⇄ `/terms-and-conditions` | each other, `/contact` |
| 404 page | `/`, `/services`, `/contact`, tel link |
| thank-you (new, noindex) | `/`, `/portfolio`, tel link |

## Link-equity notes
- Hub-and-spoke: `/services` and `/service-areas` are the two hubs; every spoke links back via breadcrumb (no orphans; portfolio was a near-orphan contextually on the live site — fixed above).
- The review wall moves to `/testimonials` (full) with excerpts elsewhere → testimonials becomes a strong internal node; make its excerpt links deep (per-service groupings), not just "see all".
- Guides earn links from service pages + homepage, not only nav — they're the LLMO assets.
- Never link to a city page that hasn't passed the photo gate (handoff rule 3); no placeholder city links anywhere.
