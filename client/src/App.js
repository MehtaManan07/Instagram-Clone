import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions/authActions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    if(localStorage.getItem('Instagram1')){
      dispatch(getUser())
    }
  },[])
  return (
    <>
    {/* <Navbar /> */}
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </>
  );
}

export default App;
