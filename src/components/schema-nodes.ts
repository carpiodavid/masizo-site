/**
 * Typed builders for per-page JSON-LD nodes (handoff §5):
 *   Service + BreadcrumbList + FAQPage per service page;
 *   Article + FAQPage on guides.
 *
 * Content agents: build nodes with these helpers and pass them to
 * <Base schema={[...]}> so every node links back to the sitewide
 * Organization node via a stable @id.
 */
import { SITE_URL, type Service } from "../data/business";

/** Stable @id of the sitewide GeneralContractor/Organization node. */
export const ORG_ID = `${SITE_URL}/#organization`;
/** Stable @id of the sitewide WebSite node. */
export const WEBSITE_ID = `${SITE_URL}/#website`;

export interface Crumb {
  name: string;
  /** Absolute path, e.g. "/services/roofing". Omit on the final crumb if it is the current page. */
  path?: string;
}

export interface Faq {
  question: string;
  /** Plain-text (or simple HTML) answer. */
  answerHtml: string;
}

export function serviceNode(service: Service, description?: string): Record<string, unknown> {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}${service.path}#service`,
    name: service.name,
    url: `${SITE_URL}${service.path}`,
    ...(description ? { description } : {}),
    provider: { "@id": ORG_ID },
    areaServed: { "@id": ORG_ID },
  };
}

export function breadcrumbNode(crumbs: Crumb[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      ...(crumb.path ? { item: `${SITE_URL}${crumb.path}` } : {}),
    })),
  };
}

export function faqNode(faqs: Faq[]): Record<string, unknown> {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answerHtml },
    })),
  };
}

export function articleNode(opts: {
  headline: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  description?: string;
}): Record<string, unknown> {
  return {
    "@type": "Article",
    "@id": `${SITE_URL}${opts.path}#article`,
    headline: opts.headline,
    url: `${SITE_URL}${opts.path}`,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    ...(opts.description ? { description: opts.description } : {}),
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
