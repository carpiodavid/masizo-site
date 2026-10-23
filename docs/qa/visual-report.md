# Visual QA report — Masizo rebuild

**Agent:** visual QA, 2026-10-23.
**Method:** `npm run build` → dist served locally → Playwright (bundled
Chromium) full-page screenshots of all 20 pages at **1440px** and **390px**
(40 captures, `docs/qa/screens/*.png`), with reveal animations forced to
final state and fonts settled. Horizontal-scroll width checked
programmatically on every page at both viewports. Every capture was then
reviewed by eye (sliced into viewport-height chunks), hunting the defect
classes in `docs/REBUILD-HANDOFF.md` §4 plus the assembly's flagged areas.

## Verdict

**3 defects found → 3 fixed → 0 deferred.** After fixes, the build passes,
affected pages were re-shot and re-verified, and the final screenshot set in
`docs/qa/screens/` reflects the fixed site. No §4 banned pattern found on any
page. No horizontal scroll at 390px or 1440px on any page. Title/hero
positions are consistent across all 9 service siblings (same crumb-band +
hero grammar), and spacing rhythm is even page to page.

## Defects found and fixed

### 1. Visible double-escaped entities — `&amp;` leaking as text (HIGH)

- **Where seen:** homepage service ledger row 02 rendered the literal text
  **"ADUs &amp; Casitas"** (both viewports; also leaked into that row's
  `aria-label`); /testimonials rendered a review author as
  **"A &amp; A Installments"**.
  Screens (before): previous `home-1440.png` / `testimonials-390.png`.
- **Root cause:** `src/pages/index.astro` (`parseRows`) and
  `src/pages/testimonials.astro` capture text back **out of
  already-escaped rendered HTML** with regexes, then hand it to Astro
  `{expressions}`, which escape it a second time.
- **Fix:** new `decodeEntities()` export in `src/lib/content.ts`
  (exact inverse of its `escapeHtml`, `&amp;` decoded last), applied to the
  captured row title in `index.astro` and to the captured review
  signal/author in `testimonials.astro`. Swept the rebuilt dist for
  `&amp;amp;` / `&amp;lt;` / `&amp;gt;` / `&amp;quot;` / `&amp;#` across all
  20 pages: **zero remaining**.
- **After:** `home-1440.png` row 02 shows "ADUs & Casitas" (Fraunces'
  decorative ampersand glyph — typeface design, not a defect);
  `testimonials-1440.png` shows "A & A Installments".

### 2. On-dark text colors fail contrast on clay bands (HIGH, a11y)

- **Where seen:** the clay heroes on **/services/restoration** and
  **/services/commercial**, and the homepage clay emergency band. The
  on-dark tokens are tuned for agave (#2f4034): on clay (#a14d2a) the lede
  body (`--c-mut-on-dark` #c9c0ad) drops to **~3.2:1** and links/kickers
  (`--c-accent-on-dark` #e3a17b) to **~2.7:1** — both below WCAG AA for
  body-size text. (CTABand had already special-cased its own clay tone;
  the generic rules had not.)
- **Fix (conservative, token-level):** in `src/styles/tokens.css`, clay-band
  overrides after the `.on-dark` rules — `.tone-clay a`,
  `.tone-clay .kicker` (+ its rule) go `--c-bone-on-dark` (#f6f0e4, **5.0:1**
  on clay), hover `--c-bone`; buttons keep their own fg via the existing
  higher-specificity `.on-dark a.btn-*` rules. In
  `src/components/ui/Hero.astro`, `.tone-clay .hero-lede` goes
  bone-on-dark likewise. Agave bands are untouched (their pairings already
  pass: 6.9:1 muted, 4.9:1 accent).
- **After:** `services-restoration-1440.png`, `services-commercial-390.png`,
  `home-1440.png` (emergency band) — lede, kicker, and inline links on clay
  are all bone, clearly legible.

### 3. Stat-ledger `dl` order: number before label (MEDIUM, semantics/SR)

- **Where seen:** homepage stat ledger under the hero (flagged by
  assembly). Each `.ledger-cell` emitted `<dd>` (the numeral) **before**
  `<dt>` (the label) — invalid dl content order; screen readers would
  announce the value before the term.
- **Fix:** `src/pages/index.astro` — markup reordered label-first
  (`<dt class="ledger-label">` then `<dd class="ledger-n">`), with
  `.ledger-cell { display:flex; flex-direction:column }` and
  `.ledger-label { order: 2 }` keeping the big numeral visually on top.
  Rendered dist verified: `dt` precedes `dd`; visual unchanged
  (`home-1440.png`, ledger strip under the hero).

## Flagged areas — inspected, no further defects

- **Homepage tight-stacked service groups** (Build/Remodel/Protect): rhythm
  stamp consistent, first group carries the "All services" action, tight
  spacing between sibling groups is even; scope-bullet rows align across
  all 9 entries at both viewports.
- **Restyled stat ledger:** 4-up at 1440, 2×2 at 390; numerals align on the
  hairline; units ("YRS", "LIC", "CITIES") sit on the same baseline as their
  numbers — no number/unit wrap separation anywhere.
- **Clay heroes on restoration/commercial:** see defect 2 (fixed); layout
  itself is sound at both viewports, call CTA is bone-on-clay (AAA-range).
- **dl order:** see defect 3 (fixed).

## Known non-defects (intentional, launch-gated — do not "fix")

- `[PHOTO: …]` material-tone placeholder blocks sitewide — photo-library
  gate (handoff §7); swap-in-place when owner photos arrive.
- `[REVIEW — verify against GBP before launch …]` quote slots on
  /testimonials and the homepage review band — §6 rule 1 (no review text
  until pasted verbatim from GBP). **Content-level: these must be resolved
  before launch** (tracked in the content gates, not a visual defect).
- `[LAUNCH DATE — set at publication]` effective dates on
  /privacy-policy and /terms-and-conditions — set at cutover.
- The sticky mobile call bar appears mid-page in some 390px full-page
  captures — a known Chromium full-page-stitch artifact for fixed elements
  (same note as `docs/design/DECISIONS.md` §5); live behavior is a
  bottom-fixed bar, verified at the top viewport.

## Screens

Final set (post-fix): `docs/qa/screens/<page>-{1440,390}.png` — 40 files,
`home`, `services`, 9 × `services-*`, `service-areas`,
`guides-arizona-adu-law`, `portfolio`, `testimonials`, `contact`,
`thank-you`, `privacy-policy`, `terms-and-conditions`, `404`.
Re-shot after fixes: `home`, `testimonials`, `services-restoration`,
`services-commercial` (both viewports). `npm run build` passes clean.
