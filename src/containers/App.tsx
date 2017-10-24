import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import './App.css';
import Hello from '../components/Hello';
import Stats from './Stats';
import DuoStatsStore from '../store/DuoStatsStore';
import { setMyUsername, SetMyUsernameAction } from '../actions/setMyUsername';

interface AppProps extends RouteComponentProps<AppProps> {
  myUsername: string;
  setMyUsername: (username: string) => SetMyUsernameAction;
}

class App extends React.Component<AppProps> {

  redirectIfRequired() {
    const redirectTo = this.props.myUsername ? '/stats' : '/hello';
    if (this.props.location.pathname !== redirectTo) {
      return <Redirect to={redirectTo} />;
    }
    
    return null;
  }

  render() {
    return (
      <div>
        <h1>Duo Stats</h1>
        <div className="App">
          {this.redirectIfRequired()}
          <Route path="/hello" component={() => <Hello setMyUsername={this.props.setMyUsername} />} />
          <Route path="/stats" component={Stats} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: DuoStatsStore) => {
  return { myUsername: state.myUsername };
};

export default withRouter<{}>(connect(mapStateToProps, {setMyUsername})(App));
