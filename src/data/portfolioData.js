/**
 * Centralized Portfolio Data for Felix
 * Edit this file to update any information across the portfolio website.
 */

export const portfolioData = {
  personal: {
    name: "Felix",
    displayName: "Felix Febdinal",
    role: "Software Engineer",
    headline: "Software Engineer & Web Developer",
    alternativeText: "Building modern web applications, backend systems, and digital solutions.",
    shortIntro: "I'm Felix, a software engineer focused on building modern web applications, backend systems, and scalable digital solutions.",
    description: "I build modern web applications, backend systems, APIs, and digital products with a focus on clean architecture, performance, and practical solutions.",
    profileCardBio: "Tech-focused developer building web applications, backend systems, APIs, and SaaS products.",
    focusAreas: [
      "Software Engineering",
      "Web Development",
      "Mobile Development",
      "AI Automation",
      "System Architecture",
      "Database & Infrastructure"
    ],
    aboutText: [
      "I'm Felix, a software engineer passionate about building useful digital products and solving real-world problems through technology.",
      "I work across backend systems, web applications, APIs, databases, and SaaS platforms. I enjoy turning ideas into reliable, scalable, and maintainable software.",
      "My approach focuses on clean architecture, practical solutions, performance, and creating experiences that are simple for users while remaining powerful under the hood."
    ]
  },

  socialLinks: {
    github: "https://github.com/febdinal",
    linkedin: "https://linkedin.com/febdinal",
    instagram: "https://instagram.com/febdinal",
    whatsapp: "https://wa.me/629630330201",
    email: "febdinal08@gmail.com",
    resumeUrl: "#"
  },

  rotatingRoles: [
    "Building modern web applications",
    "Designing robust backend systems",
    "Engineering scalable SaaS products",
    "Architecting high-performance APIs"
  ],

  floatingBadges: [
    { text: "Laravel", top: "10%", left: "68%", delay: "0s" },
    { text: "Node.js", top: "72%", left: "78%", delay: "1.2s" },
    { text: "Vue / Nuxt", top: "82%", left: "8%", delay: "2.4s" },
    { text: "PostgreSQL", top: "4%", left: "85%", delay: "0.6s" },
    { text: "Docker", top: "50%", left: "90%", delay: "1.8s" },
  ],

  stats: [
    {
      value: "5+",
      label: "Years Building",
      subtext: "Crafting software & systems"
    },
    {
      value: "10+",
      label: "Projects Built",
      subtext: "Web, SaaS & backend apps"
    },
    {
      value: "10+",
      label: "Products / Systems",
      subtext: "Production architectures"
    }
  ],

  whatIDo: [
    {
      id: "ai-automation",
      title: "AI & Automation",
      description: "Building AI-powered features and automation workflows that help simplify repetitive processes and improve productivity.",
      iconName: "cpu"
    },
    {
      id: "backend-engineering",
      title: "Backend Engineering",
      description: "Designing robust backend systems, REST APIs, authentication, business logic, and scalable application architectures.",
      iconName: "server"
    },
    {
      id: "web-applications",
      title: "Web Applications",
      description: "Developing modern, responsive web applications with clean interfaces and practical user experiences.",
      iconName: "layout"
    },
    {
      id: "saas-products",
      title: "SaaS & Digital Products",
      description: "Building software products and SaaS platforms from idea to implementation, including backend, frontend, database, and deployment.",
      iconName: "package"
    }
  ],

  skills: [
    {
      category: "AI & Machine Learning",
      area: "ai",
      skills: ["Python", "AI Integration", "Automation", "API Integration"]
    },
    {
      category: "Web Development",
      area: "web",
      skills: ["Laravel", "PHP", "JavaScript", "TypeScript", "HTML", "CSS", "REST API"]
    },
    {
      category: "Backend Engineering",
      area: "backend",
      skills: ["Laravel", "PHP", "Node.js", "REST API", "Authentication", "System Architecture"]
    },
    {
      category: "Database & Infrastructure",
      area: "db",
      skills: ["MySQL", "PostgreSQL", "Redis", "Linux", "VPS", "Nginx", "Git"]
    },
    {
      category: "Frontend",
      area: "frontend",
      skills: ["JavaScript", "TypeScript", "Vue", "Nuxt", "Responsive Design"]
    },
    {
      category: "DevOps & Tools",
      area: "devops",
      skills: ["Git", "GitHub", "Linux", "Nginx", "VPS", "Docker", "CI/CD"]
    }
  ],

  achievements: [
    {
      number: "01",
      title: "Software Engineering",
      event: "Building and maintaining web-based applications and backend systems.",
      year: "2024 - Present",
      tags: ["Full Stack", "Clean Code", "Maintenance"]
    },
    {
      number: "02",
      title: "SaaS Development",
      event: "Developing digital products and SaaS solutions for business needs.",
      year: "2024 - Present",
      tags: ["SaaS", "Multi-tenant", "Subscription"]
    },
    {
      number: "03",
      title: "Backend & API Development",
      event: "Designing APIs, backend architecture, authentication, and business logic.",
      year: "2023 - Present",
      tags: ["REST API", "Security", "Scalability"]
    },
    {
      number: "04",
      title: "System & Infrastructure",
      event: "Working with VPS, Linux, Nginx, databases, deployment, and application infrastructure.",
      year: "2023 - Present",
      tags: ["Linux", "Nginx", "VPS", "DevOps"]
    },
    {
      number: "05",
      title: "Continuous Learning",
      event: "Exploring modern technologies, AI, automation, and software engineering practices.",
      year: "Ongoing",
      tags: ["AI Integration", "Modern Tech", "Innovation"]
    }
  ],

  featuredProjects: [
    {
      id: "mariscashop",
      title: "Mariscashop",
      category: "Luxury E-Commerce",
      description: "High-end fashion and lifestyle e-commerce platform with curated designer collections, real-time product catalog, shopping bag, and seamless checkout flow.",
      role: "Frontend & API Integration",
      tags: ["Nuxt", "Vue", "Laravel", "REST API", "Tailwind CSS"],
      status: "Live Application",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "mariscashop"
    },
    {
      id: "funix-configurator",
      title: "Funix Feature & Cost Calculator",
      category: "SaaS Tool / Configurator",
      description: "Interactive web feature configurator and pricing calculator allowing clients to choose tiered packages or build custom website features with instant cost estimation.",
      role: "Frontend & Logic Developer",
      tags: ["React", "JavaScript", "Tailwind CSS", "Interactive UI"],
      status: "Interactive Tool",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "kalkulator"
    },
    {
      id: "presensi-edupay",
      title: "EduPay & Presensi Harian Mobile",
      category: "Mobile App / EdTech & Fintech",
      description: "Comprehensive school mobile ecosystem featuring student photo attendance, SPP tuition fee payments via EduPay digital wallet, student savings, and school events.",
      role: "Mobile & Backend Architect",
      tags: ["Mobile App", "Laravel API", "Payment Gateway", "MySQL"],
      status: "Production Mobile App",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "presensi"
    },
    {
      id: "helloblood",
      title: "HelloBlood Donor Darah Mobile",
      category: "Mobile Application / Healthcare",
      description: "Mobile healthcare application facilitating voluntary blood donation, nearest donor unit locator via Google Maps, blood stock availability, and reservation scheduling.",
      role: "Mobile App & API Developer",
      tags: ["Mobile UI", "React Native", "Google Maps API", "REST API"],
      status: "Mobile App",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "helloblood"
    },
    {
      id: "mysuzuki",
      title: "MySuzuki Official Portal",
      category: "Automotive E-Commerce",
      description: "Official digital spare parts e-commerce portal for Suzuki motorcycle, automobile, and marine products featuring part number lookups and order management.",
      role: "Full Stack Web Developer",
      tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap"],
      status: "Enterprise System",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "mysuzuki"
    },
    {
      id: "pasteur-trans",
      title: "Pasteur Trans Reservation",
      category: "Travel & Transportation",
      description: "Online intercity shuttle reservation system supporting route selection across Bandung, Jakarta, Bogor, Bekasi, and Cirebon with real-time seat scheduling.",
      role: "Full Stack Engineer",
      tags: ["Laravel", "PHP", "MySQL", "REST API", "Payment Gateway"],
      status: "Live Platform",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "pastertrans"
    },
    {
      id: "larisin",
      title: "Larisin.id",
      category: "SaaS / Point of Sale",
      description: "Modern SaaS Point of Sale system with direct cashier POS interface, inventory management, multi-category catalog, daily & monthly reporting, and financial analytics.",
      role: "Lead Developer",
      tags: ["Laravel", "PHP", "MySQL", "JavaScript", "REST API"],
      status: "Production Ready",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "larisin"
    },
    {
      id: "jatra-inventory",
      title: "Jatra Inventory & Finance",
      category: "Enterprise ERP & Finance",
      description: "Comprehensive web-based inventory and financial management system featuring real-time cash flow monitoring, warehouse stock tracking, PO purchases, and journal ledgers.",
      role: "Full Stack Engineer",
      tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Chart.js"],
      status: "Completed",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "jatra"
    },
    {
      id: "belibis-group",
      title: "Belibis Group Ferry Ticketing",
      category: "Maritime Transportation",
      description: "Official maritime ferry and vessel ticketing portal featuring online ticket reservations, schedule lookups, destination route management, and agency integrations.",
      role: "Web Application Developer",
      tags: ["Laravel", "PHP", "MySQL", "Bootstrap", "REST API"],
      status: "Production System",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "belibis"
    },
    {
      id: "faedah",
      title: "Faedah Digital Sedekah & Waqf",
      category: "Fintech & Social Platform",
      description: "Community-driven Islamic crowdfunding platform enabling verified donations, digital sedekah, community activity calendars, and educational religious publications.",
      role: "Full Stack Developer",
      tags: ["Laravel", "PHP", "MySQL", "Payment Gateway", "REST API"],
      status: "Active Community",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "faedah"
    },
    {
      id: "suksesku",
      title: "Suksesku Umrah & Travel Marketplace",
      category: "Marketplace & Travel",
      description: "Multi-vendor travel and e-commerce marketplace offering Umrah & Hajj packages, hotel bookings, flight tickets, and retail products with direct order inquiry.",
      role: "Full Stack Engineer",
      tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Multi-tenant"],
      status: "Production Ready",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "suksesku"
    },
    {
      id: "hotjob",
      title: "HotJobs! Hospitality & Tourism",
      category: "Recruitment & HR Platform",
      description: "Specialized job recruitment and talent-matching portal tailored for the hotel, restaurant, and tourism industries with multi-role candidate filtering.",
      role: "Full Stack Developer",
      tags: ["Laravel", "PHP", "MySQL", "JavaScript", "Search Engine"],
      status: "Web Portal",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "hotjob"
    },
    {
      id: "piknikaja",
      title: "Piknik Aja Tourism Explorer",
      category: "Mobile App / Travel & Leisure",
      description: "Mobile travel discovery application helping tourists discover popular destinations, book local attractions, find transportation tickets, and explore scenic spots.",
      role: "Mobile Application Developer",
      tags: ["Mobile UI/UX", "React Native", "REST API", "Maps Integration"],
      status: "Mobile App",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "piknikaja"
    },
    {
      id: "virello",
      title: "Virello Shopping & Voucher App",
      category: "Mobile App / E-Commerce & PPOB",
      description: "Mobile retail shopping application featuring phone OTP authentication, digital PPOB bill payments, customer reward loyalty points, and merchant discount vouchers.",
      role: "Mobile & API Engineer",
      tags: ["Mobile App", "REST API", "OTP Auth", "Digital Payments"],
      status: "Mobile App",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "virello"
    },
    {
      id: "yello-academy",
      title: "Yello Academy LCMS",
      category: "Learning Management System",
      description: "A Learning & Certification Management System designed to support hybrid learning, course management, certification, and learning activities.",
      role: "Backend & System Architect",
      tags: ["Web Application", "Backend", "API", "Database"],
      status: "Enterprise System",
      liveUrl: "#",
      githubUrl: "#",
      imageKey: "yello"
    }
  ],

  otherProjects: [
    {
      title: "POS & Business Systems",
      description: "Tailored enterprise point of sale and back-office systems with inventory sync, transaction logging, and financial summaries.",
      tags: ["Laravel", "MySQL", "REST API"],
      githubUrl: "#"
    },
    {
      title: "API & Backend Projects",
      description: "High-performance backend microservices with token-based authentication, structured caching, and rate limiting.",
      tags: ["Node.js", "PHP", "Redis", "REST"],
      githubUrl: "#"
    },
    {
      title: "Automation Experiments",
      description: "Workflow orchestrations, webhooks, and automated data pipelines connecting multiple business software services.",
      tags: ["Automation", "Webhooks", "CI/CD"],
      githubUrl: "#"
    },
    {
      title: "AI Experiments",
      description: "Exploration of prompt engineering, LLM API integrations, and intelligent assistant workflows for everyday software tools.",
      tags: ["Python", "AI Integration", "FastAPI"],
      githubUrl: "#"
    },
    {
      title: "Web Applications",
      description: "Dynamic single-page applications and server-rendered portals engineered with responsive layouts and accessible UX.",
      tags: ["Vue", "Nuxt", "JavaScript", "CSS"],
      githubUrl: "#"
    }
  ]
};
