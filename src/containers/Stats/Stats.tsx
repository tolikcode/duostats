import * as React from 'react';
import { connect } from 'react-redux';
import { DuoStatsStore } from '../../interfaces/DuoStatsStore';
import { Dispatch } from 'redux';
import { LanguageData } from '../../interfaces/api/LanguageData';
import { LearningInterval } from '../../interfaces/LearningInterval';
import { IntervalOptions } from '../../interfaces/IntervalOptions';
import LearningChart from '../../components/LearningChart/LearningChart';
import { RadioGroup, FormControlLabel, Radio, Grid } from 'material-ui';

import './Stats.css';
import { prepareLearningChart } from '../../actions/prepareLearningChart';
import { LearningChartData } from '../../interfaces/LearningChartData';
import WordStats from '../../components/WordStats/WordStats';
import IntervalOptionSelector from '../../components/IntervalOptionSelector/IntervalOptionSelector';
import FreindsList from '../../components/FriendsList/FriendsList';

interface StatsProps {
  myUsername: string;
  learningCharts: LearningChartData[];
  dispatch: Dispatch<{}>;
}

interface StatsState {
  intervalOption: IntervalOptions;
  selectedInterval?: number;
}

class Stats extends React.Component<StatsProps, StatsState> {
  constructor() {
    super();
    this.state = { intervalOption: IntervalOptions.Month };
  }

  componentDidMount() {
    if (this.props.myUsername) {
      this.props.dispatch(prepareLearningChart(this.props.myUsername, this.state.intervalOption));
    }
  }

  onIntervalOptionChanged = (selectedOption: IntervalOptions) => {
    this.setState({ intervalOption: selectedOption, selectedInterval: undefined });
    this.props.dispatch(prepareLearningChart(this.props.myUsername, selectedOption));
  };

  onIntervalSelected(intervalIndex: number) {
    this.setState({ selectedInterval: intervalIndex });
  }

  getSelectedInterval(data: LearningInterval[]): LearningInterval | null {
    if (this.state.selectedInterval !== undefined) {
      return data[this.state.selectedInterval];
    }

    // TODO: consider lodash
    const withWords = data.filter(i => i.words.length > 0);
    if (withWords.length > 0) {
      return withWords[withWords.length - 1];
    }

    return null;
  }

  render() {
    const chartData = this.props.learningCharts.find(
      lc => lc.username === this.props.myUsername && lc.interval === this.state.intervalOption
    );

    if (!chartData) {
      return null;
    }

    if (chartData.isLoading) {
      return 'Loading..';
    }

    if (chartData.error) {
      return chartData.error;
    }

    if (!chartData.data) {
      return null;
    }

    const selectedInterval = this.getSelectedInterval(chartData.data);

    return (
      <Grid container>
        <Grid item md={1} />
        <Grid item xs={12} md={7} container direction="column">
          <Grid item>
            <LearningChart
              data={chartData.data}
              onIntervalSelected={index => this.onIntervalSelected(index)}
            />
          </Grid>
          <Grid item container justify="center">
            <IntervalOptionSelector
              currentOption={this.state.intervalOption}
              onOptionChanged={option => this.onIntervalOptionChanged(option)}
            />
          </Grid>
          <Grid item>{selectedInterval !== null && <WordStats {...selectedInterval} />}</Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <FreindsList />
        </Grid>
        <Grid item md={1} />
      </Grid>
    );
  }
}

const mapStateToProps = (state: DuoStatsStore) => {
  return { myUsername: state.myUsername, learningCharts: state.learningCharts };
};

export default connect(mapStateToProps)(Stats);
