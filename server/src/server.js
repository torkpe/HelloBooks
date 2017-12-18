import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import webpackConfig from '../../webpack.config.production';
import router from './routes/index';
import { remindUser, upgradeUsers } from './utils/cronJob';

const app = express();
const logger = morgan;
dotenv.config();
app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'test' || process.env.NODE_ENV !== 'travis') {
  const compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
    hot: true,
    publcPath: webpackConfig.output.publicPath,
    noInfo: true
  }));
  app.use(webpackHotMiddleware(compiler));
}
if (process.env.NODE_ENV === 'production') {
  app.use(webpackHotMiddleware());
}
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

app.route('*')
  .get((request, response) => {
    response.sendFile(path.join(__dirname, '../public/index.html'));
  });

remindUser();
upgradeUsers();
export default app;
