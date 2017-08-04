import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import controllers from './controllers';

const app = express();
const logger = morgan;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
const userController = controllers.users;
const adminControllers = controllers.admin;
const bookControllers = controllers.book;
//  show index page
app.get('/api', (req, res) => {
  res.send('<h1>hello landing page<h1>');
});
//  sign up user
app.post('/api/users/signup', userController.create);
//  signin user
app.post('/api/users/signin', userController.findUser);
//  signin admin
app.post('/api/admin/signup', adminControllers.create);
//  signin admin
app.post('/api/admin/signin', adminControllers.findAdmin);
// add a book
app.post('/api/books', bookControllers.create);
// get all books
app.get('/api/books', bookControllers.findAll);
// get a books
app.get('/api/books/:id', bookControllers.findOne);
// edit a book
app.put('/api/books/:id', bookControllers.findBook);
// delete a book
app.delete('/api/books/:id', (req, res) => {
    res.send('<h1>delete a book<h1>')
});
app.get('/api/users/:id/books?returned=false', (req, res) => {
    res.send('<h1>hello landing page<h1>')
})
//  api route to allow user borrow book
app.post('/api/users/:id/books', (req, res) => {
    res.send('borrow book')
})
// api route to allow user return a book;
app.put('/api/users/:id/books', (req, res) => {
    res.send('return book')
})

//  start server
export default app;
