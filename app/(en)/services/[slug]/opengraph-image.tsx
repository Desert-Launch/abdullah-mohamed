import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../../../lib/og";
import { findService, planFor, servicePages } from "../../../lib/services";

const lang = "en" as const;

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "A service by Abdullah Mohamed, with its starting price";

/** One card per service — same slug set as the page. */
export function generateStaticParams() {
  return servicePages(lang).map((page) => ({ slug: page.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findService(slug, lang);
  const plan = page ? planFor(page.slug, lang) : undefined;
  // Unreachable via generateStaticParams; a blank-safe fallback keeps it total.
  return renderOgImage({
    eyebrow: plan ? `${page?.eyebrow} · ${plan.price}` : (page?.eyebrow ?? "Services"),
    title: page?.title ?? "Services",
    subtitle: page?.meta.description ?? "",
  });
}
