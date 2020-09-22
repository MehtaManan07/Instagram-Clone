import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [values, setValues] = useState({
    name: '',
    passwordConfirm: '',
    email: '',
    username: '',
    password: '',
  });
  const onChangeHandler = name => e => {
    setValues({ ...values, [name]: e.target.value })
  }
  return (
    <div className="login">
      <div className="login__column">
        <img src="/images/phoneImage.png" className="login__phone" />
      </div>
      <div className="login__column">
        <div className="login__box">
          <img src="/images/loginLogo.png" className="login__logo" />
          <form className="login__form">
            <input
              type="text"
              value={values.name}
              onChange={onChangeHandler('name')}
              placeholder="Name"
              required
            />
            <input
              type="text"
              value={values.username}
              onChange={onChangeHandler('username')}
              placeholder="Username"
              required
            />
            <input
              type="email"
              value={values.email}
              onChange={onChangeHandler('email')}
              placeholder="Email"
              required
            />
            <input
              type="password"
              value={values.password}
              onChange={onChangeHandler('password')}
              placeholder="Password"
              required
            />
            <input
              type="password"
              value={values.passwordConfirm}
              onChange={onChangeHandler('passwordConfirm')}
              placeholder="Confirm Password"
              required
            />
            <input type="submit" value="Log in" />
          </form>
          <span className="login__divider">or</span>
          <a href="#" className="login__link">
            <i className="btn fa fa-facebook" />
            Log in with Facebook
          </a>
          <a href="#" className="login__link login__link--small">
            Forgot password
          </a>
        </div>
        <div className="login__box">
          <span>Have an account?</span> <Link to="/login">Log in</Link>
        </div>
        <div className="login__box--transparent">
          <span>Get the app.</span>
          <div className="login__appstores">
            <img
              src="/images/ios.png"
              className="login__appstore"
              alt="Apple appstore logo"
              title="Apple appstore logo"
            />
            <img
              src="/images/android.png"
              className="login__appstore"
              alt="Android appstore logo"
              title="Android appstore logo"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
