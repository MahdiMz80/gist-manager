/* jshint esversion: 6 */
'use strict';

import React from 'react';
import auth from '../../shared/auth';
import File from './File.jsx';
import * as $ from'jquery';
import { Link } from 'react-router';

export default React.createClass({
  getInitialState() {
    return {
      token: JSON.parse(auth.getToken()).token,
      gist: {},
      files: []
    }
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
        let arr = Object.keys(data.files).map((k) => data.files[k]);
        this.setState({ files: arr });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.params, status, err.toString());
      }.bind(this)
    });
  },

  handleDeleteGistSubmit(e) {
    e.preventDefault();
    $.ajax({
      url: "https://api.github.com/gists/" + this.props.params.id,
      method: 'DELETE',
      dataType: 'json',
      headers: {
        'Authorization': 'token ' + this.state.token
      },
      cache: false,
      success: function(data) {
        console.log(data, 'SUCCESS');
        window.location = "/gists";
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.gistId, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount() {
    this.getGistData();
  },
  render() {
    const gistFileNode = this.state.files.map(function(fileData){
      return (
        <File file={fileData} key={fileData.filename} ></File>
      )
    });
    return (
      <div>
        <p>{this.state.gist.description}</p>
        <button><Link to={'/gists'}>All Gists</Link></button>
        <button><Link to={'/gist/' + this.props.params.id + '/edit'} files={this.state.files}>Edit</Link></button>
        <button onClick={this.handleDeleteGistSubmit}>Delete Gist</button>
        { gistFileNode }
      </div>
    )
  }
});
