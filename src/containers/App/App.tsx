import * as React from 'react';
import { Route, Redirect, withRouter, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.css';
import Hello from '../../components/Hello/Hello';
import Stats from '../Stats/Stats';
import Header from '../Header/Header';
import { setMyUsername, SetMyUsernameAction } from '../../actions/setMyUsername';
import { DuoStatsStore } from '../../interfaces/DuoStatsStore';

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
        <Header />
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

export default withRouter<RouteComponentProps<AppProps>>(connect(mapStateToProps, { setMyUsername })(App));
