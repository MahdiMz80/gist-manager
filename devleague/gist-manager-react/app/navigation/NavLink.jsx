/* jshint esversion: 6 */
'use strict';

import React from 'react';
import { Link } from 'react-router';
import styles from './navigation.css';

export default React.createClass({
  render() {
    return <Link {...this.props} activeClassName={styles.active}/>
  }
});