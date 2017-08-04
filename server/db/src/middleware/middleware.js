import jwt from 'jsonwebtoken';
import app from '../server';

const authorize = (req, res, next) => {
  const token = req.body.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, app.get('secret'), (err, decoded) => {
      if (err) {
        console.error('JWT Verification Error', err);
        res.status(403).send(err);
      } else {
        req.decoded = decoded;
        return next();
      }
    });
  } else {
    res.status(403).send('Token not provided');
  }
};
export default authorize;
