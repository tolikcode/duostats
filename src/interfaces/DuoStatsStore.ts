import { LearningChartData } from './LearningChartData';
import { UserResponse } from './api/UserResponse';

export interface DuoStatsStore {
  myUsername: string;
  users: UserResponse[];
  learningCharts: LearningChartData[];
}
