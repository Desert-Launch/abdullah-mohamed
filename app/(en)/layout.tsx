import "../globals.css";
import { JsonLd } from "../components/JsonLd";
import { siteGraph } from "../lib/jsonld";
import { RootHtml, buildMetadata, siteViewport } from "../lib/site";

// English root layout, serving "/". Route groups let each locale own a root
// layout, which is the only place <html> may be rendered — and the only way to
// give each locale its own lang/dir in the *server* HTML.
export const metadata = buildMetadata("en");
export const viewport = siteViewport;

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <RootHtml lang="en">
      {/* Site-wide entities (Person, WebSite, ProfessionalService); each page
          adds its own nodes and references these by @id. */}
      <JsonLd data={siteGraph()} />
      {children}
    </RootHtml>
  );
}
