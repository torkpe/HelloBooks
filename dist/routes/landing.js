'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();
//  show index page
router.get('/', function (req, res) {
  res.send({ message: '<h1>hello landing page<h1>' });
});
exports.default = router;