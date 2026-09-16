import { copy } from "../../data/copy";
import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../../lib/og";

const t = copy.en;

// Required for `output: "export"` — same as robots.ts / sitemap.ts.
export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Services — what Abdullah Mohamed builds, with starting prices";

// English only: satori reverses Arabic word order, so /ar/services declares
// the static home cards instead (see buildServiceMetadata).
export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: t.servicePages.eyebrow,
    title: t.servicePages.title,
    subtitle: t.servicePages.body,
  });
}
