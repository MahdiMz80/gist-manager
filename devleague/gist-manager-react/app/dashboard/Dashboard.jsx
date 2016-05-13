/* jshint esversion: 6 */
'use strict';

import React from 'react';
import GistList from './GistList.jsx';
import styles from './Dashboard.css';
import auth from '../shared/auth';
import * as $ from'jquery';

const Dashboard = React.createClass({
  getInitialState() {
    const user = JSON.parse(auth.getToken());
    return {
      loggedIn: auth.loggedIn(),
      id: user.id,
      username: user.username,
      token: user.token,
      gists: []
    }
  },

  loadGistData: function() {
    $.ajax({
      url: "https://api.github.com/users/" + this.state.username + "/gists",
      dataType: 'json',
      headers: {
        'Authorization': 'token ' + this.state.token
      },
      cache: false,
      success: function(data) {
        this.setState({ gists: data });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadGistData();
  },

  render: function() {
    return (
      <div className={styles.dashboard}>
        <h1>GitHub Gist Manager Dashboard</h1>
        <GistList gistData={this.state.gists} />
      </div>
    )
  }
});

export default Dashboard;