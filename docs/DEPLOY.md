# Deploy status — Cloudflare Pages

**Setup complete via dashboard git integration (2026-10-23).**

- Pages project: masizo-site → https://masizo-site.pages.dev (production branch: main, auto-deploy on push)
- Build: `npm run build`, output `dist`, build system v3
- KV binding: LEADS → masizo-leads namespace (set in dashboard Settings → Bindings)
- Earlier failed deployment: caused by a placeholder KV namespace id in wrangler.toml (removed; dashboard binding is authoritative)
- Dormant until keys are set in dashboard env: RESEND_API_KEY (lead email notifications — leads still stored in KV without it), PUBLIC_GA4_ID (analytics)
- Smoke-test results: see the latest entry in this file's history / session log after each deploy
