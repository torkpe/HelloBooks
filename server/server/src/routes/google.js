import express from 'express';
import passport from 'passport';
import google from '../controllers';

const dotenv = require('dotenv');

dotenv.config();
google.google();
const router = express.Router();
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] })); // Scope: what we are requesting from google api

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.send('hello user');
  });
export default router;
