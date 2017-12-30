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
      const charts = state.filter(lc => lc.username !== action.username || lc.interval !== action.interval);
      charts.push({
        isLoading: false,
        username: action.username,
        interval: action.interval,
        data: action.data,
        error: action.error
      });
      return charts;
    }
    default:
      return state;
  }
};
