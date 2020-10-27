import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../redux/actions/userActions';
import Loader from '../Loader';

const TopButton = ({ id }) => {
  const auth = useSelector((state) => state.auth);
  const { user, loading } = auth;
  const dispatch = useDispatch();
console.log(id)
console.log(user._id)
  return (
    <div>
      {!user || loading ? (
        <Loader></Loader>
      ) : (
        <>
          {id === user._id ? (
            <span className="btn btn-outline-primary">Edit profile</span>
          ) : user.following.includes(id) ? (
            <span
              onClick={() => dispatch(unfollowUser(id))}
              className="btn btn-outline-primary"
            >
              Unfollow
            </span>
          ) : (
            <span
              onClick={() => dispatch(followUser(id))}
              className="btn btn-outline-primary"
            >
              Follow
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default TopButton;
