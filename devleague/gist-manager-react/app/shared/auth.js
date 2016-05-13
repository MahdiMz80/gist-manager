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
    console.log(fieldsObj, 'fO')
    return fieldsObj;
  };

  module.exports = {
    login() {
      if (localStorage.token) {
        return;
      }
      let userData = urlQuery(window.location.search);
      localStorage.token = JSON.stringify(userData);
      console.log(this.getToken(),'getToken')
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
      console.log(localStorage.token, '!!localStorage.token');
      return !!localStorage.token;
    },

    onChange() {}
};