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
const generateToken = user => jwt.sign({ user: user.id, star: user.star, category: user.isAdmin },
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
          const link = `http://localhost:8080/api/confimation/${user.key}`;
          const message = `
Hello there, thank you for registering for helloBooks.
Please click on the click below to confirm your email address
                         ${link}`;
          sendEmail(message, 'user', user.id);
          return res.status(201).send({ user, message: 'A mail has been sent to your email' });
        })
        .catch(error => res.status(400).send({ message: error.message }));
    }
    return res.status(406).send({ message: 'Invalid email' });
  },
  // Sign user in
  findUser(req, res) {
    return User
      .findOne({
        where: { name: req.body.name, // Check if user exists first
        } })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found');
        }
        // Check if passwords do not match
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(406).send({ message: 'Incorrect Password' });
        }
        const myToken = generateToken(user);
        return res.status(200).send({ myToken, user });
      }).catch(error => res.status(400).send(error.message));
  },
  // Update user after email confirmation
  updateUser(req, res) {
    const { name, password1, password2 } = req.body;
    // A little validation
    if (name && password1 && password2) {
      if (name.length > 3 && password1.length > 5 && password2.length > 5
       && validator.equals(password1, password2)) {
        const hash = bcrypt.hashSync(req.body.password1, salt);
        return User
          .findOne({
            where: { key: `${req.params.key}`, // Check if user exists first
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
      return res.status(400).send({ message: 'Invalid input' });
    }
    return res.status(400).send({ message: 'All fields are required' });
  },
};
