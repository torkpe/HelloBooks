import jwt from 'jsonwebtoken';

import app from '../server';
// Function to generate token for user
const generateToken = user => jwt.sign(
  {
    user: user.id,
    name: user.name,
    star: user.star,
    category: user.isAdmin
  },
  app.get('secret'), { expiresIn: 24 * 60 * 60 }
);
export default generateToken;