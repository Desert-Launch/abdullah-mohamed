import type { MetadataRoute } from "next";
import { SITE_URL, localePath } from "./lib/site";
import { WORK_INDEX_PATH, workPath, workProjects } from "./lib/work";

// Required for `output: "export"` — emit sitemap.xml at build time.
export const dynamic = "force-static";

const EN = `${SITE_URL}${localePath.en}`;
const AR = `${SITE_URL}${localePath.ar}`;

// Both locales are listed, each declaring the full alternate set, so search
// engines see the pair rather than treating the Arabic page as a duplicate.
// Paths end in "/" to match `trailingSlash: true` — a <loc> must not redirect.
const languages = { en: EN, ar: AR, "x-default": EN };

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: EN, changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: AR, changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
    // The /work pages are English-only, so they declare no alternates — an
    // hreflang cluster here would point crawlers at /ar/work, which does not
    // exist yet. Add them here when the Arabic mirror ships.
    { url: `${SITE_URL}${WORK_INDEX_PATH}`, changeFrequency: "monthly", priority: 0.8 },
    ...workProjects().map((study) => ({
      url: `${SITE_URL}${workPath(study.slug)}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
