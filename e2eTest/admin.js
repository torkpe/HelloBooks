const path = require('path');

module.exports = {
  'Demo test Admin' : function (browser) {
    browser
      .url('http://localhost:8081')
      .waitForElementVisible('body', 1000)
      .waitForElementVisible('button[name=getStarted]', 1000)
      .click('button[name=getStarted]')
      .pause(1000)
      .setValue('input[type=email]', 'admin@hellobooks.com')
      .pause(1000)
      .setValue('input[type=password]', 'silver')
      .pause(1000)
      .click('button[name=signin]')
      .pause(1000)
      .waitForElementVisible('i.material-icons', 1000)
      .click('i.material-icons')
      .pause(1000)
      .waitForElementVisible('a[name=uploadBook]', 1000)
      .click('a[name=uploadBook]')
      .pause(1000)
      .click('body')
      .pause(1000)
      .waitForElementVisible('input[name=title]', 1000)
      .setValue('input[name=title]', 'the boy from the mystic falls')
      .waitForElementVisible('input[name=author]', 1000)
      .setValue('input[name=author]', 'jon dabba')
      .waitForElementVisible('input[name=description]', 1000)
      .setValue('input[name=description]', 'the mysterious boy')
      .waitForElementVisible('input[name=genre]', 1000)
      .setValue('input[name=genre]', 'scifi')
      .waitForElementVisible('input[name=quantity]', 1000)
      .setValue('input[name=quantity]', '5')
      // .waitForElementVisible('label[name=cover]', 1000)
      // .click('label[name=cover]')
      .pause(1000)
      .waitForElementVisible('label[name=pdf]', 1000)
      .pause(5000)
      .click('i.material-icons')
      .pause(1000)
      .click('a[name=allBooks]')
      .pause(1000)
      .click('body')
      .pause(1000)
      .url('http://localhost:8081/single/1')
      .pause(1000)
      .waitForElementVisible('a[href="/edit-book/1"]', 1000)
      .click('[href="/edit-book/1"]')
      .waitForElementVisible('input[name=title]', 1000)
      .setValue('input[name=title]', 'the boy from the mystic falls')
      .waitForElementVisible('input[name=author]', 1000)
      .setValue('input[name=author]', 'jon dabba')
      .waitForElementVisible('input[name=description]', 1000)
      .setValue('input[name=description]', 'the mysterious boy who was just mysterious')
      .waitForElementVisible('input[name=genre]', 1000)
      .setValue('input[name=genre]', 'educational')
      .waitForElementVisible('input[name=quantity]', 1000)
      .setValue('input[name=quantity]', '8')
      .pause(1000)
      .waitForElementVisible('button[name=updateBook]', 1000)
      .click('button[name=updateBook]')
      .pause(3000)
      .url('http://localhost:8081/single/1')
      .pause(1000)
      .waitForElementVisible('span[name=deleteBook]', 1000)
      .click('span[name=deleteBook]')
      .pause(3000)
      .click('i.material-icons')
      .pause(1000)
      .click('a[name=notifications]')
      .pause(1000)
      .click('body')
      .pause(1000)
      .waitForElementVisible('a[name=signout]', 1000)
      .click('a[name=signout]')
      .pause(1000)
      .end();
  }
};