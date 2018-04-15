const mongoose = require('./mongoose.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const { app } = require('./index.js');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const Schema = mongoose.Schema;

const usersSchema = new Schema({
  username: String,
  password: String,
});

usersSchema.pre('save', function(next) {
  if (this.isNew) {
    const saltRounds = 10;
    bcrypt.hash(this.password, saltRounds, (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      this.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
});

const Users = mongoose.model('Users', usersSchema);

passport.use(
  new LocalStrategy(function(username, password, done) {
    Users.findOne({ username })
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
            return done(null, user.username);
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_jwt_secret',
    },
    (jwtPayload, done) => {
      return Users.findOneById(jwtPayload.id)
        .then(user => done(null, user))
        .catch(err => done(err));
    }
  )
);

app.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: 'Something is not right',
        user,
      });
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, 'your_jwt_secret');

      res.redirect('/');

      return res.json({ user, token });
    });
  })(req, res);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = Users;
