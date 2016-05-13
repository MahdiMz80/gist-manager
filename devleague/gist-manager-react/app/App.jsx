import React from 'react';
import { IndexLink, Link } from 'react-router'
import NavLink from './navigation/NavLink.jsx';
import Home from './home/Home.jsx'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>Ghettohub Issues</h1>
        <ul role="nav">
          <li><NavLink to="/" onlyActiveOnIndex={true}>Home</NavLink></li>
          <li><NavLink to="/about">About</NavLink></li>
          <li><NavLink to="/dashboard">Dashboard</NavLink></li>
          <li><NavLink to="/login">Login</NavLink></li>
        </ul>

        <div>
          {/* ... */}
          {this.props.children || <Home/>}
        </div>

      </div>
    )
  }
})