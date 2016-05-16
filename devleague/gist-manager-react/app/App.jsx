/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { IndexLink, Link } from 'react-router';
import NavLink from './navigation/NavLink.jsx';
import Logout from './shared/Logout.jsx';
import Home from './home/Home.jsx';
import auth from './shared/auth';
import styles from './App.scss';

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
      <div className="site">
        <header>
          <a href='/' className="header--logo">Gist Manager</a>
          <ul className="header--nav">
            <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
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
        </header>

        <div className="container content">
          {
              this.props.children || <Home/>
          }
        </div>

        <footer className="footer">
          <div className="footer-content">
            <a href='http://www.callmejoe.net/'><p>Site by Joe.</p></a>
          </div>
        </footer>
      </div>
    )
  }
});