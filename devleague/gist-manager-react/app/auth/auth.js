module.exports = {
  login() {
    var userData = window.location.search.replace(/[^\w\s]/gi, '');
    userData = JSON.stringify(userData)
    localStorage.token = userData;
    console.log(localStorage.token, 'token');
    // localStorage.setItem('user', JSON.stringify(userData));
    // window.location = "/dashboard";
  },

  getToken() {
    return localStorage.token;
  },

  logout(cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn() {
    return !!localStorage.token
  },

  onChange() {}
}