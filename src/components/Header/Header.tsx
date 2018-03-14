import './Header.css';
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import ProfileButton from '../../containers/ProfileButton/ProfileButton';

class Header extends React.Component {
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="title" className="flex">
            Duo Stats
          </Typography>
          <ProfileButton />
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
