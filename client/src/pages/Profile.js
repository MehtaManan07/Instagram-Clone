import React from 'react';
import './profile.css'
import ProfilePosts from '../components/Profile/ProfilePosts';
import ProfileTop from '../components/Profile/ProfileTop';

import {} from 'react-redux'

const Profile = () => {
  return (
    <main id="profile">
     <ProfileTop />
      <section className="profile__photos">
        <ProfilePosts />
      </section>
    </main>
  );
};

export default Profile;
