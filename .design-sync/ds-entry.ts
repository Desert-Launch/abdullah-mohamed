// Entry for the claude.ai/design bundle (window.AbdullahPortfolio).
// The site is a Next app, not a published library, so this file is its
// "package entry": the visual components, plus the dictionaries and helpers a
// design needs to feed them real copy instead of invented copy.
// Left out on purpose: AgentTools, JsonLd, TrackClicks, TrackPageView — they
// render nothing visible.

// Must stay first: asset() reads the base path at module init.
import "./shims/process-env";

// Page bodies — each renders its own shell, header and footer (the homepage's
// sections live in app/components/home/ and are not exported one by one yet).
export { Portfolio } from "../app/components/Portfolio";
export { CvPage } from "../app/components/pages/CvPage";
export { WorkIndex } from "../app/components/pages/WorkIndex";
export { WorkDetail } from "../app/components/pages/WorkDetail";
export { ServicesIndex } from "../app/components/pages/ServicesIndex";
export { ServiceDetail } from "../app/components/pages/ServiceDetail";

// Page chrome.
export { WorkHeader } from "../app/components/WorkHeader";
export { Footer } from "../app/components/Footer";
export { LanguageMenu } from "../app/components/LanguageMenu";

// Building blocks.
export { WorkShots } from "../app/components/WorkShots";

// Content: every string the components render comes from these.
export { copy } from "../app/data/copy";
export {
  shared,
  storeLinks,
  bookingHref,
  bookingUrl,
  contactEmail,
  cvPdf,
  profilePhoto,
  appImages,
  testimonialImages,
  stackTags,
} from "../app/data/shared";
export type * from "../app/data/types";

// Helpers the pages use to look content up and build links.
export { asset } from "../app/lib/asset";
export { localePath } from "../app/lib/site";
export { useSiteTheme } from "../app/lib/useSiteTheme";
export { workProjects, findProject, workPath, workIndexPath } from "../app/lib/work";
export { servicePages, findService, planFor, servicePath, servicesIndexPath } from "../app/lib/services";
export { cvPath } from "../app/lib/cv";
