import React from 'react';
import axios from 'axios';
import { withFormik } from 'formik';
import history from '../history.js';

import './Login.css';

const loginForm = props => {
  const { values, isSubmitting, handleChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div>
        <label for="username"> Username or Email </label>
        <input
          name="username"
          type="text"
          value={values.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label for="password"> Password </label>
        <input
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit" disabled={isSubmitting}>
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
        history.push('/');
      })
      .catch(() => setSubmitting(false));
  },
})(loginForm);

export function setAuthToken() {
  if (localStorage && localStorage.getItem('jwt')) {
    const jwt = localStorage.getItem('jwt');
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwt}`;
  }
}

export function unsetAuthToken() {
  if (localStorage) {
    localStorage.removeItem('jwt');
    axios.defaults.headers.common['Authorization'] = null;
  }
}

export default Login;
