/**
 * Fact-token resolver (assembly agent).
 *
 * The content source files (content/pages/*.md and subfolders) carry business facts as
 * [[TOKENS]] so the facts stay single-sourced in src/data/business.ts
 * (handoff §6.5). This module resolves those tokens AT BUILD TIME — pages
 * never hand-replace a token into a literal.
 *
 * Tokens: [[PHONE]] [[EMAIL]] [[HOURS]] [[LICENSE_GC]] [[LICENSE_RESTORATION]]
 *         [[LICENSE_CA]] [[YEARS]] [[CITIES]]
 *
 * Two modes:
 *   resolveFacts(text)      — plain text (meta descriptions, titles, labels).
 *   resolveFactsHtml(html)  — HTML context: [[PHONE]] becomes a tel: link
 *                             (always via PHONE_TEL, so Base.astro's GA4
 *                             call_click auto-tracking covers it) and
 *                             [[EMAIL]] becomes a mailto: link.
 *
 * Grammar note: the content files use both "[[YEARS]]" (meaning "28 years")
 * and "for [[YEARS]] years" (meaning the bare number). The resolver collapses
 * "[[YEARS]] years" first so every occurrence reads "<n> years" exactly once.
 */
import {
  CITIES,
  EMAIL,
  HOURS_DISPLAY,
  LICENSES,
  OPEN_24_7,
  PHONE_DISPLAY,
  PHONE_TEL,
  YEARS_IN_BUSINESS,
} from "../data/business";

function licenseLabel(scope: "general" | "restoration" | "california"): string {
  const license = LICENSES.find((l) => l.scope === scope);
  if (!license) throw new Error(`facts.ts: no license with scope "${scope}" in business.ts`);
  return license.label;
}

/** "Gilbert, Mesa, …, Fountain Hills, and Paradise Valley" */
export const CITY_LIST: string = (() => {
  const names = CITIES.map((c) => c.name);
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
})();

/** Prose-friendly hours phrase, derived from the business.ts 24/7 flag. */
export const HOURS_PHRASE: string = OPEN_24_7
  ? "24 hours a day, 7 days a week"
  : HOURS_DISPLAY;

export const YEARS_PHRASE = `${YEARS_IN_BUSINESS} years`;

const PLAIN_TOKENS: Record<string, string> = {
  PHONE: PHONE_DISPLAY,
  EMAIL: EMAIL,
  HOURS: HOURS_PHRASE,
  LICENSE_GC: licenseLabel("general"),
  LICENSE_RESTORATION: licenseLabel("restoration"),
  LICENSE_CA: licenseLabel("california"),
  YEARS: YEARS_PHRASE,
  CITIES: CITY_LIST,
};

const HTML_TOKENS: Record<string, string> = {
  ...PLAIN_TOKENS,
  PHONE: `<a href="${PHONE_TEL}">${PHONE_DISPLAY}</a>`,
  EMAIL: `<a href="mailto:${EMAIL}">${EMAIL}</a>`,
};

function resolve(text: string, tokens: Record<string, string>): string {
  // "[[YEARS]] years" -> "[[YEARS]]" (see grammar note above).
  const collapsed = text.replace(/\[\[YEARS\]\]\s+years/g, "[[YEARS]]");
  return collapsed.replace(/\[\[([A-Z_]+)\]\]/g, (match, name: string) => {
    const value = tokens[name];
    if (value === undefined) {
      // Unknown token: fail the build loudly rather than ship "[[X]]" to dist.
      throw new Error(`facts.ts: unknown fact token ${match}`);
    }
    return value;
  });
}

/** Resolve fact tokens in a plain-text context (titles, meta, labels). */
export function resolveFacts(text: string): string {
  return resolve(text, PLAIN_TOKENS);
}

/** Resolve fact tokens in an HTML context (phone/email become links). */
export function resolveFactsHtml(html: string): string {
  return resolve(html, HTML_TOKENS);
}
