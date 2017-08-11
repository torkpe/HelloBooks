import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import router from './routes/index';

const app = express();
const logger = morgan;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(logger('dev'));
app.set('secret', 'ghjkcndschyu$%^&*gdshcndsyucbds%^&hc5%^784678wqfewtyy');
// Require express routes from route
const userRoute = router.user,
  bookRoute = router.book,
  adminRoute = router.admin,
  landingRoute = router.landing;

// Use route for users
app.use(userRoute);
// Use route for books
app.use(bookRoute);
// Use route for admin
app.use(adminRoute);
// Landing route
app.use(landingRoute);
app.route('*')
  .post((req, res) => {
    res.status(404).send({ message: 'This page does not exist' });
  })
  .get((req, res) => {
    res.status(404).send({ message: 'This page does not exist' });
  });
export default app;
