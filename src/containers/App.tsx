import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import './App.css';
import Hello from '../components/Hello';
import Stats from './Stats';
import DuoStatsStore from '../store/DuoStatsStore';
import { setUsername, SetUsernameAction } from '../actions';

interface AppProps extends RouteComponentProps<AppProps> {
  username: string;
  setUsername: (username: string) => SetUsernameAction;
}

class App extends React.Component<AppProps> {

  redirectIfRequired() {
    const redirectTo = this.props.username ? '/stats' : '/hello';
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
          <Route path="/hello" component={() => <Hello setUsername={this.props.setUsername} />} />
          <Route path="/stats" component={Stats} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: DuoStatsStore) => {
  return { username: state.username };
};

export default withRouter<{}>(connect(mapStateToProps, {setUsername})(App));
