import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import random from 'random-key';
import validator from 'validator';

import model from '../models';
import app from '../server';
import { sendEmail,
  generateToken,
  categories
} from '../utils/index';
import notification from './notifications';

const notify = notification.createNotification;
const salt = bcrypt.genSaltSync(10);
const User = model.Users;
const borrowBook = model.BorrowBook;

export default {
  create(request, response) {
    const { email } = request.body;
    if (!email) {
      return response.status(400).send({
        message: 'Email is required'
      });
    }
    if (validator.isEmail(email)) {
      return User
        .findOne({
          where: {
            email,
          }
        }).then((user) => {
          if (user) {
            return response.status(409).send({
              message: 'Sorry email has already been taken'
            });
          }
          User
            .create({ // Create a new user
              email,
              isAdmin: false,
              star: categories.bronze,
              confirmed: false,
              key: random.generate(50),
            })
            .then((createdUser) => {
              const link = `https://hellobooks-foodman.herokuapp.com/confirmation/${createdUser.key}`;
              const message = `
Hello there, thank you for registering for helloBooks.
Please click on the click below to confirm your email addresponses
                         ${link}`;
              sendEmail(message, 'user', createdUser.id);
              return response.status(201).send({
                message: 'A mail has been sent to your email',
                key: createdUser.key
              });
            })
            .catch(() => response.status(500).send({
              message: 'Something went wrong'
            }));
        })
        .catch(() => response.status(500).send({
          message: 'Something went wrong'
        }));
    }
    return response.status(400).send({ message: 'This is not an email' });
  },
  // Sign user in
  signin(request, response) {
    const { password, email } = request.body;
    if (validator.isEmail(email)) {
      if (!password) {
        return response.status(400).send({
          message: 'Password field is required'
        });
      }
      return User
        .findOne({
          where: {
            email, // Check if user exists first
          }
        })
        .then((user) => {
          if (!user) {
            return response.status(404).send({
              message: 'Looks like you have not registered this account with us'
            });
          }
          // Check if passwords do not match
          if (!bcrypt.compareSync(request.body.password, user.password)) {
            return response.status(403).send({
              message: 'Incorrect credentials'
            });
          }
          const myToken = generateToken(user);
          return response.status(200).send({
            myToken,
            userId: user.id
          });
        })
        .catch(() => response.status(500).send({
          message: 'Something went wrong'
        }));
    }
    return response.status(400).send({
      message: 'invalid email'
    });
  },
  // Update user after email confirmation
  updateUser(request, response) {
    const { name, password, confirmPassword } = request.body;
    // A little validation
    if (name && password && confirmPassword) {
      if (name.length > 3) {
        if (password.length < 5) {
          return response.status(400).send({
            message: 'password is too short'
          });
        }
        if (!validator.equals(password, confirmPassword)) {
          return response.status(400).send({
            message: 'Passwords do not match'
          });
        }
        const hash = bcrypt.hashSync(password, salt);
        return User
          .findOne({
            where: {
              key: request.params.key // Check if user exists first
            }
          })
          .then((user) => {
            if (!user) {
              return response.status(404).send({
                message: 'User not found'
              });
            }
            // Update user info
            user.update({
              name,
              password: hash,
            }).then((updatedUser) => {
              const myToken = generateToken(updatedUser); // Generate token for user
              return response.status(200).send({
                myToken,
                message: 'Successfully updated',
                userId: updatedUser.id
              });
            }).catch(() => response.status(500).send({
              message: 'Something went wrong'
            }));
            return user;
          }).catch(() => response.status(500).send({
            message: 'Something went wrong'
          }));
      }
      return response.status(400).send({
        message: 'Name is too short'
      });
    }
    return response.status(400).send({
      message: 'All fields are required'
    });
  },
  setPassword(request, response) {
    const { password, confirmPassword, oldPassword } = request.body;
    // validate
    if (password && confirmPassword) {
      if (confirmPassword.length > 5 && password.length > 5) {
        if (validator.equals(password, confirmPassword)) {
          const hash = bcrypt.hashSync(password, salt);
          return User
            .find({
              where: {
                id: request.decoded.id
              }
            }).then((user) => {
              if (!bcrypt.compareSync(oldPassword, user.password)) {
                return response.status(403).send({
                  message: 'Incorrect Password'
                });
              }
              user.update({
                password: hash
              }).then(updated => response.status(200).send({
                message: 'Password successfully changed'
              }))
                .catch(() => response.status(500).send({
                  message: 'Something went wrong'
                }));
            })
            .catch(() => response.status(500).send({
              message: 'Something went wrong'
            }));
        }
        return response.status(400).send({
          message: 'Passwords do not match'
        });
      }
      return response.status(400).send({
        message: 'Password is too short'
      });
    }
    return response.status(400).send({
      message: 'Password field missing'
    });
  },
  updateName(request, response) {
    const { name } = request.body;
    if (name) {
      if (name.length >= 4) {
        return User.find({
          where: {
            id: request.decoded.id
          }
        }).then((user) => {
          user.update({
            name: request.body.name
          }).then(updated => response.status(200).send({
            name: updated.name,
            message: 'Successfully updated Name'
          }))
            .catch(() => response.status(500).send({
              message: 'Something went wrong'
            }));
        })
          .catch(() => response.status(500).send({
            message: 'Something went wrong'
          }));
      }
      return response.status(400).send({
        message: 'Name is too short'
      });
    }
    return response.status(400).send({
      message: 'Name is required'
    });
  },
  getUser(request, response) {
    return User
      .find({
        where: {
          id: request.decoded.id
        }
      }).then((user) => {
        if (user) {
          return response.status(200).send({
            name: user.name,
            email: user.email
          });
        }
        return response.status(404).send({
          message: 'User not found'
        });
      })
      .catch(() => response.status(500).send({
        message: 'Something went wrong'
      }));
  },
};

