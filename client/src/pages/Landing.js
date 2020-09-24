import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
const Landing = () => {
  
  if(localStorage.getItem('Instagram1')){
    return <Redirect to='/home' />
  }
  return (
    <div className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1
            style={{
              fontSize: '4rem',
              lineHeight: '1.2',
              marginBottom: '1rem',
            }}
          >
            INSTAGRAM
          </h1>
          <p className="lead">
            A Social Media So Desirable, feel the social experience{' '}
          </p>
          <div className="buttons">
              <Link className='btn-dark mr-2 btn-lg' style={{ textDecoration: 'none' }} to="/signup">Sign Up</Link>
              <Link className='ml-1 btn-dark btn-lg' style={{ textDecoration: 'none' }} to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
