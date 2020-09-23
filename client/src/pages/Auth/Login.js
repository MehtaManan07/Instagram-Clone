import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './login.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer, toast } from 'react-toastify';
import '../mobile.css';
import { loginUser } from '../../redux/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user, error } = auth;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(values));
  };

  const onChangeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  useEffect(() => {
    toast.error(error, { position: 'bottom-center' });
  }, [error]);

  if (user !== null) {
    return <Redirect to={`/profile/${user._id}`} />;
  }

  return (
    <div className="login">
      <div className="login__column">
        <img
          src="/images/phoneImage.png"
          className="login__phone"
          alt="phone"
        />
      </div>
      <div className="login__column">
        <div className="login__box">
          <img src="/images/loginLogo.png" className="login__logo" alt="logo" />
          <form onSubmit={onSubmitHandler} className="login__form">
            <input
              type="text"
              value={values.username}
              onChange={onChangeHandler('username')}
              placeholder="Username"
              required
            />
            <input
              type="password"
              value={values.password}
              onChange={onChangeHandler('password')}
              placeholder="Password"
              required
            />
            <span
              className="btn-block btn mb-1 btn-outline-primary"
              onClick={onSubmitHandler}
            >
              Login
            </span>
          </form>
          <span className="login__divider">or</span>
          <a href="#!" className="login__link">
            <i className="btn fa fa-facebook" />
            Log in with Facebook
          </a>
          <a href="#!" className="login__link login__link--small">
            Forgot password
          </a>
        </div>
        <div className="login__box">
          <span>Don't have an account?</span> <Link to="/signup">Sign up</Link>
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
      <ToastContainer />
    </div>
  );
};

export default Login;
