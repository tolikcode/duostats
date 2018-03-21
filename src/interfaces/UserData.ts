import { LearningInterval } from './LearningInterval';
import { Friend } from './Friend';

export interface UserData {
  fullname: string;
  avatarUrl: string;
  languageString: string;
  level: number;
  xp: number;
  monthlyData: LearningInterval[];
  weeklyData: LearningInterval[];
  friends: Friend[];
}
