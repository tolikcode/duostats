import { Dispatch } from 'redux';
import { ActionTypes } from './ActionTypes';
import { DuoStatsStore } from '../interfaces/DuoStatsStore';
import { requestLearningChart } from './requestLearningChart';
import { getUser } from '../api/api';
import { LearningChartData } from '../interfaces/LearningChartData';
import { receiveLearningChart } from './receiveLearningChart';
import { prepareLearningChart } from './prepareLearningChart';
import * as GoogleAnalytics from 'react-ga';

export const loadUserData = (username: string) => (
  dispatch: Dispatch<ActionTypes>,
  getState: () => DuoStatsStore
) => {
  if (getState().learningCharts.find(lc => lc.username.toUpperCase() === username.toUpperCase())) {
    return;
  }

  dispatch(requestLearningChart(username));

  getUser(username)
    .then(user => {
      const learningChartData = prepareLearningChart(user);
      dispatch(receiveLearningChart(learningChartData));
    })
    .catch(err => {
      const errorChartData: LearningChartData = {
        isLoading: false,
        username,
        error: `Failed to load user ${username}`
      };
      dispatch(receiveLearningChart(errorChartData));
      GoogleAnalytics.event({
        category: 'Errors',
        action: err.toString(),
        label: 'LoadUserData Failed'
      });
    });
};
