const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require('bcrypt');
const Users = require('../models/users.js');
const { app, auth } = require('../index.js');
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

          done(null, user);
        })
        .catch(err => done(err));
    })
    .catch(err => done(err));
});

const facebookStrategy = new FacebookStrategy(
  {
    clientID: FACEBOOK_CLIENT,
    clientSecret: FACEBOOK_SECRET,
    callbackURL: 'http://localhost:8080/auth/callback',
    enableProof: true,
  },
  (accessToken, refreshToken, profile, callback) => {
    const { id: facebookId, displayName } = profile;

    Users.findOneAndUpdate(
      { facebookId },
      { facebookId, displayName },
      { upsert: true, returnNewDocument: true }
    ).then(user => {
      callback(null, user);
    });
  }
);

const jwtStrategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: TOKEN_SECRET,
  },
  (userPayload, done) => {
    return Users.findOne({ _id: userPayload._id })
      .then(user => done(null, user))
      .catch(err => done(err));
  }
);

passport.use(passwordStrategy);
passport.use(facebookStrategy);
passport.use(jwtStrategy);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

function loginUser({ err, user, req, res }) {
  if (err || !user) {
    res.status(400).send();
  } else {
    req.login(user, { session: false }, err => {
      if (err) {
        res.status(400).send();
      } else {
        const userId = _.pick(user, ['_id']);
        const token = jwt.sign(userId, TOKEN_SECRET);

        res.cookie('token', token);
        res.redirect('/login');
      }
    });
  }
}

app.post('/login', (req, res) => {
  passport.authenticate('local', { session: false }, (err, user) =>
    loginUser({ err, user, req, res })
  )(req, res);
});

app.get('/logout', req => req.logout());

auth.get('/facebook', passport.authenticate('facebook'));

auth.get(
  '/callback',
  passport.authenticate('facebook', { failureRedirect: 'back' }),
  (req, res) => loginUser({ user: req.user, req, res })
);

auth.get('/token', (req, res) => {
  const cookies = req.cookies || {};
  const token = cookies.token;

  res.clearCookie('token');
  res.json({ token });
});
