import { styles } from './Header.css';
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ProfileButton from '../../containers/ProfileButton/ProfileButton';
import { withStyles, WithStyles } from 'material-ui';

const Header = (props: WithStyles<string>) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="title" className={props.classes.flex}>
          Duo Stats
        </Typography>
        <ProfileButton />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)<{}>(Header);
