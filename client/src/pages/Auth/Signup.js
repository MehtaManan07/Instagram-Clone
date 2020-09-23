import React, { useEffect, useState } from 'react';
import './login.css';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { Link, Redirect } from 'react-router-dom';
import { signupUser } from '../../redux/actions/authActions';

const Login = () => {
  const [values, setValues] = useState({
    name: '',
    passwordConfirm: '',
    email: '',
    username: '',
    password: '',
  });
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { user, error } = auth;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(signupUser(values));
  };

  const onChangeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };
  useEffect(() => {
    if(error === null){
      toast.error(error,{position: 'bottom-center'})
    }
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
            <span
              className="btn-block btn mb-1 btn-outline-primary"
              onClick={onSubmitHandler}
            >
              Signup
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
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Login;
