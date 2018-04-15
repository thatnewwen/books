const express = require('express');
const passport = require('passport');
const app = require('../index.js');

const api = express.Router();
const user = express.Router();

app.use('/api', api);
app.use('/user', passport.authenticate('jwt', { session: false }), user);

module.exports = { api, user };

require('./auth.js');
require('./user.js');
require('./books.js');
