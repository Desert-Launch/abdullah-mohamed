export type Lang = "en" | "ar";
export type Theme = "dark" | "light";
/** What the visitor picked in the theme control. "system" follows the OS
 *  (`prefers-color-scheme`); it is the default until they choose. */
export type ThemePreference = "system" | Theme;

export type NavItem = [label: string, href: string];
export type Proof = [value: string, label: string];
/** One row of the About section's "at a glance" list: `[label, value]`. Short,
 *  factual, and quotable — this is the block an assistant lifts when asked
 *  "who is Abdullah Mohamed and what does he do". */
export type Fact = [label: string, value: string];

export interface Social {
  label: string;
  href: string;
  icon: string;
}

export interface Metric {
  value: string;
  label: string;
}

export interface Product {
  title: string;
  type: string;
  image?: string;
  shots?: string[];
  body: string;
  stack: string[];
  metrics?: Metric[];
}

/** A card in the "Selected work" thumbnail grid. Store links are joined in
 *  from `shared.storeLinks` by `key`, so URLs live in exactly one place. */
export interface SelectedApp {
  key: string;
  title: string;
  /** One-line description shown under the title. */
  tagline: string;
  /** Optional logo. When absent, the card shows a letter fallback. */
  image?: string;
}

export interface CaseLink {
  label: string;
  href: string;
}

/** A product screenshot on a case study.
 *
 *  `alt` is the accessible description; `caption` is the visible explanation
 *  under the shot on the /work detail page. Several products have an Arabic-only
 *  UI, so an English reader cannot read the screenshot itself — the caption is
 *  what makes the shot legible to them. Captions describe only what is actually
 *  visible in the file; where that is ambiguous the string is left empty and
 *  the shot renders without a caption. */
export interface Shot {
  src: string;
  alt: string;
  caption: string;
}

/** One engineering decision on a case study, with the reason behind it.
 *
 *  This is the block that was missing: the studies named an architecture
 *  ("clean architecture, 16 modules") without ever saying what was chosen over
 *  what, or why. A hiring manager reads a case study for exactly this — it is
 *  the difference between a feature list and evidence of judgment. Every entry
 *  must be a decision that was actually made on the project, with the
 *  constraint that forced it. */
export interface CaseDecision {
  /** The decision as a claim: "WebSocket, not request/response". */
  title: string;
  /** The constraint that forced it and what it bought. */
  body: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  type: string;
  /** Ownership/context badge, e.g. "Appenza Studio · product team" vs "Independent build". */
  context?: string;
  image?: string;
  shots?: Shot[];
  summary: string;
  challenge: string;
  role: string;
  process: string[];
  /** Decisions and their reasons — see `CaseDecision`. Optional only so a new
   *  study can be added before its decisions are written; every study that
   *  claims senior work should have them. */
  decisions?: CaseDecision[];
  results: Metric[];
  stack: string[];
  links?: CaseLink[];
  /** ISO date (YYYY-MM-DD) this write-up was first published.
   *
   *  Feeds `Article.datePublished`. Without it every case study carried only a
   *  `dateModified` of the build date, so each page appeared to change on
   *  every deploy and none had a stable date to be ranked or cited by. */
  published: string;
  /** For the `SoftwareApplication` node on the case page: schema.org
   *  `applicationCategory` (e.g. "EducationalApplication") and the platforms
   *  it shipped on. Omitted where the product is not an app. */
  appCategory?: string;
  platforms?: string[];
  /** Sorts first on the /work index. */
  featured?: boolean;
  /** Index into `results` of the one metric the homepage's "More case
   *  studies" row shows. Defaults to 0; set it where the first result is not
   *  the one that says the most about the study. */
  highlight?: number;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Optional headshot shown next to the attribution. */
  image?: string;
  /** LinkedIn URL where the recommendation can be verified. When set, the
   *  card shows a "Verified · LinkedIn" badge and links to the source. */
  linkedin?: string;
}

/** One step in the "How working with me looks" strip. */
export interface ProcessStep {
  title: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Experience {
  date: string;
  role: string;
  company: string;
  location: string;
  logo: string;
  summary: string;
  achievements: string[];
  apps: Product[];
}

export interface Plan {
  /** Stable id, shared with the matching `servicePages.pages` entry — the
   *  card links to `/services/<slug>/` and the Service JSON-LD is keyed on it. */
  slug: string;
  name: string;
  /** The promise in a sentence — the middle column of the homepage's
   *  "Ways I can help" row, and the Offer description. */
  body: string;
  /** Headline starting price, pre-formatted with symbol and grouping, e.g.
   *  "from $3,500". USD in both languages. */
  price: string;
  /** The same starting price as a number (USD), for the Offer structured
   *  data. Must agree with `price` — the string is what people read, the
   *  number is what search engines read. */
  minPrice: number;
  /** Small print under the price. States that the figure is a starting point
   *  and negotiable — never a duration; timeline is set per proposal. */
  priceNote: string;
  /** CTA label on the service page's pricing card, e.g. "Book a call". */
  cta: string;
  /** Optional lead-in above the feature list, e.g. "Everything above, plus:". */
  itemsIntro?: string;
  /** What the engagement includes — the service page and the Markdown twin
   *  list these; the homepage row does not. */
  items: string[];
}

/** Copy for the standalone `/work` index and `/work/[slug]` detail pages,
 *  routed in both locales (`/work/…`, `/ar/work/…`). */
export interface WorkCopy {
  /** SERP/social copy for the /work index route. The title is the page's own
   *  part only — the locale layout's template appends "| Abdullah Mohamed". */
  meta: {
    title: string;
    description: string;
  };
  /** SERP title/description templates for a `/work/<slug>/` page. Placeholders:
   *  `{title}`, `{type}`, `{summary}`, `{stack}` (comma-joined). The description
   *  is composed from the study rather than stored per study so it can never
   *  say something the page doesn't. */
  caseMeta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  body: string;
  /** aria-label for the reduced header rendered on the /work pages. */
  navLabel: string;
  /** Link back to the homepage from the /work header. */
  home: string;
  /** Card CTA into a detail page; also used on the homepage case cards. */
  readCase: string;
  /** Homepage CTA into the /work index. */
  viewAll: string;
  /** Back link at the top of a detail page. */
  backToIndex: string;
  /** Label above the other-projects links at the foot of a detail page. */
  more: string;
  /** Label above the links from a case study to the services that cite it
   *  as proof — the page's "hire me for the same thing" line. */
  relatedServices: string;
  /** Heading for shipped apps that have no written case study yet. */
  alsoShipped: Heading;
  /** Label above the screenshot strip on a detail page. */
  screenshots: string;
  /** Notes that the product UI in the screenshots is Arabic, so the captions
   *  are how a non-Arabic reader can follow them. */
  screenshotsNote: string;
  /** Label above the store/live links on a detail page. */
  links: string;
  /** Closing CTA block on a detail page. */
  cta: {
    title: string;
    body: string;
    button: string;
  };
}

export interface Heading {
  eyebrow: string;
  title: string;
  body?: string;
}

/** One credential on `/cv/`. Education was absent from the site entirely —
 *  recruiters filter on it and `Person.alumniOf` had nothing to point at. */
export interface Education {
  degree: string;
  school: string;
  /** One line: GPA, honours, or field. */
  detail: string;
  date: string;
}

/** A skills group on `/cv/`, split by how deep the experience actually goes.
 *
 *  The site had no skills block at all — the stack appeared as a sentence in
 *  the hero, an FAQ answer, and ~120 card pills that mixed technologies with
 *  outcomes ("Optimization", "Multi-region"). Grading them is the honest
 *  version: `core` is daily production work over years, `strong` is shipped
 *  with, `used` is real but incidental. Nothing here is a technology that
 *  isn't already evidenced by a role or a case study. */
export interface SkillGroup {
  group: string;
  core: string[];
  strong: string[];
  used: string[];
}

/** Copy for the standalone `/cv/` route, in both locales.
 *
 *  The one page a recruiter wants that the site did not have: crawlable and
 *  printable, the target for "Abdullah Mohamed CV / resume", and the home for
 *  the facts that live nowhere else on the site (education, skills by level).
 *  The employment history is NOT duplicated here — the page renders
 *  `Dictionary.experiences`, the same data the homepage timeline uses. */
export interface CvCopy {
  /** SERP/social copy. Title is the page's own part — the layout appends
   *  "| Abdullah Mohamed". */
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  lead: string;
  /** Header/breadcrumb label. */
  indexLabel: string;
  /** aria-label for the reduced header's nav on this page. */
  navLabel: string;
  /** Professional summary — the paragraph at the top of the PDF. */
  summary: string;
  downloadPdf: string;
  labels: {
    summary: string;
    experience: string;
    education: string;
    skills: string;
    core: string;
    strong: string;
    used: string;
    languages: string;
    contact: string;
    /** Note explaining that the page and the PDF are the same document. */
    printNote: string;
  };
  languages: string[];
  education: Education[];
  skills: SkillGroup[];
}

/** One standalone `/services/<slug>/` landing page.
 *
 *  Each page is the long form of one pricing card (`Plan`, joined by `slug`):
 *  what the service is, who it is for, what is delivered, how it is built, the
 *  case studies that prove it, and the questions clients ask before booking.
 *  Written to be read on its own by someone who arrived from a search or an
 *  assistant's answer and has never seen the homepage. */
export interface ServicePage {
  slug: string;
  /** SERP/social copy. Title is the page's own part — the layout appends
   *  "| Abdullah Mohamed". */
  meta: {
    title: string;
    description: string;
  };
  /** Short noun-phrase name, e.g. "Flutter mobile apps" — breadcrumb, cards,
   *  and the `Service.name` in structured data. */
  name: string;
  /** Category eyebrow above the H1, e.g. "Services · Mobile". */
  eyebrow: string;
  /** The H1: what is built and for whom. */
  title: string;
  /** Lead paragraph — a self-contained answer to "what is this service?". */
  lead: string;
  /** "Is this you?" — the situations the service fits. */
  fit: string[];
  /** "What you get" — the deliverables. */
  deliverables: string[];
  /** "How I build it" — stack, practices, and the working agreement. */
  approach: string[];
  /** Slugs of `caseStudies` entries that prove this service. Resolved at
   *  render time; an unknown slug is skipped, never a broken link. */
  proof: string[];
  /** Questions specific to this service; also emitted as FAQPage markup. */
  faq: FaqItem[];
}

/** Copy for the `/services/` index and the `/services/<slug>/` pages, routed
 *  in both locales (`/services/…`, `/ar/services/…`). */
export interface ServicesCopy {
  /** SERP/social copy for the index. */
  meta: {
    title: string;
    description: string;
  };
  eyebrow: string;
  title: string;
  body: string;
  /** aria-label for the reduced header's nav on these pages. */
  navLabel: string;
  /** Header/breadcrumb label for the index. */
  indexLabel: string;
  /** Card CTA into a service page from the index. */
  readMore: string;
  /** Link on a homepage pricing card into its service page. */
  learnMore: string;
  /** Homepage link from the pricing heading into the index. */
  viewAll: string;
  /** Back link at the top of a detail page. */
  backToIndex: string;
  /** Section labels on a detail page. */
  labels: {
    fit: string;
    deliverables: string;
    approach: string;
    proof: string;
    pricing: string;
    faq: string;
    more: string;
  };
  /** Closing CTA block on a detail page. */
  cta: {
    title: string;
    body: string;
    button: string;
  };
  pages: ServicePage[];
}

/** Labels for the Markdown twin of a page — the body served to clients that
 *  ask for `Accept: text/markdown` (see `app/lib/markdown.ts` and
 *  `docs/agent-readiness.md`). None of this is rendered in the HTML UI, but it
 *  is still display copy read by a human on the other side of an agent, so it
 *  lives in the dictionaries like everything else. */
export interface MarkdownCopy {
  /** Lead note telling the reader what the file is. */
  note: string;
  /** Label above a stack list. */
  stack: string;
  /** Label above a link list. */
  links: string;
  /** Label above a metric list (case-study results). */
  metrics: string;
  /** Label above the contact block. */
  contact: string;
  /** Label on the line pointing back at the human-readable page. */
  htmlVersion: string;
}

export interface HeroCopy {
  /** First item of the meta row, and the start of the H1: who, and the role.
   *  The row is part of the heading (see HomeHero.tsx) so the page's one H1
   *  names the person and the role, not only the tagline. */
  eyebrow: string;
  /** Second item of the meta row, also inside the H1: city and work mode. */
  place: string;
  /** Third item of the meta row, with a live dot. Not part of the heading. */
  status: string;
  /** Headline lead-in, rendered in default ink. */
  title: string;
  /** Tail of the headline, rendered in the muted ink. */
  titleAccent: string;
  /** Role/positioning line. Rendered by the sub-page footer. */
  roleLine: string;
  /** Lead paragraph. Keep it to ~35 words: at 62 it was nine lines on a
   *  phone. */
  lead: string;
  /** "Explore selected work" — the primary CTA, into #work. */
  explore: string;
  /** "Let's talk" — into #contact; also the floating nav's CTA. */
  talk: string;
  /** "Download CV" — the PDF. Also the hiring lane's primary action. */
  cv: string;
  /** "Book a free call" — the project lane's primary action. */
  primary: string;
  /** Availability line. Rendered by the sub-page footer. */
  availability: string;
  /** The hero's second column: Now / Previously / Works across. */
  facts: Fact[];
  /** Accessible name for that list. */
  factsLabel: string;
}

/** One audience's lane in the contact section: a label and heading that name
 *  them, and a line telling them what happens next. The action buttons are
 *  built from data the site already holds (the CV path, `shared.socials`, the
 *  booking link), so a lane adds no duplicate labels. */
export interface ContactLane {
  /** Small label above the heading, e.g. "For companies hiring". */
  label: string;
  title: string;
  body: string;
}

export interface ContactCopy {
  eyebrow: string;
  /** Heading lead-in ("Hiring,"), in default ink. */
  title: string;
  /** Heading tail ("or building?"), in the muted ink. */
  titleAccent: string;
  body: string;
  /** Label for the booking / "Book a call" button. */
  book: string;
  /** The two doors, one per audience. */
  lanes: {
    hiring: ContactLane;
    project: ContactLane;
  };
  /** "Copy email" button label and its transient copied-state label. */
  copyEmail: string;
  copied: string;
}

/** One layer of the product stack, as the homepage's "Across the stack" map
 *  draws it. The keys are shared by both locales; only the names are copy. */
export type StackLayer = "mobile" | "web" | "api" | "rt" | "data" | "infra";

/** One product column on the stack map: what was built at each layer. A layer
 *  a product has no entry for renders as an empty point. */
export interface StackProduct {
  name: string;
  /** "Company · what it is", shown above the name when selected. */
  context: string;
  /** Case-study slug, when the product has a written study. */
  slug?: string;
  layers: Partial<Record<StackLayer, string>>;
}

/** One labelled note in a homepage diagram: small label, title, one line. */
export interface DiagramNote {
  label: string;
  title: string;
  body: string;
}

/** Copy the redesigned homepage needs that has no other home in the
 *  dictionary: its chrome, the hero's "production strata" card, the Talia
 *  system diagram, the stack map, and the principles. Sections that already
 *  had copy (case studies, experience, testimonials, plans, contact) keep
 *  using it. */
export interface HomeCopy {
  chrome: {
    /** aria-label of the header's section nav. */
    primaryNav: string;
    /** aria-label of the floating nav shown once the header scrolls away. */
    stickyNav: string;
    /** Name of the mobile menu dialog, and its button's visible label. */
    menu: string;
    openMenu: string;
    closeMenu: string;
  };
  /** The Auto / Light / Dark control. */
  theme: {
    label: string;
    system: string;
    light: string;
    dark: string;
  };
  /** The hero's card: one product drawn as the layers it runs on. */
  strata: {
    /** Top-left caption, e.g. "Faheem — the real-time layer". */
    label: string;
    /** Top-right figure, e.g. "200,000+ students". */
    stat: string;
    /** Accessible name of the card link. */
    ariaLabel: string;
    /** Pointer label that follows the cursor over the card. */
    cursor: string;
    layers: { layer: string; detail: string }[];
  };
  /** "02 In production": the proof numbers' own section. The first `proof`
   *  entry is the big number; `body` is the sentence under it. */
  proof: {
    eyebrow: string;
    body: string;
    /** Label before the product logo strip. */
    products: string;
  };
  work: {
    /** "Role —" and "Stack —" lead-ins on the featured studies. */
    role: string;
    stack: string;
    /** Pointer label over a case-study visual. */
    cursor: string;
    /** Label above the store-only apps strip. */
    alsoShipped: string;
  };
  /** The Talia case's system diagram (Ministry → schools). */
  talia: {
    label: string;
    products: string;
    authority: string;
    ministry: string;
    school: string;
    live: string;
    /** The first school on the platform. */
    pilot: string;
    roles: string[];
    nextTenant: string;
    notes: DiagramNote[];
  };
  stack: {
    heading: Heading;
    /** Header of the layer column. */
    layerLabel: string;
    /** Accessible name of the product picker. */
    pickerLabel: string;
    layers: { key: StackLayer; name: string }[];
    products: StackProduct[];
    capabilitiesLabel: string;
    capabilities: { name: string; body: string; tech: string }[];
  };
  experience: {
    /** Accessible name of the role tabs. */
    tabsLabel: string;
    /** "Products" — prefixed to the count above a role's apps. */
    products: string;
    /** "Full CV" link beside the heading. */
    fullCv: string;
  };
  principles: {
    title: string;
    note: string;
    /** Each principle cites the case study it was taken from, by slug. */
    items: { text: string; slug: string }[];
  };
}

export interface Dictionary {
  dir: "ltr" | "rtl";
  /** Localized SERP/social copy for this locale's route. */
  meta: {
    title: string;
    /** Full description, for search results. */
    description: string;
    /** Uppercase rule line at the top of the generated social card: role,
     *  city, availability. */
    cardEyebrow: string;
    /** Short description, for og:/twitter: and the social card's sub-line.
     *  WhatsApp and LinkedIn truncate around 150 characters — the SERP-length
     *  description above gets cut mid-sentence in a share preview. */
    social: string;
  };
  /** Visually-hidden skip link rendered first inside <body>. */
  skipLink: string;
  /** Homepage section anchors, in page order. Also the sub-page footer's
   *  "Sections" column. Must keep a "#contact" entry: the sub-page header
   *  borrows its label. */
  nav: NavItem[];
  /** The person's name as written in this locale. */
  name: string;
  role: string;
  /** City line in the homepage footer. */
  place: string;
  /** aria-label for the floating nav's back-to-top link. */
  backToTop: string;
  /** The sub-page header's two-state theme button. */
  themeToggle: string;
  darkToggle: string;
  langToggle: string;
  /** The header's language menu. `label` names the control; `options` are the
   *  locale names written *in their own language* (autonyms) — a visitor
   *  scanning for Arabic looks for "العربية", not for "Arabic", so these two
   *  strings are deliberately identical in both dictionaries. */
  language: {
    label: string;
    options: Record<Lang, string>;
  };
  hero: HeroCopy;
  /** The homepage redesign's own copy — see `HomeCopy`. */
  home: HomeCopy;
  proof: Proof[];
  /** Label over the company strip in "In production". */
  logosLabel: string;
  /** Label before a role's app list on the CV's Markdown twin. */
  appsLabel: string;
  caseStudiesHeading: Heading;
  selectedWorkLabels: {
    products: string;
    productBuild: string;
    appStore: string;
    googlePlay: string;
    /** Status badges for apps without live store links. `shipped` prefixes
     *  the year on retired apps: "Shipped 2023 · Retired". Other statuses
     *  carrying a `year` prefix it bare: "2022 · Product build". */
    shipped: string;
    retired: string;
    unreleased: string;
  };
  workHeading: Heading;
  servicesHeading: Heading;
  /** `title` names the Offer catalogue in structured data; `body` is the
   *  pricing note under the homepage's plan rows. */
  plansHeading: Heading;
  processHeading: Heading;
  process: ProcessStep[];
  testimonialsHeading: Heading;
  testimonialLabels: {
    /** Trust badge shown on cards backed by a LinkedIn recommendation. */
    verified: string;
    /** Accessible label for the link to the recommendation on LinkedIn. */
    view: string;
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    photoAlt: string;
    /** Line under the portrait: city, timezone, work mode. */
    photoCaption: string;
    /** Accessible name of the "at a glance" list. */
    factsLabel: string;
    /** The at-a-glance rows. Keep every value to one line, and state only
     *  facts found elsewhere on the page or on the CV. */
    facts: Fact[];
  };
  caseLabels: {
    challenge: string;
    role: string;
    process: string;
    /** Heading over `CaseStudy.decisions` — the block a hiring manager reads
     *  a case study for. */
    decisions: string;
    results: string;
  };
  caseStudies: CaseStudy[];
  /** Copy for the standalone /work index + detail routes. */
  work: WorkCopy;
  /** Copy for the standalone /services index + detail routes. */
  servicePages: ServicesCopy;
  /** Copy for the standalone /cv route. */
  cv: CvCopy;
  selectedWork: SelectedApp[];
  experiences: Experience[];
  plans: Plan[];
  testimonials: Testimonial[];
  contact: ContactCopy;
  /** Copy for the `Accept: text/markdown` twin of every page in this locale. */
  markdown: MarkdownCopy;
}
