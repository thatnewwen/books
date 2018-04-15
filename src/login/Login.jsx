import React from 'react';
import axios from 'axios';
import { withFormik } from 'formik';

const loginForm = props => {
  const { values, isSubmitting, handleChange, handleSubmit } = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          name="username"
          type="text"
          placeholder="Your Email"
          value={values.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <input
          name="password"
          type="password"
          placeholder="Your Password"
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
        console.log(res);
      })
      .catch(() => setSubmitting(false));
  },
})(loginForm);

export default Login;
