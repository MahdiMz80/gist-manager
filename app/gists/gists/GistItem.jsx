/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import styles from './GistItem.scss';

const GistItem = React.createClass({
  render: function() {
    return (
      <div className='GistItem'>
        <li>
          <div>
            <Link
              className='gist-description'
              to={"/gist/" + this.props.gist.id}
              gist={this.props.gist}
            >
              { this.props.children }
            </Link>
          </div>
        </li>
      </div>
    )
  }
});

export default GistItem;
