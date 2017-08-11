import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import model from '../models';
import app from '../server';

const salt = bcrypt.genSaltSync(10);
const User = model.Users;
// Function to generate token for user
const generateToken = user => jwt.sign({ user: user.id, category: user.isAdmin },
  app.get('secret'), { expiresIn: 24 * 60 * 60 });
export default {
  create(req, res) {
    const hash = bcrypt.hashSync(req.body.password, salt);
    return User
      .create({ // Create a new user
        name: req.body.name,
        email: req.body.email,
        password: hash,
        isAdmin: false
      })
      .then((user) => {
        const myToken = generateToken(user); // Generate token for user
        return res.status(200).send({
          token: myToken,
          userId: user.id,
          name: user.name,
          category: user.isAdmin });
      })
      .catch(error => res.status(400).send({ response: error.message }));
  },
  // Sign user in
  findUser(req, res) {
    return User
      .findOne({
        where: { name: req.body.name // Check if user exists first
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
        return res.status(200).send({
          token: myToken,
          userId: user.id,
          name: user.name,
          category: user.isAdmin });
      }).catch(error => res.status(400).send(error));
  },
};
