[![Coverage Status](https://coveralls.io/repos/github/torkpe/HelloBooks/badge.svg?branch=chore%2F153101889%2Frefactor-codebase)](https://coveralls.io/github/torkpe/HelloBooks?branch=chore%2F153101889%2Frefactor-codebase) [![Build Status](https://travis-ci.org/torkpe/HelloBooks.svg?branch=development)](https://travis-ci.org/torkpe/HelloBooks) [![Maintainability](https://api.codeclimate.com/v1/badges/07bbacc2f53c6eb450b9/maintainability)](https://codeclimate.com/github/torkpe/HelloBooks/maintainability)

# HelloBooks

## Introduction

Hello-Books is a simple application that helps manage a library and its processes like stocking, tracking and renting books. With this application users are able to find and rent books. The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book etc.

## Technologies

* Nodejs
* Postgresql
* Express
* Sequelize
* React
* Redux

## Installation

* Ensure you have NodeJs and PostgreSQL installed
* Clone the repository https://github.com/torkpe/HelloBooks.git
* Change your directory "cd HelloBooks"
* Install all dependencies "npm install"
* npm install -g sequelize-cli
* Seed database for admin user by running `npm run seed`
* Start the app with "npm start" for development
* Open content on browser using http://localhost:8081

## API DOCUMENTATION

For more information on how to consume the API, read our API doc <a href="https://torkpe.github.io/slate/">here</a>

## Configure Environment Variables

The following environmental variables need to be set in the `.env` file in order for the application to function properly

* NODE_ENV : The `NODE_ENV` is the current environemt the application is being run on `test`, `development` or `production`
* DB_USERNAME : The `DB_USERNAME` is the name of the database owner
* DB_NAME : The `DB_NAME` is the name of the database
* DB_PASSWORD : The `DB_PASSWORD` is the password to the database if there is any
* API_KEY : The `API_KEY` is the key for used for cloudinary configuration
* CLOUD_NAME : The `CLOUD_NAME` is the name of your cloud storage in cloudinary
* PARAM_STRING : The `PARAM_STRING` string gotten from cloudinary as hash
* SECRET : The `SECRET` is used for jwt token encoding and decoding
* UPLOAD_PRESET : The `UPLOAD_PRESET` is a string used for cloudinary set up
* DB_TEST_USERNAME : The `DB_TEST_USERNAME` is the username for test database
* DB_TEST_NAME : The `DB_TEST_USERNAME` is the name of test database
* DB_TEST_PASSWORD : The `DB_TEST_PASSWORD` is the password for access to the test database if there is any
* USER_EMAIL : The `USER_EMAIL` is the email used for sending mails as configured in `nodemailer`
* USER_PASSWORD : The `USER_PASSWORD` is the password to the email used for sending mails to users required in `nodemailer` setup

## Features

Regular (Authenticated) Users to the Hello Books Library can perform the following:

* View library of books
* Borrow a book
* Return a book
* View history of borrowed books
* Reset password
* Sign out of the application

Authenticated Admin Users to the hello books library can perform the folllowing:
* Add new books
* Update book details
* Delete book
* Sign out of the application

## To Contribute

Contributions are welcome. Code should (as much as possible) conform to the Airbnb javascript style guide.

* Make of fork of the repository
* Create a branch
* Make Changes
* Test changes, build
* Make for Pull Request against Development branch

P.S. Pull Requests against Master would likely be ignored

## Author
Temitope Emmanuel

## License

MIT License