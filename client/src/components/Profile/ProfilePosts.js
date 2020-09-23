import React from 'react';

const ProfilePosts = () => {
  return (
    <div>
    <hr/>
      <div className="profile__photo">
        <img src="/images/feedPhoto.jpg" alt='profilepic' />
        <div className="profile__photo-overlay">
          <span className="overlay__item">
            <i className="fa fa-heart"></i>
            486
          </span>
          <span className="overlay__item">
            <i className="fa fa-comment"></i>
            344
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePosts;
