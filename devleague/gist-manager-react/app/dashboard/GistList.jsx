/* jshint esversion: 6 */
(function() {
  'use strict';

  import React from 'react';
  import GistItem from './GistItem.jsx';

  const GistList = React.createClass({
    render: function() {
      var gistListNode = this.props.gistData.map(function(gistItemData){
        return (
          <GistItem key={gistItemData.id} >
            {gistItemData.description || 'GIST DESCRIPTION'}
          </GistItem>
        )
      });

      return (
        <div className='gistList'>
          <h2>Gist List</h2>
          { gistListNode }
        </div>
      )
    }
  });

  export default GistList;
}());