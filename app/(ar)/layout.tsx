import "../globals.css";
import { RootHtml, buildMetadata, siteViewport } from "../lib/site";

// Arabic root layout, serving "/ar". Sibling root layout to (en) — see the
// note there for why each locale needs its own.
export const metadata = buildMetadata("ar");
export const viewport = siteViewport;

export default function ArLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="ar">{children}</RootHtml>;
}
