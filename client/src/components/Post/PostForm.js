import React from 'react';

const PostForm = ({ values, setValues, submitHandler }) => {
  const onChangeHandler = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const imageChangeHandler = (e) => {
    setValues({ ...values, image: e.target.files[0] });
  };

  return (
    <form action="" className="edit-profile__form">
      <div className="form__row">
        <label className="form__label">Name:</label>
        <input
          type="text"
          value={values.name}
          onChange={onChangeHandler('name')}
          className="form__input"
          required
        />
      </div>
      <div className="form__row">
        <label className="form__label">Description:</label>
        <textarea
          type="text"
          value={values.description}
          onChange={onChangeHandler('description')}
          className="form__input"
          required
        />
      </div>
      <div className="form__row">
        <label className="form__label">Image:</label>
        <input
          type="file"
          onChange={imageChangeHandler}
          className="form__input"
          required
        />
      </div>
      <div className="text-center">
        <span
          style={{ width: '255px' }}
          className="btn btn-lg btn-outline-primary"
          onClick={submitHandler}
        >
          Submit
        </span>
      </div>
    </form>
  );
};

export default PostForm;
