import type { Metadata } from "next";
import { copy } from "../data/copy";
import type { CaseStudy, Lang } from "../data/types";
import { buildPageMetadata, localePath } from "./site";

/**
 * The /work index and its detail pages, in both locales.
 *
 * Projects are the dictionary's `caseStudies` — the only on-site work that has
 * a written challenge / role / process / results. The "Selected work" cards are
 * deliberately NOT here: they carry a title, a tagline and a store link and
 * nothing else, so giving them a detail page would mean inventing the content.
 * They appear on the index as an "also shipped" strip that links to the stores.
 *
 * Routing mirrors the home pages: English at `/work/…`, Arabic at
 * `/ar/work/…`, each mounted in its own route group so it gets that locale's
 * root layout. The page bodies are shared components (`WorkIndex`,
 * `WorkDetail`); the route files only pick the locale.
 */

/** Trailing slashes throughout: `trailingSlash: true` in next.config.mjs, so
 *  these are the canonical forms and must not redirect. */
export function workIndexPath(lang: Lang): string {
  return `${localePath[lang]}work/`;
}

export function workPath(slug: string, lang: Lang): string {
  return `${workIndexPath(lang)}${slug}/`;
}

/** Featured projects first; original dictionary order within each group. */
export function workProjects(lang: Lang): CaseStudy[] {
  return [...copy[lang].caseStudies].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)),
  );
}

export function findProject(slug: string, lang: Lang): CaseStudy | undefined {
  return copy[lang].caseStudies.find((study) => study.slug === slug);
}

/** Fills `{title}`, `{type}`, `{summary}`, `{stack}` in a `work.caseMeta`
 *  template from the study. */
export function caseMeta(study: CaseStudy, lang: Lang): {
  title: string;
  description: string;
} {
  const fill = (template: string) =>
    template
      .replaceAll("{title}", study.title)
      .replaceAll("{type}", study.type)
      .replaceAll("{summary}", study.summary)
      .replaceAll("{stack}", study.stack.join(", "));
  const { title, description } = copy[lang].work.caseMeta;
  return { title: fill(title), description: fill(description) };
}

/**
 * Metadata for a /work route.
 *
 * English declares no images so the route's own `opengraph-image.tsx` is the
 * card (a declared list would replace it — see `buildPageMetadata`). Arabic
 * gets the static home cards: the generated card is Latin-only, because
 * satori reverses Arabic word order.
 */
export function buildWorkMetadata(args: {
  lang: Lang;
  title: string;
  description: string;
  /** Locale-independent path suffix: "work/" or "work/<slug>/". */
  subpath: string;
  type?: "website" | "article";
}): Metadata {
  return buildPageMetadata({
    ...args,
    images: args.lang === "en" ? null : undefined,
  });
}
