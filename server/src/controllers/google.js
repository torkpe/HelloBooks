import passport from 'passport';
import strategy from 'passport-google-oauth';

const dotenv = require('dotenv');

dotenv.config();
const Strategy = strategy.OAuth2Strategy;
const google = () => {
  passport.use(new Strategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    callbackURL: process.env.CALLBACK,
  },
    ((token, tokenSecret, profile, done) => {
      if (profile._json.isPlusUser === true) {
        // carryout action
        return done(null, profile);
      }
      return done(null, false);
    })));
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });
};
export default google;
