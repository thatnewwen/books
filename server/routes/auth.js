const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');
const FacebookStrategy = require('passport-facebook');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const Users = require('../models/users.js');
const { app } = require('../index.js');
const _ = require('lodash');

const TOKEN_SECRET = 'this_is_still_todo_in_envs';
const FACEBOOK_CLIENT = '1016922761801466';
const FACEBOOK_SECRET = '60ea5186f6c10ee0e9d1fbfbe1528272';

const passwordStrategy = new LocalStrategy((username, password, done) => {
  Users.findOne({ username })
    .then(user => {
      if (!user) {
        done(null, false);
      }

      // Constant time comparison for security
      bcrypt
        .compare(password, user.password)
        .then(result => {
          if (!result) {
            done(null, false);
          }

          done(null, _.pick(user, ['_id']));
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
});

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: TOKEN_SECRET,
  },
  (jwtPayload, done) => {
    return Users.findOne({ _id: jwtPayload._id })
      .then(user => done(null, user))
      .catch(err => done(err));
  }
);

const facebookStrategy = new FacebookStrategy(
  {
    clientID: FACEBOOK_CLIENT,
    clientSecret: FACEBOOK_SECRET,
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    enableProof: true,
  },
  (accessToken, refreshToken, profile, callback) => {
    Users.findOrCreate({ facebookId: profile.id }, user =>
      callback(null, user)
    );
  }
);

passport.use(passwordStrategy);
passport.use(jwtStrategy);
passport.use(facebookStrategy);

app.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      res.status(400).send();
    } else {
      req.login(user, { session: false }, err => {
        if (err) {
          res.status(400).send();
        }

        const token = jwt.sign(user, TOKEN_SECRET);

        return res.json({ token, user }).send();
      });
    }
  })(req, res);
});

app.get('/logout', req => req.logout());

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);
