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
import { UserData } from '../interfaces/UserData';

import * as dateMin from 'date-fns/min';
import * as dateParse from 'date-fns/parse';
import * as getYear from 'date-fns/get_iso_year';
import * as getWeek from 'date-fns/get_iso_week';
import * as getMonth from 'date-fns/get_month';
import * as format from 'date-fns/format';
import * as addWeeks from 'date-fns/add_weeks';
import * as addMonths from 'date-fns/add_months';
import * as startOfISOWeek from 'date-fns/start_of_iso_week';
import * as startOfMonth from 'date-fns/start_of_month';
import * as endOfISOWeek from 'date-fns/end_of_iso_week';
import * as endOfMonth from 'date-fns/end_of_month';

export const prepareLearningChart = (user: UserResponse): LearningChartData => {
  const langData = user.language_data;
  const currentLanguage = langData[Object.keys(langData)[0]] as LanguageData;

  const monthlyData = prepareData(currentLanguage, addMonths, getMonth, startOfMonth, endOfMonth);
  const weeklyData = prepareData(currentLanguage, addWeeks, getWeek, startOfISOWeek, endOfISOWeek);
  const wordsInProgress = getWordsInProgress(currentLanguage);

  const friends: Friend[] = currentLanguage.points_ranking_data.filter(prd => !prd.self).map(rd => ({
    avatarUrl: rd.avatar,
    fullname: rd.fullname,
    username: rd.username
  }));

  const userData: UserData = {
    avatarUrl: user.avatar,
    fullname: user.fullname,
    languageString: currentLanguage.language_string,
    level: currentLanguage.level,
    xp: currentLanguage.points,
    monthlyData,
    weeklyData,
    wordsInProgress,
    friends
  };

  const learningChartData: LearningChartData = {
    isLoading: false,
    username: user.username,
    userData
  };
  return learningChartData;
};

function prepareData(
  currentLanguage: LanguageData,
  incrementInterval: (date: Date, count: number) => Date,
  getIntervalNumber: (date: Date) => number,
  getIntervalStart: (date: Date) => Date,
  getIntervalEnd: (date: Date) => Date
): LearningInterval[] {
  const allSkills = currentLanguage.skills.concat(currentLanguage.bonus_skills);
  const masteredSkills = allSkills.filter(s => s.mastered);

  masteredSkills.forEach(s => {
    if (s.learned_ts) {
      s.learnedDate = dateParse(s.learned_ts * 1000);
    }
  });

  const startDate = masteredSkills.reduce((earliestDate, skill) => {
    return skill.learnedDate ? dateMin(earliestDate, skill.learnedDate) : earliestDate;
  }, new Date());

  masteredSkills.forEach(s => {
    if (!s.learnedDate) {
      s.learnedDate = startDate;
    }
  });

  const emptyIntervalData = initIntervalData(
    startDate,
    new Date(),
    incrementInterval,
    getIntervalNumber,
    getIntervalStart,
    getIntervalEnd
  );

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
  getIntervalNumber: (date: Date) => number,
  getIntervalStart: (date: Date) => Date,
  getIntervalEnd: (date: Date) => Date
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
      name: nameExists ? undefined : name,
      startDate: getIntervalStart(date),
      endDate: getIntervalEnd(date)
    });
    date = incrementInterval(date, 1);
    year = getYear(date);
    interval = getIntervalNumber(date);
  }

  return chartData;
}

function getWordsInProgress(currentLanguage: LanguageData): string[] {
  const allSkills = currentLanguage.skills.concat(currentLanguage.bonus_skills);
  const skillsInProgress = allSkills.filter(s => !s.mastered && s.progress_percent !== 0);
  return skillsInProgress.reduce((arr, s) => arr.concat(s.words), [] as string[]);
}
