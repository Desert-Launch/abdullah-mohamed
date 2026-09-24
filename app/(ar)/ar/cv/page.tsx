import type { Metadata } from "next";
import { CvPage } from "../../../components/pages/CvPage";
import { buildCvMetadata } from "../../../lib/cv";

const lang = "ar" as const;

export const metadata: Metadata = buildCvMetadata(lang);

export default function Cv() {
  return <CvPage lang={lang} />;
}
