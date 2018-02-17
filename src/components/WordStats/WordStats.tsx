import * as React from 'react';
import { LearningInterval } from '../../interfaces/LearningInterval';

const WordStats = (props: LearningInterval) => {
  return <ul>{props.words.map((w, i) => <li key={i}>{w}</li>)}</ul>;
};

export default WordStats;
