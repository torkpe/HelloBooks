'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _passport = require('passport');

var _passport2 = _interopRequireDefault(_passport);

var _passportGoogleOauth = require('passport-google-oauth');

var _passportGoogleOauth2 = _interopRequireDefault(_passportGoogleOauth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dotenv = require('dotenv');

dotenv.config();
var Strategy = _passportGoogleOauth2.default.OAuth2Strategy;
var google = function google() {
  _passport2.default.use(new Strategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACK
  }, function (token, tokenSecret, profile, done) {
    if (profile._json.isPlusUser === true) {
      // carryout action
      return done(null, profile);
    }
    return done(null, false);
  }));
  _passport2.default.serializeUser(function (user, cb) {
    cb(null, user);
  });

  _passport2.default.deserializeUser(function (obj, cb) {
    cb(null, obj);
  });
};
exports.default = google;