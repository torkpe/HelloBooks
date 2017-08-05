import jwt from 'jsonwebtoken';
import md5 from 'md5';
import model from '../models';

const Admin = model.Admin;

export default {
  // sign up user
  create(req, res) {
    return Admin
      .create({
        username: req.body.username,
        password: md5(req.body.password)
      })
      .then(newUser => res.status(201).send(newUser))
      .catch(error => res.status(400).send(error));
  },
  // sign in user
  findAdmin(req, res) {
    return Admin
      .findOne({
        where: { username: req.body.username,
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
            name: user.username });
        }
      });
  },
};
