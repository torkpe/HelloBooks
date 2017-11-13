import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import passport from 'passport';
import cookie from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index';

const app = express();
const logger = morgan;
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(logger('dev'));
app.set('secret', 'khdbhkdwbfjkwenbfkwjenfkwebfhjwebfuerkwbfkwefn jkw');
app.use((cookie)());
app.use((session)({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());
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
app.use('/api/v1/', userRoute);
// Use route for books
app.use('/api/v1/', bookRoute);
// Use route for admin
app.use('/api/v1/', adminRoute);
// Landing route
app.use('/api/v1/', landingRoute);
// Notifications route
app.use('/api/v1/', notificationsRoute);
// Google route
app.use('/api/v1/', googleRoute);
app.route('*')
  .post((req, res) => {
    res.status(404).send({ message: 'This page does not exist' });
  })
  .get((req, res) => {
    res.status(404).send({ message: 'This page does not exist' });
  });
export default app;
