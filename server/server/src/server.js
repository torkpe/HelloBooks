import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import cookie from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import router from './routes/index';

const app = express();
const logger = morgan;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(logger('dev'));
app.set('secret', 'ghjkcndschyu$%^&*gdshcndsyucbds%^&hc5%^784678wqfewtyy');
app.use((cookie)());
app.use((session)({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())
passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});


// Require express routes from route
const userRoute = router.user;
const bookRoute = router.book;
const adminRoute = router.admin;
const landingRoute = router.landing;
const notificationsRoute = router.notifications;
const googleRoute = router.google;

// Use route for users
app.use(userRoute);
// Use route for books
app.use(bookRoute);
// Use route for admin
app.use(adminRoute);
// Landing route
app.use(landingRoute);
// Notifications route
app.use(notificationsRoute);
// Google route
app.use(googleRoute);
app.route('*')
  .post((req, res) => {
    res.status(404).send({ message: 'This page does not exist' });
  })
  .get((req, res) => {
    res.status(404).send({ message: 'This page does not exist' });
  });
export default app;
