const mongoose = require('./mongoose.js');
const Schema = mongoose.Schema;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const usersSchema = new Schema({
  username: String,
  createdAt: Date,
});

const Users = mongoose.model('Users', usersSchema);

passport.use(
  new LocalStrategy((username, password, done) => {
    Users.findOne({ username }, (error, user) => {
      if (error) {
        return done(error);
      }

      if (!user || !user.validPassword(password)) {
        return done(null, false, {
          message: 'Username and password did not match.',
        });
      }

      return done(null, user);
    });
  })
);
