import { styles } from './Header.css';
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ProfileButton from '../../containers/ProfileButton/ProfileButton';
import { withStyles, WithStyles } from 'material-ui';
import { Link } from 'react-router-dom';

const Header = (props: WithStyles<string>) => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Link to="/" className={props.classes.title}>
          <Typography variant="title" className={props.classes.white}>
            Duo Stats
          </Typography>
        </Link>
        <ProfileButton />
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)<{}>(Header);
