import bcrypt from 'bcrypt';
import model from './models';

const User = model.Users;
const salt = bcrypt.genSaltSync(10); // Generate salt for password

const Admin = {
  email: 'admin@hellobooks.com',
  password: 'silver',
};
const hash = bcrypt.hashSync(Admin.password, salt);
User.create({
  email: Admin.email,
  password: hash,
  isAdmin: true,
  star: 'admin',
  confirmed: true,
  key: 'admin',
});
