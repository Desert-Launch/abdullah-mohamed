import { appImages, testimonialImages } from "./shared";
import type { Dictionary } from "./types";

export const en: Dictionary = {
  dir: "ltr",
  meta: {
    title: "Abdullah Mohamed | Senior Software Engineer",
    description:
      "Abdullah Mohamed is a senior software engineer who builds full-stack web apps, real-time AI features, and mobile products end to end — frontend, backend, and the infrastructure they run on. Available for freelance projects and product roles.",
  },
  skipLink: "Skip to content",
  // Mirrors the section order: commercial content first, then proof. Also
  // rendered by the footer's "Sections" column and driven by the scrollspy.
  nav: [
    ["What I build", "#services"],
    ["Pricing", "#plans"],
    ["Case studies", "#cases"],
    // The only non-anchor entry: /work is a real route with a page per
    // project. The homepage's own "#work" section is still there and still
    // links into it — it just isn't the nav destination any more.
    ["Work", "/work/"],
    ["About", "#about"],
    ["Contact", "#contact"],
  ],
  role: "Senior Software Engineer",
  menuLabel: "Toggle menu",
  backToTop: "Back to top",
  themeToggle: "Light",
  darkToggle: "Dark",
  langToggle: "عربي",
  palette: {
    label: "Color palette",
    options: {
      current: "Default",
      terracotta: "Terracotta",
      teal: "Teal",
      gold: "Gold",
    },
  },
  hero: {
    eyebrow: "Senior Software Engineer · Cairo, Egypt 🇪🇬",
    title: "I build products that ship —",
    titleAccent: "and survive production.",
    roleLine: "Senior Software Engineer · Full-Stack, AI & Mobile Products",
    lead: "Cairo-based senior engineer, 4+ years shipping production apps end to end. Right now I'm building Faheem — Egypt's Ministry of Education AI platform with real-time voice-to-voice tutoring and AI-generated lessons. 10+ apps shipped across Egypt, Germany, the UAE, and the US. React, Node.js, PostgreSQL, AWS, Flutter — and comfortable adapting to",
    leadEmphasis: "whatever the product needs.",
    primary: "Start a project",
    work: "See selected work",
    cv: "Download CV",
    availability: "Open to freelance, contracts, and product partnerships",
    currently:
      "Currently building Faheem & Talia at Appenza — open to new projects",
    socialLabel: "Find me on",
  },
  proof: [
    ["10+", "apps shipped to stores"],
    ["30,000+", "students on Faheem"],
    ["4+", "years shipping production"],
    ["4 regions", "Egypt, Gulf, Europe, US"],
  ],
  logosLabel: "Built with teams. Shipped for real users.",
  logosIntro: "Companies I have partnered with and products I have helped take from an idea to production.",
  companiesLabel: "Companies",
  appsLabel: "Apps & products",
  caseStudiesHeading: {
    eyebrow: "Selected case studies",
    title: "Three products, from unclear problem to production.",
    body: "Not just screenshots — the problem, my role, how I built it, and what shipped.",
  },
  // This section exists for the one thing the experience timeline can't show:
  // a working store link. Products without one live in the timeline above, with
  // full context, instead of being listed twice.
  selectedWorkHeading: {
    eyebrow: "Shipped to stores",
    title: "Apps you can download today.",
    body: "Every build detail — and the products that never shipped publicly — sits in the experience timeline above.",
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
    results: "Results",
  },
  workHeading: {
    eyebrow: "Experience and apps",
    title: "Professional roles, grouped by the products I shipped.",
    body: "Each role below shows the company context, the products I worked on there, and the engineering outcomes instead of repeating the same apps across multiple sections.",
  },
  freelanceHeading: {
    eyebrow: "2022 – Present · Independent and freelance work",
    title: "Standalone products and platforms.",
    body: "These projects were built outside the main employment timeline or as separate product engagements.",
  },
  servicesHeading: {
    eyebrow: "Services",
    title: "Full-stack web apps, real-time AI, and mobile — what clients hire me to build.",
    body: "The value is not only writing code. It is turning unclear product needs into shipped systems with fewer moving parts.",
  },
  plansHeading: {
    eyebrow: "Pricing",
    title: "What I build. Starting prices.",
    body: "Pick the closest to what you need — most projects are a mix. Every price below is a starting point and negotiable based on your scope and requirements. We start with a free call, then I send a written proposal with the final price, the timeline, and the payment phases. Nothing starts until you approve it.",
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
  faqHeading: {
    eyebrow: "FAQ",
    title: "Questions clients usually ask.",
  },
  faq: [
    {
      q: "Where are you based — does the timezone work for US, Europe, or Gulf teams?",
      a: "I'm in Cairo (GMT+2/+3): one to two hours from Europe, the same workday as the Gulf, and a solid morning overlap with the US East Coast. My clients so far have been in Germany, the US, Qatar, and Kuwait.",
    },
    {
      q: "How do we communicate during a project?",
      a: "A shared channel (Slack or WhatsApp), a demo of what shipped every week, and a written summary at every milestone. You never have to ask what the status is.",
    },
    {
      q: "Who owns the code?",
      a: "You do. Everything is delivered in your repositories with documentation and deployment access. Handoff quality is part of the service — no lock-in.",
    },
    {
      q: "Do you work in English or Arabic?",
      a: "Both, fluently — including building fully bilingual, RTL-ready products. This site is one.",
    },
    {
      q: "How does pricing work?",
      a: "Every product has a starting price, and every price is negotiable based on your scope and requirements. We start with a free call, then I send a written proposal with the final price, the timeline, and the payment phases. You approve it before any work begins.",
    },
  ],
  testimonialsHeading: {
    eyebrow: "What people say",
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
        "The core of an Arabic-first AI tutor now used by 30,000+ K-12 students.",
      challenge:
        "Students needed tutoring that felt live and trustworthy in Arabic — real-time answers, voice, and visuals — not a generic chatbot bolted onto a form.",
      role: "Core engineer on the realtime tutoring layer and the app architecture the rest of the product is built on.",
      process: [
        "Built realtime AI tutoring over WebSocket with Azure OpenAI streaming so answers arrive token by token.",
        "Shipped a voice tutor with STT/TTS and an AI board that generates educational visuals on the fly.",
        "Structured 16 modules in clean architecture with localization, analytics, Crashlytics, FCM, and multi-environment builds.",
      ],
      results: [
        { value: "30,000+", label: "K-12 students" },
        { value: "8,500+", label: "monthly active users" },
        { value: "Realtime", label: "voice + chat tutoring" },
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
    },
    {
      // TODO(abdullah): this copy is already live on the homepage, but
      // /work/talia gives the Qatar Ministry of Education line its own
      // indexed URL. Confirm that is fine with the client, or soften it.
      // TODO(abdullah): no screenshots for Talia — the detail page renders
      // without a "From the product" section until some exist.
      slug: "talia",
      title: "Talia",
      type: "National LMS + SIS platform",
      context: "Appenza Studio · frontend & integration",
      image: appImages.talia,
      summary:
        "An Arabic-first, multi-tenant education platform (LMS + SIS) built to run a whole ministry and every school under it. Live with its first school in Egypt, with further schools in rollout and a Qatar Ministry of Education deployment in requirements.",
      challenge:
        "A ministry and every school beneath it needed one system for student records, learning, and operations — Arabic-first, RTL, and Hijri-aware — with confidential health, counseling, and special-needs data that not even school admins can override.",
      role: "Frontend & integration engineer across the Talia 360 admin/ministry console and the Talia Learn app — wiring screens from mock data to a live Go/REST backend and verifying every one against the deployed environment.",
      process: [
        "Built and integrated screens for Talia 360 (ministry/admin console) and Talia Learn (learning app) as SvelteKit 5 + Tailwind CSS 4 SPAs over a typed Go/REST backend.",
        "Wired product screens from mock/seed data to live API reads and writes with a layered datasource → repository → query architecture using TanStack Query.",
        "Implemented RBAC-aware, role-based views (teacher / student / principal / admin) over a deny-by-default authorization model across a Ministry→School entity tree.",
        "Ran live in-browser QA to confirm real-data rendering, close mock-vs-live gaps, and file backend contract issues — holding a no-dummy-data standard.",
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
    },
    {
      slug: "jaweb",
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
    },
  ],
  work: {
    meta: {
      title: "Work — case studies | Abdullah Mohamed",
      description:
        "Case studies from products I have built and shipped: what the problem was, what I owned, how it was built, and what it produced.",
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
    alsoShipped: {
      eyebrow: "Also shipped",
      title: "Other products in users' hands.",
      body: "Shipped apps that do not have a written case study yet. Where a build is on a store, the store link is the proof.",
    },
    screenshots: "From the product",
    screenshotsNote:
      "The product interface is Arabic. Each caption describes what the screen is doing.",
    links: "See it live",
    cta: {
      title: "Building something like this?",
      body: "Tell me what you are trying to ship and I will tell you, honestly, whether I am the right person to build it.",
      button: "Start a project",
    },
  },
  selectedWork: [
    {
      key: "yolo",
      title: "YOLO",
      tagline:
        "Clinic operations: patients, appointments, inventory, and billing in one app.",
      image: appImages.yolo,
    },
    {
      key: "btc",
      title: "BTC",
      tagline:
        "Storefront + B2B wholesale ordering for a major gold & jewelry house.",
      image: appImages.btc,
    },
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
        "Building the core of Faheem, an Arabic AI tutoring product used by 30,000+ K-12 students.",
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
            { value: "30,000+", label: "K-12 students" },
            { value: "8,500+", label: "monthly active" },
            { value: "16", label: "modules shipped" },
          ],
        },
        {
          title: "Talia",
          type: "Multi-tenant school platform",
          image: appImages.talia,
          body: "Arabic-first, multi-tenant national LMS + SIS platform. Live with its first school in Egypt, with additional schools in rollout and a Qatar Ministry of Education deployment in requirements. Building the SvelteKit web clients (Talia 360 admin console and Talia Learn) and integrating dozens of screens from mock data to a live Go/REST backend, with RBAC-aware role-based access across a Ministry→School entity tree.",
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
  freelanceProjects: [
    {
      title: "Voicers",
      type: "Social audio platform",
      image: appImages.voicers,
      shots: [
        "/images/shots/voicers1.webp",
        "/images/shots/voicers2.webp",
        "/images/shots/voicers3.webp",
      ],
      body: "Bilingual social audio platform for creators — voice notes (VNotes), playlists, live stages, competitions, and leaderboards, with a discovery feed and audience engagement. Built as an independent product; not yet published.",
      stack: ["Flutter", "Clean Architecture", "Audio", "Realtime"],
    },
    {
      title: "ICCD Hub",
      type: "Community & productivity app",
      image: appImages.iccd,
      shots: [
        "/images/shots/iccd1.webp",
        "/images/shots/iccd2.webp",
        "/images/shots/iccd3.webp",
      ],
      body: "Bilingual (EN/AR) members' companion app for the Islamic Corporation for the Development of the Private Sector. Blends organizational content — events, member countries, subsidiaries, and a knowledge center — with a personal productivity suite (tasks, notes, calendar, reminders) and Islamic utilities (prayer times, Qibla compass, and Hijri calendar). Built on a modular GetX architecture with Google/Apple sign-in, Firebase push, deep linking, rich-text notes, and full RTL.",
      stack: ["Flutter", "GetX", "Firebase", "REST API", "RTL"],
    },
    {
      title: "Al-Muslim",
      type: "Islamic daily companion",
      image: appImages.almuslim,
      body: "A daily Muslim companion for reading the Quran, adhkar, and duas, with accurate prayer times, qibla direction, and smart reminders.",
      stack: ["Flutter", "REST API", "Notifications", "Geolocation"],
    },
    {
      title: "Q-Fight Gym",
      type: "Muay Thai gym app",
      image: appImages.qfight,
      shots: [
        "/images/shots/qfight1.webp",
        "/images/shots/qfight2.webp",
        "/images/shots/qfight3.webp",
      ],
      body: "The official app for a professional Muay Thai gym in Qatar, connecting members with a training program led by Thai world-title fighters. Members browse plans, book personal and group sessions with specific trainers, and manage their class schedule in-app.",
      stack: ["Flutter", "Clean Architecture", "Firebase", "Payments"],
    },
    {
      title: "Jaweb",
      type: "Interactive quiz game",
      image: appImages.jaweb,
      shots: [
        "/images/jaweb1.webp",
        "/images/jaweb2.webp",
        "/images/jaweb3.webp",
      ],
      body: "Competitive trivia product built from scratch with two teams, six categories, three difficulty levels, referee logic, automatic scoring, and My Fatoorah payments.",
      stack: ["Flutter", "Clean Architecture", "My Fatoorah", "Payments"],
      metrics: [
        { value: "6", label: "categories" },
        { value: "3", label: "difficulty levels" },
        { value: "Auto", label: "referee + scoring" },
      ],
    },
    {
      title: "FasTap",
      type: "NFC digital business card",
      image: appImages.fastap,
      shots: [
        "/images/fastab1.webp",
        "/images/fastab2.webp",
        "/images/fastab3.webp",
      ],
      body: "Flutter app that writes profiles to NFC cards, plus a Flutter Web profile page opened from tap-to-share links and deployed with Firebase and Nginx.",
      stack: ["Flutter", "Flutter Web", "Firebase", "NFC", "Nginx"],
      metrics: [
        { value: "1 tap", label: "to share a profile" },
        { value: "App + Web", label: "single build" },
      ],
    },
    {
      title: "Xera Lab",
      type: "Dental case management platform",
      image: appImages.xera,
      body: "Customer portal, admin dashboard, Node.js backend, PostgreSQL database, JWT role access, AWS S3 uploads, Docker Compose, and Nginx deployment.",
      stack: ["Flutter Web", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      title: "Ezhal",
      type: "Multi-tenant car-service platform",
      image: appImages.ezhal,
      shots: [appImages.ezhalShot],
      body: "Three role-specific Flutter apps for customers, employees, and managers with booking, live technician tracking, wallet, points, stamps, subscriptions, and Apple Wallet passes.",
      stack: [
        "Flutter",
        "Riverpod",
        "MyFatoorah",
        "Stripe",
        "Firebase",
        "Apple PassKit",
      ],
      metrics: [
        { value: "3 apps", label: "one codebase" },
        { value: "Live", label: "technician tracking" },
      ],
    },
  ],
  services: [
    {
      title: "Full-stack web apps, end to end",
      body: "Frontend, backend, database, and the infrastructure it runs on — one engineer, one accountable delivery. Auth, admin panels, role-based access, integrations, and the deployment pipeline. The way I built Xera Lab and Talia.",
    },
    {
      title: "Real-time AI features",
      body: "Streaming AI chat, voice interaction (STT/TTS), and generated content wired into your product over WebSocket — the way Faheem serves 30,000+ students live.",
    },
    {
      title: "Mobile apps from one codebase",
      body: "iOS and Android from a single clean-architecture codebase: auth, payments, analytics, push, offline support, and the store release — not just screens.",
    },
  ],
  // Prices are starting points, negotiable by scope; the final number is set
  // per project in the written proposal. Deliberately no durations — timeline
  // is scoped per build.
  plans: [
    {
      name: "SaaS / Full System",
      icon: "layers",
      body: "A complete multi-tenant platform, end to end.",
      price: "from $6,000",
      priceNote: "starting price \u00b7 negotiable by scope",
      cta: "Book a call",
      featured: true,
      badge: "Most popular",
      items: [
        "Multi-tenant architecture with role-based access",
        "Frontend, backend, database and infrastructure \u2014 all owned by one engineer",
        "Auth, billing, admin panel and third-party integrations",
        "Dockerized deployment with CI/CD",
        "Documentation, runbooks and a clean handoff",
        "Built the way Xera Lab and Talia were",
      ],
    },
    {
      name: "Web App",
      icon: "browser",
      body: "A focused web product or internal tool, shipped.",
      price: "from $3,500",
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
      name: "AI Feature",
      icon: "spark",
      body: "Real-time AI wired into your product.",
      price: "from $3,000",
      priceNote: "starting price \u00b7 negotiable by scope",
      cta: "Book a call",
      items: [
        "Streaming AI chat, voice (STT/TTS), or generated content",
        "Wired into your existing product over WebSocket",
        "Model integration, fallbacks and guardrails",
        "The kind of realtime AI layer that runs in Faheem for 30,000+ students",
      ],
    },
    {
      name: "Mobile App",
      icon: "mobile",
      body: "iOS and Android from one codebase.",
      price: "from $5,000",
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
  testimonials: [
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
        "Abdullah combines deep technical expertise with a clear, approachable leadership style. He has contributed significantly to our projects with his ability to solve complex problems efficiently and his commitment to quality.",
      name: "Ahmed Farid",
      role: "Senior Software Engineer · Recovery Advisers",
      image: testimonialImages.ahmedFarid,
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
  about: {
    eyebrow: "About",
    title: "I build products that have to survive real users.",
    paragraphs: [
      "I'm a senior software engineer working across full-stack web apps, real-time AI features, mobile products, and the deployment pipelines that keep them running. Most of my work is the part teams underestimate: turning an unclear idea into something that actually ships and holds up in production.",
      "Over the last few years I've put 10+ apps into stores across four regions, usually owning a feature from architecture through release. I care about clarity, momentum, and code the next engineer can maintain without a map.",
    ],
  },
  contact: {
    eyebrow: "Contact",
    title: "Need a product built, fixed, or launched?",
    body: "Send me the product, deadline, and what is currently blocking you. I’ll reply with the next practical step.",
    book: "Book a call",
    form: {
      name: "Your name",
      email: "Your email",
      message: "What do you need built, fixed, or launched?",
      send: "Send message",
      sending: "Sending…",
      success: "Message sent — I'll reply within 24 hours.",
      error: "Couldn't send right now — please reach me directly below.",
      copyEmail: "Copy email",
      copied: "Copied!",
      directLabel: "Or reach me directly",
    },
  },
};
