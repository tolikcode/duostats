import Skill from './Skill';

export interface LanguageData {
  language: string;
  language_string: string;
  num_skills_learned: number;
  skills: Skill[];
};
