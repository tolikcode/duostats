import * as React from 'react';
import { connect } from 'react-redux';
import DuoStatsStore from '../../store/DuoStatsStore';
import { Dispatch } from 'redux';
import { fetchUser } from '../../actions/fetchUser';
import UserData from '../../store/UserData';
import LanguageData from '../../api/LanguageData';
import LearningInterval from '../../model/LearningInterval';
import LearningChart from '../../components/LearningChart/LearningChart';

import * as dateMin from 'date-fns/min';
import * as dateParse from 'date-fns/parse';
import * as getYear from 'date-fns/get_iso_year';
import * as getWeek from 'date-fns/get_iso_week';

interface StatsProps {
    username: string;
    usersData: UserData[];
    dispatch: Dispatch<{}>;
}

class Stats extends React.Component<StatsProps> {

    componentDidMount() {
        if (this.props.username) {
            this.props.dispatch(fetchUser(this.props.username));
        }
    }

    initWeeklyData(startDate: Date): LearningInterval[] {
        const chartData: LearningInterval[] = [];

        let year = getYear(startDate);
        let week = getWeek(startDate);
        const currentYear = getYear(new Date());
        const currentWeek = getWeek(new Date());

        while (year <= currentYear && week <= currentWeek) {
            chartData.push({ year, intervalNumber: week, wordCount: 0 });
            if (week >= 52) { // TODO: handle cases with 53 ISO weeks in a year
                year++;
                week = 1;
            } else {
                week++;
            }
        }

        return chartData;
    }

    render() {
        const user = this.props.usersData.find(u => u.username === this.props.username);

        if (user === undefined || user.data === undefined) {
            return null;
        }

        // TODO: this should also include NOT YET mastered skills in progress
        const langData = user.data.language_data;
        const currentLanguage = langData[Object.keys(langData)[0]] as LanguageData; // TODO: make pretty
        const masteredSkills = currentLanguage.skills.filter(s => s.mastered);

        masteredSkills.forEach(s => {
            s.learnedDate = dateParse(s.learned_ts * 1000);
        });

        const startDate = masteredSkills.reduce(
            (earliestDate, skill) => {
                return dateMin(earliestDate, skill.learnedDate);
            },
            new Date());

        const chartData = masteredSkills.reduce(
            (res, s) => {
                const interval = res.find(p => p.year === getYear(s.learnedDate) && p.intervalNumber === getWeek(s.learnedDate));

                // TODO: make pretty
                if (interval !== undefined) {
                    interval.wordCount += s.words.length;
                }

                return res;
            }, 
            this.initWeeklyData(startDate));

        // TODO: sort by year also
        chartData.sort((a, b) => a.intervalNumber - b.intervalNumber);

        return (
            <LearningChart data={chartData} />
        );
    }
}

const mapStateToProps = (state: DuoStatsStore) => {
    return { username: state.myUsername, usersData: state.usersData };
};

export default connect(mapStateToProps)(Stats);