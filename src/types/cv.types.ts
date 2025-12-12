export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Language {
  id: string;
  name: string;
  level: 'basic' | 'conversational' | 'fluent' | 'native';
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  summary: string;
}

export interface CV {
  id: string;
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  languages: Language[];
  createdAt: string;
  updatedAt: string;
}

export type ExportFormat = 'html' | 'pdf';

export type CVTemplate = 'modern' | 'classic';

export interface ExportOptions {
  format: ExportFormat;
  template?: CVTemplate;
}
