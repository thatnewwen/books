import React from 'react';
// import axios from 'axios';

function Login() {
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

  return (
    <form action="/login" method="post">
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

export default Login;
