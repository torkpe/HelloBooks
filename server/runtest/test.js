'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../dist/server');

var _server2 = _interopRequireDefault(_server);

var _index = require('../dist/models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var userName = _faker2.default.fake('{{name.lastName}}') + 'johnDoe';
var email = _faker2.default.fake('{{name.firstName}}') + '@email.com';
var token = '';
var adminName = _faker2.default.fake('{{name.lastName}}') + 'janDoe';
var adminEmail = _faker2.default.fake('{{name.firstName}}') + '@email.com';

var id = '';
var bookId = '';
var adminToken = '';
var user1 = {
  name: userName,
  email: email,
  password: 'jonbullish'
};
var user2 = {
  name: userName,
  email: email,
  password: 'jonbullis'
};
var admin = {
  name: adminName,
  email: adminEmail,
  password: 'jonbullish'
};
var user = {
  name: 'jon bull',
  email: 'jonbull@email.com',
  password: 'jonbullish'
};
var book = {
  cover: 'sdhdsjcdssnbdsdsbhjsb',
  pdf: 'bssskskjhdb',
  title: 'Eze go to school',
  author: 'Chinua Achebe',
  description: 'A young boy from the village who finally goes to school',
  quantity: 5,
  genre: 'Educational'
};
describe('Post /api/users/signup', function () {
  console.log(user1.name + '==========================' + admin.name);
});
var request = _supertest2.default;

describe('Create new user', function () {
  it('responds with 201 created', function (done) {
    request(_server2.default).post('/api/v1/users/signup').send(user1).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(201, done);
      if (err) return expect(err.message);
      return done();
    });
  });
});
// Sign up with already existing details
describe('Sign up with already existing details', function () {
  it('responds with 400 Bad Request', function (done) {
    request(_server2.default).post('/api/v1/users/signup').send(user1).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(400, done);
      if (err) return done(err.message);
      return done();
    });
  });
});
// Sign up with invalid details
describe('Sign up with invalid details', function () {
  it('responds with 400 bad request error', function (done) {
    request(_server2.default).post('/api/v1/users/signup').send(user).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(400, done);
      if (err) return done(err);
      return done();
    });
  });
});
// Sign in with invalid details
describe('Sign in with invalid details', function () {
  it('responds with 404', function (done) {
    request(_server2.default).post('/api/v1/users/signin').send(user).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(404, done);
      if (err) return done(err);
      return done();
    });
  });
});
// Sign in with incorrect password
describe('Sign in with incorrect password', function () {
  it('responds with 406', function (done) {
    request(_server2.default).post('/api/v1/users/signin').send(user2).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(406, done);
      if (err) return done(err);
      return done();
    });
  });
});
// Sign Admin in with valid details
describe('Sign user in with valid details', function () {
  it('responds with 200', function (done) {
    request(_server2.default).post('/api/v1/users/signin').send(user1).set('Accept', 'application/json').end(function (err, res) {
      token = res.body.myToken;
      expect('Content-Type', /json/);
      expect(200, done);
      if (err) return done(err);
      return done();
    });
  });
});
// Create Admin
describe('Create Admin', function () {
  it('responds with 201 created', function (done) {
    request(_server2.default).post('/api/v1/admin/signup').send(admin).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(201, done);
      if (err) return done(err);
      return done();
    });
  });
});
// Sign Admin in with valid details
describe('Sign Admin in with valid details', function () {
  it('responds with 200', function (done) {
    request(_server2.default).post('/api/v1/admin/signin').send(admin).set('Accept', 'application/json').end(function (err, res) {
      adminToken = res.body.token;
      expect('Content-Type', /json/);
      expect(200, done);
      if (err) return done(err);
      return done();
    });
  });
});
// Post new book by Admin
describe('Post new book by Admin', function () {
  it('responds with 201', function (done) {
    request(_server2.default).post('/api/v1/books').set('x-access-token', adminToken).send(book).end(function (err) {
      expect('Content-Type', /json/);
      expect(201, done);
      if (err) return done(err);
      return done();
    });
  });
});
// Post new book by user
describe('Post new book by user', function () {
  it('responds with 403', function (done) {
    request(_server2.default).post('/api/v1/books').send(book).set('x-access-token', token).end(function (err) {
      expect('Content-Type', /json/);
      expect(403, done);
      if (err) return done(err);
      return done();
    });
  });
});