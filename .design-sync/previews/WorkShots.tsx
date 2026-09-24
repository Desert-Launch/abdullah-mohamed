import { WorkShots, copy } from "abdullah-portfolio";
import "./_kit/card-harness";

export const English = () => (
  <div className="site-shell" dir="ltr">
    <WorkShots shots={copy.en.caseStudies[0].shots} />
  </div>
);

export const Arabic = () => (
  <div className="site-shell" dir="rtl">
    <WorkShots shots={copy.ar.caseStudies[0].shots} />
  </div>
);
