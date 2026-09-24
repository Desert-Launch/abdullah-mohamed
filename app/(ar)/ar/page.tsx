import { JsonLd } from "../../components/JsonLd";
import { Portfolio } from "../../components/Portfolio";
import { homeJsonLd } from "../../lib/jsonld";

export default function ArabicHome() {
  return (
    <>
      {/* ProfilePage about the person, in Arabic — see app/lib/jsonld.ts. */}
      <JsonLd data={homeJsonLd("ar")} />
      <Portfolio lang="ar" />
    </>
  );
}
