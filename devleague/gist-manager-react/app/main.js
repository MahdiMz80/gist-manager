import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import App from './App.jsx';
import Home from './home/Home.jsx';
import Dashboard from './dashboard/Dashboard.jsx';
import About from './about/About.jsx';
import Logout from './shared/Logout.jsx';
import NoMatch from './shared/NoMatch.jsx';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/logout" component={Logout}/>
      <Route path="/dashboard" component={Dashboard}/>
      <Route path="*" component={NoMatch}/>
    </Route>
  </Router>,
  document.getElementById('root')
);