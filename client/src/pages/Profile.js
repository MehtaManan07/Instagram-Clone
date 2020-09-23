import React from 'react';
import './profile.css';
import ProfilePosts from '../components/Profile/ProfilePosts';
import ProfileTop from '../components/Profile/ProfileTop';

import { useSelector } from 'react-redux';

const Profile = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <main id="profile">
      <ProfileTop user={auth.user} />
      <section className="profile__photos">
        <ProfilePosts />
      </section>
    </main>
  );
};

export default Profile;
