import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import model from '../models';
import app from '../server';

const salt = bcrypt.genSaltSync(10);
const User = model.Users;
export default {
  create(req, res) {
    const hash = bcrypt.hashSync(req.body.password, salt);
    return User
      .create({
        name: req.body.name,
        email: req.body.email,
        password: hash,
        isAdmin: false
      })
      .then(() => res.status(200).send({ response: 'Successfully created', err: '======================' }))
      .catch(error => res.status(400).send({ response: error.message }));
  },
  // Sign user in
  findUser(req, res) {
    return User
      .findOne({
        where: { name: req.body.name
        } })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found');
        }
        // Check if passwords do not match
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(406).send({ message: 'Incorrect Password' });
        }
        const myToken = jwt.sign({ user: user.id, category: user.isAdmin }, app.get('secret'), { expiresIn: 24 * 60 * 60 });
        return res.status(200).send({ token: myToken, userId: user.id, category: user.isAdmin });
      }).catch(error => res.status(400).send(error));
  },
};
