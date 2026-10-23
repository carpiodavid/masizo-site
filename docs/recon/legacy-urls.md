# Legacy URLs & redirect source list

Recon date: 2026-10-23. Purpose: every historical URL on masizodevelopment.com (www + apex), live status today, and a redirect target in the new IA for every 404 — feeds `_redirects` (handoff §5).

## How this list was built (and what blocked full enumeration)

| Source | Result |
|---|---|
| Wayback CDX API (`web.archive.org/cdx/...`, both hosts, wildcard) | **UNREACHABLE from this build environment** — the egress proxy blocks web.archive.org (policy denial; per proxy rules, not worked around). |
| archive.org Wayback *availability* API (per-URL probes) | Reachable. Domain has **snapshots of the homepage only**: apex `/` captured 2024-09-18 and 2025-03-17. Probes of `/services/commercial`, `/who-we-are`, `/services`, `/contact` → **no snapshot**. Wayback coverage of this domain is effectively homepage-only. |
| Common Crawl CDX (indexes sampled 2019–2026, domain match) | **Zero captures** of masizodevelopment.com in any index that answered ("No Captures found"). |
| Web search (`site:` + name/path queries) | No legacy URLs surfaced. |
| Live crawl (all 17 sitemap URLs + sitemap.xml + robots.txt) | Confirms the current URL set below. |
| Handoff §3 (audit findings) | The two known legacy 404s. |

**⚠️ This list is therefore NOT exhaustive.** The old-old site's full URL set could not be enumerated from here. **Action for cutover (owner-gated):** once Google Search Console access exists, export Indexing → Pages → "Not found (404)" and Links reports, and run the Wayback CDX query from an unrestricted network; append any new paths to the table below before DNS swap. (Exact CDX query to run: `https://web.archive.org/cdx/search/cdx?url=masizodevelopment.com*&output=json&collapse=urlkey&fl=original,timestamp,statuscode&limit=2000`.)

## Current canonical URL set (17 URLs — keep slugs exactly; all live-200, curl-verified)

`/` · `/services` · `/services/roofing` · `/services/adu-construction` · `/services/custom-homes` · `/services/restoration` · `/services/home-remodeling` · `/services/kitchen-remodeling` · `/services/bathroom-remodeling` · `/services/room-additions` · `/service-areas` · `/guides/arizona-adu-law` · `/portfolio` · `/testimonials` · `/contact` · `/privacy-policy` · `/terms-and-conditions`

Host/scheme behavior to preserve: http→https and apex→www currently 308; keep single host `https://www.masizodevelopment.com` with 301/308 for everything else (handoff §5).

## Known legacy URLs (confirmed previous-generation paths)

| # | Path | Live status today (curl) | Evidence it existed | Redirect in new IA |
|---|---|---|---|---|
| 1 | `/services/commercial` | **404** | Audit/handoff: still indexed; old title "Commercial – Masizo Development & Restorations" | **No redirect needed — page is REBUILT at the same slug** (see content/briefs/services-commercial.md). Until it ships: 301 → `/services`. |
| 2 | ~~`/who-we-are/anthony-ardizzone-president`~~ | — | **REMOVED 2026-10-23: cross-contamination from a different client's audit (ZZONE Construction). Never a Masizo URL — no redirect needed.** | — |

## Defensive legacy candidates (probed 2026-10-23; all 404 live, none in Wayback)

These are plausible previous-generation paths (the old site was WordPress-style). None could be confirmed to have existed, but redirects are free and harmless — recommend shipping them as a defensive block in `_redirects`, clearly commented as speculative:

| Path | Live | Proposed 301 target | Rationale |
|---|---|---|---|
| `/who-we-are` | 404 | `/` | Parent of known legacy URL #2 — very likely existed |
| `/about` | 404 | `/` | Common about-slug |
| `/about-us` | 404 | `/` | Common about-slug |
| `/contact-us` | 404 | `/contact` | Common WP contact slug |
| `/our-services` | 404 | `/services` | Common WP services slug |
| `/gallery` | 404 | `/portfolio` | Common gallery slug |
| `/projects` | 404 | `/portfolio` | Common projects slug |
| `/reviews` | 404 | `/testimonials` | Common reviews slug |
| `/home` | 404 | `/` | Common WP front-page slug |
| `/services/residential` | 404 | `/services` | Counterpart of /services/commercial |
| `/services/remodeling` | 404 | `/services/home-remodeling` | Naming variant |
| `/blog` | 404 | `/guides/arizona-adu-law` or `/` | If a blog existed; prefer `/` unless GSC shows blog URLs |
| `/faq` | 404 | `/` (homepage FAQ) | Common slug |
| `/financing` | 404 | `/contact` | Only if financing is confirmed ([VERIFY]) |
| `/careers` | 404 | `/contact` | Common slug |

## Counts
- Confirmed legacy 404 URLs needing handling: **2** (one resolved by rebuild, one by 301).
- Defensive candidate redirects proposed: **15**.
- Current parity URLs verified live: **17** (+ sitemap + robots).
- Wayback-confirmed historical captures: homepage only (2 snapshots found via availability API).

## `_redirects` draft (Cloudflare Pages format)

```
# Known legacy (previous site generation)
/who-we-are                              /   301
# /services/commercial — rebuilt at same slug; no rule needed once live

# Defensive legacy candidates (speculative; prune against GSC 404 report at cutover)
/about            /                           301
/about-us         /                           301
/contact-us       /contact                    301
/our-services     /services                   301
/gallery          /portfolio                  301
/projects         /portfolio                  301
/reviews          /testimonials               301
/home             /                           301
/services/residential  /services              301
/services/remodeling   /services/home-remodeling  301
/blog             /                           301
/faq              /                           301
/careers          /contact                    301
```

Note: the current site (schema + copy) names **Steven Martinez** as president — [VERIFY] with owner before naming anyone on the new site. (An earlier 'Anthony Ardizzone' reference was cross-contamination from a different client's audit; disregard.)
