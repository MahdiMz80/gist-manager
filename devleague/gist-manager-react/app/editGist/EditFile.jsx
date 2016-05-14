/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';

const EditFile = React.createClass({
  render: function() {
    return (
      <div className='editFile'>
        <li>
          <h2>{ this.props.file.filename }</h2>
          <div>{this.props.file.content}</div>
        </li>
        { this.props.children }
      </div>
    )
  }
});

export default EditFile;
