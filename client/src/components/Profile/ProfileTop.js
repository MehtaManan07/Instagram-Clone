import React from 'react';
import Loader from '../Loader'
import TopButton from './TopButton';
const ProfileTop = ({ user, id }) => {
  return (
    <div>
    {user === null ? <Loader /> : (

      <header className="profile__header">
        <div className="profile__column">
          <img src={user.profileImage} alt='profile pic' />
        </div>
        <div className="profile__column">
          <div className="profile__title">
            <h3 className="profile__username">{user.username}</h3>
            <TopButton id={id} />
            <i className="fa fa-cog fa-lg"></i>
          </div>
          <ul className="profile__stats">
            <li className="profile__stat">
              <span className="stat__number">{user.posts.length}</span> posts
            </li>
            <li className="profile__stat">
              <span className="stat__number">{user.followers.length}</span> followers
            </li>
            <li className="profile__stat">
              <span className="stat__number">{user.following.length}</span> following
            </li>
          </ul>
          <p className="profile__bio">
            <span className="profile__full-name">{user.name}</span>
            <br />
            {user.bio}
          </p>
        </div>
      </header>
    )}
    </div>
  );
};

export default ProfileTop;
