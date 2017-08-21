import jwt from 'jsonwebtoken';
import app from '../server';

export default {
  checkAuthentication(req, res, next) {
    const token = req.body.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, app.get('secret'), (err, decoded) => {
        if (err) {
          res.status(403).send({ message: 'Expired token' });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.status(403).send({ message: 'Token not provided' });
    }
  },
  authorizeUser(req, res, next) {
    if (req.decoded.category === false) {
      next();
    } else {
      return res.status(403).send({ message: 'This page is for users only' });
    }
  },
  authorizeAdmin(req, res, next) {
    if (req.decoded.category === true) {
      next();
    } else {
      return res.status(403).send({ message: 'This page is for Admins only' });
    }
  }
};
