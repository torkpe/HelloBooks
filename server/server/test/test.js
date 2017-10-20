import chai from 'chai';
import supertest from 'supertest';
import faker from 'faker';
import app from '../dist/server';
import db from '../dist/models/index';

const expect = chai.expect;
const userName = `${faker.fake('{{name.lastName}}')}johnDoe`;
const email = `${faker.fake('{{name.firstName}}')}@email.com`;
const userName1 = `${faker.fake('{{name.lastName}}')}johnDoee`;
const email1 = `${faker.fake('{{name.firstName}}')}e@email.com`;
let token = '';
let token2 = '';
const adminName = `${faker.fake('{{name.lastName}}')}janDoe`;
const adminEmail = `${faker.fake('{{name.firstName}}')}@email.com`;

let adminToken = '';
const user1 = {
  name: userName,
  email,
  password: 'jonbullish',
};
const user2 = {
  name: userName,
  email,
  password: 'jonbullis',
};
const user3 = {
  name: userName1,
  email: email1,
  password: 'jonbullishki',
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
  genre: 'Educational',
};
const book2 = {
  cover: 'sdhdsjcdssnbdsdsbhjsb',
  pdf: 'bssskskjhdb',
  title: 'Ali and Simbi',
  author: 'Joy chinelo',
  description: 'Ali is a boy and Simbi is a girl',
  quantity: 0,
  genre: 'Educational',
};
const book3 = {
  cover: '',
  pdf: 'bssskskjhdb',
  title: 'Ali and Simbi',
  author: '',
  description: 'Ali is a boy and Simbi is a girl',
  quantity: 0,
  genre: 'Educational',
};
describe('Post /api/users/signup', () => {
  console.log(user1.name+'=========================='+user3.name);
});
const request = supertest;

describe('Create new user', () => {
  it('responds with 201 created', (done) => {
    request(app)
      .post('/api/users/signup')
      .send(user1)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(201, done);
        if (err) return expect(err.message);
        return done();
      });
  });
});
describe('Create new user', () => {
  it('responds with 201 created', (done) => {
    request(app)
      .post('/api/users/signup')
      .send(user3)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(201, done);
        if (err) return expect(err.message);
        return done();
      });
  });
});
// Sign up with already existing details
describe('Sign up with already existing details', () => {
  it('responds with 400 Bad Request', (done) => {
    request(app)
      .post('/api/users/signup')
      .send(user1)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(400, done);
        if (err) return done(err.message);
        return done();
      });
  });
});

// Sign up with invalid details
describe('Sign up with invalid details', () => {
  it('responds with 400 bad request error', (done) => {
    request(app)
      .post('/api/users/signup')
      .send(user)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(400, done);
        if (err) return done(err);
        return done();
      });
  });
});

// Sign in with invalid details
describe('Sign in with invalid details', () => {
  it('responds with 404', (done) => {
    request(app)
      .post('/api/users/signin')
      .send(user)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(404, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Sign in with incorrect password
describe('Sign in with incorrect password', () => {
  it('responds with 406', (done) => {
    request(app)
      .post('/api/users/signin')
      .send(user2)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(406, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Sign user in with valid details
describe('Sign user in with valid details', () => {
  it('responds with 200', (done) => {
    request(app)
      .post('/api/users/signin')
      .send(user1)
      .set('Accept', 'application/json')
      .end((err, res) => {
        token = res.body.myToken;
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Sign user2 in with valid details
describe('Sign user in with valid details', () => {
  it('responds with 200', (done) => {
    request(app)
      .post('/api/users/signin')
      .send(user3)
      .set('Accept', 'application/json')
      .end((err, res) => {
        token2 = res.body.myToken;
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Create Admin
describe('Create Admin', () => {
  it('responds with 201 created', (done) => {
    request(app)
      .post('/api/admin/signup')
      .send(admin)
      .set('Accept', 'application/json')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(201, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Sign Admin in with valid details
describe('Sign Admin in with valid details', () => {
  it('responds with 200', (done) => {
    request(app)
      .post('/api/admin/signin')
      .send(admin)
      .set('Accept', 'application/json')
      .end((err, res) => {
        adminToken = res.body.token;
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Post new book by Admin
describe('Post new book by Admin', () => {
  it('responds with 201', (done) => {
    request(app)
      .post('/api/books')
      .set('x-access-token', adminToken)
      .send(book)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(201, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Post another book by Admin
describe('Post another book by Admin', () => {
  it('responds with 201', (done) => {
    request(app)
      .post('/api/books')
      .set('x-access-token', adminToken)
      .send(book2)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(201, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Post another book by Admin with invalid details
describe('Post another book by Admin with invalid details', () => {
  it('responds with 400', (done) => {
    request(app)
      .post('/api/books')
      .set('x-access-token', adminToken)
      .send(book3)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(400, done);
        if (err) return done(err);
        return done();
      });
  });
});

// Post new book by user
describe('Post new book by user', () => {
  it('responds with 403', (done) => {
    request(app)
      .post('/api/books')
      .send(book)
      .set('x-access-token', token)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(403, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Post new book without token
describe('Post new book without token', () => {
  it('responds with 403', (done) => {
    request(app)
      .post('/api/books')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(403, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Get all books by user
describe('Post new book by user', () => {
  it('responds with 200', (done) => {
    request(app)
      .get('/api/books')
      .set('x-access-token', token)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Get all books by admin
describe('Get all books by admin', () => {
  it('responds with 200', (done) => {
    request(app)
      .get('/api/books')
      .set('x-access-token', adminToken)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(200, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Get all books without token
describe('Get all books without token', () => {
  it('responds with 403', (done) => {
    request(app)
      .get('/api/books')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(403, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Borrow book by user
describe('Borrow book by user', () => {
  it('responds with 201', (done) => {
    request(app)
      .post('/api/users/1/1/books')
      .set('x-access-token', token)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(201, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Borrow book by admin
describe('Borrow book by admin', () => {
  it('responds with 403', (done) => {
    request(app)
      .post('/api/users/1/1/books')
      .set('x-access-token', adminToken)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(403, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Borrow book without token
describe('Borrow book without token', () => {
  it('responds with 403', (done) => {
    request(app)
      .post('/api/users/1/1/books')
      .end((err) => {
        expect('Content-Type', /json/);
        expect(403, done);
        if (err) return done(err);
        return done();
      });
  });
});
// Borrow book again by user
describe('Borrow book again by user', () => {
  it('responds with 400', (done) => {
    request(app)
      .post('/api/users/1/1/books')
      .set('x-access-token', token)
      .end((err) => {
        expect('Content-Type', /json/);
        expect(400, done);
        if (err) return done(err);
        return done();
      });
  });
});
