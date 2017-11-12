import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Header extends React.Component {
  
  render() {
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography type="title">
            Duo Stats
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;