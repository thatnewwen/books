const express = require('express');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();
const api = express.Router();
const user = express.Router();

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.use('/api', api);
app.use('/user', passport.authenticate('jwt', { session: false }), user);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.listen(process.env.PORT || 8080);

module.exports = { app, api, user };

require('./samples.js');

require('./routes/auth.js');
require('./routes/user.js');
require('./routes/books.js');
