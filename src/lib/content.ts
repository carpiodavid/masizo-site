/**
 * Content loader (assembly agent).
 *
 * content/pages (every .md under it) is the content source of truth. Pages do NOT copy
 * its text into .astro literals — they load it here at build time, so a copy
 * edit in the .md flows into the built page on the next build.
 *
 * What this module does:
 *   - loads every content .md raw (import.meta.glob)
 *   - parses the YAML frontmatter (the per-page contract: slug, title,
 *     description, intent, schema_service?, breadcrumbs?, faqs?, article?,
 *     internal_links, cta, word_target)
 *   - strips build-note HTML comments (they are notes for agents, not copy)
 *   - splits the body into intro + H2 sections
 *   - extracts standalone [PHOTO: …] lines into per-section photo lists
 *     (pages render them as <PhotoPlaceholder/>)
 *   - renders the markdown subset the content uses (paragraphs, bold, italic,
 *     links, lists, tables, blockquotes, h3/h4, hr) to HTML
 *   - resolves [[FACT]] tokens via src/lib/facts.ts (phone always a tel: link)
 */
import { load as parseYaml } from "js-yaml";
import { resolveFacts, resolveFactsHtml } from "./facts";

const RAW_FILES = import.meta.glob<string>("../../content/pages/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

/* ---------------- frontmatter types (the per-file contract) ------------- */

export interface RawCrumb {
  name: string;
  /** Content files use `path` in some files and `url` in others. */
  path?: string;
  url?: string;
}

export interface RawFaq {
  q: string;
  a: string;
}

export interface PageData {
  slug: string;
  title: string;
  description: string;
  intent?: string;
  schema_service?: { name: string; description: string };
  breadcrumbs?: RawCrumb[];
  faqs?: RawFaq[];
  article?: { headline: string; datePublished: string; dateModified?: string };
  internal_links?: string[];
  cta?: { primary: string; secondary?: string; emergency?: boolean };
  word_target?: number;
}

export interface SectionContent {
  /** Section heading, fact tokens resolved (plain text). */
  title: string;
  /** Rendered body HTML, fact tokens resolved. */
  html: string;
  /** Labels of standalone [PHOTO: …] lines found in this section. */
  photos: string[];
}

export interface FaqItem {
  q: string;
  answerHtml: string;
}

export interface PageContent {
  data: PageData;
  /** Resolved page <title>. */
  title: string;
  /** Resolved meta description. */
  description: string;
  /** The body's `# H1` if present (resolved plain text), else null. */
  h1: string | null;
  introHtml: string;
  introPhotos: string[];
  sections: SectionContent[];
  /** Frontmatter FAQs, resolved — feed BOTH <FAQ items> and faqNode(). */
  faqItems: FaqItem[];
}

/* ---------------- markdown subset renderer ------------------------------ */

function escapeHtml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Inline markdown: links, **bold**, *italic* — over escaped text. */
export function inlineMd(text: string): string {
  let out = escapeHtml(text);
  out = out.replace(
    /\[([^\]]+)\]\(([^()\s]+)\)/g,
    (_m, label: string, href: string) => `<a href="${href}">${label}</a>`
  );
  out = out.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/\*([^*\n]+)\*/g, "<em>$1</em>");
  return out;
}

function renderTable(rows: string[]): string {
  const parseRow = (row: string): string[] =>
    row
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());
  const header = parseRow(rows[0]);
  const bodyRows = rows.slice(1).filter((row) => !/^\|?[\s:|-]+\|?$/.test(row));
  const thead = `<thead><tr>${header.map((c) => `<th scope="col">${inlineMd(c)}</th>`).join("")}</tr></thead>`;
  const tbody = `<tbody>${bodyRows
    .map((row) => `<tr>${parseRow(row).map((c) => `<td>${inlineMd(c)}</td>`).join("")}</tr>`)
    .join("")}</tbody>`;
  return `<div class="table-wrap"><table>${thead}${tbody}</table></div>`;
}

/** Render the markdown subset used by content/pages to HTML (no token pass). */
export function mdToHtml(md: string): string {
  const lines = md.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (trimmed === "") {
      i++;
      continue;
    }
    if (/^---+$/.test(trimmed)) {
      out.push("<hr />");
      i++;
      continue;
    }
    const heading = trimmed.match(/^(#{1,4})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      out.push(`<h${level}>${inlineMd(heading[2])}</h${level}>`);
      i++;
      continue;
    }
    if (trimmed.startsWith(">")) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quote.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      out.push(`<blockquote>${quote.map((q) => `<p>${inlineMd(q)}</p>`).join("")}</blockquote>`);
      continue;
    }
    if (trimmed.startsWith("|")) {
      const rows: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        rows.push(lines[i].trim());
        i++;
      }
      out.push(renderTable(rows));
      continue;
    }
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      out.push(`<ul>${items.map((item) => `<li>${inlineMd(item)}</li>`).join("")}</ul>`);
      continue;
    }
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      out.push(`<ol>${items.map((item) => `<li>${inlineMd(item)}</li>`).join("")}</ol>`);
      continue;
    }
    // Paragraph: gather until a blank line or the start of another block.
    const para: string[] = [trimmed];
    i++;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (next === "" || /^(#{1,4}\s|[-*]\s|\d+\.\s|>|\|)/.test(next) || /^---+$/.test(next)) break;
      para.push(next);
      i++;
    }
    out.push(`<p>${inlineMd(para.join(" "))}</p>`);
  }
  return out.join("\n");
}

/* ---------------- page loading ------------------------------------------ */

const PHOTO_LINE = /^\[PHOTO:\s*([^\]]+)\]$/;

function extractPhotos(md: string): { md: string; photos: string[] } {
  const photos: string[] = [];
  const kept = md
    .split("\n")
    .filter((line) => {
      const match = line.trim().match(PHOTO_LINE);
      if (match) {
        photos.push(match[1].trim());
        return false;
      }
      return true;
    })
    .join("\n");
  return { md: kept, photos };
}

/** Load + parse one content page by its path under content/pages/. */
export function loadPage(relPath: string): PageContent {
  const key = `../../content/pages/${relPath}`;
  const raw = RAW_FILES[key];
  if (raw === undefined) {
    throw new Error(
      `content.ts: no content file "${relPath}" under content/pages/ (known: ${Object.keys(RAW_FILES).join(", ")})`
    );
  }

  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  if (!fmMatch) throw new Error(`content.ts: ${relPath} has no frontmatter block`);
  const data = parseYaml(fmMatch[1]) as PageData;

  let body = raw.slice(fmMatch[0].length);
  // Build-note comments are instructions for agents, never page copy.
  body = body.replace(/<!--[\s\S]*?-->/g, "");

  // Pull the body H1 (when present) out so pages can place it in the Hero.
  let h1: string | null = null;
  body = body.replace(/^#\s+(.+)$/m, (_m, text: string) => {
    h1 = resolveFacts(text.trim());
    return "";
  });

  // Split on H2s.
  const parts = body.split(/^##\s+/m);
  const introRaw = parts[0];
  const { md: introMd, photos: introPhotos } = extractPhotos(introRaw);

  const sections: SectionContent[] = parts.slice(1).map((part) => {
    const newline = part.indexOf("\n");
    const titleLine = newline === -1 ? part : part.slice(0, newline);
    const rest = newline === -1 ? "" : part.slice(newline + 1);
    const { md, photos } = extractPhotos(rest);
    return {
      title: resolveFacts(titleLine.trim()),
      html: resolveFactsHtml(mdToHtml(md)),
      photos,
    };
  });

  const faqItems: FaqItem[] = (data.faqs ?? []).map((faq) => ({
    q: resolveFacts(faq.q),
    answerHtml: resolveFactsHtml(`<p>${inlineMd(faq.a)}</p>`),
  }));

  return {
    data,
    title: resolveFacts(data.title),
    description: resolveFacts(data.description),
    h1,
    introHtml: resolveFactsHtml(mdToHtml(introMd)),
    introPhotos,
    sections,
    faqItems,
  };
}

/* ---------------- breadcrumb helpers ------------------------------------ */

/** Crumbs for breadcrumbNode(): [{name, path?}], current page without path. */
export function crumbsForSchema(raw: RawCrumb[] | undefined): { name: string; path?: string }[] {
  if (!raw) return [];
  return raw.map((crumb, i) => {
    const path = crumb.path ?? crumb.url;
    const isLast = i === raw.length - 1;
    return isLast ? { name: crumb.name } : { name: crumb.name, path };
  });
}

/** Crumbs for the <Breadcrumbs items> prop: [{label, href?}]. */
export function crumbsForNav(raw: RawCrumb[] | undefined): { label: string; href?: string }[] {
  if (!raw) return [];
  return raw.map((crumb, i) => {
    const href = crumb.path ?? crumb.url;
    const isLast = i === raw.length - 1;
    return isLast ? { label: crumb.name } : { label: crumb.name, href };
  });
}

/** Simple id slug for section anchors. */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
