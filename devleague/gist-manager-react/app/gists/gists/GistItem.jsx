/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';

const GistItem = React.createClass({
  render: function() {
    return (
      <div className='GistItem'>
        <li>
          <Link to={"/gist/" + this.props.gist.id} gist={this.props.gist}>
            { this.props.children }
          </Link>
        </li>
      </div>
    )
  }
});

export default GistItem;
