import React from 'react';
import './Navbar.css';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { logoutUser } from '../redux/actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { user } = auth;

  const authLinks = (
    <>
      <li className="navigation__list-item">
        <Link to="/newPost" className="navigation__link">
          <i className="fa fa-plus fa-lg"></i>
        </Link>
      </li>
      <li className="navigation__list-item">
        <Link to="/explore" className="navigation__link">
          <i className="fa fa-compass fa-lg"></i>
        </Link>
      </li>
      <li className="navigation__list-item">
        <Dropdown>
          <Dropdown.Toggle className="navigation__link" variant="none">
            <i className="fa fa-user-o fa-lg"></i>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item>
              <span
                onClick={() => history.push(`/profile/${user && user._id}`)}
                style={{ textDecoration: 'none' }}
              >
                <i className="fa fa-user fa-lg">Profile</i>
              </span>
            </Dropdown.Item>
            <Dropdown.Item> Settings </Dropdown.Item>
            <Dropdown.Item>
              <span
                style={{ cursor: 'pointer' }}
                onClick={() => dispatch(logoutUser())}
              >
                <i className="fa fa-sign-out fa-lg">Logout</i>
              </span>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
      <li className="navigation__list-item"></li>
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
          <img src="/images/logo.png" alt="navlogo" />
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
          {auth.isAuth ? authLinks : guestLinks}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
