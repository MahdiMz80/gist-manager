/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import styles from './Login.scss';

export default React.createClass({

  render() {
    return (
      <div className="section header">
        <div className="container">
          <h2 className="section-heading">Let's get started</h2>
          <a href="/auth/github"><button>Login with Github</button></a>
        </div>
      </div>
    )
  }
});