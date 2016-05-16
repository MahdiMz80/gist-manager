/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import styles from './File.scss';

const File = React.createClass({
  render: function() {
    return (
      <div className='File'>
        <li>
          <h2>{ this.props.file.filename }</h2>
          <pre><code>{this.props.file.content}</code></pre>
        </li>
        { this.props.children }
      </div>
    )
  }
});

export default File;
