/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import * as $ from'jquery';
import auth from '../shared/auth';
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
    updatedGist.files = this.state.files.map((file)=> {
      let newFile = {};
      newFile[file.filename] =  {
        content: file.content
      }
      return newFile;
    })[0];
    return updatedGist;
  },
  handleNewGistSubmit(body) {
    console.log(body)
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
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.params, status, err.toString());
      }.bind(this)
    });
  },
  handleSubmit(e) {
    e.preventDefault();
    this.handleNewGistSubmit(this.buildNewGist(true));
  },
  handleAddFile(e) {
    e.preventDefault();
    let newFile = {};
    newFile.filename = 'newFile'+ Math.floor(Math.random()*100) + '.txt';
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
        <button onClick={this.handleSubmit}>Create Public Gist</button>
        <button onClick={this.handleAddFile}>Add File</button>
        <p>{this.state.description}</p>
        <form>
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
          <button><Link to={"/gist/" + this.props.params.id}>Cancel</Link></button>
          <button onClick={this.handleSubmit}>Create Public Gist</button>
          <button onClick={this.handleAddFile}>Add File</button>
        </form>
      </div>
    )
  }
});
