import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar-container">
      <ul className="navbar">
        <Link to="/" className="brand">
          BookClub
        </Link>

        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/user/profile">Profile</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
