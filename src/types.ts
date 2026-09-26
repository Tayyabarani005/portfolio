export interface ProjectDecision {
  decision: string;
  context: string;
  tradeoffConsidered: string;
  result: string;
}

export interface ProjectTradeoff {
  factor: string;
  chosenApproach: string;
  alternativeRejected: string;
  rationale: string;
}

export interface Project {
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  shortSummary: string; // Two-line summary for project cards
  role: string;
  techStackSummary: string; // One short line of text for project cards
  honestOutcome: string; // One honest outcome without inflated numbers
  tint: 'butter' | 'sage' | 'peach'; // Bespoke project color tint
  initial: string; // Monogram initial for fallback composition
  image: string; // Real UI screenshot or image path [YOU FILL: image paths]
  imageAlt: string;
  longOverview: string;
  year: string;
  categories: string[];
  technologies: string[];
  timeline: string;
  verifiedMetrics?: { label: string; value: string }[];
  challenge: {
    problemStatement: string;
    whyItMattered: string;
    complexityFactors: string[];
  };
  architecture: {
    summary: string;
    components: { name: string; responsibility: string; tech: string }[];
    pipelineDescription: string;
  };
  whatIBuilt: string[];
  whatILearned: string[];
  decisions: ProjectDecision[];
  tradeoffs: ProjectTradeoff[];
  outcome: {
    summary: string;
    deliverables: string[];
  };
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
}

export interface ExperienceRole {
  title: string;
  period: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  period: string;
  year: string; // Big year numeral for sticky column
  location: string;
  roles: ExperienceRole[];
  whatChanged: string; // "What changed" one-liner
  highlights: string[]; // 2-3 bullets maximum per employer
  techString: string; // Plain comma-separated text, not pills
  technologies: string[];
  keyOutcome: string;
}

export interface RightNowMeta {
  building: string;
  learning: string;
  reading: string;
}

export interface SiteMeta {
  name: string;
  role: string;
  company: string;
  location: string;
  timezone: string;
  availability: string;
  headline: string;
  subheadline: string;
  currentlyBuilding: string; // [YOU FILL]
  rightNow: RightNowMeta; // [YOU FILL: reading, learning, building]
  bio: string;
  statement: string;
  socials: {
    email: string;
    github: string;
    linkedin: string;
    resumePdf: string; // [YOU FILL: resume PDF path]
  };
}

