'use strict';

import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Edit Gist</h2>
        <p>{this.props.params.id}</p>
        <button><Link to={"/gist/" + this.props.params.id}>back</Link></button>
      </div>
    )
  }
});