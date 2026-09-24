import { Footer, copy, shared } from "abdullah-portfolio";
import "./_kit/card-harness";

export const English = () => (
  <div className="site-shell" dir="ltr">
    <Footer t={copy.en} lang="en" socials={shared.socials} />
  </div>
);

export const Arabic = () => (
  <div className="site-shell" dir="rtl">
    <Footer t={copy.ar} lang="ar" socials={shared.socials} />
  </div>
);

export const OnSubPage = () => (
  // Off the homepage, in-page anchors (#services) must point back at "/".
  <div className="site-shell" dir="ltr">
    <Footer t={copy.en} lang="en" socials={shared.socials} linkBase="/" />
  </div>
);
