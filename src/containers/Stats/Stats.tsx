import * as React from 'react';
import { connect } from 'react-redux';
import DuoStatsStore from '../../interfaces/DuoStatsStore';
import { Dispatch } from 'redux';
import { fetchUser } from '../../actions/fetchUser';
import UserData from '../../interfaces/UserData';
import LanguageData from '../../interfaces/api/LanguageData';
import LearningInterval from '../../interfaces/LearningInterval';
import LearningChart from '../../components/LearningChart/LearningChart';

import * as dateMin from 'date-fns/min';
import * as dateParse from 'date-fns/parse';
import * as getYear from 'date-fns/get_iso_year';
import * as getWeek from 'date-fns/get_iso_week';
import * as getMonth from 'date-fns/get_month';
import * as format from 'date-fns/format';
import * as addWeeks from 'date-fns/add_weeks';
import * as addMonths from 'date-fns/add_months';

interface StatsProps {
    username: string;
    usersData: UserData[];
    dispatch: Dispatch<{}>;
}

interface StatsState {
    chartData: LearningInterval[];
}

class Stats extends React.Component<StatsProps, StatsState> {
    componentDidMount() {
        if (this.props.username) {
            this.props.dispatch(fetchUser(this.props.username));
        }

        this.prepareData(this.props, addWeeks, getWeek);
    }

    componentWillReceiveProps(nextProps: StatsProps) {
        this.prepareData(nextProps, addWeeks, getWeek);
    }

    prepareData(
        props: StatsProps,
        incrementInterval: (date: Date, count: number) => Date,
        getIntervalNumber: (date: Date) => number): void {

        const user = props.usersData.find(u => u.username === props.username);
        if (user === undefined || user.data === undefined) {
            return;
        }

        // TODO: this should also include NOT YET mastered skills in progress
        const langData = user.data.language_data;
        const currentLanguage = langData[Object.keys(langData)[0]] as LanguageData;
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
                const interval = res.find(p => p.year === getYear(s.learnedDate) && p.intervalNumber === getIntervalNumber(s.learnedDate));

                if (interval !== undefined) {
                    interval.wordCount += s.words.length;
                }

                return res;
            },
            this.initIntervalData(startDate, incrementInterval, getIntervalNumber));

        this.setState({chartData});
    }

    initIntervalData(startDate: Date,
        incrementInterval: (date: Date, count: number) => Date,
        getIntervalNumber: (date: Date) => number
    ): LearningInterval[] {
        const chartData: LearningInterval[] = [];

        let date = startDate;
        let year = getYear(startDate);
        let interval = getIntervalNumber(startDate);
        const todaysYear = getYear(new Date());
        const todaysInterval = getIntervalNumber(new Date());

        while (year <= todaysYear && interval <= todaysInterval) {
            const name = format(date, "MMM 'YY");
            const nameExists = chartData.some(d => d.name === name);

            chartData.push({ year, intervalNumber: interval, wordCount: 0, name: (nameExists ? undefined : name) });
            date = incrementInterval(date, 1);
            year = getYear(date);
            interval = getIntervalNumber(date);
        }

        return chartData;
    }

    render() {
        if (this.state == null || this.state.chartData == null)
            return null;

        return (
            <LearningChart data={this.state.chartData} />
        );
    }
}

const mapStateToProps = (state: DuoStatsStore) => {
    return { username: state.myUsername, usersData: state.usersData };
};

export default connect(mapStateToProps)(Stats);