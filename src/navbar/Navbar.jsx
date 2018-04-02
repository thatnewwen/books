import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';

const Navbar = function() {
  return (
    <div className="navbar-container">
      <ul className="navbar">
        <Link href="/" className="brand">
          BookClub
        </Link>

        <li>
          <Link href="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
