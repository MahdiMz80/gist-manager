/* jshint esversion: 6 */
'use strict';

import React from 'react';
import GistList from './GistList';
import styles from './Dashboard.css';
const $ = require('jquery');
const githubUrl = 'https://www.reddit.com/r/Showerthoughts.json'

const Dashboard = React.createClass({
  getInitialState: function() {
    return {
      userData : {
        id : "",
          username : "",
          accessToken : "",
          gists : []
      }
    };
  },

  loadUserData: function() {
    $.ajax({
      url: githubUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({ gistData: data.data.children });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.gistUrl, status, err.toString());
      }.bind(this)
    });
  },

  componentDidMount: function() {
    this.loadUserData();
  },

  render: function() {
    return (
      <div className={styles.dashboard}>
        <h1>GitHub Gist Manager Dashboard</h1>
        <GistList gistData={this.state.gistData} />
      </div>
    )
  }
});

export default Dashboard;