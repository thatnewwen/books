import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history.js';
import { LoginContext, axios } from '../App';

import './Navbar.css';

class Navbar extends Component {
  navItems({ loggedIn, logout }) {
    if (loggedIn) {
      return (
        <React.Fragment>
          <li>
            <Link
              to="/login"
              className="logout-btn"
              onClick={() => {
                logout();
                axios.get('/logout');
                history.push('/login');
              }}
            >
              Logout
            </Link>
          </li>

          <li>
            <Link to="/profile">Profile</Link>
          </li>

          <li>
            <Link to="/" className="light-btn">
              Add a Book
            </Link>
          </li>
        </React.Fragment>
      );
    } else {
      return (
        <li>
          <Link to="/login">Login</Link>
        </li>
      );
    }
  }

  render() {
    return (
      <div className="navbar-container">
        <ul className="navbar">
          <Link to="/" className="brand">
            Asterisk
          </Link>

          <LoginContext.Consumer>{this.navItems}</LoginContext.Consumer>
        </ul>
      </div>
    );
  }
}

export default Navbar;
