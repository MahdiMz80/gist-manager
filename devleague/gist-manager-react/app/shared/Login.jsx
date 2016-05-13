import React from 'react'
import { Link } from 'react-router';
const $ = require('jquery');
const githubUrl = '/auth/github'

export default React.createClass({

  handleChange(e){
    window.location = "/auth/github";
  },
  render() {
    return (
      <div>
        <div>Login</div>

        <button onClick={this.handleChange}>Login with Github</button>
      </div>
    )
  }
})