import { Dispatch } from 'redux';
import { ActionTypes } from './ActionTypes';
import { getUser } from '../api/api';
import { IntervalOptions } from '../interfaces/IntervalOptions';
import { DuoStatsStore } from '../interfaces/DuoStatsStore';
import { ActionKeys } from '../constants/ActionKeys';
import { LearningInterval } from '../interfaces/LearningInterval';
import { saveUser } from './saveUser';
import { UserResponse } from '../interfaces/api/UserResponse';
import { LanguageData } from '../interfaces/api/LanguageData';

import * as dateMin from 'date-fns/min';
import * as dateParse from 'date-fns/parse';
import * as getYear from 'date-fns/get_iso_year';
import * as getWeek from 'date-fns/get_iso_week';
import * as getMonth from 'date-fns/get_month';
import * as format from 'date-fns/format';
import * as addWeeks from 'date-fns/add_weeks';
import * as addMonths from 'date-fns/add_months';

export interface RequestLearningChartAction {
  type: ActionKeys.REQUEST_LEARNING_CHART;
  username: string;
  interval: IntervalOptions;
}

export interface ReceiveLearningChartAction {
  type: ActionKeys.RECEIVE_LEARNING_CHART;
  username: string;
  interval: IntervalOptions;
  data?: LearningInterval[];
  error?: string;
}

const requestLearningChart = (username: string, interval: IntervalOptions): RequestLearningChartAction => ({
  type: ActionKeys.REQUEST_LEARNING_CHART,
  username,
  interval
});

const receiveLearningChart = (
  username: string,
  interval: IntervalOptions,
  data?: LearningInterval[],
  error?: string
): ReceiveLearningChartAction => ({
  type: ActionKeys.RECEIVE_LEARNING_CHART,
  username,
  interval,
  data,
  error
});

export const prepareLearningChart = (username: string, interval: IntervalOptions) => (
  dispatch: Dispatch<ActionTypes>,
  getState: () => DuoStatsStore
) => {
  if (getState().learningCharts.find(lc => lc.username === username && lc.interval === interval)) {
    return;
  }

  dispatch(requestLearningChart(username, interval));
  fetchUser(username, dispatch, getState)
    .then(user => {
      let data;
      switch (interval) {
        case IntervalOptions.Month:
          data = prepareData(user, addMonths, getMonth);
          break;
        case IntervalOptions.Week:
          data = prepareData(user, addWeeks, getWeek);
          break;
        default:
      }

      dispatch(receiveLearningChart(username, interval, data));
    })
    .catch(err =>
      dispatch(receiveLearningChart(username, interval, undefined, `Failed to load user ${username}`))
    );
};

function fetchUser(
  username: string,
  dispatch: Dispatch<ActionTypes>,
  getState: () => DuoStatsStore
): Promise<UserResponse> {
  const user = getState().users.find(u => u.username === username);
  if (!user) {
    return getUser(username).then(u => {
      dispatch(saveUser(u));
      return u;
    });
  }

  return Promise.resolve(user);
}

function prepareData(
  user: UserResponse,
  incrementInterval: (date: Date, count: number) => Date,
  getIntervalNumber: (date: Date) => number
): LearningInterval[] {
  // TODO: this should also include NOT YET mastered skills in progress
  const langData = user.language_data;
  const currentLanguage = langData[Object.keys(langData)[0]] as LanguageData;
  const masteredSkills = currentLanguage.skills.filter(s => s.mastered);

  masteredSkills.forEach(s => {
    s.learnedDate = dateParse(s.learned_ts * 1000);
  });

  const startDate = masteredSkills.reduce((earliestDate, skill) => {
    return dateMin(earliestDate, skill.learnedDate);
  }, new Date());

  const emptyIntervalData = initIntervalData(startDate, new Date(), incrementInterval, getIntervalNumber);

  const chartData = masteredSkills.reduce((res, s) => {
    const interval = res.find(
      p => p.year === getYear(s.learnedDate) && p.intervalNumber === getIntervalNumber(s.learnedDate)
    );

    if (interval) {
      interval.wordCount += s.words.length;
    }

    return res;
  }, emptyIntervalData);

  return chartData;
}

function initIntervalData(
  startDate: Date,
  endDate: Date,
  incrementInterval: (date: Date, count: number) => Date,
  getIntervalNumber: (date: Date) => number
): LearningInterval[] {
  const chartData: LearningInterval[] = [];

  let date = startDate;
  let year = getYear(startDate);
  let interval = getIntervalNumber(startDate);
  const endYear = getYear(endDate);
  const endInterval = getIntervalNumber(endDate);

  while (year < endYear || interval <= endInterval) {
    const name = format(date, "MMM 'YY");
    const nameExists = chartData.some(d => d.name === name);

    chartData.push({ year, intervalNumber: interval, wordCount: 0, name: nameExists ? undefined : name });
    date = incrementInterval(date, 1);
    year = getYear(date);
    interval = getIntervalNumber(date);
  }

  return chartData;
}
