import { ActionKeys } from '../constants/ActionKeys';
import { LearningChartData } from '../interfaces/LearningChartData';

export interface ReceiveLearningChartAction {
  type: ActionKeys.RECEIVE_LEARNING_CHART;
  learningChartData: LearningChartData;
}

export const receiveLearningChart = (learningChartData: LearningChartData): ReceiveLearningChartAction => ({
  type: ActionKeys.RECEIVE_LEARNING_CHART,
  learningChartData
});
