import React, { useState } from 'react';
import PostForm from '../../components/Post/PostForm';
import './Edit.css';

const NewPost = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    photo: '',
    url: ''
  });

  const uploadPhoto = () => {};

  const submitHandler = (e) => {
    e.preventDefault();
    uploadPhoto();
    console.log(values);
  };
  return (
    <main id="edit-profile">
      <div className="edit-profile__container">
        <header className="edit-profile__header">
          <div className="edit-profile__avatar-container">
            <img
              src="https://cdn.pixabay.com/photo/2017/11/10/05/04/instagram-2935404__340.png"
              alt='logo'
              className="edit-profile__avatar"
            />
          </div>
          <h3 className="edit-profile__username">New Post</h3>
        </header>
        <PostForm
          submitHandler={submitHandler}
          values={values}
          setValues={setValues}
        />
      </div>
    </main>
  );
};

export default NewPost;
