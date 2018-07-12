import React from 'react';
import { Formik } from 'formik';
import history from '../history.js';
import { LoginContext, axios } from '../App';

import './Login.css';

const loginForm = login => (
  <Formik
    initialValues={{
      username: '',
      password: '',
    }}
    onSubmit={(values, { setSubmitting }) => {
      axios
        .post('/login', values)
        .then(res => {
          setSubmitting(false);

          login(res.data, () => {
            history.push('/profile');
          });
        })
        .catch(() => setSubmitting(false));
    }}
    render={({ values, handleChange, handleSubmit, isSubmitting }) => (
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

        <button className="btn" type="submit" disabled={isSubmitting}>
          Log In
        </button>
      </form>
    )}
  />
);

const Login = () => (
  <LoginContext.Consumer>
    {({ login }) => loginForm(login)}
  </LoginContext.Consumer>
);

export default Login;
