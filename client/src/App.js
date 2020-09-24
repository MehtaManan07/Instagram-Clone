import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUser } from './redux/actions/authActions';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Profile from './pages/Profile/Profile';  
import NewPost from './pages/Post/NewPost';

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
        <PrivateRoute path="/profile/:id" exact component={Profile} />
        <PrivateRoute path='/newPost' exact component={NewPost} />
      </Switch>
    </>
  );
}

export default App;
