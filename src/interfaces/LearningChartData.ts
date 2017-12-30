import { IntervalOptions } from "./IntervalOptions";
import { LearningInterval } from "./LearningInterval";

export interface LearningChartData {
  isLoading: boolean;
  username: string;
  interval: IntervalOptions;
  data?: LearningInterval[];
  error?: string;
}