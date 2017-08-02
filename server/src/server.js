import express from 'express';

const app = express();

//  show index page
app.get('/api', (req, res) => {
    res.send('<h1>hello landing page<h1>')
})
//  sign up user
app.post('/api/users/signup', (req, res) => {
    res.send('<h1>signup user<h1>')
})
//  signin user
app.post('/api/users/signin', (req, res) => {
    res.send('<h1>signin user<h1>')
})
// add new book
app.post('/api/books', (req, res) => {
    res.send('<h1>add new book<h1>')
})
//edit a book
app.put('/api/books/:id', (req, res) => {
    res.send('<h1>edit a book<h1>')
})
//delete a book
app.delete('/api/books/:id', (req, res) => {
    res.send('<h1>delete a book<h1>')
})
app.get('/api/books', (req, res) => {
    res.send('<h1>hello landing page<h1>')
})
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
