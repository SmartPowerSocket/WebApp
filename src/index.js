import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import Welcome from './components/welcome';
import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Devices from './components/devices';
import Device from './components/device';
import DownloadApp from './components/downloadapp';

import RequireAuth from './components/auth/require_auth';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

// If we have a token, consider the user to be signed in
const token = localStorage.getItem('token');

if (token) {
  // we need to update the application state
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={Welcome} />
          <Route path="signin" component={Signin} />
          <Route path="signout" component={Signout} />
          <Route path="signup" component={Signup} />
          <Route path="devices" component={RequireAuth(Devices)} />
          <Route path="device" component={RequireAuth(Device)} />
          <Route path="download" component={RequireAuth(DownloadApp)} />
        </Route>
    </Router>
  </Provider>
  , document.querySelector('#wrapper'));
