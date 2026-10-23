# Masizo theme variants — Sonoran Ledger vs. Masizo Oxide

Two takes on the identical design for side-by-side comparison. **Nothing moves,
nothing resizes** — same type (Fraunces + Archivo), spacing, radii, shadows,
components, and the same bone/sand/stone neutral canvas. Exactly two color
roles are re-keyed in Oxide:

1. **Accent family** — Sonoran's terracotta *clay* becomes a deepened
   **oxide/brick red** (a nod to the legacy brand's #ed2024, tuned down so
   every pairing clears WCAG AA).
2. **Dark-band family** — Sonoran's deep *agave green* becomes **warm
   charcoal/ink** (near-black with a warm cast, not flat #0a0a0a).

## Screenshots (in this folder)

| Shot | Sonoran (current) | Oxide (variant) |
|---|---|---|
| Home, 1440px | `sonoran-home-1440.png` | `oxide-home-1440.png` |
| Home, 390px | `sonoran-home-390.png` | `oxide-home-390.png` |
| /services/roofing, 1440px | `sonoran-roofing-1440.png` | `oxide-roofing-1440.png` |

## Exact token changes

| Token | Role | Sonoran | Oxide |
|---|---|---|---|
| `--c-clay` | accent — CTAs, numerals, hover links, `.tone-clay` | `#a14d2a` | `#a8251c` |
| `--c-clay-deep` | accent deep — links, kickers, button hover | `#7c3a1f` | `#7e1b14` |
| `--c-clay-wash` | pale accent tint — selection, washes | `#f2e0d3` | `#f5ddd6` |
| `--c-agave` | dark bands, footer | `#2f4034` | `#292420` |
| `--c-agave-deep` | wells inside dark bands | `#24332a` | `#1e1a17` |
| `--c-mut-on-dark` | muted text on dark | `#c9c0ad` | `#c7bdb0` |
| `--c-accent-on-dark` | accent lifted for dark grounds | `#e3a17b` | `#ec9c8b` |
| `--c-line-on-dark` | hairlines on dark | `#4a5c4f` | `#4d453d` |
| `--c-focus` | focus ring (follows accent) | `#a14d2a` | `#a8251c` |

All other tokens — `--c-bone #faf6ee`, `--c-sand #f0e7d7`, `--c-stone #e3d7c2`,
`--c-line #d5c7ad`, `--c-ink #231d15`, `--c-ink-soft #5c5347`,
`--c-bone-on-dark #f6f0e4`, plus every type/spacing/radius/shadow/layout token —
are unchanged.

## Oxide contrast verification (WCAG 2.x)

AA requires 4.5:1 for normal text, 3:1 for large text and non-text indicators.
Every pairing below was computed from the final hexes; all pass AA for normal
text (the strictest case that applies to it).

| Foreground | Background | Ratio | Where it appears |
|---|---|---|---|
| `#a8251c` | `#faf6ee` bone | 6.61:1 | link hover, numerals, kicker rules on canvas |
| `#a8251c` | `#f0e7d7` sand | 5.81:1 | accent text on raised panels |
| `#a8251c` | `#e3d7c2` stone | 5.01:1 | accent text on cards/wells |
| `#7e1b14` | `#faf6ee` bone | 9.48:1 | body links, kicker text |
| `#7e1b14` | `#f0e7d7` sand | 8.33:1 | links/kickers on panels |
| `#7e1b14` | `#e3d7c2` stone | 7.19:1 | links/kickers on cards |
| `#f6f0e4` | `#a8251c` | 6.28:1 | text/buttons on `.tone-clay` band, `.btn-clay` |
| `#f6f0e4` | `#7e1b14` | 9.01:1 | `.btn-clay:hover` |
| `#faf6ee` | `#7e1b14` | 9.48:1 | `.btn-ink:hover` |
| `#f6f0e4` | `#292420` | 13.53:1 | headings/body on charcoal bands |
| `#f6f0e4` | `#1e1a17` | 15.22:1 | text on charcoal wells |
| `#c7bdb0` | `#292420` | 8.29:1 | muted text on charcoal |
| `#c7bdb0` | `#1e1a17` | 9.33:1 | muted text on charcoal wells |
| `#ec9c8b` | `#292420` | 7.09:1 | links/kickers on charcoal |
| `#ec9c8b` | `#1e1a17` | 7.98:1 | links on charcoal wells |
| `#231d15` | `#f5ddd6` | 12.87:1 | `::selection` |
| `#a8251c` | `#faf6ee` | 6.61:1 | focus ring (non-text, needs only 3:1) |

## How to switch to Oxide

`src/styles/tokens-oxide.css` is the complete alternate token file. It is
**not imported anywhere** — the site still runs Sonoran. To apply Oxide:

1. Replace the entire contents of `src/styles/tokens.css` with the contents of
   `src/styles/tokens-oxide.css` (the import path everywhere stays
   `tokens.css`; only the file's contents swap).
2. `npm run build`.

To switch back, restore `tokens.css` from git (`git checkout -- src/styles/tokens.css`).

*Both themes were built and screenshotted from the same commit; the only diff
between the two screenshot sets is the nine token values above.*
