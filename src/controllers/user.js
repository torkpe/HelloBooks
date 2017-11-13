import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import random from 'random-key';
import validator from 'validator';
import model from '../models';
import app from '../server';
import sendEmail from './email';

const salt = bcrypt.genSaltSync(10);
const User = model.Users;
// Function to generate token for user
const generateToken = user => jwt.sign({
  user: user.id,
  name: user.name,
  star: user.star,
  category: user.isAdmin
},
app.get('secret'), { expiresIn: 24 * 60 * 60 });

export default {
  create(req, res) {
    if (validator.isEmail(req.body.email)) {
      return User
        .create({ // Create a new user
          email: req.body.email,
          isAdmin: false,
          star: 'bronze',
          confirmed: false,
          key: random.generate(50),
        })
        .then((user) => {
          const link = `http://localhost:3000/confirmation/${user.key}`;
          const message = `
Hello there, thank you for registering for helloBooks.
Please click on the click below to confirm your email address
                         ${link}`;
          sendEmail(message, 'user', user.id);
          return res.status(201).send({ user, message: 'A mail has been sent to your email' });
        })
        .catch(() => res.status(400).send({ message: 'Something went wrong' }));
    }
    return res.status(406).send({ message: 'Invalid email' });
  },
  // Sign user in
  signin(req, res) {
    const { password, email } = req.body;
    if (validator.isEmail(email)) {
      if (!password) {
        return res.status(400).send({ message: 'Password field is required' });
      }
      return User
        .findOne({
          where: { email, // Check if user exists first
          } })
        .then((user) => {
          if (!user) {
            return res.status(404).send({ message: 'Looks like you have not registered this account with us' });
          }
          // Check if passwords do not match
          if (!bcrypt.compareSync(req.body.password, user.password)) {
            return res.status(406).send({ message: 'Incorrect credentials' });
          }
          const myToken = generateToken(user);
          return res.status(200).send({ myToken, user });
        }).catch(() => res.status(400).send({ message: 'something went wrong' }));
    }
    return res.status(400).send({ message: 'invalid email' });
  },
  // Update user after email confirmation
  updateUser(req, res) {
    const { name, password1, password2 } = req.body;
    // A little validation
    if (name && password1 && password2) {
      if (name.length > 3) {
        if (password1.length < 5) {
          return res.status(400).send({ message: 'password is too short' });
        }
        if (!validator.equals(password1, password2)) {
          return res.status(400).send({ message: 'Passwords do not match' });
        }
        const hash = bcrypt.hashSync(req.body.password1, salt);
        return User
          .findOne({
            where: { key: req.params.key // Check if user exists first
            } })
          .then((user) => {
            if (!user) {
              return res.status(404).send({ message: 'User not found' });
            }
            // Update user info
            user.update({
              name: req.body.name,
              password: hash,
            }).then((updatedUser) => {
              const myToken = generateToken(updatedUser); // Generate token for user
              return res.status(200).send({ myToken, updatedUser });
            }).catch(error => res.status(400).send(error.message));
            return user;
          }).catch(error => res.status(400).send(error.message));
      }
      return res.status(400).send({ message: 'Name is too short' });
    }
    return res.status(400).send({ message: 'All fields are required' });
  },
  setPassword(req, res) {
    const { password1, password2 } = req.body;
    // validate
    if (password1 && password2) {
      if (password2.length > 5 && password1.length > 5) {
        if (validator.equals(password1, password2)) {
          const hash = bcrypt.hashSync(req.body.password1, salt);
          return User
            .find({
              where: {
                id: req.params.id
              }
            }).then((user) => {
              if (!bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(406).send({ message: 'Incorrect Password' });
              }
              user.update({
                password: hash
              }).then(updated => res.status(200).send({ user: updated }))
                .catch(err => res.status(200).send({ message: err.message }));
            })
            .catch(err => res.status(500).send({ message: err.message }));
        }
        return res.status(400).send({ message: 'Passwords do not match' });
      }
      return res.status(400).send({ message: 'Password is too short' });
    }
    return res.status(400).send({ message: 'Password field missing' });
  },
  updateName(req, res) {
    const { name } = req.body;
    if (name && name.length > 4) {
      return User.find({
        where: {
          id: req.params.id
        }
      }).then((user) => {
        user.update({
          name: req.body.name
        }).then(updated => res.status(200).send(updated))
          .catch(err => res.status(500).send({ message: err.message }));
      })
        .catch(err => res.status(500).send({ message: err.message }));
    }
  },
  getUser(req, res) {
    return User
      .find({
        where: {
          id: req.params.id
        }
      }).then(user => res.status(200).send(user))
      .then(err => res.status(400).send({ message: err.message }));
  }
};

