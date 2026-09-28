import type { Metadata } from "next";
import { InquiryPage } from "../../../components/pages/InquiryPage";
import { buildInquiryMetadata } from "../../../lib/inquiry";

const lang = "ar" as const;

export const metadata: Metadata = buildInquiryMetadata(lang);

export default function StartAProject() {
  return <InquiryPage lang={lang} />;
}
