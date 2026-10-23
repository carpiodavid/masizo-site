// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// Canonical host — one host, everything else 308/301s to it (handoff §5).
// Must match SITE_URL in src/data/business.ts.
export default defineConfig({
  site: "https://www.masizodevelopment.com",
  output: "static",
  trailingSlash: "never",
  // file format emits services/roofing.html so Cloudflare Pages serves
  // /services/roofing directly (no 308 to a trailing-slash URL), matching
  // the no-trailing-slash canonicals.
  build: { format: "file" },
  integrations: [
    sitemap({
      // Keep noindex conversion pages out of the sitemap.
      filter: (page) => !page.includes("/thank-you"),
    }),
  ],
});
