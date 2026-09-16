import { JsonLd } from "../components/JsonLd";
import { Portfolio } from "../components/Portfolio";
import { homeJsonLd } from "../lib/jsonld";

export default function Home() {
  return (
    <>
      {/* ProfilePage + the FAQ rendered below — see app/lib/jsonld.ts. */}
      <JsonLd data={homeJsonLd("en")} />
      <Portfolio lang="en" />
    </>
  );
}
