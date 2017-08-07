import supertest from 'supertest';
import app from '../server/db/dist/server';

const request = supertest;
describe('GET /api', () => {
  it('responds with <h1>hello landing page<h1>', (done) => {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: '<h1>hello landing page<h1>' }, done);
  });
});
describe('GET /api', () => {
  it('responds with <h1>hello landing page<h1>', (done) => {
    request(app)
      .post('/api/books')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, { message: '<h1>hello landing page<h1>' }, done);
  });
});
