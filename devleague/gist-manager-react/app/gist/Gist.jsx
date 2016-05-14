'use strict';

import React from 'react';
import auth from '../shared/auth';
import * as $ from'jquery';
import { Link } from 'react-router';

export default React.createClass({
  getInitialState() {
    return {
      token: JSON.parse(auth.getToken()).token,
      gist: {}
    }
  },

  getGistData: function() {
    $.ajax({
      url: "https://api.github.com/gists/" + this.props.params.id,
      dataType: 'json',
      headers: {
        'Authorization': 'token ' + this.state.token
      },
      cache: false,
      success: function(data) {
        console.log(data, 'dats')
        this.setState({ gist: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.params, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.getGistData();
  },
  render() {
    return (
      <div>
        <h2>{this.props.params.id}</h2>
        <p>{this.state.gist.url}</p>
        <button><Link to={"/gist/" + this.props.params.id + '/edit'}>Edit</Link></button>
        { this.props.children }
      </div>
    )
  }
});