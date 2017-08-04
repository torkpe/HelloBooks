import supertest from 'supertest';
import app from '../server/db/dist/server';

const request = supertest;
describe('GET /api', () => {
  it('responds with <h1>hello landing page<h1>', (done) => {
    request(app)
      .get('/api')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(404, { message: 'Nothing to see here' }, done);
  });
});


