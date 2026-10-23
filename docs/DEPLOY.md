# Deploy status — Cloudflare Pages

**Setup complete via dashboard git integration (2026-10-23).**

- Pages project: masizo-site → https://masizo-site.pages.dev (production branch: main, auto-deploy on push)
- Build: `npm run build`, output `dist`, build system v3
- KV binding: LEADS → masizo-leads namespace (set in dashboard Settings → Bindings)
- wrangler.toml is intentionally DELETED: when present with Pages config it overrides dashboard bindings (this silently dropped the LEADS KV binding on an earlier deploy). All config lives in the dashboard: build settings, the LEADS KV binding, and env vars. Before enabling lead emails set dashboard env vars LEAD_EMAIL_TO=office@masizodevelopment.com, LEAD_EMAIL_FROM=<address on a Resend-verified domain>, and secret RESEND_API_KEY. For local dev: npx wrangler pages dev dist --kv LEADS
- Dormant until keys are set in dashboard env: RESEND_API_KEY (lead email notifications — leads still stored in KV without it), PUBLIC_GA4_ID (analytics)
- Smoke-test results: see the latest entry in this file's history / session log after each deploy
