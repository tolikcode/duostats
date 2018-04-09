import * as React from 'react';
import { styles } from './About.css';
import { Typography, WithStyles, withStyles } from 'material-ui';

const About = (props: WithStyles<string>) => {
  return (
    <div className={props.classes.aboutBlock}>
      <Typography variant="headline" className={props.classes.marginBottom}>
        Duolingo Statistics
      </Typography>
      <Typography variant="body1" className={props.classes.marginBottom}>
        Duostats provides personal statistics for <a href="https://www.duolingo.com/">Duolingo</a> users. This
        site is not affiliated to Duolingo Inc. in any way.
      </Typography>
      <Typography variant="body1">
        Feel free to contact me at <a href="mailto:tolikcode@gmail.com">tolikcode@gmail.com</a>.
      </Typography>
    </div>
  );
};

export default withStyles(styles)<{}>(About);
