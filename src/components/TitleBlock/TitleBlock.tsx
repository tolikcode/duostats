import './TitleBlock.css';
import * as React from 'react';
import { Grid, Typography } from 'material-ui';
import DuostatsAvatar from '../DuostatsAvatar/DuostatsAvatar';

interface TitleBlockProps {
  fullname: string;
  avatarUrl: string;
  languageString: string;
  level: number;
  xp: number;
}

const TitleBlock = (props: TitleBlockProps) => {
  return (
    <div className="titleBlock">
      <DuostatsAvatar src={props.avatarUrl} size="large" />
      <div className="titleText">
        <Typography variant="headline">{props.fullname}</Typography>
        <Typography variant="subheading">studies {props.languageString}</Typography>
        <div className="languageInfo">
          <Typography variant="body2">Level {props.level} </Typography>
          <div className="xpText">
            <Typography variant="body2">{props.xp} XP</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleBlock;
