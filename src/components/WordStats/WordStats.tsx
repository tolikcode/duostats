import * as React from 'react';
import { LearningInterval } from '../../interfaces/LearningInterval';
import { Grid, Typography } from 'material-ui';
import * as format from 'date-fns/format';
import { IntervalOptions } from '../../interfaces/IntervalOptions';
import WordBlock from '../WordBlock/WordBlock';

export interface WordStatsProps {
  intervalOption: IntervalOptions;
  intervals: LearningInterval[];
  selectedIntervalIndex?: number;
  wordsInProgress: string[];
}

class WordStats extends React.Component<WordStatsProps> {
  getSelectedInterval(): LearningInterval | null {
    const { intervals, selectedIntervalIndex } = this.props;

    if (selectedIntervalIndex !== undefined) {
      return intervals[selectedIntervalIndex];
    }

    return this.getLastIntervalWithWords();
  }

  getLastIntervalWithWords(): LearningInterval | null {
    const withWords = this.props.intervals.filter(i => i.words.length > 0);
    if (withWords.length > 0) {
      return withWords[withWords.length - 1];
    }

    return null;
  }

  render() {
    const selectedInterval = this.getSelectedInterval();

    if (selectedInterval === null) {
      return null;
    }

    const intervalString =
      this.props.intervalOption === IntervalOptions.Month
        ? `in ${format(new Date(selectedInterval.year, selectedInterval.intervalNumber, 1), 'MMMM YYYY')}`
        : `${format(selectedInterval.startDate, 'D MMM YYYY')} - ${format(
            selectedInterval.endDate,
            'D MMM YYYY'
          )}`;

    const wordsHeader = `${selectedInterval.words.length} new words learned ${intervalString}`;

    const showWordsInProgress =
      this.props.wordsInProgress.length > 0 && selectedInterval === this.getLastIntervalWithWords();

    return (
      <div>
        <WordBlock header={wordsHeader} words={selectedInterval.words} />
        {showWordsInProgress && (
          <WordBlock
            header={this.props.wordsInProgress.length + ' words are  in progress'}
            words={this.props.wordsInProgress}
          />
        )}
      </div>
    );
  }
}

export default WordStats;
