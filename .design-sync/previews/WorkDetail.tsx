import { WorkDetail, findProject } from "abdullah-portfolio";
import "./_kit/card-harness";

export const English = () => <WorkDetail study={findProject("faheem", "en")!} lang="en" />;

export const Arabic = () => <WorkDetail study={findProject("faheem", "ar")!} lang="ar" />;
