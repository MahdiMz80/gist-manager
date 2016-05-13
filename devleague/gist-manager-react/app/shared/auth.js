/* jshint esversion: 6 */
(function() {
  'use strict';

  const urlQuery = (fields) => {
    fields = (fields.substring(1));
    fields = fields.split("&");
    fields = fields.map(function(element){
      return element.split("=");
    });

    let fieldsObj = {};

    fields.forEach(function(element){
      fieldsObj[element[0]] = decodeURIComponent(element[1]);
    });

    return fieldsObj;
  };

  module.exports = {
    login() {
      let userData = window.location.search.replace(/[^\w\s]/gi, '');
      userData = JSON.stringify(userData);
      localStorage.token = userData;
      console.log(localStorage.token, 'token');
      // localStorage.setItem('user', JSON.stringify(userData));
      // window.location = "/dashboard";
    },

    getToken() {
      return localStorage.token;
    },

    logout(cb) {
      delete localStorage.token;
      if (cb) cb();
      this.onChange(false);
    },

    loggedIn() {
      return !!localStorage.token;
    },

    onChange() {}
  };
}());
