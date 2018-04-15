const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const Users = require('../models/users.js');
const app = require('../index.js');

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
      secretOrKey: 'replace_this_with_envs',
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
      return res.status(400);
    }

    req.login(user, { session: false }, err => {
      if (err) {
        res.status(400).send();
      }

      const token = jwt.sign(user, 'replace_this_with_envs');

      res.redirect('/');

      return res.json({ user, token });
    });
  })(req, res);
});

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});
