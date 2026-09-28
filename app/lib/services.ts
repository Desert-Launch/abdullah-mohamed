import type { Metadata } from "next";
import { copy } from "../data/copy";
import type { CaseStudy, Lang, Plan, ServicePage } from "../data/types";
import { buildPageMetadata, localePath } from "./site";

/**
 * The /services index and its landing pages, in both locales.
 *
 * One page per visitor situation (`servicePages.pages`, in dictionary order).
 * Prices are never typed into a page: each page quotes the `plans` it is
 * priced as — its own by default, several for a service that becomes one of
 * them (an MVP is a web or a mobile build), none for work that is scoped per
 * project — so the homepage rows, the landing page, the social card and the
 * Offer structured data can never quote different numbers.
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

/** In dictionary order — the order a visitor's situation usually progresses
 *  (idea → platform → system → improving what exists). The homepage rows,
 *  the index, the sitemap and the Markdown twins all read this list. */
export function servicePages(lang: Lang): ServicePage[] {
  return copy[lang].servicePages.pages;
}

export function findService(slug: string, lang: Lang): ServicePage | undefined {
  return copy[lang].servicePages.pages.find((page) => page.slug === slug);
}

/** A pricing card by slug. */
export function planFor(slug: string, lang: Lang): Plan | undefined {
  return copy[lang].plans.find((plan) => plan.slug === slug);
}

/** The plans a service page is priced as, cheapest first. */
export function plansFor(page: ServicePage, lang: Lang): Plan[] {
  return (page.pricing ?? [page.slug])
    .map((slug) => planFor(slug, lang))
    .filter((plan): plan is Plan => plan !== undefined)
    .sort((a, b) => a.minPrice - b.minPrice);
}

export interface ServicePrice {
  /** The headline figure: the plan's price, the cheapest of several, or the
   *  "priced per project" label. */
  price: string;
  /** The small print under it. */
  note: string;
  /** The plans behind the figure, cheapest first. Empty when scoped. */
  plans: Plan[];
  /** Lowest starting price in USD — the Offer's `minPrice`. Absent when the
   *  service publishes no starting price. */
  minPrice?: number;
}

/** What a service costs, as every surface shows it. */
export function servicePrice(page: ServicePage, lang: Lang): ServicePrice {
  const t = copy[lang].servicePages;
  const plans = plansFor(page, lang);
  if (plans.length === 0) {
    return { price: t.scopedPrice, note: t.scopedNote, plans };
  }
  const [cheapest] = plans;
  const note =
    plans.length === 1
      ? cheapest.priceNote
      : plans
          .map((plan) => t.priceFrom.replace("{plan}", plan.name).replace("{price}", plan.price))
          .join(" · ");
  return { price: cheapest.price, note, plans, minPrice: cheapest.minPrice };
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

/** The lowest and highest published starting prices, as display strings —
 *  the inquiry page's budget hint quotes them so it can't drift from `plans`. */
export function priceRange(lang: Lang): { min: string; max: string } {
  const plans = [...copy[lang].plans].sort((a, b) => a.minPrice - b.minPrice);
  const bare = (plan: Plan) => `$${plan.minPrice.toLocaleString("en-US")}`;
  return { min: bare(plans[0]), max: bare(plans[plans.length - 1]) };
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
