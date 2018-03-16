import { LearningInterval } from './LearningInterval';
import { Friend } from './Friend';

export interface LearningChartData {
  isLoading: boolean;
  username: string;
  avatarUrl?: string;
  monthlyData?: LearningInterval[];
  weeklyData?: LearningInterval[];
  error?: string;
  friends?: Friend[];
}
