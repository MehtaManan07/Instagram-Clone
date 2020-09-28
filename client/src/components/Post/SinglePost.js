import React, { useState } from 'react';
import PostActions from './PostActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostOptions from './PostOptions';
import PostHeader from './PostHeader';

const SinglePost = ({ post }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="photo">
      <div className="d-flex justify-content-between">
        <PostHeader post={post} />
        <i
          className="fa ml fa-ellipsis-h ml-auto mt-auto mr-2"
          onClick={() => setShow(true)}
        />
        <PostOptions
          post={post}
          show={show}
          setShow={setShow}
          onHide={() => setShow(false)}
        />
      </div>
      <img
        src={post.image}
        alt="post"
        style={{ maxHeight: '450px', width: '100%', borderRadius: '3px' }}
      />
      <div className="photo__inf0o">
      <PostActions home post={post} />

      </div>
    </div>
  );
};

export default SinglePost;
