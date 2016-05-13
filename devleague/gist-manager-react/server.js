/*jshint esversion: 6 */
'use strict';

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const GitHubStrategy = require('passport-github2').Strategy;
const partials = require('express-partials');
const CONFIG = require('./config/config');

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

// configure Express
app.use(partials());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(session({ secret: CONFIG.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GitHubStrategy({
  clientID: CONFIG.GITHUB.ID,
  clientSecret: CONFIG.GITHUB.SECRET,
  callbackURL: 'http://0.0.0.0:3000/auth/github/callback'
},
function(accessToken, refreshToken, profile, done) {
  profile.accessToken = accessToken;
  process.nextTick(function () {
    return done(null, profile);
  });
}));

app.get('/auth/github',
  passport.authenticate('github', { scope: [ 'gist' ] }),
  function(req, res) {
  });

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect(
      '/?' + req.user.accessToken +
      '&username=' + req.user.username +
      '&id=' + req.user.id
    );
  });

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
      res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
      res.end();
    });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
