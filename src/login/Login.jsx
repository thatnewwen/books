import React from 'react';
import axios from 'axios';
import { withFormik } from 'formik';
import history from '../history.js';

import './Login.css';

const loginForm = props => {
  const { values, isSubmitting, handleChange, handleSubmit } = props;

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

      <button className="btn" type="submit" disabled={isSubmitting}>
        Log In
      </button>
    </form>
  );
};

const Login = withFormik({
  mapPropsToValues() {
    return { username: '', password: '' };
  },

  handleSubmit(values, { setSubmitting }) {
    axios
      .post('/login', values)
      .then(res => {
        setSubmitting(false);
        localStorage.setItem('jwt', res.data.token);
        history.push('/profile');
      })
      .catch(() => setSubmitting(false));
  },
})(loginForm);

export default Login;
