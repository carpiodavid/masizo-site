/// <reference types="astro/client" />

interface ImportMetaEnv {
  /**
   * GA4 measurement ID (e.g. "G-XXXXXXXXXX"). Set in Cloudflare Pages env
   * vars / .env. When unset, Base.astro renders NO analytics markup at all.
   */
  readonly PUBLIC_GA4_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/**
 * Lightweight event helper installed by Base.astro on every page.
 * Safe to call whether or not GA4 is configured (no-op without gtag).
 * Known events (handoff §5 tracking spec): "call_click" (fired automatically
 * for every tel: link click), "lead_submit" (fire from the lead form).
 */
interface Window {
  masizoTrack: (eventName: string, params?: Record<string, unknown>) => void;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
}
