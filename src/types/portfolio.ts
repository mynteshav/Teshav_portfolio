export interface ProfileData {
  name: string;
  wordmark: string;
  eyebrow: string;
  headline: string;
  supportingText: string;
  location: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  opportunitiesStatus: string;
  bioNarrative: string[];
  focusAreas: {
    title: string;
    description: string;
    icon: string;
  }[];
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'Generative AI' | 'Machine Learning' | 'Analytics' | 'Computer Vision';
  description: string;
  problem: string;
  approach: string;
  outcome: string;
  tags: string[];
  highlights: string[];
  metrics?: ProjectMetric[];
  githubUrl?: string;
  demoUrl?: string;
  isFeatured: boolean;
  architectureDetails?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  period: string;
  status: 'In Progress' | 'Completed';
  highlights?: string[];
}
