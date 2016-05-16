/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import * as $ from'jquery';
import auth from '../../shared/auth';

const NewFile = React.createClass({
  getInitialState() {
    return {
      token: JSON.parse(auth.getToken()).token,
      originalFileName: this.props.file.filename,
      newFileName: this.props.file.filename,
      content : this.props.file.content
    }
  },

  handleDeleteFileSubmit() {
    this.props.onFileDelete(this.state.originalFileName);
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
      <div className='editFile row'>
        <div>
          <h3>{this.props.file.originalFileName}</h3>
          <div>
            <label for="filename">File Name</label>
            <input
                ref="fileName"
                type='text'
                id='fileName'
                className="u-full-width"
                placeholder={this.props.file.filename}
                defaultValue={this.props.file.filename}
                value={this.state.newFileName}
                onChange={this.handleFileNameChange}
              />
          </div>
          <br></br>
          <div>
            <label for="content">Content</label>
            <textarea
              ref="content"
              type='text'
              id='content'
              className="u-full-width"
              placeholder={this.props.file.content}
              defaultValue={this.props.file.content}
              value={this.state.content}
              onChange={this.handleContentChange}
            />
          </div>
          <button onClick={this.handleDeleteFileSubmit} >Delete</button>
        <hr></hr>
        </div>
      </div>
    )
  }
});

export default NewFile;

// <form>
//   <div class="row">
//     <div class="six columns">
//       <label for="exampleEmailInput">Your email</label>
//       <input class="u-full-width" type="email" placeholder="test@mailbox.com" id="exampleEmailInput">
//     </div>
//     <div class="six columns">
//       <label for="exampleRecipientInput">Reason for contacting</label>
//       <select class="u-full-width" id="exampleRecipientInput">
//         <option value="Option 1">Questions</option>
//         <option value="Option 2">Admiration</option>
//         <option value="Option 3">Can I get your number?</option>
//       </select>
//     </div>
//   </div>
//   <label for="exampleMessage">Message</label>
//   <textarea class="u-full-width" placeholder="Hi Dave …" id="exampleMessage"></textarea>
//   <label class="example-send-yourself-copy">
//     <input type="checkbox">
//     <span class="label-body">Send a copy to yourself</span>
//   </label>
//   <input class="button-primary" type="submit" value="Submit">
// </form>