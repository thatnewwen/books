import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken, unsetAuthToken } from '../login/Login';
import history from '../history.js';

import './Navbar.css';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthed: null };
  }

  componentDidMount() {
    setAuthToken();
    axios
      .get('/user')
      .then(() => {
        this.setState({ isAuthed: true });
      })
      .catch(() => {
        this.setState({ isAuthed: false });
      });
  }

  profile() {
    return (
      <li>
        <Link to="/profile">Profile</Link>
      </li>
    );
  }

  people() {
    return (
      <li>
        <Link to="/">People</Link>
      </li>
    );
  }

  addBook() {
    return (
      <li>
        <Link to="/" className="light-btn">
          Add a Book
        </Link>
      </li>
    );
  }

  logout() {
    return (
      <li>
        <Link
          to="/login"
          className="logout-btn"
          onClick={() => {
            unsetAuthToken();
            axios.get('/logout');
            history.push('/login');
          }}
        >
          Logout
        </Link>
      </li>
    );
  }

  login() {
    return (
      <li>
        <Link to="/login">Login</Link>
      </li>
    );
  }

  render() {
    return (
      <div className="navbar-container">
        <ul className="navbar">
          <Link to="/" className="brand">
            BookClub
          </Link>

          {this.state.isAuthed ? this.logout() : this.login()}
          {this.state.isAuthed ? this.people() : ''}
          {this.state.isAuthed ? this.profile() : ''}
          {this.state.isAuthed ? this.addBook() : ''}
        </ul>
      </div>
    );
  }
}

export default Navbar;
