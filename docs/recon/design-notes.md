# Design recon — why the current site reads as premium (and how to beat it with a fresh identity)

Recon date: 2026-10-23. Sources: full-page Playwright screenshots in `docs/recon/screenshots/` (home + roofing at 1440px and 390px, contact at 390px), the live CSS bundle, and raw HTML. Read with handoff §4 — these are **transferable principles**, not a palette or layout to copy. The current design belongs to another shop (Framer-originated, served via Next.js).

## Screenshots index
- `home-1440.png`, `home-390.png` — homepage, both viewports (full page)
- `services-roofing-1440.png`, `services-roofing-390.png` — representative service page
- `contact-390.png` — contact + form + SMS disclosure on mobile

## Why it doesn't look generated — the principles that transfer

1. **One strong, committed theme.** Near-black canvas (not gray-on-white default), a single saturated accent used sparingly (CTAs, kickers, step numerals), and ONE light "relief" moment (a warm off-white card for the lead form). No gradients anywhere. The discipline — dark, red, white, nothing else — is what reads as designed. *Transfer: pick one committed desert/material palette and enforce the same discipline; the specific colors must be new.*

2. **A repeating section "rhythm stamp."** Every section opens the same way: tiny uppercase kicker in accent color ("OUR WORK", "HOW IT WORKS", "TESTIMONIALS") → large condensed uppercase H2, left-aligned → a right-aligned phone CTA on the same line. This consistent header grammar makes 8 very different sections feel like one system. *Transfer: define our own section-header grammar in the design system and never deviate.*

3. **Type pairing with real contrast of character.** Display = condensed industrial sans (Industry, plus Bebas Neue/Oswald cuts), ALL-CAPS, tight tracking, used BIG; body = quiet neutral sans (Inter) at modest size with generous line height. The display face carries construction/industrial connotation — type doing branding work. Letter-spacing is deliberately managed (negative on display sizes, slightly positive on small caps labels). *Transfer: pick a characterful display + quiet text pairing of our own (Fontsource-licensed), with the same deliberate caps/tracking system — different faces.*

4. **Photography treated as evidence, not decoration.** Real job-site photos (crews on roofs, in-progress framing, finished kitchens) in consistent card crops; a real team photo in the about band; an embedded Instagram grid of actual posts. Zero stock-smiling-hardhat imagery. Photos are allowed to be imperfect — that's what makes them credible. *Transfer: this is the single biggest anti-generated signal. Owner photo library is gated (handoff §7) — the design must be built to showcase real, art-directed crops and degrade gracefully to labeled placeholders.*

5. **Numbered process as a designed object.** The 4-step process uses oversized ghost numerals (01–04) as graphic elements inside dark cards — turns a boring list into visual texture. *Transfer: give process/steps a strong graphic treatment of our own invention.*

6. **Section variety within the system.** Homepage sequence: photo hero → about band w/ stats row → photo gallery → numbered process → services card grid → review carousel → Instagram grid → FAQ accordion → fat footer. No two adjacent sections share a layout skeleton; alternation of photo-led / text-led / card-led sections creates scroll rhythm. *Transfer: plan each page as an alternating sequence of distinct section types from a shared kit.*

7. **Trust furniture everywhere, quietly.** License numbers, BBB A+ line, and 24/7 hours sit in the footer of every page; stats row (28+/500+/100%) up top; breadcrumbs on service pages. It reads like a contractor, not a template. *Transfer: keep the always-visible trust block (handoff §5 requires it as crawlable text).*

8. **Mobile behavior.** Sticky top bar with a red CALL NOW pill always visible; sections stack cleanly at 390px; form fields full-width with the SMS disclosure as readable small print. *Transfer: handoff already mandates tap-to-call + sticky call bar; match the always-reachable-phone behavior.*

## DO NOT REUSE (fresh identity required)

Current palette (from the live CSS custom properties) — **banned for the new build**:
- `--bg: #0a0a0a` (page), `--bg-card: #121212`, `--bg-card-2: #1a1a1a`, `#242424` (framework grays)
- `--accent: #ed2024` (the red — their most recognizable equity; absolutely do not reuse)
- `--fg: #fff`, `--muted: #8f8f8f`, `--border: #ffffff1a`, `--card-light: #fffbf5` (warm off-white form card)
- Incidental: `#f2f3f8`, `#061237`, `#1c2436` (minor framework colors)
- (Note: "#336058" / "#347030" appearing in grep output are the ROC license numbers in page text, not colors.)

Current fonts — **banned for the new build**:
- Display: **Industry** (self-hosted; files named `industry_test_bold` / `industry_test_medium`), **Bebas Neue 400**, **Oswald 700**
- Body: **Inter 400/500/600/700**
- Overall dark-theme + industrial-condensed-caps + red-accent combination: do not re-derive something that reads as the same identity. The new direction per handoff §4 is warm/material desert tones, editorial typography — a different axis entirely.

## Weaknesses to beat (our measurable wins)

1. **424KB homepage HTML** (we measured 424,034 bytes raw; service pages 417–435KB) — enormous for a static marketing page. Astro target: well under 100KB HTML, <50KB JS (handoff perf budget).
2. **~2,150-word Google-review wall duplicated verbatim on 11 of 17 pages** — near-duplicate content inflating every "word count" and diluting uniqueness. Our fix: full wall on /testimonials only, excerpts elsewhere.
3. **Empty `alt` on gallery images** (checked: gallery/portfolio imgs ship `alt=""`) — accessibility + image-SEO giveaway.
4. **Heading hierarchy abuse**: card titles as H5/H6, form labels as H6, pages jumping H1→H5. Clean semantic structure is a free a11y/SEO win.
5. **Trial-font files**: display font ships as `industry_test_*` — "TEST" cuts are Fontspring trial files, i.e., likely unlicensed for production. We use properly licensed/free faces (Fontsource) — a real client-facing point about ownership/licensing hygiene.
6. **Extremely long mobile pages** (~23,000px tall at 390px on the homepage) driven by the duplicated review wall + Instagram embed.
7. **Odd "Play audio" embeds** in the homepage gallery band (audio players over project photos) — confusing UX.
8. **Portfolio page is 16 words + a photo dump**; no captions, no categories, no links to services.
9. **No llms.txt, zero analytics, no `/services/commercial`** (handoff-documented), robots.txt is fine but minimal.
10. **Instagram embed weight** — third-party iframe grid loads on the homepage; we can link socials without the payload.
11. **Footer "Developed by" vendor credit** (neptunestudio.io) — the new site carries no vendor capture, by design.
12. **Privacy/terms template sloppiness**: duplicated SMS paragraph, broken section numbering (…6,7,8,6,7,8,9…), stray characters — easy polish wins.

## Calibration verdict
The bar (handoff §4) is: committed theme, consistent section grammar, characterful display type, real photography, quiet trust furniture, restrained motion. The live site clears it with an industrial-dark identity; we clear it with a **fresh warm/desert-material identity** executed with at least the same discipline — and we win on weight, semantics, licensing hygiene, and content uniqueness.
