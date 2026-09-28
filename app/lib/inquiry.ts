import type { Metadata } from "next";
import { copy } from "../data/copy";
import type { Lang } from "../data/types";
import { buildPageMetadata, localePath } from "./site";

/**
 * The `/start-a-project/` route, in both locales.
 *
 * The page every "Tell me what you're building" CTA leads to: a short brief a
 * non-technical visitor can fill in (what, where they are now, web or
 * mobile, when, budget). There is no backend and no third-party form service
 * — the brief is composed into an email or a WhatsApp message the visitor
 * sends from their own app, so nothing is stored here, there is no spam
 * endpoint to abuse, and the CSP needs no new origin. See `InquiryForm.tsx`.
 */

/** Trailing slash: `trailingSlash: true` in next.config.mjs, so this is the
 *  canonical form and must not redirect. `service` pre-fills which page the
 *  visitor came from, so the brief says "About: MVP development". */
export function inquiryPath(lang: Lang, service?: string): string {
  const path = `${localePath[lang]}start-a-project/`;
  return service ? `${path}?service=${encodeURIComponent(service)}` : path;
}

/** Both locales keep the static home share cards — no generated card for
 *  this segment, and satori can't set Arabic anyway. */
export function buildInquiryMetadata(lang: Lang): Metadata {
  const t = copy[lang];
  return buildPageMetadata({
    lang,
    title: t.inquiry.meta.title,
    description: t.inquiry.meta.description,
    subpath: "start-a-project/",
  });
}
