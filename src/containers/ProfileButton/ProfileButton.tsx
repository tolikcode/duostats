import './ProfileButton.css';
import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { Manager, Target, Popper } from 'react-popper';
import { ClickAwayListener, Button, Collapse, Paper, MenuList, MenuItem, Avatar } from 'material-ui';
import Portal from 'material-ui/Portal/Portal';
import { DuoStatsStore } from '../../interfaces/DuoStatsStore';
import { connect } from 'react-redux';
import { setMyUsername, SetMyUsernameAction } from '../../actions/setMyUsername';
import DuostatsAvatar from '../../components/DuostatsAvatar/DuostatsAvatar';

interface ProfileButtonProps {
  myUsername: string;
  myAvatarUrl: string;
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
            <DuostatsAvatar src={this.props.myAvatarUrl} size="medium" />
            <span className="username">{this.props.myUsername}</span>
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
  const myChart = state.learningCharts.find(
    lc => lc.username.toUpperCase() === state.myUsername.toUpperCase()
  );
  const avatarUrl = myChart && myChart.userData ? myChart.userData.avatarUrl : undefined;
  return { myUsername: state.myUsername, myAvatarUrl: avatarUrl };
};

export default connect(mapStateToProps, { setMyUsername })(ProfileButton);
