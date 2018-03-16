import { ActionTypes } from '../actions/ActionTypes';
import { ActionKeys } from '../constants/ActionKeys';
import { LearningChartData } from '../interfaces/LearningChartData';

export const learningCharts = (state: LearningChartData[] = [], action: ActionTypes) => {
  switch (action.type) {
    case ActionKeys.REQUEST_LEARNING_CHART: {
      const charts = state.filter(lc => lc.username.toUpperCase() !== action.username.toUpperCase());
      charts.push({ isLoading: true, username: action.username });
      return charts;
    }
    case ActionKeys.RECEIVE_LEARNING_CHART: {
      const charts = state.filter(
        lc => lc.username.toUpperCase() !== action.learningChartData.username.toUpperCase()
      );
      charts.push(action.learningChartData);
      return charts;
    }
    default:
      return state;
  }
};
