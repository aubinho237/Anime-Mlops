import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Prediction 
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/prediction" className="nav-link">
            Prediction rating
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
