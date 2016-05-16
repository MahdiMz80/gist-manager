/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';

const EditFile = React.createClass({
  getInitialState() {
    return {
      originalFileName: this.props.file.filename,
      newFileName: this.props.file.filename,
      content : this.props.file.content
    }
  },

  handleFileNameChange(e) {
    this.setState({ newFileName: e.target.value });
    this.props.onFileNameChange(this.state.newFileName, this.state.originalFileName);
  },

  handleContentChange(e) {
    this.setState({ content: e.target.value });
    this.props.onContentChange(this.state.content, this.state.originalFileName);
  },

  render: function() {
    return (
      <div className='editFile'>
        <h3>{this.props.file.originalFileName}</h3>
        <div>File Name</div>
        <div>
          <label><input
              ref="fileName"
              placeholder={this.props.file.filename}
              defaultValue={this.props.file.filename}
              value={this.state.newFileName}
              onChange={this.handleFileNameChange}
            /></label>
        </div>
        <br></br>
        <div>
          <div>Content</div>
          <label><textarea
            rows="15"
            cols="150"
            ref="content"
            placeholder={this.props.file.content}
            defaultValue={this.props.file.content}
            value={this.state.content}
            onChange={this.handleContentChange}
          /></label>
        </div>
        <hr></hr>
      </div>
    )
  }
});

export default EditFile;

