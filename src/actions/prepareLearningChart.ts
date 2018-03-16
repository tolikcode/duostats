import { LearningInterval } from './../interfaces/LearningInterval';
import { Friend } from './../interfaces/Friend';
import { PointsRankingData } from './../interfaces/api/PointsRankingData';
import { LearningChartData } from './../interfaces/LearningChartData';
import { ActionTypes } from './ActionTypes';
import { IntervalOptions } from '../interfaces/IntervalOptions';
import { DuoStatsStore } from '../interfaces/DuoStatsStore';
import { ActionKeys } from '../constants/ActionKeys';
import { UserResponse } from '../interfaces/api/UserResponse';
import { LanguageData } from '../interfaces/api/LanguageData';
import { requestLearningChart } from './requestLearningChart';
import { receiveLearningChart } from './receiveLearningChart';

import * as dateMin from 'date-fns/min';
import * as dateParse from 'date-fns/parse';
import * as getYear from 'date-fns/get_iso_year';
import * as getWeek from 'date-fns/get_iso_week';
import * as getMonth from 'date-fns/get_month';
import * as format from 'date-fns/format';
import * as addWeeks from 'date-fns/add_weeks';
import * as addMonths from 'date-fns/add_months';

export const prepareLearningChart = (user: UserResponse): LearningChartData => {
  const langData = user.language_data;
  const currentLanguage = langData[Object.keys(langData)[0]] as LanguageData;

  const monthlyData = prepareData(currentLanguage, addMonths, getMonth);
  const weeklyData = prepareData(currentLanguage, addWeeks, getWeek);

  const friends: Friend[] = currentLanguage.points_ranking_data.filter(prd => !prd.self).map(rd => ({
    avatarUrl: rd.avatar,
    fullname: rd.fullname,
    username: rd.username
  }));

  const learningChartData: LearningChartData = {
    isLoading: false,
    username: user.username,
    avatarUrl: user.avatar,
    monthlyData,
    weeklyData,
    friends
  };
  return learningChartData;
};

function prepareData(
  currentLanguage: LanguageData,
  incrementInterval: (date: Date, count: number) => Date,
  getIntervalNumber: (date: Date) => number
): LearningInterval[] {
  // TODO: this should also include NOT YET mastered skills in progress
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
      interval.words = interval.words.concat(s.words);
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

    chartData.push({
      year,
      intervalNumber: interval,
      words: [],
      name: nameExists ? undefined : name
    });
    date = incrementInterval(date, 1);
    year = getYear(date);
    interval = getIntervalNumber(date);
  }

  return chartData;
}
