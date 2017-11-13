export default {
  bookValidator(req, res, next) {
    const { cover, pdf, title, author, description, quantity, genre } = req.body;
    console.log(typeof (quantity));
    if (String(cover).length < 30) {
      return res.status(400).send({
        message: 'You seem to have input an invalid url to your cover photo'
      });
    }
    if (String(pdf).length < 30) {
      return res.status(400).send({
        message: 'You seem to have input an invalid url to your cover pdf'
      });
    }
    if (String(title).length < 10) {
      return res.status(400).send({
        message: 'Title is too short'
      });
    }
    if (String(author).length < 5) {
      return res.status(400).send({
        message: 'Author\'s name is too short'
      });
    }
    if (String(description).length < 15) {
      return res.status(400).send({
        message: 'Your description for this book seems to be too short'
      });
    }
    if (quantity <= 0) {
      return res.status(400).send({
        message: 'This proposed quantity is too small to create a new book'
      });
    }
    if (String(genre).length < 4) {
      return res.status(400).send({
        message: 'This does not seem to be a valid book genre'
      });
    }
    next();
  }
};
