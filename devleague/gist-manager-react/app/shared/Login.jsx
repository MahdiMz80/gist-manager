/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
const $ = require('jquery');
const githubUrl = '/auth/github';

export default React.createClass({

  render() {
    return (
      <div>
        <a href="/auth/github"><button>Login with Github</button></a>
      </div>
    )
  }
});