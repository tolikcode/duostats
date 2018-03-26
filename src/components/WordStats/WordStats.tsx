import * as React from 'react';
import { styles } from './WordStats.css';
import { LearningInterval } from '../../interfaces/LearningInterval';
import { Grid, Typography } from 'material-ui';
import * as format from 'date-fns/format';
import { IntervalOptions } from '../../interfaces/IntervalOptions';
import withStyles from 'material-ui/styles/withStyles';

export interface WordStatsProps {
  intervalOption: IntervalOptions;
  intervalData: LearningInterval;
  // tslint:disable-next-line:no-any
  classes?: any;
}

const WordStats = (props: WordStatsProps) => {
  const { classes, intervalData } = props;
  let words = [...intervalData.words]; // copying array to avoid props modification
  const groupedWords = [];

  while (words.length) {
    const arr = words;
    words = arr.splice(5);
    groupedWords.push(arr);
  }

  const intervalString =
    props.intervalOption === IntervalOptions.Month
      ? `in ${format(new Date(intervalData.year, intervalData.intervalNumber, 1), 'MMMM YYYY')}`
      : `${format(intervalData.startDate, 'D MMM YYYY')} - ${format(intervalData.endDate, 'D MMM YYYY')}`;

  const wordsHeader = `${intervalData.words.length} new words learned ${intervalString}`;

  return (
    <div className={classes.wordStats}>
      <Typography variant="subheading">{wordsHeader}</Typography>
      <Grid container className={classes.wordBlock}>
        {groupedWords.map((group, i) => (
          <Grid item container direction="column" xs={6} sm={4} md={3} xl={2} key={i}>
            {group.map((word, j) => (
              <Typography className={classes.word} key={j}>
                {word}
              </Typography>
            ))}
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default withStyles(styles)(WordStats);
