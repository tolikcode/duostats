import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Manager, Target, Popper } from 'react-popper';
import { ClickAwayListener, Button, Collapse, Paper, MenuList, MenuItem } from 'material-ui';
import Portal from 'material-ui/Portal/Portal';
import { DuoStatsStore } from '../../interfaces/DuoStatsStore';
import { connect } from 'react-redux';
import { setMyUsername, SetMyUsernameAction } from '../../actions/setMyUsername';

interface ProfileButtonProps {
  myUsername: string;
  setMyUsername: (username: string) => SetMyUsernameAction;
}

interface ProfileButtonState {
  isMenuOpen: boolean;
}

class ProfileButton extends React.Component<ProfileButtonProps, ProfileButtonState> {
  state = { isMenuOpen: false };

  toggleMenu = () => {
    this.setState({ isMenuOpen: !this.state.isMenuOpen });
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  logout = () => {
    this.props.setMyUsername('');
    this.closeMenu();
  };

  render() {
    const { isMenuOpen } = this.state;

    if (!this.props.myUsername) {
      return <Button>About</Button>;
    }

    return (
      <Manager>
        <Target>
          <Button
            aria-owns={open ? 'menu-list-collapse' : undefined}
            aria-haspopup="true"
            onClick={this.toggleMenu}
          >
            {this.props.myUsername}
          </Button>
        </Target>
        <Portal>
          <Popper placement="bottom" eventsEnabled={isMenuOpen}>
            <ClickAwayListener onClickAway={this.closeMenu}>
              <Collapse in={isMenuOpen} style={{ transformOrigin: '0 0 0' }}>
                <Paper style={{ margin: 3 }}>
                  <MenuList role="menu">
                    <MenuItem onClick={this.logout}>Not you?</MenuItem>
                    <MenuItem onClick={this.closeMenu}>About duostats</MenuItem>
                  </MenuList>
                </Paper>
              </Collapse>
            </ClickAwayListener>
          </Popper>
        </Portal>
      </Manager>
    );
  }
}

const mapStateToProps = (state: DuoStatsStore) => {
  return { myUsername: state.myUsername };
};

export default connect(mapStateToProps, { setMyUsername })(ProfileButton);
