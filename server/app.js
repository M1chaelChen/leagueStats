const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors');

const app = express();
const match = require('./routes/match');

app.use(cors({
  origin: 'http://34.220.166.161',
  optionsSuccessStatus: 200
}));

app.use(bodyParser.json());

// custom middleware
app.use((req, res, next) => {
  res.success = data => res.json({ ...data, err: null, success: true });
  next();
});

// router middleware
app.use('/match', match);

// error handler
app.use((err, req, res, next) => {
  res.json({ err, success: false });
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 3001;
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => {
  console.log(`Server Running on http://127.0.0.1:${port}`);
});