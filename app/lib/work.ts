import type { Metadata } from "next";
import { copy } from "../data/copy";
import type { CaseStudy, Lang } from "../data/types";
import { SITE_URL } from "./site";

/**
 * The /work index and its detail pages.
 *
 * Projects are the dictionary's `caseStudies` — the only on-site work that has
 * a written challenge / role / process / results. The "Selected work" cards are
 * deliberately NOT here: they carry a title, a tagline and a store link and
 * nothing else, so giving them a detail page would mean inventing the content.
 * They appear on the index as an "also shipped" strip that links to the stores.
 *
 * English only for now. `/ar/work` is deferred — the copy exists in both
 * dictionaries, but the routes below are mounted inside the (en) route group.
 *
 * TODO(abdullah): decide whether to mirror these at /ar/work. It needs an (ar)
 * route group copy of both pages, hreflang restored in buildWorkMetadata and
 * sitemap.ts, and the homepage links in CaseStudies/SelectedWork ungated.
 */
export const WORK_LANG: Lang = "en";

/** Trailing slashes throughout: `trailingSlash: true` in next.config.mjs, so
 *  these are the canonical forms and must not redirect. */
export const WORK_INDEX_PATH = "/work/";

export function workPath(slug: string): string {
  return `/work/${slug}/`;
}

/** Featured projects first; original dictionary order within each group. */
export function workProjects(lang: Lang = WORK_LANG): CaseStudy[] {
  return [...copy[lang].caseStudies].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
}

export function findProject(slug: string, lang: Lang = WORK_LANG): CaseStudy | undefined {
  return copy[lang].caseStudies.find((study) => study.slug === slug);
}

/**
 * Metadata for a /work route.
 *
 * Next merges metadata shallowly, so `openGraph` and `alternates` here replace
 * the locale layout's versions wholesale rather than extending them — every
 * field a page needs must be declared. Deliberately omitted:
 * - `alternates.languages`: these pages have no Arabic counterpart yet, so
 *   claiming an hreflang cluster would point crawlers at a URL that 404s.
 * - `openGraph.images`: og:image comes from the route's `opengraph-image.tsx`
 *   via the file convention, which wins over anything declared here.
 */
export function buildWorkMetadata({
  title,
  description,
  path,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: `${SITE_URL}${path}`,
      siteName: "Abdullah Mohamed",
      title,
      description,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
  };
}
