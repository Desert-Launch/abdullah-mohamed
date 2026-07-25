import { copy } from "../data/copy";
import { siteDomain, stackTags } from "../data/shared";
import { OG_CONTENT_TYPE, OG_SIZE, renderSiteOgImage } from "../lib/og";

const t = copy.en;

// Required for `output: "export"` — same as robots.ts / sitemap.ts.
export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = `${t.hero.title} ${t.hero.titleAccent} — Abdullah Mohamed, Senior Software Engineer`;

export default function OpengraphImage() {
  return renderSiteOgImage({
    eyebrow: t.meta.cardEyebrow,
    title: t.hero.title,
    titleAccent: t.hero.titleAccent,
    subtitle: t.meta.social,
    name: "Abdullah Mohamed",
    domain: siteDomain,
    tags: stackTags,
  });
}
