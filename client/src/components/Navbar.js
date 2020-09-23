import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const Navbar = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const authLinks = (
    <>
      <li className="navigation__list-item">
        <Link to="/explore" className="navigation__link">
          <i className="fa fa-compass fa-lg"></i>
        </Link>
      </li>
      <li className="navigation__list-item">
        <span
          style={{ cursor: 'pointer' }}
          className="navigation__link"
          onClick={() => dispatch(logoutUser())}
        >
          <i className="fa fa-sign-out fa-lg">Logout</i>
        </span>
      </li>
      <li className="navigation__list-item">
        <Link
          to={`/profile/${user !== null && user._id}`}
          className="navigation__link"
        >
          <i className="fa fa-user-o fa-lg"></i>
        </Link>
      </li>
    </>
  );

  const guestLinks = (
    <>
      <li className="navigation__list-item">
        <Link
          style={{ textDecoration: 'none' }}
          to="/login"
          className="navigation__link"
        >
          Login
        </Link>
      </li>
      <li className="navigation__list-item">
        <Link
          style={{ textDecoration: 'none' }}
          to="/signup"
          className="navigation__link"
        >
          Signup
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navigation fixed">
      <div className="navigation__column">
        <Link to="/">
          <img src="images/logo.png" alt="navlogo" />
        </Link>
      </div>
      {user !== null && (
        <div className="navigation__column">
          <i className="fa fa-search"></i>
          <input type="text" placeholder="Search" />
        </div>
      )}
      <div className="navigation__column">
        <ul className="navigations__links">
          {/* this check below needs to be improved later and a spinner should be used */}
          {localStorage.getItem('Instagram1') ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
