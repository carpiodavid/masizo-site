# Deploy status — Cloudflare Pages

**Status: NOT DEPLOYED — blocked on missing environment secrets.**

Date: 2026-10-23 (automated deploy run)

## What happened

The automated deploy run checked the session environment before doing anything
else, and both required Cloudflare secrets are **MISSING**:

- `CLOUDFLARE_API_TOKEN` — missing
- `CLOUDFLARE_ACCOUNT_ID` — missing

Per the deploy runbook, the run stopped here. No KV namespace was created, no
Pages project was created, nothing was deployed, and `wrangler.toml` still
carries the `REPLACE_WITH_LEADS_KV_NAMESPACE_ID` placeholder.

## How to unblock

Add both values to the cloud environment's settings (cloud environment menu in
the session title bar → Edit → Network secrets / environment variables), using
exactly these variable names:

- `CLOUDFLARE_API_TOKEN` — an API token from the **Masizo-owned** Cloudflare
  account with permissions: Cloudflare Pages (Edit) + Workers KV Storage (Edit)
- `CLOUDFLARE_ACCOUNT_ID` — that account's ID (Cloudflare dashboard → right
  sidebar on the account home)

A new session picks them up automatically; then re-run the deploy task. The
remaining steps (build → KV namespace → Pages project → deploy → bind KV →
live smoke tests → update this file) are unchanged.

## Expected caveats for the eventual deploy (unchanged)

- `RESEND_API_KEY` not set → lead email notifications dormant; leads still
  land in KV (KV-first design). Set it in the Pages dashboard, never in git.
- `PUBLIC_GA4_ID` not set → analytics dormant by design until the Masizo GA4
  property exists.
- No custom domain until the DNS gate (handoff §7) clears; staging serves at
  `masizo-site.pages.dev` once deployed.
