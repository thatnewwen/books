import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

class Navbar extends Component {
  render() {
    return (
      <ul className="navbar">
        <Link to="/" class="brand">
          BookClub
        </Link>

        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );
  }
}

export default Navbar;
