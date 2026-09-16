import type { Metadata } from "next";
import { copy } from "../data/copy";
import type { Lang } from "../data/types";
import { buildPageMetadata, localePath } from "./site";

/**
 * The `/cv/` route, in both locales (`/cv/`, `/ar/cv/`).
 *
 * The HTML résumé: the one page a recruiter looks for that the site did not
 * have. It exists for three jobs the PDF cannot do — rank for "Abdullah
 * Mohamed CV / resume", be read by an assistant, and be copied into an ATS
 * form — so the PDF stays linked from it rather than replaced by it.
 *
 * The employment history is not stored twice: the page renders
 * `Dictionary.experiences`, the same array the homepage timeline uses.
 */

/** Trailing slash: `trailingSlash: true` in next.config.mjs, so this is the
 *  canonical form and must not redirect. */
export function cvPath(lang: Lang): string {
  return `${localePath[lang]}cv/`;
}

/**
 * Metadata for `/cv/`. Both locales keep the static home share cards: there
 * is no generated card for this segment, and satori can't set Arabic anyway
 * (see `buildWorkMetadata`).
 */
export function buildCvMetadata(lang: Lang): Metadata {
  const t = copy[lang];
  return buildPageMetadata({
    lang,
    title: t.cv.meta.title,
    description: t.cv.meta.description,
    subpath: "cv/",
  });
}
