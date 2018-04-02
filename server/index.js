const express = require('express');
const path = require('path');
// const passport = require('passport');

const app = express();
const router = express.Router();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

app.use('/api', router);

module.exports = router;

// app.use(passport.initialize());

require('./samples.js');

// Endpoints
require('./books.js');
