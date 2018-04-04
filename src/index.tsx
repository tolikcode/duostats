import 'ie-array-find-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red, lightBlue } from 'material-ui/colors';
import CssBaseline from 'material-ui/CssBaseline';
import { withTracker } from './withTracker';

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: { main: '#43A047' },
    secondary: lightBlue,
    error: red
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Route component={withTracker(App)} />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
