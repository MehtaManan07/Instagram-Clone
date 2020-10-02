import React from 'react';
import { useHistory } from 'react-router-dom';
const ProfilePost = ({ posts }) => {
  const history = useHistory();
  return (
    <>
      <section className="profile__photos">
        {posts.length < 1 ? (
          <h3 style={{ margin: '0 auto' }}> No posts yet </h3>
        ) : (
          posts.map((post) => (
            <>
              <div
                onClick={() => history.push(`/post/${post._id}`)}
                className="profile__photo"
              >
                <img src={post.image} alt='post' />
                <div className="profile__photo-overlay">
                  <span className="overlay__item">
                    <i className="fa fa-heart"></i>
                    {post.likes.length}
                  </span>
                  <span className="overlay__item">
                    <i className="fa fa-comment"></i>
                    {post.comments.length}
                  </span>
                </div>
              </div>
              {/* <div className="profile__photo">
        <img src="/images/feedPhoto.jpg" />
        <div className="profile__photo-overlay">
          <span className="overlay__item">
            <i className="fa fa-heart"></i>
            486
          </span>
          <span className="overlay__item">
            <i className="fa fa-comment"></i>
            344
          </span>
        </div>
      </div>
      <div className="profile__photo">
        <img src="/images/feedPhoto.jpg" />
        <div className="profile__photo-overlay">
          <span className="overlay__item">
            <i className="fa fa-heart"></i>
            486
          </span>
          <span className="overlay__item">
            <i className="fa fa-comment"></i>
            344
          </span>
        </div>
      </div>
      <div className="profile__photo">
        <img src="/images/feedPhoto.jpg" />
        <div className="profile__photo-overlay">
          <span className="overlay__item">
            <i className="fa fa-heart"></i>
            486
          </span>
          <span className="overlay__item">
            <i className="fa fa-comment"></i>
            344
          </span>
        </div>
      </div> */}
            </>
          ))
        )}
      </section>
    </>
  );
};

export default ProfilePost;
