import type { MetadataRoute } from "next";
import type { Lang } from "./data/types";
import { BUILD_DATE } from "./lib/jsonld";
import { SITE_URL, localePath } from "./lib/site";
import { servicePages } from "./lib/services";
import { workProjects } from "./lib/work";

// Required for `output: "export"` — emit sitemap.xml at build time.
export const dynamic = "force-static";

const LANGS: Lang[] = ["en", "ar"];

/** Absolute URL of a locale-independent subpath ("" for the home page,
 *  "work/faheem/" for a case study) under one locale root. Paths end in "/"
 *  to match `trailingSlash: true` — a <loc> must not redirect. */
const url = (lang: Lang, subpath: string) => `${SITE_URL}${localePath[lang]}${subpath}`;

/** Both locales are listed for every page, each declaring the full alternate
 *  set, so search engines see the pair rather than treating the Arabic page
 *  as a duplicate. x-default is English, the locale served from the bare root. */
function pair(
  subpath: string,
  priority: number,
): MetadataRoute.Sitemap {
  const languages = { en: url("en", subpath), ar: url("ar", subpath), "x-default": url("en", subpath) };
  return LANGS.map((lang) => ({
    url: url(lang, subpath),
    // Google ignores changeFrequency/priority and uses lastmod to schedule
    // recrawls; without it every page looks equally stale. The build date is
    // the honest value for a static export (see BUILD_DATE).
    lastModified: BUILD_DATE,
    changeFrequency: "monthly" as const,
    // Arabic a notch under English: same content, secondary market.
    priority: lang === "en" ? priority : Math.max(0.1, priority - 0.1),
    alternates: { languages },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  // Services outrank work: they are the pages written for a buyer's search
  // ("hire a Flutter developer"), where the case studies are the proof behind
  // them. Slugs are shared across locales, so English's list is the list.
  return [
    ...pair("", 1),
    ...pair("services/", 0.9),
    ...servicePages("en").flatMap((page) => pair(`services/${page.slug}/`, 0.8)),
    ...pair("work/", 0.8),
    ...workProjects("en").flatMap((study) => pair(`work/${study.slug}/`, 0.7)),
    // The résumé: the target for "Abdullah Mohamed CV / resume" and the page
    // a recruiter looks for first.
    ...pair("cv/", 0.8),
    // The brief: every service page's CTA leads here, and its Markdown twin
    // tells an agent what a first message should contain.
    ...pair("start-a-project/", 0.7),
  ];
}
