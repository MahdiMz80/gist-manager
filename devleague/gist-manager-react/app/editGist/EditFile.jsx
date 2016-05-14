/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';

const EditFile = React.createClass({
  render: function() {
    return (
      <div className='editFile'>
        <label><input
            ref="fileName"
            placeholder="fileName"
            defaultValue={this.props.file.filename}
          /></label>
          <label><input
            ref="content"
            placeholder="content"
            defaultValue={this.props.file.content}
          /></label>
      </div>
    )
  }
});

export default EditFile;

