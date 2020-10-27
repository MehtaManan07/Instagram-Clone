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
    // eslint-disable-next-line
  }, []);

  return (
    <main id="profile">
      {loading || !user.profile ? (
        <Loader />
      ) : (
        <>
          <ProfileTop user={user.profile} id={id} />
          <section className="profile__photos">
            <ProfilePosts posts={user.profile.posts} />
          </section>
        </>
      )}
    </main>
  );
};

export default Profile;
