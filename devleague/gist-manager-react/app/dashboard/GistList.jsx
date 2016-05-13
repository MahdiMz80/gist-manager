'use strict'

import React from 'react';
import GistItem from './GistItem.jsx';

const GistList = React.createClass({
  render: function() {
    var gistListNode = this.props.gistData.map(function(gistItemData){
      return (
        <GistItem author={gistItemData.data.author} key={gistItemData.data.id} >
          {gistItemData.data.title}
        </GistItem>
      )
    })
    return (
      <div className='gistList'>
        <h2>Gist List</h2>
        { gistListNode }
      </div>
    )
  }
});

export default GistList;