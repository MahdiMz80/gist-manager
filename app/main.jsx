/*jshint esversion: 6 */
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App.jsx';
import Home from './home/Home.jsx';
import Gists from './gists/gists/Gists.jsx';
import Gist from './gists/gist/Gist.jsx';
import EditGist from './gists/edit/EditGist.jsx';
import NewGist from './gists/new/NewGist.jsx';
import Logout from './shared/Logout.jsx';
import Login from './shared/Login.jsx';
import NoMatch from './shared/NoMatch.jsx';
import auth from './shared/auth';

const requireAuth = (nextState, replace) => {
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
      <Route path="/gists" component={Gists} onEnter={requireAuth}/>
      <Route path="/gist/:id" component={Gist} onEnter={requireAuth}/>
        <Route path="/gist/:id/edit" component={EditGist} onEnter={requireAuth}/>
      <Route path="/new" component={NewGist} onEnter={requireAuth}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/login" component={Login}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);