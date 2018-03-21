import { LearningInterval } from './LearningInterval';
import { Friend } from './Friend';
import { UserData } from './UserData';

export interface LearningChartData {
  isLoading: boolean;
  username: string;
  userData?: UserData;
  error?: string;
}
