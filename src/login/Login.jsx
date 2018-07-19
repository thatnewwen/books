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
          .then(res => {
            setSubmitting(false);

            login(res.data, () => {
              history.push('/profile');
            });
          })
          .catch(() => {
            setSubmitting(false);

            setErrors({
              submit: 'Username and password did not match any accounts.',
            });
          });
      }
    }}
    render={({ values, errors, handleChange, handleSubmit, isSubmitting }) => {
      const authFacebook = () => {
        axios
          .get('/auth/facebook')
          .then(res => {
            login(res.data, () => {
              history.push('/profile');
            });
          })
          .catch(() => {});
      };

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
              value={values.password}
              onChange={handleChange}
            />
          </div>

          {errors.submit && <div className="login-error">{errors.submit}</div>}

          <button
            className="btn password-auth"
            type="submit"
            disabled={isSubmitting}
          >
            {getRoutePathEnd() === 'login' ? 'Log In' : 'Sign Up'}
          </button>

          <a className="btn facebook-auth" onClick={authFacebook}>
            Continue with Facebook
          </a>

          <a
            className="btn google-auth"
            href="http://localhost:8080/auth/google"
          >
            Continue with Google
          </a>
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
