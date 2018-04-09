import * as React from 'react';
import { styles } from './Loading.css';
import { Typography, WithStyles, withStyles, CircularProgress } from 'material-ui';

const About = (props: WithStyles<string>) => {
  return (
    <div className={props.classes.aboutBlock}>
      <CircularProgress className={props.classes.progress} />
      <Typography variant="subheading">Loading...</Typography>
    </div>
  );
};

export default withStyles(styles)<{}>(About);
