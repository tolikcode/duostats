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

interface StatsProps {
  myUsername: string;
  learningCharts: LearningChartData[];
  dispatch: Dispatch<{}>;
}

interface StatsState {
  interval: IntervalOptions;
}

class Stats extends React.Component<StatsProps, StatsState> {
  constructor() {
    super();
    this.state = { interval: IntervalOptions.Month };
  }

  componentDidMount() {
    if (this.props.myUsername) {
      this.props.dispatch(prepareLearningChart(this.props.myUsername, this.state.interval));
    }
  }

  handleChange = (event: {}, interval: string) => {
    const intr = interval === IntervalOptions.Month.toString() ? IntervalOptions.Month : IntervalOptions.Week;

    this.setState({ interval: intr });
    this.props.dispatch(prepareLearningChart(this.props.myUsername, intr));
  };

  render() {
    const chartData = this.props.learningCharts.find(
      lc => lc.username === this.props.myUsername && lc.interval === this.state.interval
    );

    if (!chartData) {
      return null;
    }

    if (chartData.error) {
      return chartData.error;
    }

    if (chartData.isLoading) {
      return 'Loading..';
    }

    if (!chartData.data) {
      return null;
    }

    return (
      <div>
        <div className="chart">
          <LearningChart data={chartData.data} />
        </div>
        <RadioGroup
          style={{ flexDirection: 'row' }}
          name="intervalOption"
          value={this.state.interval.toString()}
          onChange={this.handleChange}
        >
          <FormControlLabel value={IntervalOptions.Month.toString()} control={<Radio />} label="monthly" />
          <FormControlLabel value={IntervalOptions.Week.toString()} control={<Radio />} label="weekly" />
        </RadioGroup>
      </div>
    );
  }
}

const mapStateToProps = (state: DuoStatsStore) => {
  return { myUsername: state.myUsername, learningCharts: state.learningCharts };
};

export default connect(mapStateToProps)(Stats);
