export type SkillCategoryType = 'ai' | 'web' | 'tools';

export interface SkillItem {
  name: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  category: SkillCategoryType;
  description?: string;
  featured?: boolean;
}

export interface SkillCategory {
  id: SkillCategoryType;
  title: string;
  badge: string;
  description: string;
  color: string;
  iconName: string;
  skills: SkillItem[];
}

export interface ProjectArchitecture {
  summary: string;
  techStack: string[];
  pipeline: {
    step: string;
    description: string;
  }[];
  keyChallenges: string[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: 'ai' | 'web' | 'hybrid';
  image: string;
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  featured: boolean;
  stats: {
    label: string;
    value: string;
  }[];
  architecture?: ProjectArchitecture;
}

export interface TimelineItem {
  id: string;
  title: string;
  organization: string;
  location: string;
  period: string;
  type: 'work' | 'education' | 'research';
  description: string;
  achievements: string[];
  skills: string[];
}

export interface AIQuestionAnswer {
  id: string;
  question: string;
  answer: string;
  category: 'background' | 'ai_engineering' | 'web_dev' | 'collaboration';
}
