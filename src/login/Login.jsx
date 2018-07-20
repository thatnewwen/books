import React from 'react';
import { Formik } from 'formik';
import { history, getRoutePathEnd } from '../history.js';
import { LoginContext, axios } from '../App';

import './Login.css';

const loginForm = login => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    onSubmit={(values, { setSubmitting, setErrors }) => {
      const pathEnd = getRoutePathEnd();

      if (pathEnd === 'login') {
        axios
          .post('/login', values)
          .then(res => setSubmitting(false))
          .catch(err => {
            setSubmitting(false);

            setErrors({
              submit: 'Username and password did not match any accounts.',
            });
          });
      } else {
        axios
          .post('/register', values)
          .then(res => setSubmitting(false))
          .catch(err => {
            setSubmitting(false);

            setErrors({
              submit: 'This email already has an account.',
            });
          });
      }
    }}
    render={({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
      axios.get('/auth/token').then(res => {
        login(res.data, () => {
          history.push('/profile');
        });
      });

      const pathEnd = getRoutePathEnd();
      const isLogin = pathEnd === 'login';

      let loginSwitch;

      if (isLogin) {
        loginSwitch = (
          <div className="login-switch-container">
            Don't have an account?
            <a href="/register" className="link red">
              Sign up →
            </a>
          </div>
        );
      } else {
        loginSwitch = (
          <div className="login-switch-container">
            Have an account?
            <a href="/login" className="link red">
              Log in →
            </a>
          </div>
        );
      }

      return (
        <form onSubmit={handleSubmit} className="login-form">
          <h1 className="login-header">
            Welcome <br /> Back!
          </h1>

          <div>
            <label htmlFor="username"> Username or Email </label>
            <input
              name="username"
              type="text"
              className="input"
              placeholder="Your Email"
              value={values.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="password"> Password </label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Your Password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          {errors.submit && <div className="login-error">{errors.submit}</div>}

          <button
            className={'btn password-auth ' + (isLogin ? '' : 'blue')}
            type="submit"
            disabled={isSubmitting}
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>

          <a className="btn facebook-auth" href="/auth/facebook">
            Continue with Facebook
          </a>

          <a className="btn google-auth" href="/auth/google">
            Continue with Google
          </a>

          {loginSwitch}
        </form>
      );
    }}
  />
);

const Login = () => (
  <LoginContext.Consumer>
    {({ login }) => loginForm(login)}
  </LoginContext.Consumer>
);

export default Login;
