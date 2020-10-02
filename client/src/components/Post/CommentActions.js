import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment, unlikeComment } from '../../redux/actions/commentActions';

const CommentActions = ({ comment }) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch();
    const {user} = auth;
  return (
    <div>
      {user && comment.likes.includes(user._id) ? (
        <i
          className="fa fa-heart ml"
          onClick={(e) => {
            e.preventDefault();
            dispatch(unlikeComment(comment._id));
          }}
          style={{ cursor: 'pointer', color: 'rgba(255,0,0,0.5)' }}
        ></i>
      ) : (
        <i
          className="fa fa-heart-o ml"
          onClick={(e) => {
            e.preventDefault();
            dispatch(likeComment(comment._id));
          }}
          style={{ cursor: 'pointer', color: 'rgba(255,0,0,0.5)' }}
        ></i>
      )}
    </div>
  );
};

export default CommentActions;
