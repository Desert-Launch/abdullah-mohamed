import type { Metadata } from "next";
import { WorkIndex } from "../../../components/pages/WorkIndex";
import { copy } from "../../../data/copy";
import { buildWorkMetadata } from "../../../lib/work";

const lang = "ar" as const;
const t = copy[lang];

export const metadata: Metadata = buildWorkMetadata({
  lang,
  title: t.work.meta.title,
  description: t.work.meta.description,
  subpath: "work/",
});

export default function WorkIndexPage() {
  return <WorkIndex lang={lang} />;
}
