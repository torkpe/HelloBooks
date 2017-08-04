import jwt from 'jsonwebtoken';
import md5 from 'md5';
import model from '../models';

const User = model.Users;
export default {
  create(req, res) {
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password)
      })
      .then(newUser => res.status(201).send(newUser))
      .catch(error => res.status(400).send(error));
  },
  findUser(req, res) {
    return User
      .findOne({
        where: { name: req.body.name,
          password: md5(req.body.password)
        } })
      .then((user) => {
        if (!user) {
          res.send('User not found');
        } else {
          const myToken = jwt.sign({ user: user.id },
            'secret',
            { expiresIn: 24 * 60 * 60 });
          res.send(200, { token: myToken,
            userId: user.id,
            name: user.name });
        }
      });
  },
};
