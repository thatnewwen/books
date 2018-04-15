import React, { Component } from 'react';
import passport from 'passport';
import axios from 'axios';

class Login extends Component {
  login(event) {
    const auth = passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
    });
    axios.post('/login', auth);

    event.preventDefault();
  }

  render() {
    return (
      <form method="post" action="/login">
        <div>
          <input type="text" name="username" placeholder="Your Email" />
        </div>
        <div>
          <input type="password" name="password" placeholder="Your Password" />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default Login;
