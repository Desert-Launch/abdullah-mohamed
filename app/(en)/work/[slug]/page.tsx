import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkDetail } from "../../../components/pages/WorkDetail";
import { buildWorkMetadata, caseMeta, findProject, workProjects } from "../../../lib/work";

const lang = "en" as const;

/** Every slug is known at build time — required by `output: "export"`. */
export function generateStaticParams() {
  return workProjects(lang).map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = findProject(slug, lang);
  if (!study) return {};
  // Title and description come from the dictionary's templates so the SERP
  // snippet says "case study" and names the stack, not just the tagline.
  return buildWorkMetadata({
    lang,
    ...caseMeta(study, lang),
    subpath: `work/${study.slug}/`,
    type: "article",
  });
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = findProject(slug, lang);
  if (!study) notFound();
  return <WorkDetail study={study} lang={lang} />;
}
