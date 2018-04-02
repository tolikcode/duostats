import * as React from 'react';
import { styles } from './WordBlock.css';
import { LearningInterval } from '../../interfaces/LearningInterval';
import { Grid, Typography, WithStyles } from 'material-ui';
import * as format from 'date-fns/format';
import { IntervalOptions } from '../../interfaces/IntervalOptions';
import withStyles from 'material-ui/styles/withStyles';

export interface WordBlockProps {
  header: string;
  words: string[];
}

const WordBlock = (props: WordBlockProps & WithStyles<string>) => {
  const { classes } = props;
  let words = [...props.words]; // copying array to avoid props modification
  const groupedWords = [];

  while (words.length) {
    const arr = words;
    words = arr.splice(5);
    groupedWords.push(arr);
  }

  return (
    <div className={classes.wordStats}>
      <Typography variant="subheading">{props.header}</Typography>
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

export default withStyles(styles)<WordBlockProps>(WordBlock);
