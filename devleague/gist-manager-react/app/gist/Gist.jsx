'use strict';

import React from 'react';
import auth from '../shared/auth';
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
        let arr = Object.keys(data.files).map((k) => data.files[k]);
        this.setState({ files: arr });
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
    const gistFileNode = this.state.files.map(function(fileData){
      console.log(fileData);
      return (
        <File file={fileData} key={fileData.filename} ></File>
      )
    });
    return (
      <div>
        <h2>{this.props.params.id}</h2>
        <p>{this.state.gist.description}</p>
        <button><Link to={'/gist/' + this.props.params.id + '/edit'}>Edit</Link></button>
        <button><Link to={'/gists'}>All Gists</Link></button>
        { gistFileNode }
      </div>
    )
  }
});
