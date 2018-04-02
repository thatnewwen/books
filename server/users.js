const mongoose = require('./mongoose.js');
const Schema = mongoose.Schema;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const usersSchema = new Schema({
  username: String,
  password: String,
});

usersSchema.pre('save', next => {
  const saltRounds = 10;

  bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    this.password = hashedPassword;
    next();
  });
});

usersSchema.statics = {
  authenticate(username, password, done) {
    this.findOne({ username })
      .then(user => {
        if (!user) {
          return done(null, false, {
            message: 'User not found.',
          });
        }

        // Constant time comparison for security
        bcrypt
          .compare(password, user.password)
          .then(result => {
            if (!result) {
              return done(null, false, {
                message: 'Username and password do not match.',
              });
            }

            return done(null, user);
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  },
};

const Users = mongoose.model('Users', usersSchema);

passport.use(new LocalStrategy(Users.authenticate));
