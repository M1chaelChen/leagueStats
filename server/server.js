const http = require('http');

const app = require('./app');
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
const port = app.get('port');
server.listen(port, () => {
  console.log(`Server Running on http://127.0.0.1:${port}`);
});