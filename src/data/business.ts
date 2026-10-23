/**
 * THE single source of truth for every business fact on this site.
 *
 * Rule (handoff §6.5): pages and components IMPORT from this file and never
 * restate or hardcode a business fact. If a fact changes, it changes here once.
 *
 * Every value below was taken verbatim from docs/REBUILD-HANDOFF.md §2
 * ("Verified factbase"). Items the handoff flags as unconfirmed carry a
 * [VERIFY] source comment — they must not ship in prod copy as hard claims
 * until the owner confirms (handoff §6.2, §7).
 */

/** Canonical origin — one host; must match `site` in astro.config.mjs. */
export const SITE_URL = "https://www.masizodevelopment.com";

export interface License {
  /** Display label, exactly as shown on the current live site. */
  label: string;
  /** Bare license number. */
  number: string;
  /** Issuing body (used for schema.org hasCredential.recognizedBy). */
  issuer: string;
  /** What the license covers. */
  scope: "general" | "restoration" | "california";
}

export interface City {
  name: string;
  /** URL slug under /service-areas/. */
  slug: string;
  /**
   * The no-photo-no-page gate (handoff §5, §6.3): a city page is built ONLY
   * when this is true, i.e. only once a real, completed-job photo from that
   * city exists. All false until the owner delivers the photo library.
   */
  hasPhoto: boolean;
}

export interface Service {
  name: string;
  /** URL slug under /services/ — MUST match the live site slugs (handoff §3). */
  slug: string;
  /** Absolute path on this site. */
  path: string;
  /** True for the 24/7 restoration emergency path (handoff §5). */
  emergency: boolean;
}

export interface SocialProfile {
  name: "Facebook" | "Instagram" | "Yelp" | "Google Business Profile";
  url: string;
}

/** Entity + trade name — source: live site footer (handoff §2, observed). */
export const LEGAL_NAME = "Masizo Development LLC";
export const TRADE_NAME = "Masizo Development & Restorations";
/** Short display name used in title patterns on the live site. */
export const DISPLAY_NAME = "Masizo Development";

/** Phone — source: handoff §2, observed on live site. */
export const PHONE_DISPLAY = "(602) 909-7630";
/** E.164 for schema.org + tel: links. */
export const PHONE_E164 = "+16029097630";
/** Use in <a href={PHONE_TEL}> — call clicks are auto-tracked by Base.astro. */
export const PHONE_TEL = `tel:${PHONE_E164}`;
// [VERIFY] (handoff §5.3, §7): whether (602) 909-7630 itself answers 24/7 or a
// separate emergency line exists is unconfirmed. Emergency-CTA copy that
// promises a live 24/7 answer on this number is blocked until the owner
// confirms.

/** Email — source: handoff §2, observed. */
export const EMAIL = "office@masizodevelopment.com";

/**
 * Hours — source: handoff §2, observed on live site: "Open 24 hours,
 * 7 days a week". Schema.astro renders this as a 00:00–23:59 all-week
 * openingHoursSpecification.
 */
export const HOURS_DISPLAY = "Open 24 hours, 7 days a week";
export const OPEN_24_7 = true;

/**
 * Licenses — source: handoff §2.
 * [VERIFY]: "claimed on site — owner to re-confirm current status" (ROC
 * lookup pending, handoff §7). Shown as on the current site until confirmed.
 */
export const LICENSES: readonly License[] = [
  {
    label: "AZ ROC #336058",
    number: "336058",
    issuer: "Arizona Registrar of Contractors",
    scope: "general",
  },
  {
    label: "AZ ROC #347030",
    number: "347030",
    issuer: "Arizona Registrar of Contractors",
    scope: "restoration",
  },
  {
    label: "CA LIC #1107781",
    number: "1107781",
    issuer: "California Contractors State License Board",
    scope: "california",
  },
] as const;

/**
 * Certifications / trust marks — source: handoff §2.
 * [VERIFY]: handoff marks these "claimed/reported" — IICRC certified; insured;
 * BBB A+ accredited. Keep out of hard prod claims until owner confirms.
 */
export const CERTIFICATIONS = ["IICRC certified", "Insured", "BBB A+ accredited"] as const;

/**
 * Experience — source: handoff §2: "28 years, in Arizona since 1998".
 * [VERIFY]: "claimed — consistent across site". Prefer computing years from
 * SINCE_YEAR so the claim never goes stale.
 */
export const SINCE_YEAR = 1998;
export const YEARS_IN_BUSINESS = new Date().getFullYear() - SINCE_YEAR;

/**
 * Address — the site states ONE canonical identity (handoff §2 note on
 * identity fragmentation): LLC entity, Gilbert AZ, the phone/email above.
 * [VERIFY]: no confirmed street address — directories variously list
 * 4174 E Sandy Way, Gilbert 85297 / Fountain Hills 85268 / Garden Grove CA.
 * Do NOT publish a street address until the owner confirms one; schema uses
 * locality + region only.
 */
export const ADDRESS = {
  locality: "Gilbert",
  region: "AZ",
  country: "US",
} as const;

/**
 * Service-area cities — source: handoff §2, observed (site footer /
 * service-areas). Order preserved from the handoff.
 * hasPhoto: false everywhere until the owner delivers real completed-job
 * photos (handoff §7 — photo library not yet delivered).
 */
export const CITIES: readonly City[] = [
  { name: "Gilbert", slug: "gilbert", hasPhoto: false },
  { name: "Mesa", slug: "mesa", hasPhoto: false },
  { name: "Chandler", slug: "chandler", hasPhoto: false },
  { name: "Queen Creek", slug: "queen-creek", hasPhoto: false },
  { name: "San Tan Valley", slug: "san-tan-valley", hasPhoto: false },
  { name: "Tempe", slug: "tempe", hasPhoto: false },
  { name: "Scottsdale", slug: "scottsdale", hasPhoto: false },
  { name: "Phoenix", slug: "phoenix", hasPhoto: false },
  { name: "Fountain Hills", slug: "fountain-hills", hasPhoto: false },
  { name: "Paradise Valley", slug: "paradise-valley", hasPhoto: false },
] as const;

/**
 * Services — source: handoff §2 (services list) with slugs matching the live
 * site exactly (handoff §3 — identical slugs = near-zero redirect loss at
 * cutover). `commercial` is the rebuilt legacy page (handoff §5): it existed,
 * is still indexed, and 404s today.
 */
export const SERVICES: readonly Service[] = [
  { name: "Custom Homes", slug: "custom-homes", path: "/services/custom-homes", emergency: false },
  { name: "Full Home Remodeling", slug: "home-remodeling", path: "/services/home-remodeling", emergency: false },
  { name: "Kitchen Remodeling", slug: "kitchen-remodeling", path: "/services/kitchen-remodeling", emergency: false },
  { name: "Bathroom Remodeling", slug: "bathroom-remodeling", path: "/services/bathroom-remodeling", emergency: false },
  { name: "Room Additions", slug: "room-additions", path: "/services/room-additions", emergency: false },
  { name: "ADUs & Casitas", slug: "adu-construction", path: "/services/adu-construction", emergency: false },
  { name: "Roofing", slug: "roofing", path: "/services/roofing", emergency: false },
  { name: "24/7 Water, Mold & Fire Restoration", slug: "restoration", path: "/services/restoration", emergency: true },
  { name: "Commercial", slug: "commercial", path: "/services/commercial", emergency: false },
] as const;

/**
 * Google Business Profile — source: handoff §2, observed: Google Maps
 * cid 1086874099717890420 (embedded on the live contact page).
 */
export const GBP_CID = "1086874099717890420";
export const GBP_MAPS_URL = `https://maps.google.com/?cid=${GBP_CID}`;

/** Social profiles — source: handoff §2, observed. */
export const SOCIAL_PROFILES: readonly SocialProfile[] = [
  { name: "Facebook", url: "https://www.facebook.com/Masizodevelopment" },
  { name: "Instagram", url: "https://www.instagram.com/masizo_development" },
  {
    name: "Yelp",
    url: "https://www.yelp.com/biz/masizo-development-and-restorations-fountain-hills-2",
  },
  { name: "Google Business Profile", url: GBP_MAPS_URL },
] as const;

/** sameAs array for JSON-LD (GBP + socials, handoff §5). */
export const SAME_AS: readonly string[] = SOCIAL_PROFILES.map((p) => p.url);

/**
 * SMS program note (handoff §2, observed): Masizo runs an SMS program
 * (opt-out STOP, 18+, disclosed in their terms). The lead form MUST carry the
 * same SMS-consent disclosure pattern — see functions/api/lead.ts comment.
 */
export const SMS_PROGRAM_EXISTS = true;

/** Convenience aggregate for components that want one import. */
export const business = {
  siteUrl: SITE_URL,
  legalName: LEGAL_NAME,
  tradeName: TRADE_NAME,
  displayName: DISPLAY_NAME,
  phoneDisplay: PHONE_DISPLAY,
  phoneE164: PHONE_E164,
  phoneTel: PHONE_TEL,
  email: EMAIL,
  hoursDisplay: HOURS_DISPLAY,
  open247: OPEN_24_7,
  licenses: LICENSES,
  certifications: CERTIFICATIONS,
  sinceYear: SINCE_YEAR,
  yearsInBusiness: YEARS_IN_BUSINESS,
  address: ADDRESS,
  cities: CITIES,
  services: SERVICES,
  gbpCid: GBP_CID,
  gbpMapsUrl: GBP_MAPS_URL,
  socialProfiles: SOCIAL_PROFILES,
  sameAs: SAME_AS,
} as const;

export default business;
