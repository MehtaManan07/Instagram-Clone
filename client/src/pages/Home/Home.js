import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPosts } from '../../redux/actions/postActions';
import SinglePost from '../../components/Post/SinglePost';
import './Home.css';

const Home = () => {
  const post = useSelector((state) => state.post);
  const { loading, posts } = post;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllPosts());
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {loading ? (
        <></>
      ) : (
        <main id="feed">
          {posts !== [] &&
            posts.map((post, i) => {
              
              return <SinglePost post={post} />;
            })}
        </main>
      )}
    </>
  );
};

export default Home;
