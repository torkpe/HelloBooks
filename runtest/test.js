'use strict';

var _supertest = require('supertest');

var _supertest2 = _interopRequireDefault(_supertest);

var _server = require('../server/db/dist/server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var request = _supertest2.default;
describe('GET /api', function () {
  it('responds with <h1>hello landing page<h1>', function (done) {
    request(_server2.default).get('/api').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, { message: '<h1>hello landing page<h1>' }, done);
  });
});
describe('GET /api', function () {
  it('responds with <h1>hello landing page<h1>', function (done) {
    request(_server2.default).post('/api/books').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, { message: '<h1>hello landing page<h1>' }, done);
  });
});