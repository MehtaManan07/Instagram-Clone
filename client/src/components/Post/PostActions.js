import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/postActions';
import { Link, useHistory } from 'react-router-dom';
import { addComment } from '../../redux/actions/commentActions';

const PostActions = ({ post, home = false }) => {
  const [comment, setComment] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user } = auth;
  const history = useHistory();

  const postComments = (home) => {
    if (!home) {
      return (
        <>
          {post.comments &&
            post.comments.map((comment) => (
              <li key={comment._id} className="photo__comment">
                <span>
                  <Link
                    to={`/profile/${comment.user._id}`}
                    className="text-secondary"
                  >
                    {comment.user.username}
                  </Link>
                </span>{' '}
                {comment.text}
                <i className="fa ml fa-ellipsis-h"></i>
              </li>
            ))}
        </>
      );
    } else {
      return (
        <>
          {post.comments &&
            post.comments.slice(0, 2).map((comment, i) => (
              <li key={comment._id} className="photo__comment">
                <span>{comment.user.username}</span> {comment.text}
                <i className="fa ml fa-ellipsis-h"></i>
              </li>
            ))}
        </>
      );
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(addComment(post._id, comment));
  };

  return (
    <div>
      <div className="photo__info">
        <div className="photo__actions">
          <span className="photo__action">
            {user !== null && post.likes.includes(user._id) ? (
              <i
                className="fa fa-heart fa-lg"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(unlikePost(post._id));
                }}
                style={{ cursor: 'pointer', color: 'rgba(255,0,0,0.5)' }}
              ></i>
            ) : (
              <i
                className="fa fa-heart-o fa-lg"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(likePost(post._id));
                }}
                style={{ cursor: 'pointer', color: 'rgba(255,0,0,0.5)' }}
              ></i>
            )}
          </span>
          <span
            onClick={() => history.push(`/post/${post._id}`)}
            className="photo__action"
          >
            <i className="fa fa-comment-o fa-lg"></i>
          </span>
        </div>
        <span className="photo__likes">{post.likes.length} likes</span>
        <ul className={`photo__comments ${!home && 'comm'}`}>
          <p>
            {home ? (
              <Link to={`/post/${post._id}`}>View All Comments</Link>
            ) : (
              ''
            )}
          </p>
          {postComments(home)}
        </ul>
        <span className="photo__time-ago">2 hours ago</span>
        <div
          className={`photo__add-comment-container ${!home && 'commenting'}`}
        >
          <input
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            name="comment"
            placeholder="Add a comment..."
          />
          <span
            onClick={onSubmitHandler}
            style={{ cursor: 'pointer' }}
            className="ml-auto"
          >
            Post
          </span>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
