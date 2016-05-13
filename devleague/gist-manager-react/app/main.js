import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import App from './App.jsx'
import About from './about/About.jsx'
import Login from './login/Login.jsx'
import Dashboard from './dashboard/Dashboard.jsx';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={Login}/>
      <Route path="/about" component={About}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Route>
  </Router>,
  document.getElementById('root')
);