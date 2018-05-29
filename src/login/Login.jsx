import React from 'react';
import axios from 'axios';
import { Formik } from 'formik';
import history from '../history.js';

import './Login.css';

const Login = () => (
  <Formik
    initialValues={{
      email: '',
      password: '',
    }}

    onSubmit={(values, { setSubmitting }) => {
      axios
        .post('/login', values)
        .then(res => {
          setSubmitting(false);
          localStorage.setItem('jwt', res.data.token);
          history.push('/profile');
        })
        .catch(() => setSubmitting(false));
    }}

    render={({
        values,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
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
      )
    }
  />
);

export default Login;
