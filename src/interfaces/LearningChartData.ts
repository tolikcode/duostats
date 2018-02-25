import { IntervalOptions } from "./IntervalOptions";
import { LearningInterval } from "./LearningInterval";
import { Friend } from "./Friend";

export interface LearningChartData {
  isLoading: boolean;
  username: string;
  interval: IntervalOptions;
  data?: LearningInterval[];
  error?: string;
  friends?: Friend[];
}