import React, { Component } from 'react';

class Login extends Component {
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
