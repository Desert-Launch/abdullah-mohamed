import { copy } from "../data/copy";
import { bookingUrl, contactEmail, profilePhoto, shared, storeLinks } from "../data/shared";
import type { CaseStudy, Lang, ServicePage } from "../data/types";
import { SITE_URL, localePath } from "./site";
import { cvPath } from "./cv";
import { inquiryPath } from "./inquiry";
import { servicePath, servicePages, servicePrice, servicesIndexPath } from "./services";
import { workIndexPath, workPath, workProjects } from "./work";

/**
 * Structured data (schema.org JSON-LD) for every page type.
 *
 * The site-wide entities — the Person, the WebSite, and the ProfessionalService
 * that sells his time — are emitted once per page by `RootHtml` and referenced
 * everywhere else by `@id`, so a crawler sees one Abdullah Mohamed rather than
 * a fresh copy on every page. Each page then adds only what is *on that page*:
 * the homepage is a ProfilePage, a case study is an Article with
 * breadcrumbs, a service page is a Service with its own FAQ. FAQPage markup in
 * particular must describe questions the visitor can actually read on that
 * URL, which is why it is no longer in the root layout.
 *
 * Everything is derived from the dictionaries and `shared.ts`. The only facts
 * typed here are the ones that exist nowhere else on the site (the schema
 * `@id`s and the area-served list), and the latter mirrors the FAQ's "clients
 * so far" line — keep the two in step.
 */

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const BUSINESS_ID = `${SITE_URL}/#business`;

/** Absolute URL for a site-relative path — JSON-LD `url`s must be absolute. */
function abs(path: string): string {
  return `${SITE_URL}${path}`;
}

/**
 * The date this build ran, as an ISO date. A static export is republished
 * only when content changes (deploys happen on merges to main), so the build
 * date is an honest `dateModified` for every page in it — and the sitemap's
 * `lastmod`, which reads the same constant so the two can't disagree.
 */
export const BUILD_DATE = new Date().toISOString().slice(0, 10);

/** Countries in the FAQ's "clients so far" answer, plus the remote-first
 *  reality the whole site is built around. Names, not codes: `areaServed`
 *  takes Text or Place, and Google renders the text. */
const AREA_SERVED = [
  "Egypt",
  "United Arab Emirates",
  "Qatar",
  "Kuwait",
  "Germany",
  "United States",
  "Remote — worldwide",
];

const HTTPS = (url?: string): url is string => !!url && url.startsWith("http");

/**
 * Employers as entities, keyed by the `company` string in `Dictionary.experiences`.
 * A bare `{ "@type": "Organization", name: "…" }` is a string a graph cannot
 * resolve; a `url` is what lets it connect the person to a real company. Only
 * organisations with a public site are listed — an entry with no URL simply
 * renders as a name, which is what it was before.
 */
const EMPLOYER_URLS: Record<string, string> = {
  "Appenza Studio": "https://appenza.studio/",
  "DIB GmbH": "https://www.dib-holding.com/",
};

/** Helper: the employer as an Organization node, with a `url` when known. */
function organization(name: string) {
  const url = EMPLOYER_URLS[name];
  return url
    ? { "@type": "Organization", name, url, sameAs: url }
    : { "@type": "Organization", name };
}

/** The university, for `Person.alumniOf`. Education was absent from both the
 *  site and the graph; recruiters filter on it and assistants are asked for
 *  it directly. Sourced from the CV, same as the /cv/ page. */
const ALMA_MATER = {
  "@type": "CollegeOrUniversity",
  name: "Helwan University",
  sameAs: "https://www.helwan.edu.eg/",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Cairo",
    addressCountry: "EG",
  },
};

/** Public profiles, deduplicated across `shared.socials` and the hard-coded
 *  LinkedIn/GitHub URLs the JSON-LD has always carried (the socials list uses
 *  the bare linkedin.com host; schema.org consumers key on the string). */
const SAME_AS = Array.from(
  new Set([
    "https://github.com/Abdullah3010",
    "https://www.linkedin.com/in/abdullah-mohamed-3010",
    ...shared.socials.map((s) => s.href).filter(HTTPS),
  ]),
);

/** Every service page as an Offer, keyed on the page slug so the Offer's
 *  `url` is the landing page that describes it. A service with a published
 *  starting price carries it as `minPrice` (the cheapest of the plans it is
 *  priced as); one scoped per project carries no price at all rather than an
 *  invented one. */
function offerCatalog(lang: Lang) {
  const t = copy[lang];
  return {
    "@type": "OfferCatalog",
    name: t.servicePages.meta.title,
    itemListElement: servicePages(lang).map((page) => {
      const url = abs(servicePath(page.slug, lang));
      const price = servicePrice(page, lang);
      return {
        "@type": "Offer",
        name: page.name,
        description: page.situation,
        url,
        ...(price.minPrice !== undefined
          ? {
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: price.minPrice,
                priceCurrency: "USD",
              },
            }
          : {}),
        itemOffered: {
          "@type": "Service",
          "@id": `${url}#service`,
          name: page.name,
          serviceType: page.name,
          url,
          provider: { "@id": PERSON_ID },
        },
      };
    }),
  };
}

/**
 * The site-wide graph: who he is, the site itself, and the service business.
 * Emitted on every page. Person facts come from the English dictionary
 * regardless of locale — the entity is the same person, and mixing languages
 * inside one node confuses consumers — while `alternateName` carries the
 * Arabic spelling so the /ar/ page still resolves to the same entity.
 */
export function siteGraph() {
  const en = copy.en;
  const ar = copy.ar;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: "Abdullah Mohamed",
        alternateName: "عبدالله محمد",
        givenName: "Abdullah",
        familyName: "Mohamed",
        jobTitle: en.role,
        description: en.meta.description,
        url: abs(localePath.en),
        image: profilePhoto ? abs(profilePhoto) : undefined,
        email: `mailto:${contactEmail}`,
        telephone: "+20-111-185-2544",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        nationality: { "@type": "Country", name: "Egypt" },
        knowsLanguage: [
          { "@type": "Language", name: "English", alternateName: "en" },
          { "@type": "Language", name: "Arabic", alternateName: "ar" },
        ],
        knowsAbout: [
          "Custom software development",
          "MVP development",
          "Mobile app development (iOS and Android)",
          "Web application development",
          "SaaS development",
          "Internal tools and business process software",
          "App performance optimization",
          "Full-stack web development",
          "React",
          "Next.js",
          "SvelteKit",
          "TypeScript",
          "Node.js",
          "Express",
          "PostgreSQL",
          "Redis",
          "REST APIs",
          "WebSocket",
          "Real-time AI",
          "Azure OpenAI",
          "Speech-to-text and text-to-speech",
          "AWS",
          "Docker",
          "CI/CD",
          "Flutter",
          "Dart",
          "Mobile app development",
          "Multi-tenant SaaS",
          "Role-based access control",
          "Arabic and RTL product localization",
        ],
        worksFor: organization("Appenza Studio"),
        // Every past employer, from the timeline rather than a second list, so
        // adding a role to the dictionary adds it to the graph.
        alumniOf: [
          ALMA_MATER,
          ...en.experiences.slice(1).map((role) => organization(role.company)),
        ],
        hasOccupation: {
          "@type": "Occupation",
          // Same string as `jobTitle`: two slightly different titles on one
          // person is exactly the ambiguity structured data exists to remove.
          name: en.role,
          occupationLocation: { "@type": "City", name: "Cairo" },
          skills: "Full-stack web, real-time AI, mobile (Flutter), DevOps",
        },
        sameAs: SAME_AS,
        // The audience the site is written for, in its own words.
        seeks: {
          "@type": "Demand",
          name: en.hero.availability,
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: abs(localePath.en),
        name: "Abdullah Mohamed",
        alternateName: ["abdullahmohamed.dev", ar.meta.title.split("|")[0].trim()],
        description: en.meta.description,
        inLanguage: ["en", "ar"],
        publisher: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfessionalService",
        "@id": BUSINESS_ID,
        name: "Abdullah Mohamed — Software Engineering",
        description: en.servicePages.meta.description,
        url: abs(servicesIndexPath("en")),
        founder: { "@id": PERSON_ID },
        employee: { "@id": PERSON_ID },
        email: contactEmail,
        telephone: "+20-111-185-2544",
        image: profilePhoto ? abs(profilePhoto) : undefined,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cairo",
          addressCountry: "EG",
        },
        areaServed: AREA_SERVED,
        availableLanguage: ["English", "Arabic"],
        // The cheapest starting price on the pricing cards, as a range string —
        // this is what Google renders for LocalBusiness types.
        priceRange: `from $${Math.min(...en.plans.map((p) => p.minPrice)).toLocaleString("en-US")}`,
        hasOfferCatalog: offerCatalog("en"),
        potentialAction: {
          "@type": "ReserveAction",
          name: en.contact.book,
          target: bookingUrl,
        },
      },
    ],
  };
}

function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: abs(item.path),
    })),
  };
}

function faqPage(items: { q: string; a: string }[], lang: Lang) {
  return {
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

/** The locale home page: a ProfilePage about the Person. No FAQPage — the
 *  homepage has no FAQ (FAQPage markup is only valid where the FAQ is shown);
 *  the per-service FAQs carry their own on /services/<slug>/. */
export function homeJsonLd(lang: Lang) {
  const t = copy[lang];
  const url = abs(localePath[lang]);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: t.meta.title,
        description: t.meta.description,
        inLanguage: lang,
        dateModified: BUILD_DATE,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        primaryImageOfPage: profilePhoto
          ? { "@type": "ImageObject", url: abs(profilePhoto) }
          : undefined,
      },
    ],
  };
}

/** `/work/` (either locale): a collection of the case studies, with breadcrumbs. */
export function workIndexJsonLd(lang: Lang) {
  const t = copy[lang];
  const url = abs(workIndexPath(lang));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: t.work.meta.title,
        description: t.work.meta.description,
        inLanguage: lang,
        dateModified: BUILD_DATE,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: workProjects(lang).map((study, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: study.title,
            url: abs(workPath(study.slug, lang)),
          })),
        },
      },
      breadcrumbs([
        { name: t.work.home, path: localePath[lang] },
        { name: t.work.eyebrow, path: workIndexPath(lang) },
      ]),
    ],
  };
}

/** Store URLs for a case study, from `storeLinks` where the app has an entry
 *  (the same source the UI uses) and from the study's own links otherwise. */
function productSameAs(study: CaseStudy): string[] {
  const entry = storeLinks[study.slug];
  const fromStore = [entry?.appStore, entry?.play].filter(HTTPS);
  const fromLinks = (study.links ?? []).map((l) => l.href).filter(HTTPS);
  return Array.from(new Set([...fromStore, ...fromLinks]));
}

/** `/work/<slug>/`: the case study as an Article about the product it
 *  describes, with breadcrumbs. */
export function caseStudyJsonLd(study: CaseStudy, lang: Lang) {
  const t = copy[lang];
  const url = abs(workPath(study.slug, lang));
  const sameAs = productSameAs(study);
  const images = [
    study.image ? abs(study.image) : null,
    ...(study.shots ?? []).map((shot) => abs(shot.src)),
  ].filter((src): src is string => src !== null);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        mainEntityOfPage: url,
        url,
        headline: `${study.title} — ${study.type}`,
        description: study.summary,
        inLanguage: lang,
        // A per-study date, so the write-up has a stable publication date
        // instead of appearing to change on every deploy.
        datePublished: study.published,
        dateModified: BUILD_DATE,
        author: { "@id": PERSON_ID },
        publisher: { "@id": PERSON_ID },
        isPartOf: { "@id": WEBSITE_ID },
        image: images.length ? images : undefined,
        keywords: study.stack.join(", "),
        articleSection: t.work.eyebrow,
        about: {
          "@type": "SoftwareApplication",
          name: study.title,
          description: study.type,
          applicationCategory: study.appCategory,
          operatingSystem: study.platforms?.join(", "),
          sameAs: sameAs.length ? sameAs : undefined,
        },
      },
      breadcrumbs([
        { name: t.work.home, path: localePath[lang] },
        { name: t.work.eyebrow, path: workIndexPath(lang) },
        { name: study.title, path: workPath(study.slug, lang) },
      ]),
    ],
  };
}

/** `/services/`: the catalogue as a collection, with breadcrumbs. */
export function servicesIndexJsonLd(lang: Lang) {
  const t = copy[lang];
  const url = abs(servicesIndexPath(lang));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${url}#webpage`,
        url,
        name: t.servicePages.meta.title,
        description: t.servicePages.meta.description,
        inLanguage: lang,
        dateModified: BUILD_DATE,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": BUSINESS_ID },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: servicePages(lang).map((page, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: page.name,
            url: abs(servicePath(page.slug, lang)),
          })),
        },
      },
      // The engagement FAQ is rendered on this page (ServicesIndex), so its
      // markup belongs here — and only here.
      faqPage(t.servicePages.faq, lang),
      breadcrumbs([
        { name: t.work.home, path: localePath[lang] },
        { name: t.servicePages.indexLabel, path: servicesIndexPath(lang) },
      ]),
    ],
  };
}

/**
 * `/cv/`: the résumé page.
 *
 * `ProfilePage` with the Person as its `mainEntity`, so a consumer that lands
 * here gets the same `@id` as everywhere else on the site — this page adds
 * detail to that entity (education, employment history as `OrganizationRole`s)
 * rather than declaring a second one. No `FAQPage`: there is no FAQ on this
 * URL.
 */
export function cvJsonLd(lang: Lang) {
  const t = copy[lang];
  const en = copy.en;
  const url = abs(cvPath(lang));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: t.cv.meta.title,
        description: t.cv.meta.description,
        inLanguage: lang,
        dateModified: BUILD_DATE,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        // The PDF is the same document in another format, so it is an
        // encoding of this page rather than a separate work.
        encoding: {
          "@type": "MediaObject",
          contentUrl: abs("/Abdullah_Mohamed_CV.pdf"),
          encodingFormat: "application/pdf",
        },
      },
      {
        // Adds to the site-wide Person by @id — consumers merge the two.
        "@type": "Person",
        "@id": PERSON_ID,
        alumniOf: [
          ALMA_MATER,
          ...en.experiences.slice(1).map((role) => organization(role.company)),
        ],
        // Each role as an OrganizationRole, which is what carries the dates a
        // résumé is read for. English throughout: one entity, one language.
        hasOccupation: en.experiences.map((role) => ({
          "@type": "OrganizationRole",
          roleName: role.role,
          description: role.summary,
          startDate: role.date,
          worksFor: organization(role.company),
        })),
        knowsLanguage: [
          { "@type": "Language", name: "English", alternateName: "en" },
          { "@type": "Language", name: "Arabic", alternateName: "ar" },
        ],
      },
      breadcrumbs([
        { name: t.work.home, path: localePath[lang] },
        { name: t.cv.indexLabel, path: cvPath(lang) },
      ]),
    ],
  };
}

/** `/services/<slug>/`: the Service with its Offer, the page's own FAQ, and
 *  breadcrumbs. The Service `@id` matches the one in the site-wide offer
 *  catalogue so the two nodes merge. */
export function servicePageJsonLd(page: ServicePage, lang: Lang) {
  const t = copy[lang];
  const price = servicePrice(page, lang);
  const url = abs(servicePath(page.slug, lang));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.meta.title,
        description: page.meta.description,
        inLanguage: lang,
        dateModified: BUILD_DATE,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": `${url}#service` },
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.name,
        serviceType: page.name,
        description: page.lead,
        url,
        provider: { "@id": PERSON_ID },
        brand: { "@id": BUSINESS_ID },
        areaServed: AREA_SERVED,
        availableLanguage: ["English", "Arabic"],
        // One Offer per plan the service is priced as (an MVP quotes both the
        // web and the mobile starting price); none when it is scoped per
        // project, rather than a made-up number.
        offers: price.plans.length
          ? price.plans.map((plan) => ({
              "@type": "Offer",
              name: plan.name,
              description: `${plan.price} · ${plan.priceNote}`,
              url,
              priceCurrency: "USD",
              priceSpecification: {
                "@type": "PriceSpecification",
                minPrice: plan.minPrice,
                priceCurrency: "USD",
              },
            }))
          : undefined,
        audience: { "@type": "Audience", audienceType: page.situation },
        // The case studies that prove the service, by URL.
        subjectOf: page.proof
          .filter((slug) => t.caseStudies.some((study) => study.slug === slug))
          .map((slug) => ({ "@type": "Article", "@id": `${abs(workPath(slug, lang))}#article` })),
      },
      faqPage(page.faq, lang),
      breadcrumbs([
        { name: t.work.home, path: localePath[lang] },
        { name: t.servicePages.indexLabel, path: servicesIndexPath(lang) },
        { name: page.name, path: servicePath(page.slug, lang) },
      ]),
    ],
  };
}

/**
 * `/start-a-project/`: the brief page, as a ContactPage about the Person, with
 * breadcrumbs. No FAQ, no Offer — it sells nothing on its own; the services
 * it leads from carry those.
 */
export function inquiryJsonLd(lang: Lang) {
  const t = copy[lang];
  const url = abs(inquiryPath(lang));
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": `${url}#webpage`,
        url,
        name: t.inquiry.meta.title,
        description: t.inquiry.meta.description,
        inLanguage: lang,
        dateModified: BUILD_DATE,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": BUSINESS_ID },
      },
      breadcrumbs([
        { name: t.work.home, path: localePath[lang] },
        { name: t.inquiry.indexLabel, path: inquiryPath(lang) },
      ]),
    ],
  };
}
