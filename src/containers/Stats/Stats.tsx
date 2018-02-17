import * as React from 'react';
import { connect } from 'react-redux';
import { DuoStatsStore } from '../../interfaces/DuoStatsStore';
import { Dispatch } from 'redux';
import { LanguageData } from '../../interfaces/api/LanguageData';
import { LearningInterval } from '../../interfaces/LearningInterval';
import { IntervalOptions } from '../../interfaces/IntervalOptions';
import LearningChart from '../../components/LearningChart/LearningChart';
import { RadioGroup, FormControlLabel, Radio } from 'material-ui';

import './Stats.css';
import { prepareLearningChart } from '../../actions/prepareLearningChart';
import { LearningChartData } from '../../interfaces/LearningChartData';
import WordStats from '../../components/WordStats/WordStats';

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

  onIntervalOptionChanged = (event: {}, interval: string) => {
    const selectedOption =
      interval === IntervalOptions.Month.toString() ? IntervalOptions.Month : IntervalOptions.Week;

    this.setState({ intervalOption: selectedOption, selectedInterval: undefined });
    this.props.dispatch(prepareLearningChart(this.props.myUsername, selectedOption));
  };

  onIntervalSelected(intervalIndex: number) {
    this.setState({ selectedInterval: intervalIndex });
  }

  render() {
    const chartData = this.props.learningCharts.find(
      lc => lc.username === this.props.myUsername && lc.interval === this.state.intervalOption
    );

    if (!chartData || !chartData.data) {
      return null;
    }

    if (chartData.error) {
      return chartData.error;
    }

    if (chartData.isLoading) {
      return 'Loading..';
    }

    return (
      <div>
        <div className="chart">
          <LearningChart data={chartData.data} onIntervalSelected={index => this.onIntervalSelected(index)} />
        </div>
        <RadioGroup
          style={{ flexDirection: 'row' }}
          name="intervalOption"
          value={this.state.intervalOption.toString()}
          onChange={this.onIntervalOptionChanged}
        >
          <FormControlLabel value={IntervalOptions.Month.toString()} control={<Radio />} label="monthly" />
          <FormControlLabel value={IntervalOptions.Week.toString()} control={<Radio />} label="weekly" />
        </RadioGroup>
        {this.state.selectedInterval !== undefined && (
          <WordStats {...chartData.data[this.state.selectedInterval]} />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: DuoStatsStore) => {
  return { myUsername: state.myUsername, learningCharts: state.learningCharts };
};

export default connect(mapStateToProps)(Stats);
