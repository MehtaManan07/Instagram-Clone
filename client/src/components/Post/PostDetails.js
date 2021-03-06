import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPost } from '../../redux/actions/postActions';
import Loader from '../Loader';
import PostHeader from './PostHeader';
import PostActions from './PostActions';

const PostDetails = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  useEffect(() => {
    dispatch(getPost(postId));
    // eslint-disable-next-line
  }, []);
  return (
    <>
      {post.loading || post.post === null ? (
        <Loader />
      ) : (
        <div className="one_post">
          <div className="post_image">
            <img
              src={post.post.image}
              alt="phone"
              style={{ maxHeight: '100%', width: '100%' }}
            />
          </div>
          <div className="post_content">
            <PostHeader post={post.post} />
            <PostActions post={post.post} />
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetails;
