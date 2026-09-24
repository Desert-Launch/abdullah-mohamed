import type { Metadata } from "next";
import { ServicesIndex } from "../../../components/pages/ServicesIndex";
import { copy } from "../../../data/copy";
import { buildServiceMetadata } from "../../../lib/services";

const lang = "ar" as const;
const t = copy[lang];

export const metadata: Metadata = buildServiceMetadata({
  lang,
  title: t.servicePages.meta.title,
  description: t.servicePages.meta.description,
  subpath: "services/",
});

export default function ServicesIndexPage() {
  return <ServicesIndex lang={lang} />;
}
