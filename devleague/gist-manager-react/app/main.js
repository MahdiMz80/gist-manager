/*jshint esversion: 6 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App';
import Home from './home/Home';
import Dashboard from './dashboard/Dashboard';
import About from './about/About';
import Logout from './shared/Logout';
import Login from './shared/Login';
import NoMatch from './shared/NoMatch';
import auth from './shared/auth';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/dashboard" component={Dashboard} onEnter={requireAuth}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/login" component={Login}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);

function requireAuth(nextState, replace) {
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}