import { Project } from '../types.ts';

export const projects: Project[] = [
  {
    slug: 'outpost',
    number: '01',
    title: 'Outpost',
    subtitle: 'All-in-one operations platform for growing teams and founders',
    description: 'A multi-tenant workspace bringing hiring pipelines, employee records, payroll, finance workflows, and Jarvis AI automation into one clear system.',
    shortSummary: 'Operations platform unifying hiring funnels, employee directories, payroll, finance management, and Jarvis AI agent automation.',
    role: 'Software Engineer at Algorithm',
    techStackSummary: 'React, TypeScript, TanStack Router, TanStack Query, Mantine UI, Node.js, Express, MongoDB, Gemini AI',
    honestOutcome: 'Shipped core product modules across hiring, finance, automated candidate assessments, and AI-assisted workflows used by internal teams daily.',
    tint: 'butter',
    initial: 'O',
    image: '/images/outpost.png',
    imageAlt: 'Outpost operations platform interface showing candidate management and organization workflows',
    longOverview: 'Outpost is a multi-tenant operations platform designed to help founders and growing teams run their business in one place. I work across the full stack building major product modules including the end-to-end hiring funnel, employee management, finance workflows, and Jarvis: an AI assistant layer built on Gemini and Model Context Protocol (MCP) integrations that helps automate candidate evaluations and operational tasks.',
    year: '2026 to Present',
    categories: ['Multi-Tenant SaaS', 'Full Stack', 'AI Integration'],
    technologies: ['React 19', 'TypeScript', 'TanStack Router', 'TanStack Query', 'Mantine UI', 'Node.js', 'Express', 'MongoDB', 'Google Gemini', 'MCP'],
    timeline: 'Active product development (08/2026 to Present)',
    verifiedMetrics: [],
    whatIBuilt: [
      'Hiring and applicant pipeline: job requisition creation, visual candidate stage tracking, structured interview scorecards, and offer letter generation.',
      'Finance and payroll module: company bank account overviews, expense and invoice tracking, and automated monthly compensation calculations.',
      'Jarvis AI integration: an intelligent assistant powered by Google Gemini and Model Context Protocol (MCP) that analyzes candidate resumes and provides instant evaluation summaries.',
      'Candidate assessment workflows: automated candidate communication, email updates, and assessment scheduling.',
      'Launchpad admin portal: platform-level administration tools for managing tenant organizations and onboarding new teams.',
      'Marketing web properties: built responsive landing pages including the RollCall product introduction.'
    ],
    whatILearned: [
      'How to design clean multi-tenant architectures where every organization has strictly isolated data and permissions.',
      'Connecting LLMs into real business workflows using Model Context Protocol (MCP) so AI agents can query live application data safely.',
      'Balancing high information density in dashboards with an approachable, clean user experience.'
    ],
    challenge: {
      problemStatement: 'Growing companies typically stitch together separate tools for recruitment, employee databases, payroll, and invoicing, creating fragmented records and manual data entry overhead.',
      whyItMattered: 'A unified operations platform gives leadership and hiring managers one trusted place for team decisions without context switching between four different apps.',
      complexityFactors: [
        'Keeping sensitive financial and compensation data strictly isolated between different roles and organizations',
        'Integrating AI assistance directly into the hiring pipeline without slowing down daily page loads',
        'Creating an interface that handles dense tabular data while remaining intuitive to navigate'
      ],
    },
    architecture: {
      summary: 'A unified full-stack architecture pairing a fast React frontend with a modular Node.js API, MongoDB document storage, and an asynchronous AI agent service layer.',
      components: [
        {
          name: 'Hiring & Candidate Hub',
          responsibility: 'Applicant tracking, interview scheduling, reviewer assignments, and offer generation.',
          tech: 'React / TanStack Router / Mantine UI',
        },
        {
          name: 'Finance & Payroll Center',
          responsibility: 'Invoice management, expense tracking, bank accounts, and payroll calculations.',
          tech: 'Node.js / Express / MongoDB',
        },
        {
          name: 'Jarvis AI Agent Layer',
          responsibility: 'Candidate profile summaries and resume analysis via Gemini and Model Context Protocol (MCP).',
          tech: 'Google Gemini / MCP / Background Jobs',
        },
        {
          name: 'Launchpad Admin Console',
          responsibility: 'Global tenant management, organization setup, and platform audit controls.',
          tech: 'React / Express / MongoDB',
        },
      ],
      pipelineDescription: 'Client Action -> Tenant Authentication -> Business Logic Controller -> Database Update -> Background AI Enrichment (Jarvis)',
    },
    decisions: [
      {
        decision: 'Model Context Protocol (MCP) for AI agent tooling',
        context: 'Jarvis needed to safely look up application context like candidate history and job descriptions.',
        tradeoffConsidered: 'Direct hardcoded database queries from prompts versus a standardized tool protocol.',
        result: 'Adopted MCP to give the AI controlled, secure access to specific application capabilities.',
      },
      {
        decision: 'Selective background AI candidate profiling',
        context: 'Generating AI evaluations on every small candidate edit was wasteful and created noticeable lag.',
        tradeoffConsidered: 'Real-time generation on every save versus background execution triggered by meaningful changes.',
        result: 'Gated AI evaluations to meaningful updates, keeping candidate pages instantaneous and responsive.',
      },
    ],
    tradeoffs: [
      {
        factor: 'Client-side routing and state',
        chosenApproach: 'TanStack Router and Query for fully type-safe navigation and cached server data.',
        alternativeRejected: 'Ad-hoc URL state and manual fetch handlers.',
        rationale: 'Prevented broken links and out-of-sync data across complex nested dashboard tabs.',
      },
      {
        factor: 'UI design system',
        chosenApproach: 'Mantine UI components customized with Tailwind styling.',
        alternativeRejected: 'Building every complex table, drawer, and modal from scratch.',
        rationale: 'Accelerated feature delivery while guaranteeing keyboard navigation and consistent accessibility.',
      },
    ],
    outcome: {
      summary: 'Delivered an integrated operations platform that powers daily hiring, team administration, and financial tracking for active teams.',
      deliverables: [
        'Complete hiring pipeline and candidate evaluation suite',
        'Company finance and payroll tracking module',
        'Jarvis AI assistant integration with Model Context Protocol',
        'Launchpad administration panel for tenant management',
      ],
    },
    featured: true,
  },
  {
    slug: 'medlens',
    number: '02',
    title: 'MedLens',
    subtitle: 'Clinical documentation and encounter intelligence platform for physicians',
    description: 'A clinical platform that converts patient encounter audio into structured, auditable medical notes and encounter summaries in real time.',
    shortSummary: 'Clinical documentation platform turning doctor-patient conversations into structured medical notes and patient timelines.',
    role: 'Software Engineering Intern at Algorithm',
    techStackSummary: 'React, TypeScript, TanStack Router, TanStack Query, Mantine UI, Astro, Node.js, Express, PostgreSQL, LangGraph',
    honestOutcome: 'Built patient management workflows, encounter recording interfaces, clinical risk calculators, and the live product marketing website.',
    tint: 'sage',
    initial: 'M',
    image: '/images/medlens.png',
    imageAlt: 'MedLens clinical documentation and patient encounter workflow interface',
    longOverview: 'MedLens is a production clinical documentation platform built to ease physician documentation workload. During consultations, patient encounters are recorded and processed through an intelligent pipeline that transcribes and structures conversation audio into clinical notes. I engineered the web frontend for patient profiles, encounter recording workflows, and clinical risk calculators, and built the MedLens public marketing site using Astro.',
    year: '2026',
    categories: ['Healthcare', 'Frontend Engineering', 'AI Products'],
    technologies: ['React', 'TypeScript', 'TanStack Router', 'TanStack Query', 'Mantine UI', 'Astro', 'Node.js', 'PostgreSQL', 'LangGraph'],
    timeline: 'Completed (04/2026 to 07/2026)',
    verifiedMetrics: [],
    whatIBuilt: [
      'Patient profile management: complete patient histories, past visit summaries, and chronological medical timelines.',
      'Encounter recording workspace: audio capture controls, live recording status, and review interfaces for physician note sign-off.',
      'Clinical risk-score calculators: interactive tools providing real-time calculation of clinical assessments during visits.',
      'MedLens marketing website: designed and built a fast, SEO-friendly landing page and provider portal using Astro.'
    ],
    whatILearned: [
      'Designing clinical interfaces where speed, clarity, and zero ambiguity are vital for healthcare providers.',
      'Displaying background AI processing states cleanly so physicians know exactly when notes are ready for review.',
      'Using Astro to deliver lightweight, content-focused web pages that achieve excellent SEO and load times.'
    ],
    challenge: {
      problemStatement: 'Physicians spend hours each evening manually typing clinical notes after appointments, taking time away from direct patient care and contributing to clinical burnout.',
      whyItMattered: 'Automating note generation while giving doctors complete control to review and edit keeps medical records accurate and frees up valuable physician time.',
      complexityFactors: [
        'Communicating multi-step audio transcription and note generation without leaving users in the dark',
        'Creating keyboard-friendly medical screens that doctors can navigate quickly between appointments',
        'Presenting medical records with high visual legibility on varied hospital monitors and laptops'
      ],
    },
    architecture: {
      summary: 'A responsive React clinical application backed by Node.js microservices, asynchronous background audio processing, and an Astro-powered public portal.',
      components: [
        {
          name: 'Clinical Dashboard',
          responsibility: 'Patient directory, encounter recording controls, timeline reviews, and note approval.',
          tech: 'React / TypeScript / TanStack Query / Mantine UI',
        },
        {
          name: 'Clinical AI Note Generator',
          responsibility: 'Structures consultation audio into standard medical note sections.',
          tech: 'LangGraph / Google Gemini / Node.js',
        },
        {
          name: 'Provider Marketing Portal',
          responsibility: 'Public landing pages, feature overviews, and provider onboarding.',
          tech: 'Astro / Tailwind CSS',
        },
      ],
      pipelineDescription: 'Audio Recording -> Background Transcription -> Structured Note Generation -> Doctor Review & Approval',
    },
    decisions: [
      {
        decision: 'Astro for marketing and provider information pages',
        context: 'The public website needed instant loading and strong search engine rankings.',
        tradeoffConsidered: 'Single-page app routing versus a static site framework.',
        result: 'Astro delivered sub-second page loads and strong SEO while sharing design styles with the main product.',
      },
      {
        decision: 'Optimistic UI updates for medical timelines',
        context: 'Doctors need instantaneous feedback when updating patient notes and encounter tags.',
        tradeoffConsidered: 'Waiting for round-trip server confirmation versus immediate UI updates with background synchronization.',
        result: 'Kept the interface feeling instant while background jobs handle data persistence.',
      },
    ],
    tradeoffs: [
      {
        factor: 'Clinical design components',
        chosenApproach: 'Mantine UI components customized with healthcare-appropriate typography and spacing.',
        alternativeRejected: 'Building custom unstyled form controls from scratch.',
        rationale: 'Provided accessible form controls, modals, and tables that meet clinical usability expectations.',
      },
    ],
    outcome: {
      summary: 'Helped deliver a clinical intelligence platform currently live in production across web, iOS, and Android.',
      deliverables: [
        'Patient records and encounter recording web workspace',
        'Interactive medical risk-score calculation tools',
        'Production MedLens marketing website built with Astro',
      ],
    },
    featured: true,
  },
  {
    slug: 'healers',
    number: '03',
    title: 'Healers Institute Care Platform',
    subtitle: 'Institutional care management system for special needs education',
    description: 'A complete management platform handling student care records, fee tracking, revenue accounting, and staff payroll for a special needs center.',
    shortSummary: 'Special-needs care institute management platform managing student records, fee collections, operational finances, and automated CI/CD.',
    role: 'Full Stack Developer (Freelance)',
    techStackSummary: 'Next.js, React, TanStack Query, Node.js, Express, shadcn/ui, MongoDB, Docker',
    honestOutcome: 'Delivered an end-to-end management platform with automated containerized deployment supporting daily operations for teachers and administrators.',
    tint: 'peach',
    initial: 'H',
    image: '/images/healers.jpg',
    imageAlt: 'Healers Institute management platform student and finance dashboard',
    longOverview: 'Built for Healers Institute for Children with Special Needs in Gujranwala, Pakistan: a center supporting children with autism, ADHD, speech delays, Down syndrome, and other developmental needs. I designed and delivered an all-in-one management platform handling student progress records, fee schedules, payment receipts, revenue tracking, and staff payroll.',
    year: '2026',
    categories: ['Education & Care', 'Full Stack', 'DevOps'],
    technologies: ['Next.js', 'React', 'TanStack Query', 'Node.js', 'Express', 'shadcn/ui', 'MongoDB', 'Docker Compose', 'GitHub Actions'],
    timeline: 'Completed freelance engagement (12/2025 to 04/2026)',
    verifiedMetrics: [],
    whatIBuilt: [
      'Student care and admissions module: developmental progress tracking, therapy session logs, and attendance recording.',
      'Tuition fee and payment ledger: automated invoice receipts, payment status tracking, and revenue reconciliation.',
      'Staff compensation and payroll: tracking teacher salaries, disbursement dates, and institute operational expenses.',
      'Containerized deployment pipeline: Docker Compose configuration and automated GitHub Actions CI/CD for reliable updates.'
    ],
    whatILearned: [
      'Translating unique special-education requirements into accessible software that teachers can use comfortably.',
      'Designing accounting ledgers that make financial tracking clear for non-technical administrative staff.',
      'Setting up automated deployment pipelines that keep multi-service applications easy to maintain.'
    ],
    challenge: {
      problemStatement: 'The institute was managing student developmental progress, therapy attendance, and recurring tuition across paper registers, leading to lost time and manual reconciliation mistakes.',
      whyItMattered: 'Administrators and therapists need one clear, dependable place to see each child\'s therapy milestones and manage institute finances accurately.',
      complexityFactors: [
        'Accommodating varied developmental therapy categories and student progress milestones',
        'Handling diverse tuition structures, partial payments, and monthly teacher salaries reliably',
        'Creating a deployment setup that non-technical staff can maintain without complex server management'
      ],
    },
    architecture: {
      summary: 'A clean Next.js web application connected to a modular Express REST API and MongoDB database, containerized with Docker.',
      components: [
        {
          name: 'Student & Therapy Portal',
          responsibility: 'Admissions, developmental notes, session logs, and attendance.',
          tech: 'Next.js / React / shadcn/ui',
        },
        {
          name: 'Finance & Tuition Accounting',
          responsibility: 'Fee invoices, payment receipts, expense logging, and staff salary records.',
          tech: 'Node.js / Express / MongoDB',
        },
        {
          name: 'Deployment Pipeline',
          responsibility: 'Containerized application packaging and automated updates.',
          tech: 'Docker Compose / GitHub Actions',
        },
      ],
      pipelineDescription: 'Web Dashboard -> API Service -> Database Storage with automated Docker builds on updates',
    },
    decisions: [
      {
        decision: 'Unified Docker Compose environment',
        context: 'The institute needed the flexibility to run locally or connect to cloud databases without configuration headaches.',
        tradeoffConsidered: 'Manual cloud server setup versus standardized container configuration.',
        result: 'Enabled a single-command setup that runs reliably in both development and production.',
      },
    ],
    tradeoffs: [
      {
        factor: 'Deployment automation',
        chosenApproach: 'Automated GitHub Actions pipeline with versioned containers.',
        alternativeRejected: 'Manual file uploads and manual server commands.',
        rationale: 'Eliminated manual errors and ensured every release can be rolled back safely if needed.',
      },
    ],
    outcome: {
      summary: 'Delivered an operational management platform empowering teachers and staff to run daily center operations smoothly.',
      deliverables: [
        'Student profile, therapy progress, and attendance module',
        'Tuition fee and payroll accounting ledger',
        'Containerized Docker Compose configuration and automated pipeline',
      ],
    },
    featured: true,
  },
  {
    slug: 'skillswap',
    number: '04',
    title: 'SkillSwap',
    subtitle: 'Peer-to-peer skill exchange platform for collaborative learning',
    description: 'A community platform connecting students, freelancers, and professionals to exchange skills, schedule sessions, and collaborate without monetary barriers.',
    shortSummary: 'Skill exchange platform featuring direct messaging, meeting scheduling, administrative moderation, and community analytics.',
    role: 'Tech Lead, Algorithm Training Program',
    techStackSummary: 'Next.js, TypeScript, Prisma ORM, PostgreSQL, Tailwind CSS, shadcn/ui, Supabase, Render',
    honestOutcome: 'Led team delivery of Phase 2 as Tech Lead: introduced Prisma ORM, built moderation tools, real-time chat, meeting scheduling, and deployed to production.',
    tint: 'butter',
    initial: 'S',
    image: '/images/skillswap.png',
    imageAlt: 'SkillSwap peer skill exchange platform interface showing swap requests and admin dashboard',
    longOverview: 'SkillSwap is a peer-to-peer skill exchange platform built to make mentorship and learning accessible without monetary costs. As Tech Lead for Phase 2, I led technical planning and feature delivery for direct peer messaging, meeting scheduling, an administrative moderation dashboard, and platform activity analytics.',
    year: '2025 to 2026',
    categories: ['Community Platform', 'Full Stack', 'Engineering Leadership'],
    technologies: ['Next.js', 'TypeScript', 'Prisma ORM', 'PostgreSQL', 'Tailwind CSS', 'shadcn/ui', 'Zod', 'Supabase', 'Render'],
    timeline: 'Completed Phase 2 delivery (09/2025 to 2026)',
    verifiedMetrics: [],
    whatIBuilt: [
      'Admin moderation dashboard: user reporting workflows, moderation review queues, and account status controls.',
      'Real-time peer chat: messaging interface enabling accepted learning partners to coordinate sessions directly.',
      'Session scheduling: meeting coordination supporting both immediate connection links and scheduled calendar sessions.',
      'Community analytics: visual metrics tracking active skill listings, completed exchanges, and member engagement.',
      'Architectural upgrade to Prisma ORM: authored the technical plan and guided database migration for type-safe database queries.'
    ],
    whatILearned: [
      'Balancing direct feature coding with code reviews, engineering mentorship, and shared coding standards.',
      'Evaluating database tools and authoring architectural proposals that help teams make informed technical choices.',
      'Managing production cloud deployments across Render and Supabase with clear configuration management.'
    ],
    challenge: {
      problemStatement: 'People wanting to learn skills often face high tutor costs or lack structured ways to find reliable exchange partners online.',
      whyItMattered: 'A peer exchange platform requires trusted matching, safe moderation tools, and structured meeting scheduling to make informal learning dependable.',
      complexityFactors: [
        'Coordinating contributions across developers while introducing new architectural standards',
        'Migrating database queries to Prisma without disrupting ongoing feature branches',
        'Supporting both instant meeting links and scheduled calendar appointments cleanly'
      ],
    },
    architecture: {
      summary: 'A Next.js full-stack platform using Prisma ORM with PostgreSQL, deployed on Render with managed Supabase database storage.',
      components: [
        {
          name: 'Skill Matching Marketplace',
          responsibility: 'Skill discovery, search filters, and swap request proposals.',
          tech: 'Next.js / Tailwind CSS / shadcn/ui',
        },
        {
          name: 'Peer Chat Service',
          responsibility: 'Direct communication between matched learning partners.',
          tech: 'Node.js / WebSockets / React',
        },
        {
          name: 'Meeting Coordinator',
          responsibility: 'Generates instant session rooms and calendar meeting links.',
          tech: 'Next.js API Routes / Prisma',
        },
        {
          name: 'Admin Moderation Console',
          responsibility: 'Report reviews, member moderation, and platform activity tracking.',
          tech: 'Next.js / shadcn/ui / Prisma',
        },
      ],
      pipelineDescription: 'Browse Skills -> Propose Swap -> Mutual Acceptance -> Direct Chat & Meeting Scheduled -> Session Complete',
    },
    decisions: [
      {
        decision: 'Adopting Prisma ORM for type-safe data queries',
        context: 'The team was experiencing subtle bugs due to untyped database queries.',
        tradeoffConsidered: 'Keeping existing database models versus migrating to Prisma for compile-time safety.',
        result: 'Authored technical proposal adopting Prisma, eliminating query-level bugs across API routes.',
      },
      {
        decision: 'Standardized codebase conventions and review processes',
        context: 'A growing multi-developer team needed consistent code organization.',
        tradeoffConsidered: 'Informal code guidelines versus documented structure patterns.',
        result: 'Established consistent service layer patterns that made code review and onboarding faster.',
      },
    ],
    tradeoffs: [
      {
        factor: 'Cloud hosting setup',
        chosenApproach: 'Render for web services paired with managed Supabase PostgreSQL.',
        alternativeRejected: 'Self-hosted cloud virtual machines.',
        rationale: 'Provided automatic branch preview deployments and managed backups with minimal maintenance overhead.',
      },
    ],
    outcome: {
      summary: 'Successfully delivered Phase 2 platform features and maintained stable production hosting on Render and Supabase.',
      deliverables: [
        'Admin moderation dashboard and user access controls',
        'Direct peer messaging and session scheduling system',
        'Prisma ORM migration and codebase architecture standards',
      ],
    },
    featured: false,
  },
  {
    slug: 'emfive',
    number: '05',
    title: 'Emfive Business Services',
    subtitle: 'Corporate advisory and company formation web platform in Dubai, UAE',
    description: 'A modern, SEO-optimized digital platform for an international corporate advisory covering UAE company setup and golden visa services.',
    shortSummary: 'Fast, SEO-optimized corporate services web platform engineered with Astro, TypeScript, and Tailwind CSS for a Dubai advisory.',
    role: 'Full Stack Developer (Freelance)',
    techStackSummary: 'Astro, TypeScript, Tailwind CSS, Astro Icon, Lucide Icons',
    honestOutcome: 'Delivered a fast, responsive corporate web platform with type-safe content management and excellent search engine performance.',
    tint: 'sage',
    initial: 'E',
    image: '/images/emfive.png',
    imageAlt: 'Emfive Business Services corporate website interface',
    longOverview: 'Built for Emfive Business Services LLC, a corporate consultancy in Dubai guiding international entrepreneurs through UAE company formation, golden visas, and corporate compliance. I engineered a modern, type-safe website using Astro content collections, responsive layouts, and performance-tuned asset delivery.',
    year: '2026',
    categories: ['Corporate Web', 'Astro', 'SEO Performance'],
    technologies: ['Astro', 'TypeScript', 'Tailwind CSS', 'Astro Icon', 'Lucide Icons'],
    timeline: 'Completed freelance project',
    verifiedMetrics: [],
    whatIBuilt: [
      'Structured service directory: clear presentation of freezone setup, mainland licensing, golden visa pathways, and corporate banking assistance.',
      'Interactive inquiry workflows: clean consultation request forms tailored to business setup options.',
      'Content collection system: type-safe content architecture allowing the advisory to update service guides easily.',
      'Performance and SEO tuning: zero-JS static generation achieving sub-second load times on mobile devices.'
    ],
    whatILearned: [
      'Leveraging Astro static generation to achieve top Core Web Vitals scores and organic search visibility.',
      'Structuring content collections with validation schemas for maintainable corporate publishing.',
      'Designing clean, premium corporate layouts tailored to an international business audience.'
    ],
    challenge: {
      problemStatement: 'Corporate consultancy websites in the UAE market are often heavy and slow, frustrating prospective international founders on mobile networks.',
      whyItMattered: 'High organic search visibility and instant mobile load times directly drive consultation inquiries from international entrepreneurs seeking setup guidance.',
      complexityFactors: [
        'Delivering a polished visual aesthetic with near-zero client-side JavaScript weight',
        'Organizing extensive regulatory information into clear, digestible service pages'
      ],
    },
    architecture: {
      summary: 'A static site generation architecture built with Astro and TypeScript, compiled into optimized static pages hosted on a global CDN.',
      components: [
        {
          name: 'Service Content Engine',
          responsibility: 'Type-safe corporate service descriptions and regulatory guides.',
          tech: 'Astro Content Collections / Zod',
        },
        {
          name: 'Responsive UI System',
          responsibility: 'Mobile-first layout components, inquiry dialogs, and navigation.',
          tech: 'Tailwind CSS / TypeScript',
        },
      ],
      pipelineDescription: 'Content Collections -> Type Validation -> Static Build -> Global CDN Distribution',
    },
    decisions: [
      {
        decision: 'Astro static generation over traditional React SPA',
        context: 'The consultancy relies on international search traffic seeking specific visa and company setup rules.',
        tradeoffConsidered: 'Client-side application rendering versus instant static HTML delivery.',
        result: 'Achieved sub-second load times and complete search engine indexability across all service pages.',
      },
    ],
    tradeoffs: [
      {
        factor: 'Asset and icon optimization',
        chosenApproach: 'SVG icons and native image optimization in Astro.',
        alternativeRejected: 'Loading heavy third-party font icon bundles.',
        rationale: 'Maintained total page weight below 100KB per page visit.',
      },
    ],
    outcome: {
      summary: 'Delivered an elegant, fast, and easily maintainable corporate web platform for an international consultancy.',
      deliverables: [
        'Complete corporate advisory website',
        'Structured content collection system for service guides',
        'SEO-optimized metadata and sitemap configuration',
      ],
    },
    featured: false,
  },
  {
    slug: 'sunnah-table',
    number: '06',
    title: 'Sunnah Table',
    subtitle: 'Educational culinary platform blending tradition with nutritional science',
    description: 'A digital reference exploring foods referenced in prophetic tradition, documenting authentic heritage alongside peer-reviewed nutritional science.',
    shortSummary: 'Educational web platform documenting foods from prophetic tradition paired with verified nutritional science research.',
    role: 'Full Stack Developer (Freelance)',
    techStackSummary: 'Next.js, React, Tailwind CSS, Vercel',
    honestOutcome: 'Designed, built, and launched the live educational platform on Vercel at sunnah-table-tau.vercel.app.',
    tint: 'butter',
    initial: 'S',
    image: '/images/sunnah-table.png',
    imageAlt: 'Sunnah Table educational food and nutrition website interface',
    longOverview: 'Sunnah Table is an educational web platform exploring foods referenced in prophetic tradition (Hadith). The platform pairs authenticated cultural and spiritual heritage with peer-reviewed modern nutritional science and clinical research on their health benefits. Designed with calm typography and responsive layouts, deployed live on Vercel.',
    year: '2025',
    categories: ['Educational Web', 'Frontend', 'Personal Project'],
    technologies: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    timeline: 'Live personal and freelance project',
    liveUrl: 'https://sunnah-table-tau.vercel.app',
    verifiedMetrics: [],
    whatIBuilt: [
      'Interactive food directory: searchable catalog of foods featuring authentic citations alongside nutritional breakdowns.',
      'Editorial reading experience: clean, typography-led article layouts optimized for comfortable reading across all screen sizes.',
      'Production deployment: domain setup and global CDN deployment on Vercel.'
    ],
    whatILearned: [
      'Designing typography-first editorial websites with generous whitespace and clear reading hierarchy.',
      'Organizing cross-referenced research into accessible, browsable categories.'
    ],
    challenge: {
      problemStatement: 'Information about traditional foods was scattered across diverse classical sources without clear modern scientific verification in one accessible, beautiful place.',
      whyItMattered: 'Readers appreciate a thoughtful, verified reference combining traditional heritage with contemporary health and dietary science.',
      complexityFactors: [
        'Presenting dual perspectives with traditional heritage alongside modern clinical nutrition research',
        'Maintaining a calm, focused reading atmosphere without intrusive web clutter'
      ],
    },
    architecture: {
      summary: 'A fast Next.js web application deployed on Vercel with responsive Tailwind CSS layouts and instant global delivery.',
      components: [
        {
          name: 'Food Index & Reader',
          responsibility: 'Presents food entries with traditional citations and nutritional breakdowns.',
          tech: 'Next.js / React / Tailwind CSS',
        },
      ],
      pipelineDescription: 'Content Repository -> React Components -> Vercel Global Edge Delivery',
    },
    decisions: [
      {
        decision: 'Editorial typography over distracting animations',
        context: 'The platform serves readers interested in thoughtful, researched articles.',
        tradeoffConsidered: 'Visual density versus reading comfort.',
        result: 'Designed a calm reading layout that makes long-form text comfortable on any screen size.',
      },
    ],
    tradeoffs: [
      {
        factor: 'Hosting platform',
        chosenApproach: 'Vercel edge hosting.',
        alternativeRejected: 'Traditional shared hosting.',
        rationale: 'Delivers instantaneous global CDN performance with zero server management overhead.',
      },
    ],
    outcome: {
      summary: 'Live in production, providing a calm and accessible reference on traditional foods and modern nutrition.',
      deliverables: [
        'Live production website at sunnah-table-tau.vercel.app',
        'Searchable index of traditional foods with scientific cross-references',
      ],
    },
    featured: false,
  },
];
