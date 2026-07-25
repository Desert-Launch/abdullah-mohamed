import type { MetadataRoute } from "next";
import { SITE_URL, localePath } from "./lib/site";

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
  ];
}
