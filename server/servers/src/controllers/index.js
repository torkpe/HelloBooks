import users from './user';
import admin from './admin';
import book from './book';
import borrowBook from './borrowbook';
import notification from './notifications';
import google, { findOrCreate } from './google';

export default {
  users, admin, book, borrowBook, notification, google, findOrCreate,
};
