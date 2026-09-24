import { ServiceDetail, servicePages } from "abdullah-portfolio";
import "./_kit/card-harness";

export const English = () => <ServiceDetail page={servicePages("en")[0]} lang="en" />;

export const Arabic = () => <ServiceDetail page={servicePages("ar")[0]} lang="ar" />;
