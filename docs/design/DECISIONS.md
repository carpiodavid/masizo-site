# Design decisions — Masizo rebuild ("Sonoran Ledger" system)

Design agent, 2026-10-23. Governing inputs: `docs/REBUILD-HANDOFF.md` §4
(banned patterns absolute), `docs/recon/design-notes.md` (DO-NOT-REUSE list
binding), screenshots in `docs/recon/screenshots/` (the quality bar).

## 1 · The system

### Identity axis
The current vendor-owned site is **dark / industrial-condensed / red**
(#0a0a0a + #ed2024 + Industry/Bebas/Oswald/Inter — all banned). We moved to
the opposite axis the handoff prescribes: **warm / material / editorial,
light theme** — sun-bleached plaster, terracotta, deep desert green,
Fraunces serif display. Nothing in it can be mistaken for the old identity,
and none of Masizo's measured competitors (Revival, Flow State, Stonecreek…)
occupy a warm editorial-serif position either.

### Palette (desert/material, light — all tokens in `src/styles/tokens.css`)
| Token | Hex | Role |
|---|---|---|
| `--c-bone` | `#faf6ee` | page canvas — sun-bleached plaster |
| `--c-sand` | `#f0e7d7` | alternate section / raised panel |
| `--c-stone` | `#e3d7c2` | deep sand — cards, wells |
| `--c-line` | `#d5c7ad` | hairline rules on light |
| `--c-ink` | `#231d15` | mesquite ink — primary text (warm near-black, not #0a0a0a) |
| `--c-ink-soft` | `#5c5347` | muted text (6.3:1 on bone) |
| `--c-clay` | `#a14d2a` | terracotta accent — kickers, CTAs, emergency heat (5.3:1 on bone) |
| `--c-clay-deep` | `#7c3a1f` | clay hover / small accent text (8:1) |
| `--c-agave` | `#2f4034` | deep desert green — dark bands, footer (10.3:1 w/ bone text) |
| `--c-agave-deep` | `#24332a` | wells inside dark bands |
| `--c-bone-on-dark` | `#f6f0e4` | text on agave/clay |
| `--c-mut-on-dark` | `#c9c0ad` | muted text on agave (6.9:1) |
| `--c-accent-on-dark` | `#e3a17b` | clay lifted for dark grounds (4.9:1 on agave) |

Discipline rule (the transferable principle from recon §1): **bone canvas,
one warm accent (clay), one dark relief tone (agave), nothing else.** The
emergency/restoration path owns the clay-as-background moment on every page;
agave owns the calm close (process, footer, final CTA). All text pairings
meet WCAG AA at their used sizes.

### Typography (self-hosted @fontsource, OFL-licensed — fixes the live
site's unlicensed `industry_test_*` trial cuts)
- **Display: Fraunces Variable** (`@fontsource-variable/fraunces`, opsz +
  wght axes, optical sizing on). A characterful "wonky old-style" serif —
  warm, hand-built, confident; the construction-brand work the old site did
  with condensed caps, this does with editorial serif at size. Italic cuts
  carry accents and the oversized ledger numerals.
- **Text/UI: Archivo Variable** (`@fontsource-variable/archivo`). A quiet
  grotesque for body, nav, labels, buttons; tracked small-caps for the
  kicker grammar.

### Section grammar (the "rhythm stamp")
Every section opens identically: 2rem clay hairline + uppercase Archivo
kicker → large left-aligned Fraunces heading → optional right-aligned action
(phone CTA or arrow link). Implemented once in `Section.astro` / `.kicker`;
never deviate. No centered text walls, no symmetric hero, no identical
shadow-card grids (§4 banned list) — services render as ledger rows or
varied-tone tiles, photos as art-directed asymmetric crops.

### Other system calls
- **Motion:** opt-in `.reveal` fade/rise on IntersectionObserver only;
  disabled under `prefers-reduced-motion` and without JS. Nothing else.
- **Photography:** `PhotoPlaceholder.astro` renders labeled `[PHOTO: …]`
  material-tone blocks (clay/agave/sand/stone duotone + contour motif) at
  the exact ratios real photos will occupy — swap-in-place when the owner
  library arrives (handoff §7 gate).
- **Nav:** "About Us" dropped from the header (no /about in the IA; the
  homepage keeps an `#about` band — per internal-link-map.md this decision
  was delegated to design). Footer carries the full link map. Cities render
  as plain text, not links, until city pages pass the photo gate.
- **Emergency path:** slim agave strip above the header on every page links
  /services/restoration + phone; copy avoids the unverified "live answer"
  promise (§7 [VERIFY]).
- **Favicon:** typographic "M" on agave with a clay baseline bar
  (`public/favicon.svg`) — placeholder pending the client logo.

## 2 · Component inventory (`src/components/ui/`)
Header (emergency strip, services dropdown, accessible vanilla-JS mobile
menu, call CTA, `slot="logo"`), Footer (identity + crawlable trust block,
company/services/contact columns, socials, cities line, from business.ts),
Hero (variants `home` / `service` / `emergency`, tones, media/actions/below
slots), Section (rhythm stamp + reveal observer), ServiceCard (`row` ledger
look + `tile` mosaic look), TrustStrip (licenses + IICRC + BBB + years,
crawlable text), FAQ (semantic `<details>` accordion, `[{q, answerHtml}]`),
ReviewExcerpt (verbatim quote + attribution + GBP link — real reviews only),
CTABand (agave/clay/ink), StickyCallBar (mobile tap-to-call + estimate),
Breadcrumbs (light/dark), PhotoPlaceholder. All business facts import from
`src/data/business.ts`; all phone links use `PHONE_TEL` (GA4 call_click
fires automatically via Base.astro).

## 3 · The three comps (`/design/home-a|b|c`, noindex)

**A — "High Desert Editorial"** (`home-a`). Bone canvas throughout; a
serif-led magazine opening (italic clay emphasis in the H1, offset 3:4
portrait crop), stats as an italic-numeral sidebar, services as a
hairline-ruled ledger index, agave process band, one full-clay emergency
moment, quiet review pull-quotes. The calmest and most "28-year firm"
of the three — photography will carry it once real images land.

**B — "Ironwood Ledger"** (`home-b`). Committed deep-agave hero with a
faint drafting-grid texture, tabular stat ledger under the fold, services
with uppercase scope bullets (design-to-build · permits · finish), a
three-photo asymmetric work band, rail-style process. The most
architectural/technical direction — reads like a firm that runs jobs on
paper and schedule.

**C — "Sunbaked Adobe"** (`home-c`). Boldest: full-bleed terracotta
color-field hero with an overlapping square crop and sun-arc motif,
services as a mosaic of varied material-tone tiles, oversized serif
pull-quote about band with overlapping photos, agave review band, clay
close. The most graphic and most "new brand" of the three.

## 4 · Recommendation

**Ship A ("High Desert Editorial"), folding in B's two best organs:** the
scope-bullet treatment on the service ledger rows and the tabular stat
ledger under the hero. Reasoning: (1) A gives real photography the most
room — the whole page is a quiet frame, and photos are the single biggest
anti-generated signal (recon §4) once the owner library lands; (2) its
restraint reads most like a 28-year, triple-licensed firm and least like a
rebrand stunt (C's color-field hero leans young/graphic — strong, but a
bigger bet, and it spends the clay accent so heavily that the emergency
path loses its distinct heat); (3) B's full-dark hero, while handsome,
re-approaches the old site's "dark canvas" axis more than the handoff's
fresh-identity intent suggests; A keeps agave/clay as relief moments, which
is the cleaner break. A's system already contains B's and C's section
treatments (dark band, clay band, tiles), so service pages can modulate
intensity per page without leaving the system.

## 5 · Screenshots
`docs/design/comps/home-{a,b,c}-{1440,390}.png` — full-page, both
viewports, reviewed (two iterations: fixed a `.on-dark a` vs button
contrast bug, mobile tile height, comp-C headline wrap; sticky header /
fixed call bar are flattened to static only for the stitched full-page
captures, since Chromium renders them mid-stitch — live behavior verified
separately at the top viewport).
