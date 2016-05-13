'use strict'

import React from 'react';
import GistList from './GistList.jsx';
import styles from './Dashboard.css';
const $ = require('jquery');
const githubUrl = 'https://www.reddit.com/r/Showerthoughts.json'

const Dashboard = React.createClass({
  getInitialState: function() {
      return {
        gistData : []
      };
  },
  loadDataFromGithub: function() {
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
    this.loadDataFromGithub();
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