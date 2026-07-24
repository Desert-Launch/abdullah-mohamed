import { appImages, testimonialImages } from "./shared";
import type { Dictionary } from "./types";

export const ar: Dictionary = {
  dir: "rtl",
  nav: [
    ["دراسات حالة", "#cases"],
    ["الخبرات", "#experience"],
    ["ماذا أقدّم", "#services"],
    ["أعمال مختارة", "#work"],
    ["نبذة", "#about"],
    ["تواصل", "#contact"],
  ],
  role: "مهندس برمجيات أول",
  menuLabel: "فتح القائمة",
  backToTop: "العودة إلى الأعلى",
  themeToggle: "فاتح",
  darkToggle: "داكن",
  langToggle: "EN",
  palette: {
    label: "لوحة الألوان",
    options: {
      current: "افتراضي",
      terracotta: "تراكوتا",
      teal: "تركوازي",
      gold: "ذهبي",
    },
  },
  hero: {
    eyebrow: "مهندس برمجيات أول · القاهرة، مصر 🇪🇬 · متاح للانتقال 🌍",
    title: "أبني منتجات تُطلَق —",
    titleAccent: "وتصمد في الإنتاج.",
    roleLine: "مهندس برمجيات أول · منتجات ذكاء اصطناعي، موبايل، وفل-ستاك",
    tagline:
      "المهندس الذي تستعين به الفرق عندما يجب أن يُطلق المنتج فعلاً — ويصمد في الإنتاج.",
    lead: "مهندس برمجيات أول من القاهرة، أكثر من 5+ سنوات في بناء وإطلاق تطبيقات إنتاجية من البداية للنهاية. أعمل حاليًا على فهيم — منصّة الذكاء الاصطناعي لوزارة التربية والتعليم المصرية، بتدريس صوتي فوري ودروس مولّدة بالذكاء الاصطناعي. أكثر من 10 تطبيقات أُطلقت في مصر وألمانيا والإمارات والولايات المتحدة. Flutter وNode.js وAWS — ومستعد للتكيّف مع",
    leadEmphasis: "ما يحتاجه المنتج مهما كان.",
    primary: "لنبدأ مشروعًا",
    secondary: "ابدأ مشروعاً",
    work: "شاهد أعمالًا مختارة",
    cv: "تحميل السيرة الذاتية",
    availability: "متاح للفريلانس، العقود، والشراكات التقنية",
    currently:
      "أعمل حاليًا على فهيم وTalia في Appenza، وسيصدر «ذِكر» أواخر يوليو — أستقبل مشاريع جديدة من أغسطس 2026",
    stackLabel: "التقنيات الأساسية",
    stack: "Flutter + Node.js + PostgreSQL + AWS",
    socialLabel: "تابعني على",
  },
  proof: [
    ["10+", "تطبيقات تم إطلاقها على المتاجر"],
    ["30,000+", "طالب على فهيم"],
    ["5+", "سنوات في الإنتاج"],
    ["4 مناطق", "مصر، الخليج، أوروبا، أمريكا"],
  ],
  proofNote: "أُطلقت على App Store و Google Play.",
  logosLabel: "بُنيت مع فرق. وأُطلقت لمستخدمين حقيقيين.",
  logosIntro: "شركات تعاونت معها ومنتجات ساهمت في تحويلها من فكرة إلى منتج فعلي.",
  companiesLabel: "الشركات",
  appsLabel: "التطبيقات والمنتجات",
  caseStudiesHeading: {
    eyebrow: "دراسات حالة مختارة",
    title: "منتجان، من مشكلة غير واضحة إلى الإنتاج.",
    body: "ليست مجرد صور — المشكلة، دوري، كيف بنيته، وما الذي تم إطلاقه.",
  },
  selectedWorkHeading: {
    eyebrow: "أعمال مختارة",
    title: "تطبيقات ومنتجات أخرى.",
    body: "بعض المنتجات التي بنيتها أو ساهمت فيها بشكل فعلي، بين تطبيقات منشورة ومشاريع خاصة.",
  },
  selectedWorkLabels: {
    products: "منتجات",
    productBuild: "منتج رقمي",
    appStore: "App Store",
    googlePlay: "Google Play",
    shipped: "أُطلق",
    retired: "خارج المتاجر",
    unreleased: "غير منشور",
  },
  caseLabels: {
    challenge: "التحدي",
    role: "دوري",
    process: "كيف بنيته",
    results: "النتائج",
  },
  workHeading: {
    eyebrow: "الخبرات والتطبيقات",
    title: "كل خبرة مرتبطة بالمنتجات التي عملت عليها.",
    body: "بدلاً من تكرار نفس التطبيقات في أكثر من مكان، كل شركة تعرض السياق، المنتجات، والنتائج الهندسية الخاصة بها.",
  },
  freelanceHeading: {
    eyebrow: "مشاريع مستقلة وفريلانس",
    title: "منتجات ومنصات خارج الخبرات الأساسية.",
    body: "هذه المشاريع تم تنفيذها كأعمال مستقلة أو ارتباطات منفصلة عن خط الخبرة الوظيفية الرئيسي.",
  },
  servicesHeading: {
    eyebrow: "الخدمات",
    title: "ما الذي يطلبه العملاء مني عادة.",
    body: "القيمة ليست كتابة كود فقط. القيمة في تحويل احتياج غير واضح إلى نظام يتم إطلاقه بأقل تعقيد ممكن.",
  },
  stackHeading: {
    eyebrow: "التقنيات",
    title: "أدوات أستخدمها عندما يجب أن ينجو المنتج في الإنتاج.",
  },
  plansHeading: {
    eyebrow: "باقات التعاون",
    title: "نطاق ثابت. أسعار معلنة. بلا مفاجآت.",
    body: "كل تعاون يبدأ بمكالمة تعارف مجانية ونطاق عمل مكتوب — تعرف السعر قبل كتابة أي سطر كود.",
  },
  processHeading: {
    eyebrow: "طريقة العمل",
    title: "كيف يبدو العمل معي.",
    body: "من أول مكالمة حتى التسليم — مصمم بحيث تعرف دائمًا ما الذي يحدث وكم يكلف.",
  },
  process: [
    {
      title: "مكالمة تعارف",
      body: "مكالمة مجانية 30 دقيقة. تشرح فيها المنتج وما الذي يعطلك، وأخبرك بصدق إن كنت أستطيع المساعدة وكيف.",
    },
    {
      title: "نطاق مكتوب",
      body: "تحصل على نطاق عمل مكتوب بمراحل واضحة، جدول زمني، وسعر محدد — لا ساعات مفتوحة وغموض.",
    },
    {
      title: "تسليم أسبوعي",
      body: "أسلّم جزءًا قابلًا للتجربة كل أسبوع، فترى المنتج ينمو بدل انتظار مفاجأة كبيرة في النهاية.",
    },
    {
      title: "التسليم النهائي",
      body: "نشر، توثيق، وكود يستطيع المهندس التالي صيانته. الكود ملكك بالكامل.",
    },
  ],
  faqHeading: {
    eyebrow: "أسئلة شائعة",
    title: "أسئلة يطرحها العملاء عادةً.",
  },
  faq: [
    {
      q: "أين مقرّك — وهل يناسب التوقيت فرقًا في أمريكا أو أوروبا أو الخليج؟",
      a: "أعمل من القاهرة (GMT+2/+3): ساعة إلى ساعتين عن أوروبا، نفس يوم العمل مع الخليج، وتداخل صباحي جيد مع الساحل الشرقي الأمريكي. عملائي حتى الآن في ألمانيا وأمريكا وقطر والكويت.",
    },
    {
      q: "كيف نتواصل أثناء المشروع؟",
      a: "قناة مشتركة (Slack أو WhatsApp)، عرض أسبوعي لما تم تسليمه، وملخص مكتوب عند كل مرحلة. لن تحتاج أبدًا أن تسأل عن حالة المشروع.",
    },
    {
      q: "من يملك الكود؟",
      a: "أنت. كل شيء يُسلَّم في مستودعاتك مع التوثيق وصلاحيات النشر. جودة التسليم جزء من الخدمة — لا احتكار.",
    },
    {
      q: "هل تعمل بالإنجليزية أم العربية؟",
      a: "بالاثنتين بطلاقة — بما في ذلك بناء منتجات ثنائية اللغة تدعم RTL بالكامل. هذا الموقع مثال.",
    },
    {
      q: "كيف يُحسب السعر؟",
      a: "سعر ثابت للمشاريع محددة النطاق (انظر باقات التعاون)، أو اشتراك شهري للتعاون المستمر. كل تعاون يبدأ بمكالمة مجانية وعرض سعر مكتوب.",
    },
  ],
  testimonialsHeading: {
    eyebrow: "ماذا يقولون",
    title: "آراء من فرق وعملاء عملت معهم.",
    body: "كلمات حقيقية من أشخاص شحنت معهم منتجات.",
  },
  testimonialLabels: {
    verified: "موثّق · LinkedIn",
    view: "عرض التوصية على LinkedIn",
  },
  caseStudies: [
    {
      slug: "faheem",
      title: "فهيم",
      type: "منصة تعليم عربية بالذكاء الاصطناعي",
      context: "Appenza Studio · ضمن الفريق",
      image: appImages.faheem,
      shots: [
        "/images/shots/faheem1.webp",
        "/images/shots/faheem2.webp",
        "/images/shots/faheem3.webp",
      ],
      summary:
        "قلب مدرّس عربي بالذكاء الاصطناعي يستخدمه الآن أكثر من 30,000 طالب K-12.",
      challenge:
        "الطلاب احتاجوا تدريساً يبدو حياً وموثوقاً بالعربية — إجابات فورية، صوت، وصور — وليس روبوت محادثة عام مركّب على نموذج.",
      role: "مهندس أساسي على طبقة التدريس الفورية والبنية التي بُني عليها باقي المنتج.",
      process: [
        "بناء تدريس AI فوري عبر WebSocket مع Azure OpenAI streaming بحيث تصل الإجابة كلمة بكلمة.",
        "إطلاق مدرّس صوتي بـ STT/TTS ولوحة AI تولّد صوراً تعليمية لحظياً.",
        "هيكلة 16 موديول بـ Clean Architecture مع التعريب، التحليلات، Crashlytics، FCM، وبيئات متعددة.",
      ],
      results: [
        { value: "+30,000", label: "طالب K-12" },
        { value: "+8,500", label: "مستخدم نشط شهريًا" },
        { value: "فوري", label: "تدريس صوت + محادثة" },
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
      slug: "talia",
      title: "Talia",
      type: "منصة تعليم وطنية LMS + SIS",
      context: "Appenza Studio · واجهات وتكامل",
      image: appImages.talia,
      summary:
        "منصة تعليمية عربية أولًا وعلى نطاق وطني (LMS + SIS) — العمود الرقمي الذي تدير عليه وزارة التعليم وكل مدرسة تتبعها العملية التعليمية بالكامل.",
      challenge:
        "احتاجت الوزارة وكل مدرسة تحتها نظامًا واحدًا لسجلات الطلاب والتعلّم والعمليات — عربي أولًا، RTL، ومدرك للتقويم الهجري — مع بيانات صحية وإرشادية واحتياجات خاصة سرّية لا يستطيع حتى مديرو المدارس تجاوز صلاحياتها.",
      role: "مهندس واجهات وتكامل عبر لوحة Talia 360 (الإدارة/الوزارة) وتطبيق Talia Learn — ربط الشاشات من بيانات وهمية إلى خلفية Go/REST حيّة والتحقق من كل شاشة على البيئة المنشورة.",
      process: [
        "بناء وتكامل شاشات Talia 360 (لوحة الوزارة/الإدارة) وTalia Learn (تطبيق التعلّم) كتطبيقات SvelteKit 5 + Tailwind CSS 4 فوق خلفية Go/REST مُنمّطة.",
        "ربط شاشات المنتج من بيانات وهمية إلى قراءات وكتابات API حيّة ببنية طبقية datasource → repository → query باستخدام TanStack Query.",
        "تنفيذ عروض حسب الدور مدركة لـ RBAC (معلم / طالب / مدير / مشرف) فوق نموذج صلاحيات deny-by-default عبر شجرة كيانات وزارة→مدرسة.",
        "تشغيل QA حيّ داخل المتصفح للتأكد من عرض البيانات الحقيقية، إغلاق فجوات الوهمي مقابل الحيّ، ورفع مشكلات تعاقد الخلفية — بمعيار بلا بيانات وهمية.",
      ],
      results: [
        { value: "25", label: "موديول وظيفي" },
        { value: "534", label: "متطلب ضمن النطاق" },
        { value: "متعدد المستأجرين", label: "وزارة → مدرسة" },
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
      type: "لعبة مسابقات تنافسية",
      context: "مشروع مستقل · أُطلق 2025 · خارج المتاجر",
      image: appImages.jaweb,
      shots: [
        "/images/jaweb1.webp",
        "/images/jaweb2.webp",
        "/images/jaweb3.webp",
      ],
      summary:
        "أمسية مسابقات عائلية تحوّلت إلى منتج عادل ذاتي التحكيم مع مدفوعات.",
      challenge:
        "تحويل لعبة مسابقات غير رسمية بفريقين إلى منتج يحكّم نفسه، يحسب النقاط بعدل، ويستقبل المدفوعات — دون مقدّم بشري يتابع.",
      role: "المهندس الوحيد. صممت وبنيت التطبيق بالكامل من الصفر.",
      process: [
        "نمذجة فريقين، ست تصنيفات، وثلاثة مستويات صعوبة مع منطق حكم يفرض القواعد.",
        "أتمتة حساب النقاط بحيث تُدار المباراة كاملة دون متابعة بشرية.",
        "دمج مدفوعات My Fatoorah وتغليف كل ذلك على كود Flutter بـ Clean Architecture.",
      ],
      results: [
        { value: "6", label: "تصنيفات" },
        { value: "3", label: "مستويات صعوبة" },
        { value: "تلقائي", label: "حكم + حساب نقاط" },
      ],
      stack: ["Flutter", "Clean Architecture", "My Fatoorah", "Payments"],
    },
  ],
  selectedWork: [
    {
      key: "voicers",
      title: "Voicers",
      tagline:
        "منصة صوت اجتماعية ثنائية اللغة غير منشورة لصناع المحتوى، VNotes، القوائم، المسابقات، وتفاعل الجمهور.",
      image: appImages.voicers,
    },
    {
      key: "imox",
      title: "IMOX",
      tagline:
        "تسوق اجتماعي بالفيديو — البائع ينشر ريلز والمشتري يشتري من الفيد.",
      image: appImages.imox,
    },
    {
      key: "yolo",
      title: "YOLO",
      tagline: "عمليات العيادات: مرضى، مواعيد، مخزون، وفواتير في تطبيق واحد.",
      image: appImages.yolo,
    },
    {
      key: "xera",
      title: "Xera Lab",
      tagline:
        "منصة إدارة حالات أسنان متكاملة — بوابة عملاء، لوحة إدارة، و Node.js API. بُنيت وسُلّمت للعميل.",
      image: appImages.xera,
    },
    {
      key: "fastap",
      title: "FasTap",
      tagline: "المس كارت NFC لمشاركة ملف كامل — يفتح على أي هاتف بلا تثبيت.",
      image: appImages.fastap,
    },
    {
      key: "btc",
      title: "BTC",
      tagline: "متجر عملاء + طلبات جملة B2B لأحد كبار بيوت الذهب والمجوهرات.",
      image: appImages.btc,
    },
    {
      key: "qfight",
      title: "Q-Fight Gym",
      tagline:
        "التطبيق الرسمي لصالة مواي تاي احترافية في قطر، بتدريب أبطال تايلانديين حاصلين على ألقاب عالمية.",
      image: appImages.qfight,
    },
    {
      key: "almuslim",
      title: "المسلم",
      tagline:
        "رفيق المسلم اليومي: القرآن الكريم، الأذكار والأدعية، مواقيت صلاة دقيقة، واتجاه القبلة مع تذكيرات ذكية.",
      image: appImages.almuslim,
    },
    {
      key: "iccd",
      title: "ICCD Hub",
      tagline:
        "تطبيق الأعضاء ثنائي اللغة للمؤسسة الإسلامية لتنمية القطاع الخاص — فعاليات، مواقيت الصلاة، القبلة، التقويم، والمهام.",
      image: appImages.iccd,
    },
  ],
  experiences: [
    {
      date: "فبراير 2025 - الآن",
      role: "مهندس برمجيات أول",
      company: "Appenza Studio",
      location: "دوام كامل · مصر",
      logo: "/images/company_logos/appenza.webp",
      summary:
        "بناء قلب فهيم، منتج تعليمي عربي بالذكاء الاصطناعي يستخدمه أكثر من 30,000 طالب.",
      achievements: [
        "تطوير محادثة AI فورية عبر WebSocket باستخدام Azure OpenAI streaming.",
        "بناء تدفقات مدرس صوتي STT/TTS ولوحة AI للصور التعليمية المولدة.",
        "تنفيذ Clean Architecture عبر 16 موديول مع RTL، تحليلات، Crashlytics، FCM، وبيئات متعددة.",
      ],
      apps: [
        {
          title: "فهيم",
          type: "منصة تعليم بالذكاء الاصطناعي",
          image: appImages.faheem,
          body: "تطبيق تعليمي عربي يحتوي على AI chat، مدرس صوتي، اختبارات ذكية، solve-by-camera، صور تعليمية، محفظة، نقاط، onboarding، وتجربة RTL.",
          stack: [
            "Flutter",
            "Azure OpenAI",
            "WebSocket",
            "Firebase",
            "Clean Architecture",
          ],
          metrics: [
            { value: "+30,000", label: "طالب K-12" },
            { value: "+8,500", label: "مستخدم نشط شهريًا" },
            { value: "16", label: "موديول" },
          ],
        },
        {
          title: "Talia",
          type: "منصة إدارة مدارس متعددة المستأجرين",
          image: appImages.talia,
          body: "منصة تعليم وطنية عربية أولًا ومتعددة المستأجرين (LMS + SIS)، وزارة التعليم في قطر عميلها الرئيسي. بناء واجهات SvelteKit (لوحة Talia 360 وتطبيق Talia Learn) وتكامل عشرات الشاشات من بيانات وهمية إلى خلفية Go/REST حيّة، مع صلاحيات حسب الدور مدركة لـ RBAC عبر شجرة كيانات وزارة→مدرسة.",
          stack: ["SvelteKit 5", "TypeScript", "Tailwind CSS 4", "TanStack Query", "RBAC"],
        },
        {
          title: "BTC",
          type: "تطبيق تجارة ذهب ومجوهرات",
          image: appImages.btc,
          shots: [
            "/images/shots/btc1.webp",
            "/images/shots/btc2.webp",
            "/images/shots/btc3.webp",
          ],
          body: "تطبيق تجاري لواحدة من أكبر بيوت الذهب والمجوهرات في مصر. بناء متجر العملاء وتطبيق تجار الجملة (B2B) من كود Flutter واحد مشترك عبر GraphQL API.",
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
      date: "سبتمبر 2024 - يناير 2025",
      role: "مهندس برمجيات",
      company: "Dib GmbH",
      location: "دوام كامل · ألمانيا عن بعد",
      logo: "/images/company_logos/dibhoalding.webp",
      summary:
        "العمل على منتجات تجارة اجتماعية وعمليات عيادات عبر مصر، ألمانيا، والإمارات.",
      achievements: [
        "تحسين بدء التشغيل وأداء الريلز باستخدام lazy initialization والكاشينج و pagination prefetch.",
        "نقل Deep Linking من Firebase إلى Airbridge وتنفيذ Mixpanel events/funnels.",
        "تقليل حجم YOLO من 86 MB إلى 51 MB وشحن أكثر من 10 مميزات للعميل.",
      ],
      apps: [
        {
          title: "IMOX",
          type: "تجارة اجتماعية",
          image: appImages.imox,
          shots: [
            "/images/shots/imox1.webp",
            "/images/shots/imox2.webp",
          ],
          body: "تطبيق تسوق بالفيديو حيث ينشر البائعون المنتجات كريلز ويتسوق المشترون من محتوى قصير.",
          stack: ["Flutter", "Airbridge", "Mixpanel", "Caching", "Deep Links"],
        },
        {
          title: "YOLO",
          type: "نظام إدارة عيادات",
          image: appImages.yolo,
          shots: [
            "/images/shots/yolo1.webp",
            "/images/shots/yolo2.webp",
            "/images/shots/yolo3.webp",
          ],
          body: "منتج عمليات عيادات يغطي HR، الأطباء، المرضى، المواعيد، المخزون، الفواتير، وتسليم مميزات لمناطق متعددة.",
          stack: ["Flutter", "Healthcare", "Optimization", "Multi-region"],
          metrics: [
            { value: "86 ← 51 MB", label: "تقليل حجم التطبيق" },
            { value: "+10", label: "مميزات مشحونة" },
          ],
        },
      ],
    },
    {
      date: "نوفمبر 2023 - فبراير 2025",
      role: "مهندس برمجيات",
      company: "Revealsite",
      location: "دوام جزئي · أمريكا عن بعد",
      logo: "/images/company_logos/revearsite.webp",
      summary:
        "بناء وصيانة تطبيقات Flutter White-label لصيدليات مستقلة ومجتمعية في أمريكا.",
      achievements: [
        "تنفيذ إعادة الصرف، تحويل الوصفات، المواعيد، التذكيرات، تاريخ الأدوية، ومراسلة المرضى.",
        "العمل على كود واحد مشترك يتم تهيئته حسب client ID مع runtime branding و offline-first caching.",
        "دمج OTP/JWT auth، تتبع الطلبات، الإشعارات، Google Maps links، وتدفقات صحية مخصصة.",
      ],
      apps: [
        {
          title: "RevealSite Platform",
          type: "منصة صيدليات White-label",
          image: appImages.revealsite,
          body: "منصة صيدليات مشتركة تشغل تطبيقات مرضى ببراندات مختلفة مع إعادة صرف، تحويل وصفات، مواعيد، تذكيرات، ومراسلة.",
          stack: ["Flutter", "Django REST", "JWT", "Hive", "Runtime branding"],
        },
        {
          title: "J&D Pharmacy",
          type: "تطبيق مرضى",
          image: appImages.jd,
          body: "تطبيق صيدلية محلية يشمل OTP auth، guest refills، تحويل وصفات، مواعيد، تاريخ أدوية، تذكيرات، وأخبار صحية.",
          stack: ["Flutter", "BLoC", "Dio", "Hive", "JWT"],
        },
        {
          title: "Medical Compounding Pharmacy",
          type: "تطبيق مرضى",
          image: appImages.medical,
          body: "تطبيق صيدلية مركبة لإعادة الصرف بالاستلام أو التوصيل، تحويل الوصفات، التذكيرات، المواعيد، HIPAA consent، وتوجيه آمن للطلبات.",
          stack: ["Flutter", "Clean Architecture", "BLoC", "Hive"],
        },
        {
          title: "Quick RX",
          type: "تطبيق صيدلية متخصصة",
          image: appImages.quickrx,
          body: "تطبيق لإعادة الصرف، تحويل الملف والوصفات، المواعيد، تذكيرات الأدوية، تتبع الطلبات، وتسجيل آمن OTP/JWT.",
          stack: ["Flutter", "Dio", "Hive", "Notifications", "JWT"],
        },
        {
          title: "Holland Discount Pharmacy",
          type: "تطبيق مرضى",
          image: appImages.holland,
          body: "تطبيق صيدلية مستقلة مع إعادة صرف، توصيل أو استلام، تحويل وصفات، تذكيرات، مواعيد، أخبار صحية، وتوجيه آمن للطلبات.",
          stack: ["Flutter", "Clean Architecture", "BLoC", "Hive"],
        },
      ],
    },
    {
      date: "أبريل 2023 - سبتمبر 2024",
      role: "مهندس برمجيات",
      company: "Zeyada",
      location: "دوام كامل",
      logo: "/images/company_logos/zeyada.webp",
      summary:
        "العمل على مزايا إدارة مدارس للمدفوعات، المحادثات، التواصل مع أولياء الأمور، والتجارة داخل التطبيق.",
      achievements: [
        "بناء محادثات فورية فردية وجماعية مع mute و block و clear وأدوات تحكم.",
        "دمج PayTabs لمدفوعات المصروفات المدرسية.",
        "تنفيذ Guardsquare shielding وتكامل Magento GraphQL للمتجر المدرسي.",
      ],
      apps: [
        {
          title: "Zeyada School Management",
          type: "تطبيق إدارة مدارس",
          image: appImages.zeyada,
          body: "تطبيق مدارس للمدفوعات، التواصل الفوري، تدفقات أولياء الأمور، حماية الإصدارات، وتكامل المتجر.",
          stack: ["Flutter", "PayTabs", "GraphQL", "Guardsquare", "Magento"],
        },
      ],
    },
  ],
  freelanceProjects: [
    {
      title: "Voicers",
      type: "منصة صوتية اجتماعية",
      image: appImages.voicers,
      shots: [
        "/images/shots/voicers1.webp",
        "/images/shots/voicers2.webp",
        "/images/shots/voicers3.webp",
      ],
      body: "منصة صوتية اجتماعية ثنائية اللغة لصنّاع المحتوى — ملاحظات صوتية (VNotes)، قوائم تشغيل، مسارح مباشرة، مسابقات، ولوحات صدارة، مع خلاصة اكتشاف وتفاعل مع الجمهور. بُنيت كمنتج مستقل؛ لم يُنشر بعد.",
      stack: ["Flutter", "Clean Architecture", "Audio", "Realtime"],
    },
    {
      title: "ICCD Hub",
      type: "تطبيق مجتمعي وإنتاجية",
      image: appImages.iccd,
      shots: [
        "/images/shots/iccd1.webp",
        "/images/shots/iccd2.webp",
        "/images/shots/iccd3.webp",
      ],
      body: "تطبيق مرافق للأعضاء ثنائي اللغة (إنجليزي/عربي) للمؤسسة الإسلامية لتنمية القطاع الخاص. يجمع بين المحتوى المؤسسي — الفعاليات، الدول الأعضاء، الشركات التابعة، ومركز المعرفة — وجناح إنتاجية شخصي (مهام، ملاحظات، تقويم، تذكيرات) وأدوات إسلامية (مواقيت الصلاة، بوصلة القبلة، والتقويم الهجري). مبني على معمارية GetX معيارية مع تسجيل دخول عبر Google وApple، إشعارات Firebase، روابط عميقة، ملاحظات بنص منسّق، ودعم كامل للاتجاه من اليمين لليسار.",
      stack: ["Flutter", "GetX", "Firebase", "REST API", "RTL"],
    },
    {
      title: "المسلم",
      type: "رفيق إسلامي يومي",
      image: appImages.almuslim,
      body: "رفيق يومي لقراءة القرآن الكريم والأذكار والأدعية، مع مواقيت صلاة دقيقة، اتجاه القبلة، وتذكيرات ذكية.",
      stack: ["Flutter", "REST API", "Notifications", "Geolocation"],
    },
    {
      title: "Q-Fight Gym",
      type: "تطبيق صالة مواي تاي",
      image: appImages.qfight,
      shots: [
        "/images/shots/qfight1.webp",
        "/images/shots/qfight2.webp",
        "/images/shots/qfight3.webp",
      ],
      body: "التطبيق الرسمي لصالة مواي تاي احترافية في قطر، يربط الأعضاء ببرنامج تدريبي يقوده أبطال تايلانديون حاصلون على ألقاب عالمية. يتصفح الأعضاء الباقات، ويحجزون جلسات فردية وجماعية مع مدربين محددين، ويديرون جدول حصصهم داخل التطبيق.",
      stack: ["Flutter", "Clean Architecture", "Firebase", "Payments"],
    },
    {
      title: "Jaweb",
      type: "لعبة مسابقات تفاعلية",
      image: appImages.jaweb,
      shots: [
        "/images/jaweb1.webp",
        "/images/jaweb2.webp",
        "/images/jaweb3.webp",
      ],
      body: "منتج مسابقات تنافسي تم بناؤه من الصفر بفرق، تصنيفات، مستويات صعوبة، منطق حكم، حساب نقاط تلقائي، ومدفوعات My Fatoorah.",
      stack: ["Flutter", "Clean Architecture", "My Fatoorah", "Payments"],
      metrics: [
        { value: "6", label: "تصنيفات" },
        { value: "3", label: "مستويات صعوبة" },
        { value: "تلقائي", label: "حكم + حساب نقاط" },
      ],
    },
    {
      title: "FasTap",
      type: "كارت أعمال رقمي NFC",
      image: appImages.fastap,
      shots: [
        "/images/fastab1.webp",
        "/images/fastab2.webp",
        "/images/fastab3.webp",
      ],
      body: "تطبيق Flutter يكتب ملفات المستخدم على كروت NFC مع صفحة Flutter Web تفتح عند المسح ونشر Firebase و Nginx.",
      stack: ["Flutter", "Flutter Web", "Firebase", "NFC", "Nginx"],
      metrics: [
        { value: "نقرة واحدة", label: "لمشاركة الملف" },
        { value: "تطبيق + ويب", label: "بناء واحد" },
      ],
    },
    {
      title: "Xera Lab",
      type: "منصة إدارة حالات أسنان",
      image: appImages.xera,
      body: "بوابة عملاء، لوحة إدارة، باك إند Node.js، قاعدة PostgreSQL، صلاحيات JWT، رفع إلى AWS S3، ونشر Docker Compose و Nginx.",
      stack: ["Flutter Web", "Node.js", "PostgreSQL", "Docker", "AWS"],
    },
    {
      title: "Ezhal",
      image: appImages.ezhal,
      shots: [appImages.ezhalShot],
      type: "منصة خدمات سيارات متعددة المستأجرين",
      body: "ثلاثة تطبيقات Flutter للعملاء والموظفين والمديرين مع حجز، تتبع مباشر، محفظة، نقاط، أختام، اشتراكات، و Apple Wallet passes.",
      stack: [
        "Flutter",
        "Riverpod",
        "MyFatoorah",
        "Stripe",
        "Firebase",
        "Apple PassKit",
      ],
      metrics: [
        { value: "3 تطبيقات", label: "كود واحد" },
        { value: "مباشر", label: "تتبع الفني" },
      ],
    },
  ],
  services: [
    {
      title: "مزايا ذكاء اصطناعي فورية",
      body: "محادثة AI بالبث، مدرّس صوتي (STT/TTS)، ومحتوى مولّد مدمج في منتجك عبر WebSocket — كما يخدم فهيم أكثر من 30,000 طالب مباشرة.",
    },
    {
      title: "تطبيقات Flutter من البداية للنهاية",
      body: "iOS و Android من كود واحد ببنية نظيفة: تسجيل دخول، مدفوعات، تحليلات، إشعارات، أوفلاين، وإطلاق على المتجر — وليس مجرد واجهات.",
    },
    {
      title: "بناء منتجات AI (من الفكرة إلى المتجر)",
      body: "المسار كامل من فكرة غير واضحة إلى تطبيق حيّ: واجهات خلفية، قاعدة بيانات، خط نشر، ومنتج يصمد في الإنتاج.",
    },
  ],
  // ملاحظة: الأسعار أدناه مبدئية من التصميم المرجعي، معايرة لمهندس سينيور في Flutter والذكاء الاصطناعي. استبدلها بالأرقام النهائية.
  plans: [
    {
      name: "مراجعة معمارية",
      icon: "clock",
      body: "قراءة سينيور لنظامك، مكتوبة.",
      price: "$1,200",
      priceNote: "سعر ثابت · نظام واحد · 5 أيام عمل",
      cta: "احجز مراجعة",
      items: [
        "مكالمة تحديد نطاق 30 دقيقة + تحليل معمّق لمستودعك",
        "مراجعة البنية والمخطط وتدفق البيانات",
        "تدقيق للأمان والتوسّع وتكلفة السحابة",
        "نتائج مكتوبة + خطة عمل مرتّبة يمكن تسليمها لأي مهندس",
        "مكالمة متابعة واحدة مدتها 45 دقيقة",
        "تحتفظ بالمستند سواء عملنا معاً أم لا",
      ],
    },
    {
      name: "منصة الإطلاق",
      icon: "diamond",
      body: "شريحة واحدة جاهزة للإنتاج، مُسلّمة.",
      price: "$9,000",
      priceNote: "نطاق ثابت · جاهز للإنتاج",
      cta: "لنحدد النطاق",
      featured: true,
      badge: "الأكثر طلباً",
      itemsIntro: "كل ما في المراجعة المعمارية، بالإضافة إلى:",
      items: [
        "شريحة واحدة محددة بوضوح — وليست «المنتج بأكمله»",
        "باك إند وويب وبنية تحتية مملوكة من البداية للنهاية",
        "بنية متعددة المستأجرين / قائمة على الأدوار عند الحاجة",
        "نشر عبر Docker + تكامل مستمر عبر GitHub Actions",
        "مدفوعات ومصادقة وتكاملات مع أطراف ثالثة",
        "توثيق ودلائل تشغيل وتسليم نظيف",
        "دعم أسبوعين بعد الإطلاق",
        "التسعير بالشريحة، لا بالساعة",
        "المرحلة الأولى في الأسبوع الأول. إن لم يعجبك الكود، نتوقف هناك.",
      ],
    },
    {
      name: "شراكة",
      icon: "infinity",
      body: "قدرة سينيور محجوزة، كل شهر.",
      price: "$3,500",
      priceNote: "شهرياً · 40 ساعة محجوزة · إلغاء في أي وقت",
      cta: "لنناقش الاشتراك",
      itemsIntro: "كل ما في منصة الإطلاق، بالإضافة إلى:",
      items: [
        "40 ساعة من القدرة الهندسية السينيور المحجوزة شهرياً",
        "تسليم مستمر + تخطيط لخارطة الطريق",
        "استجابة ذات أولوية خلال يوم عمل واحد",
        "تحسين التوسّع والأداء والتكلفة",
        "تقرير شهري + مراجعة معمارية ربع سنوية",
        "باقة 80 ساعة متاحة بـ $6,000 شهرياً",
        "بلا التزام مقيّد — إشعار قبل 30 يوماً",
      ],
    },
  ],
  planAddOns: [
    {
      name: "إطلاق موبايل",
      price: "$6,000",
      body: "iOS و Android من قاعدة كود Flutter واحدة، مع تولّي التقديم للمتجرين.",
    },
    {
      name: "مسرّع الذكاء الاصطناعي",
      price: "$4,500",
      body: "ميزات RAG أو نماذج لغوية في الإنتاج — استرجاع، تقييمات، ضوابط، بدائل.",
    },
    {
      name: "محرك الزمن الحقيقي",
      price: "$4,000",
      body: "حالة WebSocket موثوقة من الخادم، وحضور، ومزامنة لا تفقد الكتابات.",
    },
  ],
  // مقتطفات مترجمة من توصيات LinkedIn (النصوص الكاملة في assets/linkedin.json).
  testimonials: [
    {
      quote:
        "أظهر عبدالله قدرة مبهرة على استيعاب المفاهيم التقنية المعقدة بسرعة. مهاراته التحليلية ونهجه المدروس في حل المشكلات يجعلانه مساهمًا أساسيًا في نجاح فريقنا.",
      name: "محمد سيد",
      role: "قائد فريق الذكاء الاصطناعي · Appenza",
      image: testimonialImages.mohamedSayed,
      linkedin: "https://www.linkedin.com/in/abdullah-mohamed-3010/details/recommendations/",
    },
    {
      quote:
        "يجمع عبدالله بين خبرة تقنية عميقة وأسلوب قيادي واضح وودود. ساهم بشكل كبير في مشاريعنا بقدرته على حل المشكلات المعقدة بكفاءة والتزامه بالجودة.",
      name: "أحمد فريد",
      role: "مهندس برمجيات أول · Recovery Advisers",
      image: testimonialImages.ahmedFarid,
      linkedin: "https://www.linkedin.com/in/abdullah-mohamed-3010/details/recommendations/",
    },
    {
      quote:
        "عبدالله مطوّر Flutter استثنائي، موهبته وحماسه يجعلانه مكسبًا لأي فريق. خلال عام من العمل معًا، أبهرتني باستمرار مهاراته في حل المشكلات وتجاوز التحديات.",
      name: "محمد زكريا",
      role: "مهندس اختبار برمجيات أول · Yassir",
      image: testimonialImages.mohamadZakaria,
      linkedin: "https://www.linkedin.com/in/abdullah-mohamed-3010/details/recommendations/",
    },
  ],
  about: {
    eyebrow: "نبذة",
    title: "أبني منتجات لا بد أن تصمد أمام مستخدمين حقيقيين.",
    paragraphs: [
      "مهندس برمجيات أول أعمل على ميزات الذكاء الاصطناعي، وتطبيقات Flutter، والواجهات الخلفية، وخطوط النشر التي تُبقيها تعمل. معظم عملي هو الجزء الذي تستهين به الفرق: تحويل فكرة غير واضحة إلى شيء يُطلَق فعلًا ويصمد في الإنتاج.",
      "خلال السنوات الأخيرة أطلقت أكثر من 10 تطبيقات على المتاجر في أربع مناطق، وغالبًا أمتلك الميزة من التصميم المعماري حتى الإصدار. يهمني الوضوح، والاستمرارية، وكودٌ يستطيع المهندس التالي صيانته دون خريطة.",
    ],
  },
  contact: {
    eyebrow: "تواصل",
    title: "تحتاج منتجاً يتم بناؤه أو إصلاحه أو إطلاقه؟",
    body: "أرسل لي فكرة المنتج، الموعد المطلوب، وما الذي يعطلك الآن. سأرد عليك بالخطوة العملية التالية.",
    book: "احجز مكالمة",
    form: {
      name: "اسمك",
      email: "بريدك الإلكتروني",
      message: "ما الذي تحتاج بناءه أو إصلاحه أو إطلاقه؟",
      send: "إرسال الرسالة",
      sending: "جارٍ الإرسال…",
      success: "تم إرسال الرسالة — سأرد خلال 24 ساعة.",
      error: "تعذّر الإرسال الآن — تواصل معي مباشرة بالأسفل.",
      copyEmail: "نسخ البريد",
      copied: "تم النسخ!",
      directLabel: "أو تواصل معي مباشرة",
    },
  },
};
