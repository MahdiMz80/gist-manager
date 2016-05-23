/* jshint esversion: 6 */
'use strict';

import React from 'react';
import GistItem from './GistItem.jsx';

const GistList = React.createClass({
  render: function() {
    var gistListNode = this.props.gistData.map(function(gistItemData){
      return (
        <GistItem gist={gistItemData} key={gistItemData.id} >
          {gistItemData.description || 'GIST DESCRIPTION'}
        </GistItem>
      )
    });

    return (
      <div className='gistList'>
        { gistListNode }
      </div>
    )
  }
});

export default GistList;