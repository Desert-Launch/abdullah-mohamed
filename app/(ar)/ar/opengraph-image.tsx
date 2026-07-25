import { copy } from "../../data/copy";
import { siteDomain, stackTags } from "../../data/shared";
import { OG_CONTENT_TYPE, OG_SIZE, renderSiteOgImage } from "../../lib/og";

// Sits beside the Arabic page rather than at the (ar) group root: the group
// root is where /ar's root layout lives, and a metadata image there is not
// picked up by the page one segment down.
//
// The card is deliberately the English one. satori reverses the word order of
// Arabic text runs, so a generated Arabic card comes out scrambled — worse
// than no card. /ar's og:title and og:description are still Arabic, so the
// preview reads in Arabic with a branded image beside it.
//
// TODO(abdullah): if you want a true Arabic card, it has to be a hand-made PNG
// dropped in as app/(ar)/ar/opengraph-image.png (the file convention picks it
// up and this file goes away).
const t = copy.en;

export const dynamic = "force-static";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "عبدالله محمد — مهندس برمجيات أول";

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
