/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';

const GistItem = React.createClass({
  render: function() {
    console.log(this.props.gist, 'this.props.gist')
    return (
      <div className='GistItem'>
        <li>
          <div>
            <Link to={"/gist/" + this.props.gist.id} gist={this.props.gist}>
              { this.props.children }
            </Link>
          </div>
        </li>
      </div>
    )
  }
});

export default GistItem;
