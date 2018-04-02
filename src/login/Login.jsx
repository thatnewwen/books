import React, { Component } from 'react';
// import axios from 'axios';

class Login extends Component {
  // login() {
  //   axios.post(
  //     '/login',
  //     passport.authenticate('local', {
  //       successRedirect: '/',
  //       failureRedirect: '/login',
  //       failureFlash: true,
  //     })
  //   );
  // }

  render() {
    return (
      <form action="/login" method="post">
        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    );
  }
}

export default Login;
