'use strict';

import React from 'react';
import { Link } from 'react-router';

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Edit Gist</h2>
        <p>{this.props.params.id}</p>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
          <button type="submit">login</button>
          {this.state.error && (
            <p>Bad login information</p>
          )}
        </form>
        <button><Link to={"/gist/" + this.props.params.id}>back</Link></button>
      </div>
    )
  }
});