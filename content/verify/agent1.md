# [VERIFY] log — Content Agent 1

Items present on the live site (or in briefs) that were **deliberately excluded** from the new copy until the owner confirms them. Source: docs/REBUILD-HANDOFF.md §6–7 and content/briefs/*. Nothing below may enter prod copy without owner sign-off.

## Global (applies to all five pages)

- **"4.7★ / 28 Google reviews"** rating and count — excluded everywhere; verify against GBP at build and render from data, never hardcode.
- **Review excerpts** — ZERO review excerpts were included on these five pages. The briefs provide only paraphrases of Google reviews (Monica Duran, Claudio Melvin, A Garcia, Daniel Garcia, Luis Rico, Amy Turner, Matias Romero, Tipton Realty, Diana Martinez, Alfred Martinez, Angela Reyes, Erik Caballero), not verbatim text. Quoting from paraphrase would fabricate wording. If excerpts are wanted, pull the verbatim text from GBP, attribute, link, and add max two per page with the `[REVIEW-EXCERPT]` marker.
- **License current status** — numbers appear only as tokens ([[LICENSE_GC]], [[LICENSE_RESTORATION]], [[LICENSE_CA]]) mapped from business.ts; owner ROC-lookup confirmation still pending (handoff §7).
- **"500+ projects" / any project counts, financing offers, street address, president's name** — never used on any page.
- **Response-time promises** — none made anywhere (competitors advertise "60-min response"; we promise nothing unconfirmed).

## /services/restoration

- **"Insurance claim help / damage documentation at no cost to you"** — live-page promise excluded. New copy says we document and work with the adjuster, without the "free / no cost" framing. Owner must confirm wording before it can return.
- **Which phone number answers at 2am** — 24/7 framing kept (site + hours confirm 24/7), but the emergency CTA is written generically around [[PHONE]]; final emergency-CTA copy is gated on owner confirming the 24/7 line (handoff §7).
- **"Deductible-only" outcome framing** — appears only in a customer review per the brief; excluded entirely (no review excerpts shipped; must never become a company promise).

## /services/roofing

- **Commercial roofing** — not claimed and /services/commercial not linked from this page; brief flags "[VERIFY] owner does commercial roofs before claiming".
- Roof-lifespan ranges in the FAQ are generic AZ industry guidance (explicitly allowed by the brief), not Masizo claims — flagged here for the copy-QA agent's awareness.

## /services/home-remodeling

- **"Steve Martinez, our president"** (schema variant "Steven Martinez") — name and title excluded pending owner verification.
- **"Most of our Google reviews mention Steve by name"** — excluded (and only usable with reviews visible nearby).
- **70s/80s-era plumbing/wiring specifics** (e.g. polybutylene, aluminum branch wiring) — kept deliberately vague ("wiring and piping standards that would not pass today's code") per brief caution to verify generalities.

## /services/kitchen-remodeling

- **"Recent jobs paired hickory cabinets with granite / white cabinets with quartz"** — project-history claim excluded; rewritten as generic material-pairing guidance with no "recent jobs" framing.

## /services/bathroom-remodeling

- **"Several of our Google reviews come from master bath remodels"** — excluded (only permitted with the reviews visible/linked, which these pages do not carry). Master-bath capability stated without the review claim.
