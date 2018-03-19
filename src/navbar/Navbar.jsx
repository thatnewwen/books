import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-container">
        <ul className="navbar">
          <Link to="/" class="brand">
            BookClub
          </Link>

          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
