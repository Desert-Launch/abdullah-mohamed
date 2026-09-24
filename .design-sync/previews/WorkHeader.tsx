import { WorkHeader, copy } from "abdullah-portfolio";
import "./_kit/card-harness";

export const WorkIndex = () => (
  <div className="site-shell work-shell" dir="ltr">
    <WorkHeader t={copy.en} lang="en" section="work" current="index" />
  </div>
);

export const ServiceDetail = () => (
  <div className="site-shell work-shell" dir="ltr">
    <WorkHeader t={copy.en} lang="en" section="services" current="detail" />
  </div>
);

export const ArabicCv = () => (
  <div className="site-shell work-shell" dir="rtl">
    <WorkHeader t={copy.ar} lang="ar" section="cv" current="index" />
  </div>
);
