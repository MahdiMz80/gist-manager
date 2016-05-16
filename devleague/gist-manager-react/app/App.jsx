'use strict';

import React from 'react';
import { IndexLink, Link } from 'react-router';
import NavLink from './navigation/NavLink.jsx';
import Logout from './shared/Logout.jsx';
import Home from './home/Home.jsx';
import auth from './shared/auth';

export default React.createClass({
  getInitialState() {
    let user = {id:'', username:'', token:''};
    if (!!auth.getToken) {
      auth.login()
      user = JSON.parse(auth.getToken());
    }
    return {
      loggedIn: auth.loggedIn(),
      id : user.id,
      username : user.username,
      token : user.token
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    });
  },

  componentWillMount() {
    auth.onChange = this.updateAuth
    auth.login()
  },

  render() {
    return (
      <div>
        <h1>Gist Manager</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          {this.state.loggedIn ? (
            <li><NavLink to="/gists"
                username={this.state.username}
                token={this.state.token}
              >Gists</NavLink>
          </li>
          ) : (
            undefined
          )}
          {this.state.loggedIn ? (
            <li><NavLink to="/new">New Gist</NavLink></li>
          ) : (
            undefined
          )}
          {this.state.loggedIn ? (
            <li><NavLink to="/logout">Logout</NavLink></li>
          ) : (
            <li><a href="/auth/github">Login</a></li>
          )}
        </ul>
          {
            this.props.children || <Home/>
          }
      </div>
    )
  }
});