import React from 'react'

const ProfileTop = () => {
    return (
        <div>
             <header className="profile__header">
        <div className="profile__column">
          <img src="/images/avatar.jpg" />
        </div>
        <div className="profile__column">
          <div className="profile__title">
            <h3 className="profile__username">serranoarevalo</h3>
            <span className='btn btn-outline-primary'>Edit profile</span>
            <i className="fa fa-cog fa-lg"></i>
          </div>
          <ul className="profile__stats">
            <li className="profile__stat">
              <span className="stat__number">333</span> posts
            </li>
            <li className="profile__stat">
              <span className="stat__number">1234</span> followers
            </li>
            <li className="profile__stat">
              <span className="stat__number">36</span> following
            </li>
          </ul>
          <p className="profile__bio">
            <span className="profile__full-name">Nicolás Serrano Arévalo</span>
            <br/>
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam aspernatur aliquam quia?
          </p>
        </div>
      </header>
        </div>
    )
}

export default ProfileTop
