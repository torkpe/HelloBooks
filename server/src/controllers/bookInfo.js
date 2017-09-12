import md5 from 'md5';
import model from '../models';

const BookInfo = model.BookInfo;
export default {
  create(req, res) {
    return BookInfo
      .create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
      })
      .then(newUser => res.status(201).send(newUser))
      .catch(error => res.status(400).send({message: error.message}));
  },
};
