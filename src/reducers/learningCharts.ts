import { ActionTypes } from '../actions/ActionTypes';
import { ActionKeys } from '../constants/ActionKeys';
import { LearningChartData } from '../interfaces/LearningChartData';

export const learningCharts = (state: LearningChartData[] = [], action: ActionTypes) => {
  switch (action.type) {
    case ActionKeys.REQUEST_LEARNING_CHART: {
      const charts = state.filter(lc => lc.username !== action.username || lc.interval !== action.interval);
      charts.push({ isLoading: true, username: action.username, interval: action.interval });
      return charts;
    }
    case ActionKeys.RECEIVE_LEARNING_CHART: {
      const charts = state.filter(lc => lc.username !== action.learningChartData.username || lc.interval !== action.learningChartData.interval);
      charts.push(action.learningChartData);
      return charts;
    }
    default:
      return state;
  }
};
