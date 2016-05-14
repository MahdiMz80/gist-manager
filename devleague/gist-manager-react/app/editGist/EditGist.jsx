'use strict';

import React from 'react';
import { Link } from 'react-router';
import * as $ from'jquery';
import auth from '../shared/auth';
import EditFile from './EditFile.jsx';

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
    const editFileNode = this.state.files.map(function(fileData){
      console.log(fileData);
      return (
        <EditFile file={fileData} key={fileData.filename} ></EditFile>
      )
    });
    return (
      <div>
        <h2>Edit Gist</h2>
        <p>{this.state.gist.description}</p>
        <form onSubmit={this.handleSubmit}>
          <label><input
            ref="description"
            placeholder="description"
            defaultValue="{this.state.gist.desctiption}"
          /></label>
          <button type="submit">Save</button>
        </form>
        <button><Link to={"/gist/" + this.props.params.id}>back</Link></button>
        { editFileNode }
      </div>
    )
  }
});