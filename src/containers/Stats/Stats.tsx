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
import IntervalOptionSelector from '../../components/IntervalOptionSelector/IntervalOptionSelector';

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
        <IntervalOptionSelector
          currentOption={this.state.intervalOption}
          onOptionChanged={option => this.onIntervalOptionChanged(option)}
        />
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
