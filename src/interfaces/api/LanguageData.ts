import { Skill } from './Skill';
import { PointsRankingData } from './PointsRankingData';

export interface LanguageData {
  language: string;
  language_string: string;
  num_skills_learned: number;
  level: number;
  points: number;
  skills: Skill[];
  bonus_skills: Skill[];
  points_ranking_data: PointsRankingData[];
}
