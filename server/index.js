const express = require('express');
const path = require('path');
const passport = require('passport');

const app = express();
var bodyParser = require('body-parser');

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

module.exports = app;

require('./samples.js');
require('./routes/routes.js');
