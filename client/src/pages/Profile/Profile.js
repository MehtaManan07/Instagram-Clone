import React, { useEffect } from 'react';
import './profile.css';
import ProfilePosts from '../../components/Profile/ProfilePosts';
import ProfileTop from '../../components/Profile/ProfileTop';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/actions/userActions';
import Loader from '../../components/Loader';

const Profile = () => {
  const user = useSelector((state) => state.user);
  const { loading } = user;
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(id));
  }, []);

  return (
    <main id="profile">
      {loading ? (
        <Loader />
      ) : (
        <>
          <ProfileTop user={user.profile} />
          <section className="profile__photos">
            <ProfilePosts />
          </section>
        </>
      )}
    </main>
  );
};

export default Profile;
