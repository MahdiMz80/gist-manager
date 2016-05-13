/* jshint esversion: 6 */
(function() {
  'use strict';

  import React from 'react';

  const GistItem = React.createClass({
    render: function() {
      return (
        <div className='GistItem'>
          <h3>{ this.props.children }</h3>
        </div>
      )
    }
  });

  export default GistItem;
}());