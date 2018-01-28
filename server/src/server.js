import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import ejs from 'ejs';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfigDevelopment from '../../webpack.config';
import router from './routes/index';
import { remindUser, upgradeUsers } from './utils/cronJob';

const app = express();
const logger = morgan;
dotenv.config();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(logger('dev'));
app.set('secret', process.env.SECRET);
app.use(cors());

// Require express routes from route
const userRoute = router.user;
const bookRoute = router.book;
const adminRoute = router.admin;
const landingRoute = router.landing;
const notificationsRoute = router.notifications;


// Use route for users
app.use('/api/v1/', userRoute);
// Use route for books
app.use('/api/v1/', bookRoute);
// Landing route
app.use('/api/v1/', landingRoute);
// Notifications route
app.use('/api/v1/', notificationsRoute);

// Check if environment is production and serve html from build
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../../build');
  const htmlPath = path.join(buildPath, 'index.html');
  app.use(express.static(buildPath));
  app.get('*', (req, res) => res.sendFile(htmlPath));
}

// Check if environment is development use configured webpack for development
if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(webpackConfigDevelopment);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publcPath: webpackConfigDevelopment.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
  app.route('*')
    .get((request, response) => {
      response.sendFile(path.join(__dirname, '../public/index.html'));
    });
}
/**
 * Run cron jobs
 */
remindUser();
upgradeUsers();
export default app;
