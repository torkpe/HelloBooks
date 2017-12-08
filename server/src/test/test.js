import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import bcrypt from 'bcrypt';

import model from '../models';
import app from '../server';

chai.use(chaiHttp);

const User = model.Users;
const salt = bcrypt.genSaltSync(10); // Generate salt for password

const { expect } = chai;
const userName = `${faker.fake('{{name.lastName}}')}johnDoe`;
const email = `${faker.fake('{{name.firstName}}')}@email.com`;
const userName1 = `${faker.fake('{{name.lastName}}')}johnDoee`;
const email1 = `${faker.fake('{{name.firstName}}')}e@email.com`;
let token = '';
let key = '';
const adminName = `${faker.fake('{{name.lastName}}')}janDoe`;
const adminEmail = `${faker.fake('{{name.firstName}}')}@email.com`;

let adminToken = '';
let userId='';
const user1 = {
  name: userName,
  email,
  password: 'jonbullish',
  confirmPassword: 'jonbullish'
};
const user2 = {
  name: userName,
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
  cover: 'sdhdsjcdsssjkssjksnbdsdsbhjsb',
  pdf: 'bssskskjhdkjsnjksb',
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
  name: 'admin'
}).then(createdUser => createdUser)
  .catch(error => error.message);

describe('Users', () => {
  it('should get a message and key on successful signup', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(user1)
      .set('Accept', 'application/json')
      .end((error, response) => {
        key = response.body.key
        expect(response.status).to.equal(201);
        expect(response.body.message).to.equal('A mail has been sent to your email');
        expect(response.body).to.have.property('key');
        if (error) return done(error);
        done();
      });
  });
  it('should not sign up with non-emails', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send({ email: 'user1' })
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          expect(error.response.status).to.equal(400);
          expect(error.response.body).to.have.property('message');
          expect(error.response.body.message).to.equal('This is not an email');
        }
        done();
      });
  });
  it('should have email to signup', (done) => {
    chai.request(app)
      .post('/api/v1/users/signup')
      .send('')
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          expect(error.response.status).to.equal(400);
          expect(error.response.body).to.have.property('message');
          expect(error.response.body.message).to.equal('Email is required');
        }
        done();
      });
  });

  it('should get a message and key on successful signup', (done) => {
    chai.request(app)
      .put(`/api/v1/confirmation/${key}`)
      .send(user1)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Successfully updated');
        expect(response.body).to.have.property('myToken');
        expect(response.body).to.have.property('userId');
        if (error) return done(error);
        done();
      });
  });
  it('should have name, password and confirmPassword for confirmation', (done) => {
    chai.request(app)
      .put(`/api/v1/confirmation/${key}`)
      .send(user2)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          expect(error.response.status).to.equal(400);
          expect(error.response.body).to.have.property('message');
          expect(error.response.body.message).to.equal('All fields are required');
        }
        done();
      });
  });
  it('should have the correct key for confirmation', (done) => {
    chai.request(app)
      .put(`/api/v1/confirmation/gsB0dghVs47ngNMLQGd5VXWpHUqF`)
      .send(user1)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          expect(error.response.status).to.equal(404);
          expect(error.response.body).to.have.property('message');
          expect(error.response.body.message).to.equal('User not found');
        }
        done();
      });
  });
  it('should not update details without required fields', (done) => {
    chai.request(app)
      .put(`/api/v1/confirmation/${key}`)
      .send(user2)
      .set('Accept', 'application/json')
      .end((error, response) => {
        if (error) {
          expect(error.response.status).to.equal(400);
          expect(error.response.body).to.have.property('message');
          expect(error.response.body.message).to.equal('All fields are required');
        }
        done();
      });
  });
});
// signin user
describe('User', () => {
  it('should get a message and key on successful signin', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user1)
      .set('Accept', 'application/json')
      .end((error, response) => {
        token = response.body.myToken;
        userId = response.body.userId;
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('myToken');
        expect(response.body).to.have.property('userId');
        if (error) return done(error);
        done();
      });
  });
  // signin admin
  it('should get a message, id and key on successful signin', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(Admin)
      .set('Accept', 'application/json')
      .end((error, response) => {
        adminToken = response.body.myToken;
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('myToken');
        expect(response.body).to.have.property('userId');
        if (error) return done(error);
        done();
      });
  });
  it('should be able to create a book admin', (done) => {
    chai.request(app)
      .post(`/api/v1/books/`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .send(book)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Book successfully created');
        expect(typeof (response.body)).to.equal('object');
        expect(typeof (response.body.message)).to.equal('string');
        if (error) return done(error);
        done();
      });
  });
  it('should be able to create a book admin', (done) => {
    chai.request(app)
      .post(`/api/v1/books/`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .send(book)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Book successfully created');
        expect(typeof (response.body)).to.equal('object');
        expect(typeof (response.body.message)).to.equal('string');
        if (error) return done(error);
        done();
      });
  });
  it('should get an error when creating a book with 0 quantity', (done) => {
    chai.request(app)
      .post(`/api/v1/books/`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .send(book2)
      .end((error, response) => {
        expect(error.response.status).to.equal(400);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('This proposed quantity is too small to create a new book');
        expect(typeof (error.response.body)).to.equal('object');
        expect(typeof (error.response.body.message)).to.equal('string');
        done();
      });
  });
  it('should get an error when creating a book with out cover as admin', (done) => {
    chai.request(app)
      .post(`/api/v1/books/`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .send(book3)
      .end((error, response) => {
        expect(error.response.status).to.equal(400);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Invalid photo!. Please try uploading another photo');
        expect(typeof (error.response.body)).to.equal('object');
        expect(typeof (error.response.body.message)).to.equal('string');
        done();
      });
  });
  it('should be able to delete a book as admin', (done) => {
    chai.request(app)
      .put(`/api/v1/books/1/delete`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Book successfully deleted');
        if (error) return done(error);
        done();
      });
  });
  it('should be able to edit a book as an admin', (done) => {
    chai.request(app)
      .put(`/api/v1/books/1`)
      .set('x-access-token', adminToken)
      .send(book)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Book updated successfully');
        if (error) return done(error);
        done();
      });
  });
  it('should not be able to edit a book that does not exist', (done) => {
    chai.request(app)
      .put(`/api/v1/books/10`)
      .set('x-access-token', adminToken)
      .send(book)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error.response.status).to.equal(404);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Book not found');
        done();
      });
  });
  it('should be able to get all books', (done) => {
    chai.request(app)
      .get(`/api/v1/books`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        if (error) return done(error);
        done();
      });
  });
  it('should get a book', (done) => {
    chai.request(app)
      .get(`/api/v1/books/2`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
  it('should get error for a book that does not exist', (done) => {
    chai.request(app)
      .get(`/api/v1/books/1`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error.response.status).to.equal(404);
        expect(typeof (error.response.body)).to.equal('object');
        expect(error.response.body.message).to.equal('Book not found');
        done();
      });
  });
  it('should get an error when deleting a book that does not exist', (done) => {
    chai.request(app)
      .put(`/api/v1/books/10/delete`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error.response.status).to.equal(404);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Book is not found');
        done();
      });
  });
  it('should be able to create a book as an admin', (done) => {
    chai.request(app)
      .post(`/api/v1/books/`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .send(book)
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Book successfully created');
        expect(typeof (response.body)).to.equal('object');
        expect(typeof (response.body.message)).to.equal('string');
        if (error) return done(error);
        done();
      });
  });
  it('should get an error message on incorrect details', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(user)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error.response.status).to.equal(404);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Looks like you have not registered this account with us');
        done();
      });
  });
  it('should get an error message on incorrect details', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send({
        email,
        password: 'jonbullishffe',
      })
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error.response.status).to.equal(403);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Incorrect credentials');
        done();
      });
  });
  it('should get message when successfully updated', (done) => {
    chai.request(app)
      .put(`/api/v1/users/set-password/${userId}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        oldPassword: 'jonbullish',
        password: 'jonbullishffe',
        confirmPassword: 'jonbullishffe',
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Password successfully changed');
        if (error) return done(error);
        done();
      });
  });
  it('should get an error message for wrong password', (done) => {
    chai.request(app)
      .put(`/api/v1/users/set-password/${userId}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        oldPassword: 'jonbullishds',
        password: 'jonbullishffe',
        confirmPassword: 'jonbullishffe',
      })
      .end((error, response) => {
        expect(error.response.status).to.equal(403);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Incorrect Password');
        done();
      });
  });
  it('should get an error message for password mismatch', (done) => {
    chai.request(app)
      .put(`/api/v1/users/set-password/${userId}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        oldPassword: 'jonbullish',
        password: 'jonbullishffe',
        confirmPassword: 'jonbullishffdscse',
      })
      .end((error, response) => {
        expect(error.response.status).to.equal(400);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Passwords do not match');
        done();
      });
  });
  it('should fill all details', (done) => {
    chai.request(app)
      .put(`/api/v1/users/set-password/${userId}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        oldPassword: 'jonbullish',
        password: 'jonbullishffe',
      })
      .end((error, response) => {
        expect(error.response.status).to.equal(400);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Password field missing');
        done();
      });
  });
  it('should have password greater than 5', (done) => {
    chai.request(app)
      .put(`/api/v1/users/set-password/${userId}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        oldPassword: 'jonbullish',
        password: 'jo',
        confirmPassword: 'jo',
      })
      .end((error, response) => {
        expect(error.response.status).to.equal(400);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Password is too short');
        done();
      });
  });
  it('should get a message if name is updated', (done) => {
    chai.request(app)
      .put(`/api/v1/users/update-user/${userId}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        name: 'johnbosco'
      })
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Successfully updated Name');
        if (error) return done(error);
        done();
      });
  });
  it('should have a name not less than 4', (done) => {
    chai.request(app)
      .put(`/api/v1/users/update-user/${userId}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .send({
        name: 'joh'
      })
      .end((error, response) => {
        expect(error.response.status).to.equal(400);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Name is too short');
        expect(typeof (error.response.body)).to.equal('object');
        expect(typeof (error.response.body.message)).to.equal('string');
        done();
      });
  });
  it('should be able to get his/her details', (done) => {
    chai.request(app)
      .get(`/api/v1/users/${userId}`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('email');
        expect(typeof (response.body)).to.equal('object');
        expect(typeof (response.body.name)).to.equal('string');
        expect(typeof (response.body.email)).to.equal('string');
        if (error) return done(error);
        done();
      });
  });
  it('should not be able to create a book', (done) => {
    chai.request(app)
      .post(`/api/v1/books/`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error.response.status).to.equal(403);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('This page is for Admins only');
        expect(typeof (error.response.body)).to.equal('object');
        expect(typeof (error.response.body.message)).to.equal('string');
        done();
      });
  });
  it('should be able to borrow book', (done) => {
    chai.request(app)
      .post(`/api/v1/users/2/2/books`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('borrowed');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Book successfully borrowed');
        expect(typeof (response.body)).to.equal('object');
        expect(typeof (response.body.message)).to.equal('string');
        if (error) return done(error);
        done();
      });
  });
  it('should not borrow book when borrowed is not returned', (done) => {
    chai.request(app)
      .post(`/api/v1/users/2/2/books`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error.response.status).to.equal(401);
        expect(error.response.body).to.have.property('message');
        expect(error.response.body.message).to.equal('Sorry!!! This action cannot be completed due to your current star level');
        expect(typeof (error.response.body)).to.equal('object');
        expect(typeof (error.response.body.message)).to.equal('string');
        done();
      });
  });
  it('should be able to return borrowed book', (done) => {
    chai.request(app)
      .put(`/api/v1/users/2/2/books`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
  it('should be able to get all borrowed books', (done) => {
    chai.request(app)
      .get(`/api/v1/users/2/books/all-borrowed`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
  it('should be able to get all borrowed but not returned books', (done) => {
    chai.request(app)
      .get(`/api/v1/users/2/books`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
  it('should be able to borrow book', (done) => {
    chai.request(app)
      .post(`/api/v1/users/2/2/books`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property('borrowed');
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Book successfully borrowed');
        expect(typeof (response.body)).to.equal('object');
        expect(typeof (response.body.message)).to.equal('string');
        if (error) return done(error);
        done();
      });
  });
  it('should be able to get a borrowed book', (done) => {
    chai.request(app)
      .get(`/api/v1/book/2/2`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
  it('should notifications', (done) => {
    chai.request(app)
      .get(`/api/v1/notifications/user/2`)
      .set('x-access-token', token)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
  it('should notifications as an admin', (done) => {
    chai.request(app)
      .get(`/api/v1/notifications/admin`)
      .set('x-access-token', adminToken)
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(response.status).to.equal(200);
        expect(typeof (response.body)).to.equal('object');
        done();
      });
  });
});
