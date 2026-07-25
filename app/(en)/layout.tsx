import "../globals.css";
import { RootHtml, buildMetadata, siteViewport } from "../lib/site";

// English root layout, serving "/". Route groups let each locale own a root
// layout, which is the only place <html> may be rendered — and the only way to
// give each locale its own lang/dir in the *server* HTML.
export const metadata = buildMetadata("en");
export const viewport = siteViewport;

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <RootHtml lang="en">{children}</RootHtml>;
}
