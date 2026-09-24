import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetail } from "../../../../components/pages/ServiceDetail";
import { buildServiceMetadata, findService, servicePages } from "../../../../lib/services";

const lang = "ar" as const;

/** Every slug is known at build time — required by `output: "export"`. */
export function generateStaticParams() {
  return servicePages(lang).map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = findService(slug, lang);
  if (!page) return {};
  return buildServiceMetadata({
    lang,
    title: page.meta.title,
    description: page.meta.description,
    subpath: `services/${page.slug}/`,
  });
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = findService(slug, lang);
  if (!page) notFound();
  return <ServiceDetail page={page} lang={lang} />;
}
