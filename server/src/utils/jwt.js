import jwt from 'jsonwebtoken';

import app from '../server';
// Function to generate token for user
const generateToken = user => jwt.sign(
  {
    id: user.id,
    star: user.star,
    isAdmin: user.isAdmin
  },
  app.get('secret'), { expiresIn: 24 * 60 * 60 }
);
export default generateToken;