import React from 'react';
import { IndexLink, Link } from 'react-router';
import NavLink from './navigation/NavLink.jsx';
import Home from './home/Home.jsx';
import auth from './auth/auth'

export default React.createClass({
  getInitialState() {
    return {
      loggedIn: auth.loggedIn()
    }
  },

  updateAuth(loggedIn) {
    this.setState({
      loggedIn: loggedIn
    })
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
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          {this.state.loggedIn ? (
            <li><NavLink to="/logout">Logout</NavLink></li>
          ) : (
            <li><NavLink to="/login">Login</NavLink></li>
          )}
        </ul>
          {
            this.props.children ||
            this.state.loggedIn && <Home/> ||
            <p>You are !this.state.loggedIn && 'not' logged in.</p>
          }
      </div>
    )
  }
})