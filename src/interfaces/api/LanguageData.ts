import Skill from './Skill';

export default interface LanguageData {
  language: string;
  language_string: string;
  num_skills_learned: number;
  skills: Skill[];
};
