import * as React from 'react';
import { styles } from './TitleBlock.css';
import { Grid, Typography, Tooltip, withStyles, WithStyles } from 'material-ui';
import DuostatsAvatar from '../DuostatsAvatar/DuostatsAvatar';

interface TitleBlockProps {
  fullname: string;
  avatarUrl: string;
  languageString: string;
  level: number;
  xp: number;
}

const TitleBlock = (props: TitleBlockProps & WithStyles<string>) => {
  const { classes } = props;
  return (
    <div className={classes.titleBlock}>
      <DuostatsAvatar src={props.avatarUrl} size="large" />
      <div className={classes.titleText}>
        <Typography variant="headline">{props.fullname}</Typography>
        <div className={classes.languageLine}>
          <Typography variant="subheading">studies</Typography>
          <Tooltip
            title="You can see only the currently active language in Duolingo"
            enterTouchDelay={0}
            leaveTouchDelay={3000}
            enterDelay={200}
            leaveDelay={200}
          >
            <Typography className={classes.languageString} variant="subheading">
              {props.languageString}
            </Typography>
          </Tooltip>
        </div>
        <div className={classes.languageInfo}>
          <Typography variant="body2">Level {props.level} </Typography>
          <Typography variant="body2" className={classes.xpText}>
            {props.xp} XP
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default withStyles<string>(styles)<TitleBlockProps>(TitleBlock);
