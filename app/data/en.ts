import { appImages, testimonialImages } from "./shared";
import type { Dictionary } from "./types";

export const en: Dictionary = {
  dir: "ltr",
  // The title leads with the name (it is the brand, and the template for
  // every other page is derived from the part before "|") and then says what
  // a searcher would type: role, stack, city. "Abdullah Mohamed" on its own is
  // a very common name — the qualifiers are what make the entity findable.
  meta: {
    title: "Abdullah Mohamed | Senior Full-Stack & Flutter Engineer, Cairo",
    description:
      "Senior software engineer in Cairo: full-stack web (React, Node.js, PostgreSQL), Flutter apps, real-time AI. 10+ apps shipped. Open to freelance and senior remote roles.",
    cardEyebrow: "Senior Software Engineer · Cairo, Egypt · Open to freelance",
    // "Shipped", never "live": not every shipped app is still on a store.
    social:
      "Senior engineer behind the real-time AI layer of a 200,000-student tutor. Full-stack, AI and Flutter apps shipped across Egypt, the Gulf, Europe, US.",
  },
  skipLink: "Skip to content",
  // The homepage sections, in page order. Also rendered by the sub-page
  // footer's "Sections" column and driven by the homepage scrollspy.
  nav: [
    ["Work", "#work"],
    ["Experience", "#experience"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ],
  name: "Abdullah Mohamed",
  role: "Senior Software Engineer",
  place: "Cairo, Egypt",
  backToTop: "Back to top",
  themeToggle: "Light",
  darkToggle: "Dark",
  langToggle: "عربي",
  language: {
    label: "Language",
    options: {
      en: "English",
      ar: "العربية",
    },
  },
  hero: {
    // The first two meta items are rendered inside the H1 (see HomeHero.tsx),
    // so the page's one heading names the person and the role. "Remote" is
    // there because it is the first thing a non-Egyptian recruiter needs to
    // know, and it is true (the DIB and RevealSite roles were remote).
    eyebrow: "Abdullah Mohamed — Senior Software Engineer",
    place: "Cairo, Egypt · Remote",
    status: "Open to senior remote roles and freelance projects",
    title: "Products that ship,",
    titleAccent: "and hold up in production.",
    roleLine: "Senior Software Engineer · Full-Stack, AI & Mobile Products",
    // Appenza and Faheem are here on purpose: "Abdullah Mohamed" collides with
    // several other engineers of the same name and title, and these are the
    // disambiguators a search engine can attach the entity to. The specialty
    // (full-stack, real-time AI, Flutter) lives here and in the meta title
    // now that the headline is a claim rather than a list.
    lead: "Senior engineer at Appenza Studio, building Faheem — the Egyptian Ministry of Education's AI tutor, 200,000+ students, real-time voice. 10+ apps in the App Store and Google Play for teams in Egypt, Germany, the UAE, and the US.",
    explore: "Explore selected work",
    talk: "Let's talk",
    cv: "Download CV",
    primary: "Book a free call",
    availability: "Open to freelance, contracts, and product partnerships",
    facts: [
      ["Now", "Senior Software Engineer, Appenza Studio"],
      ["Previously", "DIB GmbH (Germany) · RevealSite (US) · Zeyada"],
      ["Works across", "Web, mobile, backend, real-time AI, infrastructure"],
    ],
    factsLabel: "Current role and background",
  },
  home: {
    chrome: {
      primaryNav: "Primary",
      stickyNav: "Sections",
      menu: "Menu",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    theme: {
      label: "Colour theme",
      system: "Auto",
      light: "Light",
      dark: "Dark",
    },
    // Faheem drawn as the layers it runs on — every line is stated in the
    // Faheem case study.
    strata: {
      label: "Faheem — the real-time layer",
      stat: "200,000+ students",
      ariaLabel: "Faheem: the real-time layer — read the case study",
      cursor: "Read the Faheem case study",
      layers: [
        { layer: "Client", detail: "Flutter · 16 modules in clean architecture · full Arabic RTL" },
        { layer: "Transport", detail: "WebSocket — answers arrive token by token" },
        { layer: "Model", detail: "Azure OpenAI streaming · AI-generated lessons" },
        { layer: "Voice", detail: "Speech-to-text → model → text-to-speech in ~300–500 ms" },
        { layer: "Environments", detail: "Dev · Staging · QA · Prod — students never see a QA build" },
      ],
    },
    proof: {
      eyebrow: "In production",
      body: "students on Faheem, the Egyptian Ministry of Education's AI tutor. I work on its real-time layer: streamed answers, and voice at a ~300–500 ms round-trip.",
      products: "Products",
    },
    work: {
      role: "Role",
      stack: "Stack",
      cursor: "View case study",
      alsoShipped: "Also shipped to the stores",
    },
    talia: {
      label: "System diagram",
      products: "Talia 360 · Talia Learn",
      authority: "Authority",
      ministry: "Ministry",
      school: "School",
      live: "Live",
      pilot: "Parkway",
      roles: ["Teacher", "Student", "Principal", "Admin"],
      nextTenant: "Next tenant",
      notes: [
        {
          label: "Authorization",
          title: "Deny by default",
          body: "Health, counselling and special-needs records — no admin override.",
        },
        {
          label: "Data layer",
          title: "datasource → repository → query",
          body: "Every screen verified against the live Go/REST backend.",
        },
      ],
    },
    // Each point on the map is a layer built or integrated on that product,
    // taken from its case study or experience entry — nothing appears here
    // that the rest of the site doesn't show.
    stack: {
      heading: {
        eyebrow: "Across the stack",
        title: "One engineer, every layer of the product.",
        body: "Nine products, six layers. Each point is a layer I built or integrated on that product. Select a product to see what it took.",
      },
      layerLabel: "Layer",
      pickerLabel: "Products by layer",
      layers: [
        { key: "mobile", name: "Mobile" },
        { key: "web", name: "Web" },
        { key: "api", name: "APIs & backend" },
        { key: "rt", name: "Real-time & AI" },
        { key: "data", name: "Data" },
        { key: "infra", name: "Infrastructure" },
      ],
      products: [
        {
          name: "Faheem",
          context: "Appenza Studio · AI tutor",
          slug: "faheem",
          layers: {
            mobile: "Flutter · 16 modules in clean architecture · full Arabic RTL",
            rt: "Azure OpenAI streaming over WebSocket · STT/TTS voice at ~300–500 ms",
            data: "Firebase · ~52 analytics events across 14 modules",
            infra: "Dev / Staging / QA / Prod builds · Crashlytics · FCM",
          },
        },
        {
          name: "Talia",
          context: "Appenza Studio · national LMS + SIS",
          slug: "talia",
          layers: {
            web: "SvelteKit 5 · TypeScript · Tailwind CSS 4",
            api: "Typed Go/REST integration · JWT · deny-by-default RBAC",
            data: "TanStack Query over a datasource → repository → query layer",
          },
        },
        {
          name: "IMOX · YOLO",
          context: "DIB GmbH · social commerce, clinics",
          slug: "imox-yolo",
          layers: {
            mobile: "Flutter · cold start ~6 s → 1.5 s · install 86 → 51 MB",
            api: "Airbridge deep links (deferred included) · Mixpanel funnels",
            data: "Reel caching, lazy initialisation, pagination prefetch",
          },
        },
        {
          name: "Xera Lab",
          context: "Independent · sole engineer",
          slug: "xera-lab",
          layers: {
            web: "Flutter Web customer portal and admin dashboard",
            api: "Node.js / Express · JWT role access",
            data: "PostgreSQL · X-rays on AWS S3",
            infra: "Docker Compose behind Nginx with TLS",
          },
        },
        {
          name: "BTC",
          context: "Appenza Studio · gold commerce",
          slug: "btc",
          layers: {
            mobile: "Two Flutter apps, one codebase — retail and B2B",
            api: "GraphQL — one catalogue, two shapes",
          },
        },
        {
          name: "RevealSite",
          context: "RevealSite · US pharmacies",
          layers: {
            mobile: "White-label Flutter apps provisioned by client ID",
            api: "Django REST · OTP / JWT auth",
            data: "Hive offline-first caching",
          },
        },
        {
          name: "Zeyada",
          context: "Zeyada · school operations",
          layers: {
            mobile: "Flutter · Guardsquare shielding",
            rt: "Realtime 1-to-1 and group chat with moderation",
            api: "PayTabs fees · Magento GraphQL store",
          },
        },
        {
          name: "Ezhal",
          context: "Independent · car-service platform",
          layers: {
            mobile: "Three role-specific Flutter apps · Riverpod",
            rt: "Live technician tracking",
            api: "MyFatoorah · Stripe · Apple PassKit",
            data: "Firebase",
          },
        },
        {
          name: "FasTap",
          context: "Independent · NFC business card",
          layers: {
            mobile: "Flutter app that writes profiles to NFC cards",
            web: "Flutter Web profile page for tap-to-share links",
            infra: "Firebase · Nginx",
          },
        },
      ],
      capabilitiesLabel: "Capabilities",
      capabilities: [
        {
          name: "Mobile",
          body: "iOS and Android from one clean-architecture codebase — auth, payments, analytics, push, offline, and the store release.",
          tech: "Flutter · Dart · BLoC / Provider · Riverpod · GetX · Hive · deep linking · NFC",
        },
        {
          name: "Web frontend",
          body: "Typed SPAs and admin consoles wired to live APIs and verified against the deployed environment.",
          tech: "TypeScript · SvelteKit 5 · React · Next.js · Tailwind CSS · TanStack Query",
        },
        {
          name: "Backend & APIs",
          body: "Services and business logic over PostgreSQL, with JWT auth, role-based access, and third-party integrations.",
          tech: "Node.js / Express · PostgreSQL · REST · GraphQL · JWT · OAuth2 · OpenAPI",
        },
        {
          name: "Real-time & AI",
          body: "LLM streaming over WebSocket, voice with speech-to-text and text-to-speech, and barge-in control that holds up in a live session.",
          tech: "Azure OpenAI · WebSocket · STT / TTS · VAD · animation sync",
        },
        {
          name: "Data & infrastructure",
          body: "Databases, deployment, and environments — Docker Compose behind Nginx with TLS, CI/CD, and separate Dev/Staging/QA/Prod.",
          tech: "Docker · Nginx (TLS) · AWS S3 · Codemagic · GitHub Actions · Vercel",
        },
        {
          name: "Product engineering",
          body: "Multi-tenancy, deny-by-default RBAC, and performance work measured in numbers — owned from requirement to production.",
          tech: "RBAC & multi-tenancy · multi-environment delivery · Firebase · Mixpanel · Airbridge",
        },
      ],
    },
    experience: {
      tabsLabel: "Roles",
      products: "Products",
      fullCv: "Full CV",
    },
    // Each principle is the one-line version of a decision written up in the
    // cited case study.
    principles: {
      title: "Principles",
      note: "Taken from the decisions written up in the case studies.",
      items: [
        { text: "Latency is a budget, not a target.", slug: "faheem" },
        { text: "Deny by default.", slug: "talia" },
        { text: "The workflow is the schema.", slug: "xera-lab" },
        { text: "Speed comes from deciding what to leave unloaded.", slug: "imox-yolo" },
        { text: "No dummy data, ever, past the first integration.", slug: "talia" },
      ],
    },
  },
  // Scale and ownership, not tenure: "4+ years" next to "Senior" invited the
  // wrong question, and the years are still in the FAQ and on /cv/.
  proof: [
    ["200,000+", "students on Faheem"],
    ["10+", "apps in the App Store and Google Play"],
    ["4 companies", "in 3 countries"],
    ["Since 2022", "shipping production software"],
  ],
  logosLabel: "Built with teams. Shipped for real users.",
  appsLabel: "Apps & products",
  caseStudiesHeading: {
    eyebrow: "Selected work",
    title: "Three products, from unclear problem to production.",
    body: "The problem, my role, how I built it — and the decisions I'd defend in an interview.",
  },
  selectedWorkLabels: {
    products: "products",
    productBuild: "Product build",
    appStore: "App Store",
    googlePlay: "Google Play",
    shipped: "Shipped",
    retired: "Retired",
    unreleased: "Unreleased",
  },
  caseLabels: {
    challenge: "The challenge",
    role: "My role",
    process: "How I built it",
    decisions: "Decisions, and why",
    results: "Results",
  },
  workHeading: {
    eyebrow: "Experience",
    title: "Professional roles, grouped by the products I shipped.",
    body: "Each role below shows the company context, the products I worked on there, and the engineering outcomes instead of repeating the same apps across multiple sections.",
  },
  servicesHeading: {
    eyebrow: "For a project",
    title: "Ways I can help.",
    body: "The value is not only writing code. It is turning unclear product needs into shipped systems with fewer moving parts.",
  },
  plansHeading: {
    eyebrow: "Pricing",
    title: "What I build. Starting prices.",
    body: "Every price is a starting point and negotiable based on your scope and requirements. We start with a free call, then I send a written proposal with the final price, the timeline, and the payment phases.",
  },
  processHeading: {
    eyebrow: "Process",
    title: "How working with me looks.",
    body: "From first call to handoff — built so you always know what's happening and what it costs.",
  },
  process: [
    {
      title: "Intro call",
      body: "A free call. You describe the product and what's blocking you; I tell you honestly whether and how I can help.",
    },
    {
      title: "Written proposal",
      body: "Scope, price, timeline and payment phases — all in writing before any code is written. You approve it, then we start.",
    },
    {
      title: "Milestone delivery",
      body: "You get working, testable software at every milestone, not a status update.",
    },
    {
      title: "Handoff",
      body: "Deployment, documentation and a codebase the next engineer can maintain. The code is yours.",
    },
  ],
  testimonialsHeading: {
    eyebrow: "Recommendations",
    title: "Feedback from teams and clients.",
    body: "Real words from people I have shipped with.",
  },
  testimonialLabels: {
    verified: "Verified · LinkedIn",
    view: "View recommendation on LinkedIn",
  },
  caseStudies: [
    {
      slug: "faheem",
      title: "Faheem",
      type: "Arabic AI tutoring platform",
      context: "Appenza Studio · product team",
      featured: true,
      image: appImages.faheem,
      // The product UI is Arabic-only, so these captions describe what is
      // visible in each screenshot for readers who cannot read the interface.
      shots: [
        {
          src: "/images/shots/faheem1.webp",
          alt: "Faheem's worked solution screen: three numbered steps solving 2x + 10 = 50, a highlighted answer of x = 20, and chips listing the underlying concepts.",
          caption:
            "The worked solution: numbered steps, the final answer called out on its own, and chips naming the concepts the student just used.",
        },
        {
          src: "/images/shots/faheem2.webp",
          alt: "Faheem's image analysis screen: a photo of a handwritten equation at the top, then the tutor restating the question with an out-of-syllabus notice above it.",
          caption:
            "A student photographs a handwritten equation. Faheem reads it, restates the question, and flags up front that it falls outside the loaded syllabus before answering.",
        },
        {
          src: "/images/shots/faheem3.webp",
          alt: "Faheem's chemistry chat: a student question about transition elements, the tutor's answer with key terms emphasised, and quick-reply chips for practice, example, and explain.",
          caption:
            "Subject chat with a progress ring in the header — the tutor answers, corrects a common misconception, asks a check question back, then offers practice, example, or explain.",
        },
      ],
      summary:
        "The real-time layer of an Arabic AI tutor for 200,000+ students: streamed answers, voice-to-voice at ~300–500 ms, and AI-generated lessons — on a 16-module clean architecture.",
      challenge:
        "Students needed tutoring that felt live and trustworthy in Arabic — real-time answers, voice, and visuals — not a generic chatbot bolted onto a form. A tutor that pauses to think reads as broken to a fourteen-year-old, so the latency budget was a product requirement, not an optimisation.",
      role: "Core engineer on the realtime tutoring layer and the app architecture the rest of the product is built on.",
      process: [
        "Built realtime AI tutoring over WebSocket with Azure OpenAI streaming so answers arrive token by token.",
        "Engineered a voice-to-voice tutor at ~300–500 ms round-trip with speech-to-text and text-to-speech.",
        "Built the AI Board session engine: AI-generated lessons rendered as streamed multimodal scenes, synchronising TTS audio, live subtitles, and CustomPainter-animated diagrams into frame-accurate playback per curriculum topic.",
        "Added an adaptive Smart Quiz with AI-generated questions, and a camera-based Solve feature for step-by-step maths and science problems.",
        "Structured 16 modules in clean architecture (Data → Domain → Presentation) with Provider, flutter_modular DI, Dio interceptors and dartz Either, plus full Arabic RTL, ~52 analytics events across 14 modules, Crashlytics, FCM, and Dev/Staging/QA/Prod builds.",
      ],
      // Sourced from the work itself: each of these was a choice with an
      // alternative, and the reason is the constraint that ruled it out.
      decisions: [
        {
          title: "WebSocket, not request/response",
          body: "A tutor that returns a finished paragraph feels broken even when it is fast — the student stares at a spinner. Streaming over a persistent socket puts the first token on screen in a fraction of the total generation time, and the same connection carries the voice session, so there is one transport to keep alive rather than two.",
        },
        {
          title: "Native platform audio with VAD thresholds, to stop the model interrupting itself",
          body: "In voice mode the tutor was reacting to its own output: its speech re-entered the microphone and was transcribed as a new student question. Routing capture and playback through native platform audio and setting voice-activity-detection thresholds for barge-in fixed it — the student can still cut the tutor off mid-sentence, which is what makes it feel like a conversation, but the tutor can no longer cut itself off.",
        },
        {
          title: "~300–500 ms as a budget, not a target",
          body: "The round-trip number was fixed first and every layer was built to fit inside it — streaming rather than batching, native audio rather than a plugin chain, and no post-processing between recognition and the model. Treating it as a budget is what kept it from drifting as features landed.",
        },
        {
          title: "Frame-accurate sync instead of three independent players",
          body: "A generated lesson plays audio, subtitles, and an animated diagram at once. Driven separately they drift, and a diagram that explains the wrong sentence is worse than no diagram. The Board engine plays them as one timeline, so the drawing, the caption, and the voice stay on the same beat.",
        },
        {
          title: "Four build environments from the start",
          body: "An app that is the Ministry of Education's official product cannot be tested against production. Dev, Staging, QA and Prod builds were set up before the feature work, which is why 200,000 students never saw a QA release.",
        },
      ],
      results: [
        { value: "200,000+", label: "K-12 students" },
        { value: "8,500+", label: "monthly active users" },
        { value: "~300–500 ms", label: "voice round-trip" },
        { value: "16", label: "modules in clean architecture" },
      ],
      stack: [
        "Flutter",
        "Azure OpenAI",
        "WebSocket",
        "Firebase",
        "Clean Architecture",
      ],
      links: [
        {
          label: "App Store",
          href: "https://apps.apple.com/us/app/faheem-ai/id6743378136",
        },
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.moe.fahem",
        },
      ],
      published: "2026-07-11",
      appCategory: "EducationalApplication",
      platforms: ["iOS", "Android"],
    },
    {
      // TODO(abdullah): no screenshots for Talia — the detail page renders
      // without a "From the product" section until some exist.
      slug: "talia",
      // Second of the homepage's three featured studies (the system diagram).
      featured: true,
      title: "Talia",
      type: "National LMS + SIS platform",
      context: "Appenza Studio · frontend & integration",
      image: appImages.talia,
      summary:
        "An Arabic-first, multi-tenant education platform (LMS + SIS) for Egyptian schools, built to run a full authority → school hierarchy. Live at its first school, Parkway, and in active development as the platform grows.",
      challenge:
        "A school network needed one system for student records, learning, and operations — Arabic-first, RTL, and Hijri-aware — with confidential health, counseling, and special-needs data that not even school admins can override, and a data model that scales from one school to an authority running many.",
      role: "Frontend & integration engineer across the Talia 360 admin/ministry console and the Talia Learn app — wiring screens from mock data to a live Go/REST backend and verifying every one against the deployed environment.",
      process: [
        "Built and integrated screens for Talia 360 (ministry/admin console) and Talia Learn (learning app) as SvelteKit 5 + Tailwind CSS 4 SPAs over a typed Go/REST backend.",
        "Wired product screens from mock/seed data to live API reads and writes with a layered datasource → repository → query architecture using TanStack Query.",
        "Implemented RBAC-aware, role-based views (teacher / student / principal / admin) over a deny-by-default authorization model across a Ministry→School entity tree.",
        "Ran live in-browser QA to confirm real-data rendering, close mock-vs-live gaps, and file backend contract issues — holding a no-dummy-data standard.",
      ],
      decisions: [
        {
          title: "Deny by default, across a Ministry → School tree",
          body: "The records in this system include health, counselling and special-needs notes, and the people most likely to be asked to “just check something” are school admins. So permission is not granted by role and then restricted — nothing is visible until a rule says it is, and a school administrator has no override for confidential records. The failure mode of an allow-by-default model is a quiet leak; the failure mode of this one is someone filing a ticket.",
        },
        {
          title: "A datasource → repository → query layer, not fetch calls in components",
          body: "Twenty-five modules were being built against a backend that was still moving. Putting every read and write behind a typed layer with TanStack Query on top meant a changed endpoint was a one-file fix rather than a search across screens, and caching and refetch behaviour were decided once instead of per component.",
        },
        {
          title: "No dummy data, ever, past the first integration",
          body: "Screens built against mock fixtures pass review and fail in production, because the mock is always tidier than the API. Every screen was re-verified in-browser against the deployed environment, and the gaps that surfaced were filed as backend contract issues rather than patched in the client.",
        },
      ],
      results: [
        { value: "25", label: "functional modules" },
        { value: "534", label: "requirements in scope" },
        { value: "Multi-tenant", label: "Ministry → School" },
      ],
      stack: [
        "SvelteKit 5",
        "TypeScript",
        "Tailwind CSS 4",
        "TanStack Query",
        "REST / JWT",
        "RBAC",
      ],
      published: "2026-07-23",
    },
    {
      // The most senior-sounding story on the site, and it was one paragraph
      // in the timeline: two live consumer apps, measured before and after.
      slug: "imox-yolo",
      title: "IMOX & YOLO",
      type: "Performance and platform migrations on live apps",
      context: "DIB GmbH · product engineer",
      featured: true,
      image: appImages.imox,
      shots: [
        {
          src: "/images/shots/imox1.webp",
          alt: "IMOX discovery screen: a category rail down the left (Fashion, Beauty, Electronics, Groceries), and rows of products — men's shoes, women's shoes, accessories — each with a photo and an EGP price.",
          caption:
            "The discovery feed: categories down one side, priced product rows across, and the reel-backed catalogue this app is built around.",
        },
        {
          src: "/images/shots/imox2.webp",
          alt: "IMOX engage screen: a full-screen short video of a technician at work, with a product card overlaid at the bottom offering the service shown and a side rail of engagement actions.",
          caption:
            "A reel doubling as a storefront — the video plays full screen and the thing it shows is buyable from the card on top of it. This is the screen whose cold start had to come down.",
        },
        {
          src: "/images/shots/yolo1.webp",
          alt: "YOLO HR module: an employee list with a search field and rows showing photo, first name, last name, and a role dropdown set to Administrator or Doctor.",
          caption:
            "YOLO's HR module: staff records with per-row roles — one of five domains (HR, appointments, patients, inventory, billing) in a single clinic app.",
        },
        {
          src: "/images/shots/yolo2.webp",
          alt: "YOLO appointment details: tabs for Overview, Services, Medical Records and Payments, above a patient form with name, gender, date of birth, an international phone field and an address field with Google lookup.",
          caption:
            "Appointment detail, with the patient's clinical and payment history one tab away — and an address field wired to Google lookup, because the clinics span three countries.",
        },
        {
          src: "/images/shots/yolo3.webp",
          alt: "YOLO CRM module: a searchable patient list, each row expanding to show the patient's name and phone number.",
          caption:
            "The CRM side: the same patient records, reached the way front-desk staff actually look for them.",
        },
      ],
      summary:
        "Two live consumer apps at one company, in one year: a reels cold start cut from ~5–6 s to ~0.5–1.5 s, a deep-link migration completed before Firebase's shutdown, and a clinic app 41% smaller.",
      challenge:
        "Both products already had users, which is the hard version of this work: nothing could be rewritten, every change had to survive a store release, and one of them was racing a third-party deprecation with a fixed date.",
      role: "Product engineer on both apps — owning the performance work, the deep-linking and analytics migration, and a run of client-requested features.",
      process: [
        "Redesigned IMOX's reel preloading: prime only the first two reels at splash, prefetch the next two after launch, then paginate ten at a time with a one-page buffer.",
        "Migrated deep linking off the deprecated Firebase Dynamic Links to Airbridge — deferred deep links included — preserving attribution continuity ahead of the shutdown, and integrated Mixpanel identity, events and funnels.",
        "Cut YOLO's install size by 41%, from 86 MB to 51 MB, through build optimisation, asset compression, and a dependency audit.",
        "Delivered 10+ client-requested features across appointment scheduling, HR, patient records and inventory for a platform running in clinics in Egypt, Germany and the UAE.",
      ],
      decisions: [
        {
          title: "Fix the preloading budget, not the video pipeline",
          body: "A reels app is slow at launch because it fetches too much before showing anything, not because decoding is slow. Priming exactly two reels at splash is the smallest amount that still lets someone swipe immediately; the next two arrive after first paint, and from there a ten-at-a-time page with one page buffered keeps the scroll ahead of the user without downloading a feed nobody will watch. The result — roughly 6 s to under 1.5 s — came from deciding what to leave unloaded.",
        },
        {
          title: "Migrate deep links early, and carry deferred links across",
          body: "Firebase Dynamic Links had an announced shutdown date, so the migration was going to happen either before it or during an outage. The part that is easy to drop is deferred deep linking — the case where someone taps a link, installs the app, and should still land on the thing they tapped. That path is invisible in testing until a real install breaks, so it was ported deliberately rather than discovered later, and attribution stayed continuous across the switch.",
        },
        {
          title: "Audit dependencies before compressing assets",
          body: "41% off an install size is not one trick. The order matters: a dependency audit removes whole libraries and their transitive weight first, then build configuration, then asset compression on what is genuinely left. Starting with image compression would have shaved a few megabytes off a bundle that was still carrying code nobody called.",
        },
      ],
      results: [
        { value: "~6 s → 1.5 s", label: "IMOX cold start" },
        { value: "41%", label: "smaller install (86 → 51 MB)" },
        { value: "3 countries", label: "clinics running YOLO" },
        { value: "10+", label: "client features delivered" },
      ],
      stack: [
        "Flutter",
        "Airbridge",
        "Mixpanel",
        "Firebase",
        "Performance profiling",
      ],
      links: [
        {
          label: "App Store",
          href: "https://apps.apple.com/us/developer/yolo-gmbh-germany/id1644853629",
        },
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/developer?id=Dib+GmbH",
        },
      ],
      published: "2026-09-16",
      appCategory: "BusinessApplication",
      platforms: ["iOS", "Android"],
    },
    {
      slug: "xera-lab",
      // The homepage row shows "1 engineer", not the first result.
      highlight: 2,
      title: "Xera Lab",
      type: "Dental case-management platform",
      context: "Independent · sole engineer, full stack",
      image: appImages.xera,
      summary:
        "A dental X-ray lab's whole workflow — intake, assignment, review, delivery — as one platform: portal, admin dashboard, API, database and the servers it runs on, all built by one engineer.",
      challenge:
        "A dental lab receives cases from clinics, routes them to technicians, has a doctor review the result, and sends it back. That ran on email and phone calls, so nobody could answer where a case was without asking someone. It needed to be one system with three different kinds of user in it — and there was no team to split the work across.",
      role: "Sole engineer. Frontend, backend, database, deployment and the TLS certificate.",
      process: [
        "Built the customer portal and the admin dashboard, with role-based access for Admin, Doctor and Technician.",
        "Modelled the full case lifecycle — intake → assignment → review → delivery — so a case's state is a fact in the database rather than a conversation.",
        "Wrote the entire Node.js/Express + PostgreSQL backend with JWT authentication, and put X-ray uploads on AWS S3.",
        "Deployed it with Docker Compose behind Nginx with TLS.",
      ],
      decisions: [
        {
          title: "Three roles in the data model, not three apps",
          body: "Admin, Doctor and Technician see different things, but they see the same case. Splitting them into separate applications would have meant three codebases and a sync problem; putting the roles in the authorisation layer over one model meant a case has one state, and who can see or move it is a rule rather than a build.",
        },
        {
          title: "The workflow is the schema",
          body: "Intake, assignment, review and delivery are states a case moves between, so they live in the database with the transitions that are legal from each one. The alternative — a status string set by whichever screen was open — is how a case ends up delivered and unreviewed at the same time.",
        },
        {
          title: "S3 for the X-rays, Postgres for everything else",
          body: "Dental X-rays are large, numerous, and never queried by content. Keeping them out of the database kept backups small and restores fast, and meant the API serves references rather than proxying megabytes.",
        },
      ],
      results: [
        { value: "3 roles", label: "Admin, Doctor, Technician" },
        { value: "4 stages", label: "intake → assignment → review → delivery" },
        { value: "1 engineer", label: "frontend, backend, infra" },
      ],
      stack: [
        "Flutter Web",
        "Node.js / Express",
        "PostgreSQL",
        "JWT",
        "Docker Compose",
        "Nginx (TLS)",
        "AWS S3",
      ],
      published: "2026-09-16",
    },
    {
      slug: "btc",
      title: "BTC",
      type: "Gold & jewellery commerce, retail and wholesale",
      context: "Appenza Studio · product engineer",
      image: appImages.btc,
      shots: [
        {
          src: "/images/shots/btc1.webp",
          alt: "BTC storefront home: a Silver Collection banner, selectors for delivery country (Egypt, EGP) and language (English), a Gold/Silver toggle, category tiles for coins, ingots, bars and wearables, and a Calculate Your Savings panel taking an amount in EGP.",
          caption:
            "The storefront: metal and category up front, delivery country and language chosen per visit — and a savings calculator, because people buy gold by budget as often as by product.",
        },
        {
          src: "/images/shots/btc2.webp",
          alt: "BTC gift collections screen: Baby Gifting with 19 items and Happy Birthday with 153 items, above a Best Sellers row showing a wooden box of 25 cards at 1,200 EGP and a 50g Kaaba ingot at 338,852.48 EGP.",
          caption:
            "Curated collections above best sellers. Prices run from a 1,200 EGP gift to a 338,000 EGP ingot in the same list, which is the range the UI has to stay legible across.",
        },
        {
          src: "/images/shots/btc3.webp",
          alt: "BTC coins category: a two-column grid of gold coins — 40g and 8g Al Masjid Annabawi, 8g and 4g Angel — each with a photo, weight, price in EGP, and an Add To Cart button.",
          caption:
            "A category grid priced to the piastre. Gold prices move, so the number on the card is a live figure rather than a stored one.",
        },
      ],
      summary:
        "Two apps from one Flutter codebase for one of Egypt's largest gold and jewellery houses: a consumer storefront and a B2B wholesale ordering app, both over the same GraphQL API.",
      challenge:
        "The same business sells a 1,200 EGP gift to a walk-in customer and a 50-gram ingot to a merchant, on prices that move with the gold market. Two audiences, two buying flows, one catalogue — and a company that did not want two engineering efforts.",
      role: "Product engineer on both apps and the shared codebase behind them.",
      process: [
        "Built the customer storefront — collections, categories, a savings calculator, cart and checkout — with per-visit delivery country and language.",
        "Built the B2B merchant app for wholesale ordering from the same codebase and the same catalogue.",
        "Integrated both against a GraphQL API so a price or a product exists once and both apps read it.",
        "Shipped both to the App Store and Google Play.",
      ],
      decisions: [
        {
          title: "One codebase, two products — not one app with a switch",
          body: "Retail and wholesale share a catalogue and nothing else: different prices, different quantities, different checkout. A single app gated on an account type would have put wholesale pricing one bug away from a consumer's screen. Two builds from one codebase keeps the shared model shared and the flows genuinely separate.",
        },
        {
          title: "GraphQL, because the two apps ask different questions of the same catalogue",
          body: "The storefront wants a product with images and a retail price; the merchant app wants the same product with tiers and stock. Against REST that is either two sets of endpoints or over-fetching on both sides. One graph lets each app ask for the shape it renders.",
        },
        {
          title: "Country and language as a per-visit choice, not a device setting",
          body: "Delivery country decides price and availability, and the buyer is not always in the country they are shipping to. Making both explicit selectors in the header — rather than inferring from the locale — avoids quoting someone a price that changes at checkout.",
        },
      ],
      results: [
        { value: "2 apps", label: "retail + B2B, one codebase" },
        { value: "Live", label: "App Store and Google Play" },
        { value: "GraphQL", label: "one catalogue, two shapes" },
      ],
      stack: ["Flutter", "GraphQL", "Clean Architecture", "E-commerce"],
      links: [
        {
          label: "App Store",
          href: "https://apps.apple.com/us/app/btc-e-shop/id6757194529",
        },
        {
          label: "Google Play",
          href: "https://play.google.com/store/apps/details?id=com.bulliontradingcenter.btc.eshop",
        },
      ],
      published: "2026-09-16",
      appCategory: "ShoppingApplication",
      platforms: ["iOS", "Android"],
    },
    {
      slug: "jaweb",
      highlight: 2,
      title: "Jaweb",
      type: "Competitive trivia game",
      context: "Independent build · shipped 2025 · retired",
      image: appImages.jaweb,
      shots: [
        {
          src: "/images/jaweb1.webp",
          alt: "Jaweb match setup sheet: fields for the game name and both team names, each with a stepper setting how many players are on that side.",
          caption:
            "Match setup: name the game, name both teams, and set the player count on each side before the round starts.",
        },
        {
          src: "/images/jaweb2.webp",
          alt: "Jaweb category board: six illustrated categories, each with paired 300, 500, and 700 point tiles, and a score stepper plus lifelines for each team along the bottom.",
          caption:
            "The board — six categories, three point tiers per category, and each team's running score and lifelines pinned to the bottom corners.",
        },
        {
          src: "/images/jaweb3.webp",
          alt: "Jaweb question view: a photo prompt with the question and its point value, a countdown timer, reveal and score buttons, and both teams' totals listed alongside.",
          caption:
            "A question in play: countdown timer, the point value at stake, reveal-answer and mark-correct controls, with both teams' totals and remaining lifelines alongside.",
        },
      ],
      summary:
        "A living-room trivia night turned into a fair, automated product with payments.",
      challenge:
        "Turn an informal two-team quiz game into a product that referees itself, scores fairly, and takes payment — without a human host keeping track.",
      role: "Sole engineer. Designed and built the whole app from scratch.",
      process: [
        "Modeled two teams, six categories, and three difficulty levels with referee logic that enforces the rules.",
        "Automated scoring so a full match runs without a human keeping score.",
        "Integrated My Fatoorah payments and packaged it on a clean-architecture Flutter codebase.",
      ],
      results: [
        { value: "6", label: "categories" },
        { value: "3", label: "difficulty levels" },
        { value: "Automatic", label: "referee + scoring" },
      ],
      stack: ["Flutter", "Clean Architecture", "My Fatoorah", "Payments"],
      published: "2026-07-11",
      appCategory: "GameApplication",
      platforms: ["iOS", "Android"],
    },
  ],
  work: {
    meta: {
      title: "Case studies — products I built and shipped",
      description:
        "Case studies by Abdullah Mohamed, senior full-stack & Flutter engineer in Cairo: an Arabic AI tutor for 200,000+ students, a national multi-tenant LMS, and more.",
    },
    caseMeta: {
      title: "{title} case study — {type}",
      description:
        "{summary} Case study by Abdullah Mohamed: the challenge, his role, how it was built with {stack}, and the results.",
    },
    eyebrow: "Work",
    title: "Products I built, written up end to end.",
    body: "One page per project: the problem, my role, how it was built, and what shipped. Everything here is work that is live or has been in real users' hands.",
    navLabel: "Work pages",
    home: "Home",
    readCase: "Read the case study",
    viewAll: "View all work",
    backToIndex: "All work",
    more: "More case studies",
    relatedServices: "Hire me for the same thing",
    alsoShipped: {
      eyebrow: "Also shipped",
      title: "Other products in users' hands.",
      body: "Shipped apps that do not have a written case study yet. Where a build is on a store, the store link is the proof.",
    },
    screenshots: "From the product",
    screenshotsNote:
      "Each caption describes what the screen is doing — several of these products have an Arabic-only interface.",
    links: "See it live",
    cta: {
      title: "Building something like this?",
      body: "Tell me what you are trying to ship and I will tell you, honestly, whether I am the right person to build it.",
      button: "Start a project",
    },
  },
  // Apps with a store link but no written case study. YOLO and BTC used to be
  // here; both now have their own page under /work/, and listing a product in
  // both places says the same thing twice.
  selectedWork: [
    {
      key: "qfight",
      title: "Q-Fight Gym",
      tagline:
        "Official app for a professional Muay Thai gym in Qatar, coached by Thai world-title fighters.",
      image: appImages.qfight,
    },
    {
      key: "almuslim",
      title: "Al-Muslim",
      tagline:
        "A daily Muslim companion: Quran, adhkar & duas, accurate prayer times, and qibla — with smart reminders.",
      image: appImages.almuslim,
    },
    {
      key: "iccd",
      title: "ICCD Hub",
      tagline:
        "Bilingual members' app for the Islamic Corporation for the Development of the Private Sector — events, prayer times, Qibla, calendar, and tasks.",
      image: appImages.iccd,
    },
  ],
  experiences: [
    {
      date: "Jan 2026 - Present",
      role: "Senior Software Engineer",
      company: "Appenza Studio",
      location: "Full-time · Egypt",
      logo: "/images/company_logos/appenza.webp",
      summary:
        "Building the core of Faheem, an Arabic AI tutoring product used by 200,000+ K-12 students.",
      achievements: [
        "Developed realtime AI tutoring over WebSocket with Azure OpenAI streaming.",
        "Built voice tutor flows with STT/TTS and an AI board for generated educational visuals.",
        "Implemented clean architecture across 16 modules with localization, analytics, Crashlytics, FCM, and multi-environment builds.",
      ],
      apps: [
        {
          title: "Faheem",
          type: "AI education platform",
          image: appImages.faheem,
          body: "Arabic tutoring app with AI chat, voice tutor, smart quizzes, solve-by-camera, educational visuals, wallet, points, onboarding, and RTL UX.",
          stack: [
            "Flutter",
            "Azure OpenAI",
            "WebSocket",
            "Firebase",
            "Clean Architecture",
          ],
          metrics: [
            { value: "200,000+", label: "K-12 students" },
            { value: "8,500+", label: "monthly active" },
            { value: "16", label: "modules shipped" },
          ],
        },
        {
          title: "Talia",
          type: "Multi-tenant school platform",
          image: appImages.talia,
          body: "Arabic-first, multi-tenant LMS + SIS platform for Egyptian schools. Live at its first school, Parkway, and in active development. Building the SvelteKit web clients (Talia 360 admin console and Talia Learn) and integrating dozens of screens from mock data to a live Go/REST backend, with RBAC-aware role-based access across a Ministry→School entity tree.",
          stack: ["SvelteKit 5", "TypeScript", "Tailwind CSS 4", "TanStack Query", "RBAC"],
        },
        {
          title: "BTC",
          type: "Gold & jewelry commerce app",
          image: appImages.btc,
          shots: [
            "/images/shots/btc1.webp",
            "/images/shots/btc2.webp",
            "/images/shots/btc3.webp",
          ],
          body: "Commerce app for one of Egypt's largest gold and jewelry houses. Built the customer storefront and B2B merchant wholesale-ordering apps from a single shared Flutter codebase over a GraphQL API.",
          stack: [
            "Flutter",
            "GraphQL",
            "Multi-app",
            "E-commerce",
            "Clean Architecture",
          ],
        },
      ],
    },
    {
      date: "Sep 2024 - Jan 2026",
      role: "Software Engineer",
      company: "DIB GmbH",
      location: "Full-time · Germany remote",
      logo: "/images/company_logos/dibhoalding.webp",
      summary:
        "Worked on social commerce and clinic management products across Egypt, Germany, and UAE deployments.",
      achievements: [
        "Optimized startup and reels performance with lazy initialization, caching, and pagination prefetching.",
        "Migrated deep linking from Firebase to Airbridge and implemented Mixpanel events and funnels.",
        "Reduced YOLO app size from 86 MB to 51 MB and shipped 10+ client-requested features.",
      ],
      apps: [
        {
          title: "IMOX",
          type: "Social e-commerce",
          image: appImages.imox,
          shots: [
            "/images/shots/imox1.webp",
            "/images/shots/imox2.webp",
          ],
          body: "Video-first shopping app where sellers publish products as short reels and buyers shop through social content.",
          stack: ["Flutter", "Airbridge", "Mixpanel", "Caching", "Deep Links"],
        },
        {
          title: "YOLO",
          type: "Clinic management system",
          image: appImages.yolo,
          shots: [
            "/images/shots/yolo1.webp",
            "/images/shots/yolo2.webp",
            "/images/shots/yolo3.webp",
          ],
          body: "Clinic operations product covering HR, doctors, patients, appointments, inventory, billing, and multi-region feature delivery.",
          stack: ["Flutter", "Healthcare", "Optimization", "Multi-region"],
          metrics: [
            { value: "86 → 51 MB", label: "app size cut" },
            { value: "10+", label: "features shipped" },
          ],
        },
      ],
    },
    {
      date: "Nov 2023 - Feb 2025",
      role: "Software Engineer",
      company: "RevealSite",
      location: "Part-time · United States remote",
      logo: "/images/company_logos/revearsite.webp",
      summary:
        "Built and maintained white-label Flutter apps for independent and community pharmacies in the US.",
      achievements: [
        "Delivered refill, transfer, appointment, reminder, medication-history, and patient messaging workflows.",
        "Worked on one shared codebase provisioned by client ID with runtime branding and offline-first caching.",
        "Integrated OTP/JWT auth, request tracking, notifications, Google Maps links, and healthcare-focused flows.",
      ],
      apps: [
        {
          title: "RevealSite Platform",
          type: "White-label pharmacy platform",
          image: appImages.revealsite,
          body: "Shared pharmacy engagement platform powering branded patient apps with refills, transfers, appointments, reminders, and two-way messaging.",
          stack: ["Flutter", "Django REST", "JWT", "Hive", "Runtime branding"],
        },
        {
          title: "J&D Pharmacy",
          type: "Patient app",
          image: appImages.jd,
          body: "Neighborhood pharmacy app with OTP auth, guest refill checkout, prescription transfer, appointments, medication history, reminders, and health news.",
          stack: ["Flutter", "BLoC", "Dio", "Hive", "JWT"],
        },
        {
          title: "Medical Compounding Pharmacy",
          type: "Patient app",
          image: appImages.medical,
          body: "Compounding pharmacy app with pickup/delivery refills, prescription transfers, reminders, appointments, HIPAA consent, and secure request routing.",
          stack: ["Flutter", "Clean Architecture", "BLoC", "Hive"],
        },
        {
          title: "Quick RX",
          type: "Specialty pharmacy app",
          image: appImages.quickrx,
          body: "Specialty pharmacy app for refills, profile transfers, appointments, medication reminders, request tracking, and secure OTP/JWT authentication.",
          stack: ["Flutter", "Dio", "Hive", "Notifications", "JWT"],
        },
        {
          title: "Holland Discount Pharmacy",
          type: "Patient app",
          image: appImages.holland,
          body: "Independent pharmacy app with delivery/pickup refills, transfers, reminders, appointments, health news, and secure request routing.",
          stack: ["Flutter", "Clean Architecture", "BLoC", "Hive"],
        },
      ],
    },
    {
      date: "Apr 2023 - Sep 2024",
      role: "Software Engineer",
      company: "Zeyada",
      location: "Full-time",
      logo: "/images/company_logos/zeyada.webp",
      summary:
        "Worked on school management features for payments, chat, parent communication, and in-app commerce.",
      achievements: [
        "Built realtime 1-to-1 and group chat with mute, block, clear, and moderation controls.",
        "Integrated PayTabs for school fee payments.",
        "Implemented Guardsquare shielding and Magento GraphQL integration for the school store.",
      ],
      apps: [
        {
          title: "Zeyada School Management",
          type: "School operations app",
          image: appImages.zeyada,
          body: "School app for payments, realtime communication, parent-school workflows, protected builds, and store integration.",
          stack: ["Flutter", "PayTabs", "GraphQL", "Guardsquare", "Magento"],
        },
      ],
    },
  ],
  // Prices are starting points, negotiable by scope; the final number is set
  // per project in the written proposal. Deliberately no durations — timeline
  // is scoped per build.
  plans: [
    {
      slug: "saas-development",
      name: "SaaS / Full System",
      body: "A complete multi-tenant platform, end to end — built the way Xera Lab and Talia were.",
      price: "from $6,000",
      minPrice: 6000,
      priceNote: "starting price \u00b7 negotiable by scope",
      cta: "Book a call",
      items: [
        "Multi-tenant architecture with role-based access",
        "Frontend, backend, database and infrastructure — all owned by one engineer",
        "Auth, billing, admin panel and third-party integrations",
        "Dockerized deployment with CI/CD",
        "Documentation, runbooks and a clean handoff",
        "Built the way Xera Lab and Talia were",
      ],
    },
    {
      slug: "web-app-development",
      name: "Web App",
      body: "A focused web product or internal tool, shipped — frontend, backend and database owned end to end.",
      price: "from $3,500",
      minPrice: 3500,
      priceNote: "starting price \u00b7 negotiable by scope",
      cta: "Book a call",
      items: [
        "Frontend, backend and database owned end to end",
        "Dashboards, internal tools, or a focused product slice",
        "Authentication, roles and third-party integrations",
        "Deployed to production with CI/CD",
        "Documentation and a codebase the next engineer can maintain",
      ],
    },
    {
      slug: "ai-integration",
      name: "AI Feature",
      body: "Real-time AI wired into your product: streaming chat, voice (STT/TTS), or generated content.",
      price: "from $3,000",
      minPrice: 3000,
      priceNote: "starting price \u00b7 negotiable by scope",
      cta: "Book a call",
      items: [
        "Streaming AI chat, voice (STT/TTS), or generated content",
        "Wired into your existing product over WebSocket",
        "Model integration, fallbacks and guardrails",
        "The kind of realtime AI layer that runs in Faheem for 200,000+ students",
      ],
    },
    {
      slug: "flutter-app-development",
      name: "Mobile App",
      body: "iOS and Android from one codebase — auth, payments, push, offline, and the store release.",
      price: "from $5,000",
      minPrice: 5000,
      priceNote: "starting price \u00b7 negotiable by scope",
      cta: "Book a call",
      items: [
        "iOS + Android from a single clean-architecture codebase",
        "Auth, payments, analytics, push and offline support",
        "App Store and Google Play submission handled",
        "10+ apps already shipped to stores",
      ],
    },
  ],
  // Excerpts from LinkedIn recommendations (full texts in assets/linkedin.json).
  // The first is the homepage's featured quote.
  testimonials: [
    {
      quote:
        "Abdullah combines deep technical expertise with a clear, approachable leadership style. He has contributed significantly to our projects with his ability to solve complex problems efficiently and his commitment to quality.",
      name: "Ahmed Farid",
      role: "Senior Software Engineer · Recovery Advisers",
      image: testimonialImages.ahmedFarid,
      linkedin: "https://www.linkedin.com/in/abdullah-mohamed-3010/details/recommendations/",
    },
    {
      quote:
        "Abdullah demonstrated an impressive aptitude for grasping complex technical concepts swiftly. His analytical skills and thoughtful approach to problem-solving make him a key contributor to our team's success.",
      name: "Mohamed Sayed",
      role: "AI Lead · Appenza",
      image: testimonialImages.mohamedSayed,
      linkedin: "https://www.linkedin.com/in/abdullah-mohamed-3010/details/recommendations/",
    },
    {
      quote:
        "Abdullah is an exceptional Flutter developer whose talent and enthusiasm make him an asset to any team. During our year working together, his problem-solving skills and ability to overcome challenges consistently impressed me.",
      name: "Mohamad Zakaria",
      role: "Senior Software QA Engineer · Yassir",
      image: testimonialImages.mohamadZakaria,
      linkedin: "https://www.linkedin.com/in/abdullah-mohamed-3010/details/recommendations/",
    },
  ],
  // The heading no longer repeats the hero, and the first paragraph carries
  // the entity disambiguators — employer, product, university, GitHub handle.
  // "Abdullah Mohamed" collides with other engineers of the same name and
  // title; these are the facts that separate them.
  about: {
    eyebrow: "About",
    title: "Four companies, three countries, one habit: owning the thing until it runs in production.",
    paragraphs: [
      "I'm a senior software engineer at Appenza Studio in Cairo. I own the real-time AI layer of Faheem — the Egyptian Ministry of Education's tutoring app, used by 200,000+ students — and build the SvelteKit clients of Talia, a multi-tenant national LMS. Before Appenza I shipped social-commerce and clinic software for DIB GmbH (Germany), white-label pharmacy apps for RevealSite (US), and school payments and chat at Zeyada.",
      "I work end to end — Flutter or React/SvelteKit on the front, Node.js and PostgreSQL behind it, Docker and Nginx underneath — and I measure the result: ~300–500 ms voice round-trips, a 41% smaller app, a cold start cut from ~6 s to under 1.5 s.",
    ],
    photoAlt: "Portrait of Abdullah Mohamed",
    photoCaption: "Cairo, Egypt · GMT+2 · works remotely",
    factsLabel: "At a glance",
    // One line per value, and every fact is stated elsewhere on the page or on
    // the CV. This is the block an assistant lifts when asked who he is — role,
    // employer and base are in the hero's own list and the photo caption.
    facts: [
      ["Experience", "Since 2022 in production · 10+ apps shipped · 4 companies"],
      ["Education", "B.Sc. Computer Science & AI, Helwan University (2023)"],
      ["Languages", "English and Arabic · bilingual, RTL-ready products"],
      ["Clients so far", "Egypt, Germany, the US, Qatar, and Kuwait"],
      ["Open to", "Senior product roles (remote first), freelance projects, and contracts"],
      ["GitHub", "github.com/Abdullah3010"],
    ],
  },
  contact: {
    eyebrow: "Contact",
    // Both audiences in the heading, in the order they appear below.
    title: "Hiring,",
    titleAccent: "or building?",
    body: "Two different questions, two answers. Pick the one that fits and I’ll reply within 24 hours on working days.",
    book: "Book a call",
    lanes: {
      hiring: {
        label: "For companies hiring",
        title: "Hiring for a senior role?",
        body: "The CV and LinkedIn are one click away. I'm open to senior product roles, remote first — send the role, the stack, and the team, and I'll reply honestly about fit.",
      },
      project: {
        label: "For a project",
        title: "Have a product to build?",
        body: "Send the product, the deadline, and what is blocking you. You'll get an honest answer, and a written proposal if it fits.",
      },
    },
    copyEmail: "Copy email",
    copied: "Copied",
  },
  // The four /services pages. Each is the long form of one pricing card
  // (joined by slug) and is written to be read cold — by a searcher or by an
  // assistant answering "who can build X" — without the rest of the site.
  // Every claim here is backed by a case study or an experience entry above;
  // nothing is promised that the timeline doesn't show.
  servicePages: {
    meta: {
      title: "Services — full-stack, real-time AI & Flutter development",
      description:
        "Freelance software engineering from a senior engineer in Cairo: multi-tenant SaaS, web apps, real-time AI integration, and Flutter apps — with starting prices.",
    },
    eyebrow: "Services",
    title: "What I build, what it costs, and how it runs.",
    body: "Four ways to hire me, each with a starting price and a written scope. Most projects are a mix — start from the closest one and we'll shape it on the call.",
    navLabel: "Service pages",
    indexLabel: "Services",
    readMore: "See what's included",
    learnMore: "What's included",
    viewAll: "All services",
    backToIndex: "All services",
    labels: {
      fit: "Is this you?",
      deliverables: "What you get",
      approach: "How I build it",
      proof: "Proof",
      pricing: "Pricing",
      faq: "Questions about this service",
      more: "Other services",
    },
    cta: {
      title: "Ready to scope it?",
      body: "Book a free call or send a short brief: the product, the deadline, and what's blocking you. You'll get an honest answer and, if it fits, a written proposal with the price and timeline.",
      button: "Book a call",
    },
    pages: [
      {
        slug: "saas-development",
        meta: {
          title: "Multi-tenant SaaS development, end to end",
          description:
            "Hire a senior full-stack engineer to build your multi-tenant SaaS end to end: auth, roles, billing, admin, PostgreSQL, Docker + CI/CD. From $6,000. Cairo, remote.",
        },
        name: "SaaS platform development",
        eyebrow: "Services · SaaS",
        title: "Multi-tenant SaaS platforms, built end to end by one engineer.",
        lead: "A complete SaaS product — frontend, backend, database, and the infrastructure it runs on — delivered by a single accountable engineer. Multi-tenant architecture with role-based access, authentication, billing, an admin console, and a Dockerized deployment with CI/CD. Built the way Xera Lab and Talia were.",
        fit: [
          "You have a validated idea and need the whole platform built, not just a frontend.",
          "Your product serves several organisations, each with its own users, data, and roles.",
          "You want one engineer who owns the full stack and the deployment, working to a written scope.",
          "You need an Arabic/English, RTL-ready product for Egypt or the Gulf.",
        ],
        deliverables: [
          "Multi-tenant data model with tenant isolation and a deny-by-default RBAC layer",
          "Authentication, roles, and permission-aware screens for every user type",
          "Admin console, billing, and the third-party integrations your product depends on",
          "A typed REST API over PostgreSQL, with background jobs where the product needs them",
          "Docker Compose deployment on AWS or your cloud, with CI/CD and monitoring",
          "Documentation, runbooks, and a handoff the next engineer can pick up",
        ],
        approach: [
          "React/Next.js or SvelteKit on the frontend; Node.js on the backend; PostgreSQL and Redis underneath.",
          "A layered architecture (datasource → repository → query) so every screen is verified against real data, never mock data.",
          "Milestones that deliver working software — you use the product while it is being built.",
          "Everything lives in your repositories from day one. No lock-in.",
        ],
        proof: ["xera-lab", "talia"],
        faq: [
          {
            q: "What does \"from $6,000\" cover?",
            a: "The starting price for a focused multi-tenant platform: one core workflow, authentication and roles, an admin console, and deployment. The final price depends on the number of modules, integrations, and roles, and goes in a written proposal after a free call.",
          },
          {
            q: "How long does a SaaS build take?",
            a: "It is scoped per proposal rather than quoted as a fixed number of weeks. You get a timeline with milestones in writing before we start, and working software at every milestone.",
          },
          {
            q: "Can you model a hierarchy like ministry → school or company → branch?",
            a: "Yes. Talia runs a Ministry→School entity tree with deny-by-default RBAC across 25 modules and 534 requirements, including confidential data that not even school admins can override. The same pattern fits company→branch or agency→client products.",
          },
        ],
      },
      {
        slug: "web-app-development",
        meta: {
          title: "Full-stack web app development — React, Node.js, PostgreSQL",
          description:
            "Hire a senior full-stack developer for your web app, dashboard, or internal tool: React/Next.js, Node.js, PostgreSQL, auth, roles, deployed with CI/CD. From $3,500.",
        },
        name: "Web app development",
        eyebrow: "Services · Web",
        title: "Web apps and internal tools, owned end to end.",
        lead: "A focused web product, dashboard, or internal tool — frontend, backend, and database built and deployed by one senior engineer. Authentication, roles, third-party integrations, and a production deployment with CI/CD, delivered with documentation the next engineer can maintain.",
        fit: [
          "You need a dashboard, customer portal, or internal tool that replaces spreadsheets and manual work.",
          "You have a backend and need the frontend built against it — or the reverse.",
          "You want one focused slice of a product in production quickly, to a written scope.",
          "You need a bilingual, RTL-ready web app for an Arabic-speaking audience.",
        ],
        deliverables: [
          "React/Next.js or SvelteKit frontend with a responsive, accessible UI",
          "Node.js REST API over PostgreSQL — or integration with the backend you already have",
          "Authentication, roles, and permission-aware screens",
          "Third-party integrations: payments, email, maps, analytics",
          "Production deployment with CI/CD and per-environment configuration",
          "Documentation and a clean handoff",
        ],
        approach: [
          "TypeScript across the stack, with typed API contracts.",
          "Real data from the first milestone — no dummy-data screens.",
          "Performance and accessibility treated as requirements, not polish.",
          "Delivered in your repositories, with deployment access, from day one.",
        ],
        proof: ["xera-lab", "talia"],
        faq: [
          {
            q: "Can you work with my existing backend or design?",
            a: "Yes. On Talia I built the SvelteKit clients against a Go/REST backend owned by another team, wiring dozens of screens from mock data to live API reads and writes. Bring your API or your Figma and I'll build the rest.",
          },
          {
            q: "Which frontend framework do you use?",
            a: "React/Next.js by default, SvelteKit where it fits — Talia's admin console and learning app are SvelteKit 5, and this site is Next.js. The choice follows your team and product, not my preference.",
          },
          {
            q: "What does \"from $3,500\" cover?",
            a: "A focused web app: one primary workflow, authentication, a small admin surface, and deployment. Extra modules, roles, and integrations are scoped and priced in the written proposal.",
          },
        ],
      },
      {
        slug: "ai-integration",
        meta: {
          title: "Real-time AI integration — streaming chat, voice (STT/TTS)",
          description:
            "Add real-time AI to your product: streaming chat, voice (STT/TTS), generated content — by the engineer behind an Arabic AI tutor for 200,000+ students. From $3,000.",
        },
        name: "Real-time AI integration",
        eyebrow: "Services · AI",
        title: "Real-time AI features, wired into your product.",
        lead: "Streaming AI chat, voice interaction (speech-to-text and text-to-speech), and generated content, integrated into your existing app over WebSocket — with model fallbacks, guardrails, and the latency work that makes it feel live. The same layer that serves Faheem, an Arabic AI tutor used by 200,000+ K-12 students.",
        fit: [
          "You have a product with users and want an AI assistant, tutor, or copilot inside it — not a separate chatbot page.",
          "You need voice: users speak, the product answers in real time.",
          "You need Arabic or bilingual AI experiences that handle RTL properly.",
          "You have a prototype and need it production-grade: streaming, retries, cost control, observability.",
        ],
        deliverables: [
          "Streaming chat over WebSocket with token-by-token rendering",
          "Voice flows: speech-to-text in, text-to-speech out, with interruption handling",
          "Generated content: lessons, summaries, visuals, structured output",
          "Model integration (Azure OpenAI or your provider) with fallbacks and guardrails",
          "Prompt and context management, rate limits, and usage tracking",
          "Analytics and monitoring for answer quality and cost",
        ],
        approach: [
          "WebSocket or SSE transport chosen for your stack, with typed events end to end.",
          "Built inside your existing app — mobile (Flutter) or web (React/SvelteKit) — as modules, not a bolt-on.",
          "Tested with real users early: a small cohort, measured, then scaled.",
          "Handed over with documentation on prompts, limits, and how to swap the model.",
        ],
        proof: ["faheem"],
        faq: [
          {
            q: "Which AI providers do you work with?",
            a: "Azure OpenAI in production, on Faheem. Any provider with a streaming API can be wired the same way, and the integration is built so the model can be swapped without rewriting the feature.",
          },
          {
            q: "Can you add AI to an existing mobile app?",
            a: "Yes — that is exactly what Faheem is: a Flutter app with real-time tutoring, voice, and an AI board added as modules in a clean architecture. Web apps work the same way.",
          },
          {
            q: "Does it work in Arabic?",
            a: "Yes. Faheem is Arabic-first: Arabic chat, Arabic voice, RTL UI. Bilingual products are the norm in my work, not an add-on.",
          },
        ],
      },
      {
        slug: "flutter-app-development",
        meta: {
          title: "Flutter app development — iOS & Android from one codebase",
          description:
            "Hire a senior Flutter developer: iOS and Android from one codebase — auth, payments, push, offline, App Store and Google Play release. 10+ apps shipped. From $5,000.",
        },
        name: "Flutter mobile app development",
        eyebrow: "Services · Mobile",
        title: "iOS and Android apps from one Flutter codebase, shipped to the stores.",
        lead: "A production mobile app, not just screens: authentication, payments, analytics, push notifications, offline support, and the App Store and Google Play release, on a clean-architecture Flutter codebase. 10+ apps shipped across Egypt, Germany, the UAE, and the US — including Faheem, BTC, YOLO, Q-Fight Gym, Al-Muslim, and ICCD Hub.",
        fit: [
          "You need a customer-facing app on both stores without paying for two native teams.",
          "Your app depends on payments, bookings, real-time features, or maps — not just content.",
          "You have an existing Flutter app that needs performance work, new features, or a rescue.",
          "You need Arabic/English with full RTL for Egypt or the Gulf.",
        ],
        deliverables: [
          "A Flutter app for iOS and Android from a single codebase",
          "Clean architecture with state management (BLoC, Riverpod, or GetX) that scales with the team",
          "Auth (OTP, social sign-in, JWT), payments (Stripe, MyFatoorah, PayTabs), push, and analytics",
          "Offline-first caching and deep linking",
          "App Store and Google Play submission, including review issues",
          "Multi-environment builds, CI, and Crashlytics",
        ],
        approach: [
          "One shared codebase, with white-label and multi-app variants where the business needs them — BTC's storefront and B2B apps, RevealSite's pharmacy apps.",
          "Performance work that shows up in numbers: YOLO went from 86 MB to 51 MB.",
          "Real store releases — 10+ apps published, and each one's current status is shown honestly on this site.",
          "Handoff with documentation, and the apps published in your own developer accounts.",
        ],
        proof: ["faheem", "btc", "imox-yolo"],
        faq: [
          {
            q: "Do you also build the backend for the app?",
            a: "Yes. As a full-stack engineer I can build the API and database too (Node.js, PostgreSQL), or integrate with the backend you already have — REST, GraphQL, or Firebase.",
          },
          {
            q: "Do you handle the App Store and Google Play release?",
            a: "Yes, including store listings, review issues, and multi-environment builds. The apps are published in your developer accounts, so they stay yours.",
          },
          {
            q: "What does \"from $5,000\" cover?",
            a: "A focused app: the core flows, authentication, one payment or booking integration, push notifications, and both store releases. Larger scopes are priced in the written proposal.",
          },
        ],
      },
    ],
  },
  // The /cv/ page. Employment history is NOT repeated here — the page renders
  // `experiences` above. What lives only here: the professional summary, the
  // education the site never stated, and the graded skills block.
  cv: {
    meta: {
      title: "CV — Senior Software Engineer (full-stack, AI, Flutter)",
      description:
        "CV of Abdullah Mohamed, senior software engineer in Cairo (remote): Appenza Studio, DIB GmbH, RevealSite, Zeyada. Flutter, React/SvelteKit, Node.js, PostgreSQL, real-time AI. B.Sc. CS & AI, Helwan 2023.",
    },
    eyebrow: "Curriculum vitae",
    title: "Abdullah Mohamed — Senior Software Engineer",
    lead: "Cairo, Egypt (GMT+2) · works remotely · open to senior product roles and freelance projects.",
    indexLabel: "CV",
    navLabel: "CV page",
    summary:
      "Senior software engineer building complete products end to end — web and mobile clients, Node.js/PostgreSQL backends, and the AWS/Docker infrastructure they run on. Currently building the core AI experience of Faheem, the Egyptian Ministry of Education's learning platform serving 200,000+ students: real-time voice-to-voice tutoring at ~300–500 ms round-trip and AI-generated animated lessons. 10+ products shipped to the App Store and Google Play across Egypt, Germany, the UAE, and the US, in EdTech, healthcare, and social commerce.",
    downloadPdf: "Download PDF",
    labels: {
      summary: "Summary",
      experience: "Experience",
      education: "Education",
      skills: "Technical skills",
      core: "Core",
      strong: "Strong",
      used: "Used",
      languages: "Languages",
      contact: "Contact",
      printNote:
        "This page and the PDF are the same document — the page is the one search engines and assistants can read.",
    },
    languages: ["Arabic — native", "English — professional working proficiency"],
    education: [
      {
        degree: "B.Sc. in Computer Science and Artificial Intelligence",
        school: "Helwan University, Cairo",
        detail: "GPA 3.48 / 4.0",
        date: "2019 – 2023",
      },
    ],
    // Graded by how deep the experience actually goes, not listed flat: "I
    // have touched Django REST" and "I ship Flutter every day" are different
    // claims and a reader deserves to see which is which.
    skills: [
      {
        group: "Mobile",
        core: ["Flutter", "Dart", "Clean Architecture", "BLoC / Provider"],
        strong: ["Riverpod", "GetX", "Hive", "Deep linking", "NFC"],
        used: ["Guardsquare app shielding"],
      },
      {
        group: "Web frontend",
        core: ["TypeScript", "SvelteKit 5", "React"],
        strong: ["Next.js", "Tailwind CSS", "TanStack Query"],
        used: ["Flutter Web"],
      },
      {
        group: "Backend",
        core: ["Node.js / Express", "PostgreSQL", "REST", "JWT"],
        strong: ["GraphQL", "MySQL", "OAuth2", "Swagger / OpenAPI"],
        used: ["Django REST (integration only)"],
      },
      {
        group: "AI & real-time",
        core: [
          "LLM streaming over WebSocket",
          "Speech-to-text / text-to-speech",
          "VAD & barge-in control",
          "Azure OpenAI",
        ],
        strong: ["AI image generation", "Animation synchronisation"],
        used: [],
      },
      {
        group: "Cloud & DevOps",
        core: ["Docker", "Docker Compose", "Nginx (TLS)", "CI/CD — Codemagic, GitHub Actions"],
        strong: ["AWS S3", "Vercel", "VPS"],
        used: [],
      },
      {
        group: "Analytics & payments",
        core: ["Firebase suite", "Mixpanel", "Airbridge"],
        strong: ["Stripe", "MyFatoorah", "PayTabs"],
        used: ["Magento"],
      },
      {
        group: "Practices",
        core: ["RBAC & multi-tenancy", "Multi-environment delivery", "Performance work"],
        strong: ["SOLID", "Code review", "Agile / Scrum"],
        used: [],
      },
    ],
  },
  markdown: {
    note: "Markdown version of this page, served to clients that ask for `Accept: text/markdown`. Generated from the same content as the HTML.",
    stack: "Stack",
    links: "Links",
    metrics: "Results",
    contact: "Contact",
    htmlVersion: "HTML version",
  },
};
