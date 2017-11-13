'use strict';

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var User = _models2.default.Users;
var salt = _bcrypt2.default.genSaltSync(10); // Generate salt for password

var Admin = {
  email: 'admin@hellobooks.com',
  password: 'silver'
};
var hash = _bcrypt2.default.hashSync(Admin.password, salt);
User.create({
  email: Admin.email,
  password: hash,
  isAdmin: true,
  star: 'admin',
  confirmed: true,
  key: 'admin'
}, function (response) {
  console.log(response);
  process.exit(0);
});