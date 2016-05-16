/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import * as $ from'jquery';
import auth from '../../shared/auth';
import NewFile from './NewFile.jsx';

export default React.createClass({
  getInitialState() {
    let filename = 'newFile'+ Math.floor(Math.random()*100) + '.txt';
    return {
      token: JSON.parse(auth.getToken()).token,
      description: 'The description for this gist',
      files: [{
        filename: filename,
        originalFileName: filename,
        content: 'Add your content here'
      }]
    }
  },
  buildNewGist(isPublic) {
    var updatedGist = {
      description : this.state.description,
      public: isPublic,
      files : {}
    };
    let files = {};
    for (var i = 0; i < this.state.files.length; i++) {
      let newFile = {};
      newFile =  {
        content: this.state.files[i].content
      };
      files[this.state.files[i].filename] = newFile;
    }
    updatedGist.files = files;
    return updatedGist;
  },
  handleNewGistSubmit(body) {
    $.ajax({
      url: "https://api.github.com/gists",
      method: 'POST',
      dataType: 'json',
      data: JSON.stringify(body),
      headers: {
        'Authorization': 'token ' + this.state.token
      },
      cache: false,
      success: function(data) {
        console.log(data, 'SUCCESS');
        window.location = '/gist/' + data.id;
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.params, status, err.toString());
      }.bind(this)
    });
  },
  handleNewPublicSubmit(e) {
    e.preventDefault();
    this.handleNewGistSubmit(this.buildNewGist(true));
  },
  handleNewPrivateSubmit(e) {
    e.preventDefault();
    this.handleNewGistSubmit(this.buildNewGist(false));
  },
  handleAddFile(e) {
    e.preventDefault();
    let newFile = {};
    let fileName = 'newFile'+ Math.floor(Math.random()*100) + '.txt';
    newFile.filename = fileName;
    newFile.originalFileName = fileName;
    newFile.content = 'Add your content here';
    this.state.files.push(newFile);
    this.setState({files: this.state.files});
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
  render() {
    const editFileNode = this.state.files.map(function(fileData) {
      return (
        <NewFile
          file={fileData}
          onFileNameChange={this.handleFileNameChange}
          onContentChange={this.handleContentChange}
          onFileDelete={this.handleFileDelete}
          key={fileData.filename + Math.random()*100000}
        />
      )
    }.bind(this));
    return (
      <div>
        <h2>New Gist</h2>
        <button><Link to={"/gist/" + this.props.params.id}>Cancel</Link></button>
        <button onClick={this.handleAddFile}>Add File</button>
        <button onClick={this.handleNewPublicSubmit}>Create Public Gist</button>
        <button onClick={this.handleNewPrivateSubmit}>Create Private Gist</button>
        <form>
          <label for="description">Description</label>
          <input
            ref="description"
            type='text'
            id='description'
            className="u-full-width"
            placeholder={this.state.description}
            value={this.state.description}
            defaultValue={this.state.description}
            onChange={this.handleDescriptionChange}
          />
          { editFileNode }
          <button><Link to={"/gist/" + this.props.params.id}>Cancel</Link></button>
          <button onClick={this.handleAddFile}>Add File</button>
          <button onClick={this.handleNewPublicSubmit}>Create Public Gist</button>
          <button onClick={this.handleNewPrivateSubmit}>Create Private Gist</button>
        </form>
      </div>
    )
  }
});