import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import model from '../models';
import app from '../server';

const User = model.Users;
const salt = bcrypt.genSaltSync(10); // Generate salt for password
export default {
  // sign up user
  create(req, res) {
    const hash = bcrypt.hashSync(req.body.password, salt);
    return User
      .findAll({
        where: { isAdmin: true }
      })
      .then((admin) => {
        if (admin.length < 1) {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
            isAdmin: true
          })
            .then(newUser => res.status(201).send(newUser))
            .catch(error => res.status(400).send(`${error}`));
        } else {
          return res.status(400).send({ message: 'You have made a bad request' });
        }
      }).catch(error => res.status(400).send(error));
  },
  // sign in user
  findAdmin(req, res) {
    return User
      .findOne({
        where: { name: req.body.name,
          isAdmin: true
        } })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send('Admin not found');
        }
        if (!bcrypt.compareSync(req.body.password, admin.password)) {
          res.status(406).send({ message: 'Incorrect Password' });
        } else {
          const myToken = jwt.sign({ user: admin.id, category: admin.isAdmin },
            app.get('secret'), { expiresIn: 24 * 60 * 60 });
          res.status.send(200, {
            token: myToken,
            userId: admin.id,
            username: admin.name
          });
        }
      });
  },
  findAdmins(req, res) {
    return User
      .findAll({
        where: { isAdmin: true }
      }).then(admins => res.status(201).send(admins));
  }
};
