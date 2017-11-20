import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import random from 'random-key';
import validator from 'validator';

import model from '../models';
import app from '../server';
import { sendEmail, generateToken } from '../utils/index';
import notification from './notifications';
import userRequest from './requests';

const notify = notification.createNotification;
const salt = bcrypt.genSaltSync(10);
const User = model.Users;

export default {
  create(request, response) {
    if (validator.isEmail(request.body.email)) {
      return User
        .findOne({
          where: {
            email: request.body.email,
          }
        }).then((user) => {
          if (user) {
            return response.status(400).send({
              message: 'Sorry email has already been taken'
            });
          }
          User
            .create({ // Create a new user
              email: request.body.email,
              isAdmin: false,
              star: 'bronze',
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
                message: 'A mail has been sent to your email'
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
    return response.status(406).send({ message: 'Invalid email' });
  },
  // Sign user in
  signin(request, response) {
    const { password, email } = request.body;
    if (validator.isEmail(email)) {
      if (!password) {
        return response.status(400).send({
          message: 'Password field is requestuired'
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
            return response.status(406).send({
              message: 'Incorrect credentials'
            });
          }
          const myToken = generateToken(user);
          return response.status(200).send({
            myToken,
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
    const { name, password1, password2 } = request.body;
    // A little validation
    if (name && password1 && password2) {
      if (name.length > 3) {
        if (password1.length < 5) {
          return response.status(400).send({
            message: 'password is too short'
          });
        }
        if (!validator.equals(password1, password2)) {
          return response.status(400).send({
            message: 'Passwords do not match'
          });
        }
        const hash = bcrypt.hashSync(request.body.password1, salt);
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
              name: request.body.name,
              password: hash,
            }).then((updatedUser) => {
              const myToken = generateToken(updatedUser); // Generate token for user
              return response.status(200).send({
                myToken,
                message: 'Successfully updated'
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
      message: 'All fields are requestuired'
    });
  },
  setPassword(request, response) {
    const { password1, password2 } = request.body;
    // validate
    if (password1 && password2) {
      if (password2.length > 5 && password1.length > 5) {
        if (validator.equals(password1, password2)) {
          const hash = bcrypt.hashSync(request.body.password1, salt);
          return User
            .find({
              where: {
                id: request.params.id
              }
            }).then((user) => {
              if (!bcrypt.comparesponseync(request.body.password, user.password)) {
                return response.status(406).send({ message: 'Incorrect Password' });
              }
              user.update({
                password: hash
              }).then(updated => response.status(200).send({
                updated,
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
    if (name && name.length > 4) {
      return User.find({
        where: {
          id: request.params.id
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
  },
  getUser(request, response) {
    return User
      .find({
        where: {
          id: request.params.userId
        }
      }).then((user) => {
        if (user) {
          return response.status(200).send({
            name: user.name,
            email: user.email
          });
        }
        return response.status(404).send({ message: 'User not found' });
      })
      .catch(() => response.status(500).send({ message: 'Something went wrong' }));
  },
  upgradeUser(request, response) {
    const { userId } = request.params;
    return User.findOne({
      where: {
        id: userId
      }
    }).then((user) => {
      if (!user) {
        return response.status(404).send({
          message: 'This user cannot be found'
        });
      }
      if (user.star === 'bronze') {
        return user.update({
          star: 'silver'
        }).then((upgradedUser) => {
          const message = `Congratulations! You have just been upgraded to ${upgradedUser.star} level`;
          notify(message, 'user', userId);
          userRequest.updateRequests(userId);
          return response.status({
            message: 'successfully upgraded user'
          });
        })
          .catch(() => response.status(500).send({ message: 'Something went wrong' }));
      }
      if (user.star === 'silver') {
        return user.update({
          star: 'gold'
        }).then(upgradedUser => response.status({
          message: 'successfully upgraded user'
        }))
          .catch(() => response.status(500).send({ message: 'Something went wrong' }));
      }
    });
  }
};

