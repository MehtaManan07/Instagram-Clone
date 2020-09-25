import React from 'react';
import { Link } from 'react-router-dom';
import PostActions from './PostActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const SinglePost = ({ post }) => {
  return (
    <div className="photo">
      <div className="d-flex justify-content-between">
        <header className="photo__header">
          <Link
            style={{ textDecoration: 'none' }}
            to={`/profile/${post.user._id}`}
          >
            <img src={post.user.profileImage} className="photo__avatar" />
          </Link>
          <div className="photo__user-info">
            <Link
              style={{ textDecoration: 'none', color: 'black' }}
              to={`/profile/${post.user._id}`}
            >
              <span className="photo__author">{post.user.name}</span>
            </Link>
          </div>
        </header>
        <i className="fa ml fa-ellipsis-h ml-auto mt-auto mr-2" />
      </div>
      <img
        src={post.image}
        style={{ maxHeight: '450px', width: '100%', borderRadius: '3px' }}
      />
      <PostActions post={post} />
    </div>
  );
};

export default SinglePost;
