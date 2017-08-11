'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _faker = require('faker');

var _faker2 = _interopRequireDefault(_faker);

var _server = require('../server/db/dist/server');

var _server2 = _interopRequireDefault(_server);

var _index = require('../server/db/dist/models/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var expect = _chai2.default.expect;
var userName = _faker2.default.fake('{{name.lastName}}') + 'johnDoe';
var email = _faker2.default.internet.email();
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
describe('Post /api/users/signup', function () {
  it('responds with 201 created', function (done) {
    request(_server2.default).post('/api/users/signup').send(user1).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(201, done);
      if (err) return done(err);
      done();
    });
  });
});
// Sign up with already existing details
describe('Post /api/users/signup', function () {
  it('responds with 400 Bad Request', function (done) {
    request(_server2.default).post('/api/users/signup').send(user1).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(404, done);
      if (err) return done(err);
      done();
    });
  });
});
// Sign up with invalid details
describe('Post /api/users/signup', function () {
  it('responds with 400 bad request error', function (done) {
    request(_server2.default).post('/api/users/signup').send(user).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(400, done);
      if (err) return done(err);
      done();
    });
  });
});
// Sign in with invalid details
describe('Post /api/users/signin', function () {
  it('responds with ', function (done) {
    request(_server2.default).post('/api/users/signin').send(user).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(200, done);
      if (err) return done(err);
      done();
    });
  });
});
// Sign in valid details
describe('Post /api/users/signin', function () {
  it('responds with ', function (done) {
    request(_server2.default).post('/api/users/signin').send(user1).set('Accept', 'application/json').end(function (err, res) {
      token = res.body.token;
      expect('Content-Type', /json/);
      expect(200, done);
      if (err) return done(err);
      done();
    });
  });
});
// Create Admin
describe('Post /api/users/signup', function () {
  it('responds with 201 created', function (done) {
    request(_server2.default).post('/api/admin/signup').send(admin).set('Accept', 'application/json').end(function (err) {
      expect('Content-Type', /json/);
      expect(201, done);
      if (err) return done(err);
      done();
    });
  });
});
// Sign Admin in with valid details
describe('Post /api/admin/signin', function () {
  it('responds with ', function (done) {
    request(_server2.default).post('/api/admin/signin').send(admin).set('Accept', 'application/json').end(function (err, res) {
      console.log(res);
      expect('Content-Type', /json/);
      expect(200, done);
      if (err) return done(err);
      done();
    });
  });
});
// Post new book by Admin
describe('POST /api/books', function () {
  it('responds with ', function (done) {
    request(_server2.default).post('/api/books').set('x-access-token', adminToken).send(book).end(function (err) {
      expect('Content-Type', /json/);
      expect(200, done);
      if (err) return done(err);
      done();
    });
  });
});
// Post new book by user
describe('POST /api/books', function () {
  it('responds with ', function (done) {
    request(_server2.default).post('/api/books').send(book).set('x-access-token', token).end(function (err) {
      expect('Content-Type', /json/);
      expect(200, done);
      if (err) return done(err);
      done();
    });
  });
});