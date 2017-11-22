export default {
  bookValidator(request, response, next) {
    const {
      cover, pdf, title, author, description, quantity, genre
    } = request.body;
    if ((String(cover).trim()).length < 30) {
      return response.status(400).send({
        message: 'You seem to have input an invalid url to your cover photo'
      });
    }
    if ((String(pdf).trim()).length < 30) {
      return response.status(400).send({
        message: 'You seem to have input an invalid url to your cover pdf'
      });
    }
    if ((String(title).trim()).length < 10) {
      return response.status(400).send({
        message: 'Title is too short'
      });
    }
    if ((String(author).trim()).length < 5) {
      return response.status(400).send({
        message: 'Author\'s name is too short'
      });
    }
    if ((String(description).trim()).length < 15) {
      return response.status(400).send({
        message: 'Your description for this book seems to be too short'
      });
    }
    if (/^[0-9]{1,10}$/.test(tempVal)) {
      return response.status(400).send({
        message: 'Quantity of book should a nubmer'
      });
    }
    if (quantity <= 0) {
      return response.status(400).send({
        message: 'This proposed quantity is too small to create a new book'
      });
    }
    if ((String(genre).trim()).length < 4) {
      return response.status(400).send({
        message: 'This does not seem to be a valid book genre'
      });
    }
    next();
  },
};
