const express = require('express');
const path = require('path');
const passport = require('passport');

const app = express();

require('./samples.js');

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

const router = express.Router();

app.use('/api', router);

module.exports = router;

app.use(passport.initialize());

// Endpoints
require('./books.js');
