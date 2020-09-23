import React from 'react';
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navigation">
      <div className="navigation__column">
        <a href="feed.html">
          <img src="/images/logo.png" alt='navbarpic' />
        </a>
      </div>
      <div className="navigation__column">
        <i className="fa fa-search"></i>
        <input type="text" placeholder="Search" />
      </div>
      <div className="navigation__column">
        <ul className="navigations__links">
          <li className="navigation__list-item">
            <Link to="/explore" className="navigation__link">
              <i className="fa fa-compass fa-lg"></i>
            </Link>
          </li>
          <li className="navigation__list-item">
            <Link to="/" className="navigation__link">
              <i className="fa fa-heart-o fa-lg"></i>
            </Link>
          </li>
          <li className="navigation__list-item">
            <a href="profile.html" className="navigation__link">
              <i className="fa fa-user-o fa-lg"></i>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
