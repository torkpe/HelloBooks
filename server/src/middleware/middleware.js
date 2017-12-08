import jwt from 'jsonwebtoken';
import app from '../server';

export default {
  checkAuthentication(request, response, next) {
    const token = request.body.token || request.headers['x-access-token'];
    if (token) {
      jwt.verify(token, app.get('secret'), (err, decoded) => {
        if (err) {
          response.status(403).send({
            message: 'Expired token'
          });
        } else {
          request.decoded = decoded;
          next();
        }
      });
    } else {
      response.status(403).send({
        message: 'Token not provided'
      });
    }
  },
  authorizeUser(request, response, next) {
    if (request.decoded.isAdmin === false) {
      next();
    } else {
      return response.status(403).send({
        message: 'This page is for users only'
      });
    }
  },
  authorizeAdmin(request, response, next) {
    if (request.decoded.isAdmin === true) {
      next();
    } else {
      return response.status(403).send({
        message: 'This page is for Admins only'
      });
    }
  }
};
