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
      </ul>
    </div>
  );
}

export default Navbar;
