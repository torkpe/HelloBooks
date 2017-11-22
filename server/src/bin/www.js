import http from 'http';
import app from '../server';

const port = parseInt(process.env.PORT, 10) || 8081;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);
