const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const api = express.Router();
const user = express.Router();

app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

module.exports = { app, api, user };

require('./samples.js');
require('./routes/auth.js');
require('./routes/user.js');
require('./routes/books.js');

app.use('/api', api);
app.use('/user', passport.authenticate('jwt', { session: false }), user);

// Everything else is client routing
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
