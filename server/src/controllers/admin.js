import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import model from '../models';
import app from '../server';

const User = model.Users;
const salt = bcrypt.genSaltSync(10); // Generate salt for password
export default {
  // sign up user
  create(req, res) {
    return User
      .findAll({
        where: { isAdmin: true }
      })
      .then((admin) => {
        if (admin.length < 100) {
          if (req.body.password1!=req.body.password2){
            return res.status(400).send({ Password: 'Passwords do not match' });
          }
        if (validator.isEmail(req.body.email)) {
          const hash = bcrypt.hashSync(req.body.password, salt);
          User.create({
            email: req.body.email,
            password: hash,
            isAdmin: true,
            star: 'admin',
            confirmed: true,
          })
            .then(newUser => res.status(201).send(newUser))
            .catch(error => res.status(400).send({ response: error.message }));
        }else{
            return res.status(400).send({ Email: 'Input must be an email' });
        }
        } else {
          return res.status(400).send({ message: 'You have made a bad request' });
        }
      }).catch(error => res.status(400).send({ response: error.message }));
  },
  // sign in user
  findAdmin(req, res) {
    return User
      .findOne({
        where: { email: req.body.email,
          isAdmin: true
        } })
      .then((admin) => {
        if (!admin) {
          return res.status(404).send({ message: 'Admin not found' });
        }
        if (!bcrypt.compareSync(req.body.password, admin.password)) {
          res.status(406).send({ message: 'Incorrect Password' });
        } else {
          const myToken = jwt.sign({ user: admin.id, category: admin.isAdmin },
            app.get('secret'), { expiresIn: 24 * 60 * 60 });
          res.status(200).send({
            myToken,
            userId: admin.id,
            email: admin.email
          });
        }
      }).catch(error => res.status(400).send({ response: error.message }));
  },
  findAdmins(req, res) {
    return User
      .findAll({
        where: { isAdmin: true }
      }).then(admins => res.status(201).send(admins));
  }
};
