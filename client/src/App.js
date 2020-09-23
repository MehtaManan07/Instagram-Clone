import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions/authActions';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Profile';  
import Navbar from './components/Navbar';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem('Instagram1')){
      dispatch(getUser())
      }
      // eslint-disable-next-line
  },[])
  return (
    <>
    <Navbar />
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/profile/:id" exact component={Profile} />
      </Switch>
    </>
  );
}

export default App;
