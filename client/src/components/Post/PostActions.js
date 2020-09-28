import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/postActions';

const PostActions = ({ post }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { user } = auth;
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
          <span className="photo__action">
            <i className="fa fa-comment-o fa-lg"></i>
          </span>
        </div>
        <span className="photo__likes">{post.likes.length} likes</span>
        <ul className="photo__comments">
          {post.comments &&
            post.comments.map((comment) => (
              <li key={comment._id} className="photo__comment">
                <span className="photo__comment-author">
                  {comment.user.username}
                </span>{' '}
                {comment.text}
                <i className="fa ml fa-ellipsis-h"></i>
              </li>
            ))}
        </ul>
        <span className="photo__time-ago">2 hours ago</span>
        <div className="photo__add-comment-container">
          <textarea name="comment" placeholder="Add a comment..."></textarea>
          <i className="fa fa-ellipsis-h"></i>
        </div>
      </div>
    </div>
  );
};

export default PostActions;
