import jwt from 'jsonwebtoken';
import app from '../server';

export default {
  /**
   * @description Check if user is authenticated
   * 
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * 
   * @return {object} response
   * @return {function} next
   */
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
  /**
   * @description Check if user is authorized to carry out an action
   * 
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * 
   * @return {function} next
   * @return {object} response
   */
  authorizeUser(request, response, next) {
    if (request.decoded.isAdmin === false) {
      next();
    } else {
      return response.status(403).send({
        message: 'This page is for users only'
      });
    }
  },
  /**
   * @description Check if admin is authorized to carry out an action
   * 
   * @param {object} request
   * @param {object} response
   * @param {function} next
   * 
   * @return {function} next
   * @return {object} response
   */
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
