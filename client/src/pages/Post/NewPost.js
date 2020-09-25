import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PostForm from '../../components/Post/PostForm';
import { newPost } from '../../redux/actions/postActions';
import axios from 'axios';
import './Edit.css';

const NewPost = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const didMount = useRef(false);
  const post = useSelector((state) => state.post);
  const [values, setValues] = useState({
    name: '',
    description: '',
    image: '',
  });
  const { name, description } = values;
  const [url, setUrl] = useState('');

  const loadImage = async () => {
    const formdata = new FormData();
    formdata.append('file', values.image);
    formdata.append('upload_preset', 'instagram_social');
    formdata.append('cloud_name', 'manan07');
    const { data } = await axios.post(
      'https://api.cloudinary.com/v1_1/manan07/image/upload',
      formdata
    );
    setUrl(data.url);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    loadImage();
  };
  useEffect(() => {
    if (url !== '') {
      dispatch(newPost({ name, description, image: url }));
    }
    // eslint-disable-next-line
  }, [url]);
  useEffect(() => {
    if (didMount.current) {
      setValues({ ...values, name: '', description: '', image: '' });
      history.push('/home');
    } else didMount.current = true;
    // eslint-disable-next-line
  }, [post.posts]);

  return (
    <main id="edit-profile">
      <div className="edit-profile__container">
        <header className="edit-profile__header">
          <div className="edit-profile__avatar-container">
            <img
              src="https://cdn.pixabay.com/photo/2017/11/10/05/04/instagram-2935404__340.png"
              alt="logo"
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
