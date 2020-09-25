import React from 'react';
import './profile.css';
import ProfilePosts from '../../components/Profile/ProfilePosts';
import ProfileTop from '../../components/Profile/ProfileTop';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Profile = () => {
  const auth = useSelector((state) => state.auth);
  const { id } = useParams();

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
