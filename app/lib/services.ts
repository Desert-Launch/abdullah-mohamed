import type { Metadata } from "next";
import { copy } from "../data/copy";
import type { CaseStudy, Lang, Plan, ServicePage } from "../data/types";
import { buildPageMetadata, localePath } from "./site";

/**
 * The /services index and its landing pages, in both locales.
 *
 * One page per pricing card (`Plan`), joined by `slug`. The page copy is the
 * dictionary's `servicePages.pages`; the price is read from the matching plan
 * so the card, the landing page, and the Offer structured data can never quote
 * three different numbers.
 *
 * Routing mirrors `/work`: English at `/services/…`, Arabic at
 * `/ar/services/…`, with shared page bodies (`ServicesIndex`,
 * `ServiceDetail`).
 */

/** Trailing slashes throughout: `trailingSlash: true` in next.config.mjs, so
 *  these are the canonical forms and must not redirect. */
export function servicesIndexPath(lang: Lang): string {
  return `${localePath[lang]}services/`;
}

export function servicePath(slug: string, lang: Lang): string {
  return `${servicesIndexPath(lang)}${slug}/`;
}

/** In pricing-card order — the index reads like the homepage's plans grid. */
export function servicePages(lang: Lang): ServicePage[] {
  const t = copy[lang];
  const bySlug = new Map(t.servicePages.pages.map((page) => [page.slug, page]));
  return t.plans
    .map((plan) => bySlug.get(plan.slug))
    .filter((page): page is ServicePage => page !== undefined);
}

export function findService(slug: string, lang: Lang): ServicePage | undefined {
  return copy[lang].servicePages.pages.find((page) => page.slug === slug);
}

/** The pricing card behind a service page. */
export function planFor(slug: string, lang: Lang): Plan | undefined {
  return copy[lang].plans.find((plan) => plan.slug === slug);
}

/** The case studies a service page cites as proof, in the order the page
 *  lists them. Unknown slugs are dropped — never a broken link. */
export function proofFor(page: ServicePage, lang: Lang): CaseStudy[] {
  const studies = copy[lang].caseStudies;
  return page.proof
    .map((slug) => studies.find((study) => study.slug === slug))
    .filter((study): study is CaseStudy => study !== undefined);
}

/** The reverse of `proofFor`: the services that cite a case study as proof,
 *  so a case-study page can link to what it sells. */
export function servicesCiting(studySlug: string, lang: Lang): ServicePage[] {
  return servicePages(lang).filter((page) => page.proof.includes(studySlug));
}

/**
 * Metadata for a /services route. English declares no images so the route's
 * own `opengraph-image.tsx` is the card; Arabic gets the static home cards
 * (satori can't set Arabic — see `buildWorkMetadata`).
 */
export function buildServiceMetadata(args: {
  lang: Lang;
  title: string;
  description: string;
  /** Locale-independent path suffix: "services/" or "services/<slug>/". */
  subpath: string;
}): Metadata {
  return buildPageMetadata({
    ...args,
    images: args.lang === "en" ? null : undefined,
  });
}
