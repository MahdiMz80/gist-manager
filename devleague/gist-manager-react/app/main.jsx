/*jshint esversion: 6 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App.jsx';
import Home from './home/Home.jsx';
import Gists from './gists/Gists.jsx';
import Gist from './gist/Gist.jsx';
import About from './about/About.jsx';
import Logout from './shared/Logout.jsx';
import Login from './shared/Login.jsx';
import NoMatch from './shared/NoMatch.jsx';
import auth from './shared/auth';

function requireAuth(nextState, replace) {
  console.log(!auth.loggedIn(), '!auth.loggedIn()')
  if (!auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
};

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/gists" component={Gists} onEnter={requireAuth}/>
      <Route path="/gist/:id" component={Gist}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/login" component={Login}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);