'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _server = require('../server');

var _server2 = _interopRequireDefault(_server);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = parseInt(process.env.PORT, 10) || 8080;
_server2.default.set('port', port);

var server = _http2.default.createServer(_server2.default);
server.listen(port);