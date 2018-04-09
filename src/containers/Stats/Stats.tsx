import { styles } from './Stats.css';
import * as React from 'react';
import { connect } from 'react-redux';
import * as queryString from 'query-string';
import { DuoStatsStore } from '../../interfaces/DuoStatsStore';
import { Dispatch } from 'redux';
import { LanguageData } from '../../interfaces/api/LanguageData';
import { LearningInterval } from '../../interfaces/LearningInterval';
import { IntervalOptions } from '../../interfaces/IntervalOptions';
import LearningChart from '../../components/LearningChart/LearningChart';
import { RadioGroup, FormControlLabel, Radio, Grid, WithStyles, withStyles } from 'material-ui';
import { LearningChartData } from '../../interfaces/LearningChartData';
import WordStats from '../../components/WordStats/WordStats';
import IntervalOptionSelector from '../../components/IntervalOptionSelector/IntervalOptionSelector';
import FriendsList from '../../components/FriendsList/FriendsList';
import { RouteComponentProps } from 'react-router-dom';
import { loadUserData } from '../../actions/loadUserData';
import TitleBlock from '../../components/TitleBlock/TitleBlock';
import WordBlock from '../../components/WordBlock/WordBlock';
import Loading from '../../components/Loading/Loading';

interface StatsProps extends RouteComponentProps<{}>, WithStyles<string> {
  myUsername: string;
  learningCharts: LearningChartData[];
  dispatch: Dispatch<{}>;
}

interface StatsState {
  intervalOption: IntervalOptions;
  selectedInterval?: number;
}

class Stats extends React.Component<StatsProps, StatsState> {
  constructor(props: StatsProps) {
    super(props);
    this.state = { intervalOption: IntervalOptions.Month };
  }

  componentDidMount() {
    this.prepareCharts(this.props);
  }

  componentWillReceiveProps(nextProps: StatsProps) {
    this.prepareCharts(nextProps);
  }

  prepareCharts(props: StatsProps) {
    const username = this.getCurrentUsername(props);
    if (username) {
      this.props.dispatch(loadUserData(username));
    }
  }

  getCurrentUsername(props: StatsProps): string {
    const queryParams = queryString.parse(props.location.search);
    return queryParams.username ? queryParams.username : props.myUsername;
  }

  onIntervalOptionChanged(selectedOption: IntervalOptions) {
    this.setState({ intervalOption: selectedOption, selectedInterval: undefined });
  }

  onIntervalSelected(intervalIndex: number) {
    this.setState({ selectedInterval: intervalIndex });
  }

  onFriendSelected(username: string) {
    this.setState({ selectedInterval: undefined });
    this.props.history.push(`/stats?username=${username}`);
  }

  render() {
    const { classes } = this.props;
    const username = this.getCurrentUsername(this.props);

    const chartData = this.props.learningCharts.find(
      lc => lc.username.toUpperCase() === username.toUpperCase()
    );

    if (!chartData) {
      return null;
    }

    if (chartData.isLoading) {
      return <Loading />;
    }

    if (chartData.error) {
      return chartData.error;
    }

    if (!chartData.userData) {
      return null;
    }

    const intervals =
      this.state.intervalOption === IntervalOptions.Month
        ? chartData.userData.monthlyData
        : chartData.userData.weeklyData;

    return (
      <Grid container className={classes.noMargin}>
        <Grid item md={1} />
        <Grid item xs={12} md={7} container direction="column" className={classes.noMargin}>
          <Grid item>
            <TitleBlock {...chartData.userData} username={chartData.username} />
          </Grid>
          <Grid item>
            <LearningChart data={intervals} onIntervalSelected={index => this.onIntervalSelected(index)} />
          </Grid>
          <Grid item container justify="center">
            <IntervalOptionSelector
              currentOption={this.state.intervalOption}
              onOptionChanged={option => this.onIntervalOptionChanged(option)}
            />
          </Grid>
          <Grid item>
            <WordStats
              intervalOption={this.state.intervalOption}
              intervals={intervals}
              selectedIntervalIndex={this.state.selectedInterval}
              wordsInProgress={chartData.userData.wordsInProgress}
            />
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.friendList}>
            <FriendsList
              friends={chartData.userData.friends}
              onFriendSelected={(un: string) => this.onFriendSelected(un)}
            />
          </div>
        </Grid>
        <Grid item md={1} />
      </Grid>
    );
  }
}

const mapStateToProps = (state: DuoStatsStore) => {
  return { myUsername: state.myUsername, learningCharts: state.learningCharts };
};

export default connect(mapStateToProps)(withStyles<string>(styles)<StatsProps>(Stats));
