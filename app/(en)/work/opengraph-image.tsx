import { copy } from "../../data/copy";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../../lib/og";
import { WORK_LANG } from "../../lib/work";

const t = copy[WORK_LANG];

// Required for `output: "export"` — same as robots.ts / sitemap.ts. The
// [slug] variant doesn't need it: generateStaticParams already pins it static.
export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Work — case studies by Abdullah Mohamed";

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: t.work.eyebrow,
    title: t.work.title,
    subtitle: t.work.body,
  });
}
