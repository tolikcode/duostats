import * as React from 'react';
import LanguageData from '../../interfaces/api/LanguageData';
import { BarChart, XAxis, YAxis, Bar, Legend, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import LearningInterval from '../../interfaces/LearningInterval';

interface LanguageChartProps {
  data: LearningInterval[];
}

class LearningChart extends React.Component<LanguageChartProps> {
  render() {
    return (
      <ResponsiveContainer width="80%" aspect={4.0 / 2.0}>
        <BarChart data={this.props.data}>
          <XAxis dataKey="intervalNumber" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="wordCount" barSize={30} fill="#1ea11a" />
        </BarChart>
      </ResponsiveContainer >
    );
  }
}

export default LearningChart;