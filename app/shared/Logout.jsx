/* jshint esversion: 6 */
'use strict';

import React from 'react';
import auth from '../shared/auth';

export default React.createClass({
  componentDidMount() {
    auth.logout()
  },

  render() {
    return (
    <div className="section header">
      <div className="container">
        <h2 className="section-heading">You are now logged out</h2>
        <a href="/auth/github"><button>Login with Github</button></a>
      </div>
    </div>
    )
  }
});