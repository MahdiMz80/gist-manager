/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import * as $ from'jquery';
import auth from '../../shared/auth';
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
    let files = {};
    for (var i = 0; i < this.state.files.length; i++) {
      let newFile = {};
      newFile =  {
        filename: this.state.files[i].originalFileName,
        content: this.state.files[i].content
      };
      files[this.state.files[i].filename] = newFile;
    }
    updatedGist.files = files;
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
        window.location = '/gist/' + data.id;
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
  handleSubmit(e) {
    e.preventDefault();
    this.handleEditGistSubmit(this.buildEditBody());
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
        <div class="row">
          <div className="one-half column u-pull-left">
            <Link to={"/gist/" + this.props.params.id}><button>Cancel</button></Link>
            <button onClick={this.handleSubmit}>Save</button>
          </div>
          <div className="one-half column u-pull-right">
            <button onClick={this.handleDeleteGistSubmit}>Delete Gist</button>
            <button onClick={this.handleAddFile}>Add File</button>
          </div>
        </div>
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
          <Link to={"/gist/" + this.props.params.id}><button>Cancel</button></Link>
          <button onClick={this.handleSubmit}>Save</button>
          <button onClick={this.handleAddFile}>Add File</button>
        </form>
      </div>
    )
  }
});
