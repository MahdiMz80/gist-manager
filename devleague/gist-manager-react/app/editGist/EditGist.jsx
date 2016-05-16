/* jshint esversion: 6 */
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
      description: '',
      files: [],
    }
  },
  objToArr(obj) {
    return Object.keys(obj).map((k) => obj[k])
  },
  initializeFileArr(files){
    let initFiles = this.objToArr(files)
    initFiles.map((file) => {
      return file.originalFileName = file.filename;
    });
    return initFiles;
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
        this.setState({
          gist: data,
          description: data.description,
          files: this.initializeFileArr(data.files),
        })
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.params, status, err.toString());
      }.bind(this)
    });
  },
  buildEditBody() {
    var updatedGist = {
      description : this.state.description,
      files : {}
    };
    updatedGist.files = this.state.files.map((file)=> {
      let newFile = {};
      newFile[file.originalFileName] =  {
        filename: file.filename,
        content: file.content
      }
      return newFile;
    })[0];
    return updatedGist;
  },
  handleEditGistSubmit(body) {
    $.ajax({
      url: "https://api.github.com/gists/" + this.props.params.id,
      method: 'PATCH',
      dataType: 'json',
      data: JSON.stringify(body),
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
  handleSubmit(e) {
    e.preventDefault();
    this.handleEditGistSubmit(this.buildEditBody());
  },
  handleDescriptionChange(e) {
    this.setState({ description: e.target.value });
  },
  handleFileNameChange(newFileName, originalFileName) {
    for (var i = this.state.files.length - 1; i >= 0; i--) {
      if (this.state.files[i].originalFileName === originalFileName) {
        this.state.files[i].filename = newFileName;
      }
    }
  },
  handleContentChange(content, filename) {
    for (var i = this.state.files.length - 1; i >= 0; i--) {
      if (this.state.files[i].filename === filename) {
        this.state.files[i].content = content;
      }
    }
  },
  handleFileDelete(filename) {
    let updatedFiles = this.state.files;
    for (var i = updatedFiles.length - 1; i >= 0; i--) {
      if (updatedFiles[i].filename === filename) {
        updatedFiles.splice(i, 1);
      }
    }
    this.setState({files: updatedFiles});
  },
  componentDidMount() {
    this.getGistData();
  },
  render() {
    const editFileNode = this.state.files.map(function(fileData) {
      return (
        <EditFile
          file={fileData}
          onFileNameChange={this.handleFileNameChange}
          onContentChange={this.handleContentChange}
          onFileDelete={this.handleFileDelete}
          gistId={this.props.params.id}
          key={fileData.filename + Math.random()*100000}
        />
      )
    }.bind(this));
    return (
      <div>
        <h2>Edit Gist</h2>
        <button><Link to={"/gist/" + this.props.params.id}>back</Link></button>
        <button onClick={this.handleSubmit} >Save</button>
        <p>{this.state.description}</p>
        <form onSubmit={this.handleSubmit}>
          <span>Description</span>
          <label><input
            placeholder={this.state.description}
            name="description"
            id="description"
            value={this.state.description}
            defaultValue={this.state.description}
            onChange={this.handleDescriptionChange}
          /></label>
          { editFileNode }
          <button><Link to={"/gist/" + this.props.params.id}>back</Link></button>
          <button type="submit">Save</button>
        </form>
      </div>
    )
  }
});
