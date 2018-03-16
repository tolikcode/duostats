import { ActionKeys } from '../constants/ActionKeys';

export interface RequestLearningChartAction {
  type: ActionKeys.REQUEST_LEARNING_CHART;
  username: string;
}

export const requestLearningChart = (username: string): RequestLearningChartAction => ({
  type: ActionKeys.REQUEST_LEARNING_CHART,
  username
});
