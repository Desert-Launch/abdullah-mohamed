import { OG_CONTENT_TYPE, OG_SIZE, renderOgImage } from "../../../lib/og";
import { findProject, workProjects } from "../../../lib/work";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case study card";

/** One image per slug, generated at build time — `output: "export"` has no
 *  server to render these on request. */
export function generateStaticParams() {
  return workProjects().map((study) => ({ slug: study.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = findProject(slug);
  return renderOgImage({
    eyebrow: study?.type ?? "Case study",
    title: study?.title ?? "Work",
    subtitle: study?.summary ?? "",
  });
}
