'use strict';

import React from 'react';
import { Link } from 'react-router';
import auth from '../shared/auth';
import * as $ from'jquery';

export default React.createClass({
  getInitialState() {
    return {
      token: JSON.parse(auth.getToken()).token,
      gist: {},
      files: []
    }
  },

  objToArr(obj) {
    return Object.keys(obj).map((k) => obj[k])
  },

  getGistData() {
    $.ajax({
      url: "https://api.github.com/gists/" + this.props.params.id,
      dataType: 'json',
      headers: {
        'Authorization': 'token ' + this.state.token
      },
      cache: false,
      success: function(data) {
        this.setState({ gist: data });
        this.setState({ files: this.objToArr(data.files) });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.params, status, err.toString());
      }.bind(this)
    });
  },

  editGist() {
    $.ajax({
      url: "https://api.github.com/gists/" + this.props.params.id,
      method: 'PATCH',
      dataType: 'json',
      data: 'PUT THE REQUEST HERE',
      headers: {
        'Authorization': 'token ' + this.state.token
      },
      cache: false,
      success: function(data) {
        console.log(data, 'SUCCESS');
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.params, status, err.toString());
      }.bind(this)
    });
  },

  handleSubmit() {
    this.editGist();
  },

  componentDidMount() {
    this.getGistData();
  },

  render() {
    console.log(this.state.gist, 'this.props')
    return (
      <div>
        <h2>Edit Gist</h2>
        <p>{this.props.params.id}</p>
        <p>{this.state.gist.description}</p>
        <form onSubmit={this.handleSubmit}>
          <label><input ref="email" placeholder="email" defaultValue="joe@example.com" /></label>
          <label><input ref="pass" placeholder="password" /></label> (hint: password1)<br />
          <button type="submit">login</button>
        </form>
        <button><Link to={"/gist/" + this.props.params.id}>back</Link></button>
      </div>
    )
  }
});