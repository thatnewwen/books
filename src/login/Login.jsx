import React from 'react';
import { Formik } from 'formik';
import { history, routeIncludes, getRouteQueryParams } from '../history.js';
import { LoginContext, axios } from '../App';

import './Login.css';

const loginForm = login => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    onSubmit={(values, { setSubmitting, setErrors }) => {
      const isLogin = routeIncludes('/login');

      if (isLogin) {
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

      const isLogin = routeIncludes('login');
      const isLoginFailed = getRouteQueryParams('failed');

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
            {isLogin ? 'Welcome' : 'Hello'}
            <br />
            {isLogin ? 'Back!' : 'There!'}
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
          {isLoginFailed && (
            <div className="login-error">Login was unsuccessful.</div>
          )}
          <button
            className="btn password-auth"
            type="submit"
            disabled={isSubmitting}
          >
            {isLogin ? 'Log In' : 'Sign Up'}
          </button>

          <div className="auth-divider"> Or </div>

          <a className="btn facebook-auth" href="/auth/facebook">
            {isLogin ? 'Log In' : 'Sign Up'} with Facebook
          </a>
          <a className="btn google-auth" href="/auth/google">
            {isLogin ? 'Log In' : 'Sign Up'} with Google
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
