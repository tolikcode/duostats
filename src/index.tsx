import 'ie-array-find-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './containers/App/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { green, red, lightBlue } from 'material-ui/colors';
import CssBaseline from 'material-ui/CssBaseline';

const store = configureStore();

const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: lightBlue,
    error: red
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
