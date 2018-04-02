import * as React from 'react';
import { styles } from './WordStats.css';
import { LearningInterval } from '../../interfaces/LearningInterval';
import { Grid, Typography, WithStyles } from 'material-ui';
import * as format from 'date-fns/format';
import { IntervalOptions } from '../../interfaces/IntervalOptions';
import withStyles from 'material-ui/styles/withStyles';
import WordBlock from '../WordBlock/WordBlock';

export interface WordStatsProps {
  intervalOption: IntervalOptions;
  intervalData: LearningInterval;
}

const WordStats = (props: WordStatsProps & WithStyles<string>) => {
  const { classes, intervalData } = props;

  const intervalString =
    props.intervalOption === IntervalOptions.Month
      ? `in ${format(new Date(intervalData.year, intervalData.intervalNumber, 1), 'MMMM YYYY')}`
      : `${format(intervalData.startDate, 'D MMM YYYY')} - ${format(intervalData.endDate, 'D MMM YYYY')}`;

  const wordsHeader = `${intervalData.words.length} new words learned ${intervalString}`;

  return (
    <div>
      <WordBlock header={wordsHeader} words={intervalData.words} />
    </div>
  );
};

export default withStyles(styles)<WordStatsProps>(WordStats);
