import * as React from 'react';
import { IntervalOptions } from '../../interfaces/IntervalOptions';
import { RadioGroup, FormControlLabel, Radio } from 'material-ui';

interface IntervalOptionSelectorProps {
  currentOption: IntervalOptions;
  onOptionChanged: (option: IntervalOptions) => void;
}

const WordStats = (props: IntervalOptionSelectorProps) => {
  return (
    <RadioGroup
      style={{ flexDirection: 'row' }}
      name="intervalOption"
      value={props.currentOption.toString()}
      onChange={(event: {}, interval: string) =>
        props.onOptionChanged(
          interval === IntervalOptions.Month.toString() ? IntervalOptions.Month : IntervalOptions.Week
        )
      }
    >
      <FormControlLabel value={IntervalOptions.Month.toString()} control={<Radio />} label="monthly" />
      <FormControlLabel value={IntervalOptions.Week.toString()} control={<Radio />} label="weekly" />
    </RadioGroup>
  );
};

export default WordStats;
