import React from 'react';
import { Link } from 'react-router-dom';

const PostHeader = ({ post }) => {
  return (
    <div className="post_header">
      <Link style={{ textDecoration: 'none' }} to={`/profile/${post.user._id}`}>
        <img
          src={post.user.profileImage}
          style={{
            verticalAlign: 'middle',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
          }}
          alt="profile"
        />
      </Link>
      <Link
        style={{ textDecoration: 'none', color: 'black' }}
        to={`/profile/${post.user._id}`}
      >
        <div className="post_headerInfo">
          <h6>{post.user.username}</h6>
          <p>Location</p>
        </div>
      </Link>
    </div>
  );
};

export default PostHeader;
