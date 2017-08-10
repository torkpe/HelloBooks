import chai from 'chai';
import supertest from 'supertest';
import faker from 'faker';
import app from '../server/db/dist/server';
import db from '../server/db/dist/models/index';

const expect = chai.expect;
const userName = `${faker.fake('{{name.lastName}}')}johnDoe`;
const email = faker.internet.email();
let token = '';
const adminName = `${faker.fake('{{name.lastName}}')}janDoe`;
const adminEmail = `${faker.fake('{{name.firstName}}')}@email.com`;

let id = '';
let bookId = '';
let adminToken = '';
const user1 = {
  name: userName,
  email,
  password: 'jonbullish',
};
const admin = {
  name: adminName,
  email: adminEmail,
  password: 'jonbullish',
};
const user = {
  name: 'jon bull',
  email: 'jonbull@email.com',
  password: 'jonbullish',
};
const book = {
  cover: 'sdhdsjcdssnbdsdsbhjsb',
  pdf: 'bssskskjhdb',
  title: 'Eze go to school',
  author: 'Chinua Achebe',
  description: 'A young boy from the village who finally goes to school',
  quantity: 5,
  genre: 'Educational'
};
describe('Post /api/users/signup', () => {
  console.log(user1.name+'=========================='+admin.name)
});
const request = supertest;
describe('Post /api/users/signup', () => {
  it('responds with 201 created', (done) => {
    request(app)
      .post('/api/users/signup')
      .send(user1)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(201, done);
        if (err) return done(err);
        done();
      });
  });
});
// Sign up with already existing details
describe('Post /api/users/signup', () => {
  it('responds with 400 Bad Request', (done) => {
    request(app)
      .post('/api/users/signup')
      .send(user1)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(404, done);
        if (err) return done(err);
        done();
      });
  });
});
// Sign up with invalid details
describe('Post /api/users/signup', () => {
  it('responds with 400 bad request error', (done) => {
    request(app)
      .post('/api/users/signup')
      .send(user)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(400, done);
        if (err) return done(err);
        done();
      });
  });
});
// Sign in with invalid details
describe('Post /api/users/signin', () => {
  it('responds with ', (done) => {
    request(app)
      .post('/api/users/signin')
      .send(user)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        done();
      });
  });
});
// Sign in valid details
describe('Post /api/users/signin', () => {
  it('responds with ', (done) => {
    request(app)
      .post('/api/users/signin')
      .send(user1)
      .set('Accept', 'application/json')
      .end((err, res) => {
        token = res.body.token;
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        done();
      });
  });
});
// Create Admin
describe('Post /api/users/signup', () => {
  it('responds with 201 created', (done) => {
    request(app)
      .post('/api/admin/signup')
      .send(admin)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(201, done);
        if (err) return done(err);
        done();
      });
  });
});
// Sign Admin in with valid details
describe('Post /api/admin/signin', () => {
  it('responds with ', (done) => {
    request(app)
      .post('/api/admin/signin')
      .send(admin)
      .set('Accept', 'application/json')
      .end((err, res) => {
        console.log(res)
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        done();
      });
  });
});
// Post new book by Admin
describe('POST /api/books', () => {
  it('responds with ', (done) => {
    request(app)
      .post('/api/books')
      .set('x-access-token', adminToken)
      .send(book)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        done();
      });
  });
});
// Post new book by user
describe('POST /api/books', () => {
  it('responds with ', (done) => {
    request(app)
      .post('/api/books')
      .send(book)
      .set('x-access-token', token)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        done();
      });
  });
});
