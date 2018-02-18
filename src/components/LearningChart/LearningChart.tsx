import * as React from 'react';
import { LanguageData } from '../../interfaces/api/LanguageData';
import { BarChart, XAxis, YAxis, Bar, Legend, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { LearningInterval } from '../../interfaces/LearningInterval';

interface LanguageChartProps {
  data: LearningInterval[];
  onIntervalSelected: (intervalIndex: number) => void;
}

class LearningChart extends React.Component<LanguageChartProps> {
  onBarClick(data: {}, index: number) {
    this.props.onIntervalSelected(index);
  }

  render() {
    const ticks = this.props.data.filter(d => d.name !== undefined).map(d => d.name);

    return (
      <ResponsiveContainer aspect={4.0 / 2.0}>
        <BarChart data={this.props.data}>
          <XAxis dataKey="name" ticks={ticks} />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Bar
            dataKey="words.length"
            name="Words learned"
            onClick={(data: {}, index: number) => this.onBarClick(data, index)}
            barSize={30}
            fill="#1ea11a"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}

export default LearningChart;
