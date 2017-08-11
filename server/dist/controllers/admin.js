

Object.defineProperty(exports, '__esModule', {
  value: true
});

const _jsonwebtoken = require('jsonwebtoken');

const _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

const _bcrypt = require('bcrypt');

const _bcrypt2 = _interopRequireDefault(_bcrypt);

const _models = require('../models');

const _models2 = _interopRequireDefault(_models);

const _server = require('../server');

const _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const User = _models2.default.Users;
const salt = _bcrypt2.default.genSaltSync(10); // Generate salt for password
exports.default = {
  // sign up user
  create: function create(req, res) {
    const hash = _bcrypt2.default.hashSync(req.body.password, salt);
    return User.findAll({
      where: { isAdmin: true }
    }).then((admin) => {
      if (admin.length < 100) {
        User.create({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          isAdmin: true
        }).then((newUser) => {
          return res.status(201).send(newUser);
        }).catch((error) => {
          return res.status(400).send('' + error);
        });
      } else {
        return res.status(400).send({ message: 'You have made a bad request' });
      }
    }).catch((error) => res.status(400).send(error));
  },

  // sign in user
  findAdmin: function findAdmin(req, res) {
    return User.findOne({
      where: { name: req.body.name,
        isAdmin: true
      } }).then((admin) => {
      if (!admin) {
        return res.status(404).send('Admin not found');
      }
      if (!_bcrypt2.default.compareSync(req.body.password, admin.password)) {
        res.status(406).send({ message: 'Incorrect Password' });
      } else {
        let myToken = _jsonwebtoken2.default.sign({ user: admin.id, category: admin.isAdmin },
          _server2.default.get('secret'), { expiresIn: 24 * 60 * 60 });
        res.status(200).send({
          token: myToken,
          userId: admin.id,
          name: admin.name
        });
      }
    });
  },
  findAdmins: function findAdmins(req, res) {
    return User.findAll({
      where: { isAdmin: true }
    }).then((admins) => res.status(201).send(admins));
  }
};
