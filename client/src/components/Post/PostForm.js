import React from 'react';

const PostForm = () => {
  return (
    <div id="edit-profile">
      <form action="" className="edit-profile__form">
        <div className="form__row">
          <label for="full-name" className="form__label">
            Name:
          </label>
          <input id="full-name" type="text" className="form__input" />
        </div>
        <div className="form__row">
          <label for="user-name" className="form__label">
            Username:
          </label>
          <input id="user-name" type="text" className="form__input" />
        </div>
        <div className="form__row">
          <label for="website" className="form__label">
            Website:
          </label>
          <input id="website" type="url" className="form__input" />
        </div>
        <div className="form__row">
          <label for="bio" className="form__label">
            Bio:
          </label>
          <textarea id="bio"></textarea>
        </div>
        <div className="form__row">
          <label for="email" className="form__label">
            Email:
          </label>
          <input id="email" type="email" className="form__input" />
        </div>
        <div className="form__row">
          <label for="phone" className="form__label">
            Phone Number:
          </label>
          <input id="phone" type="tel" className="form__input" />
        </div>
        <div className="form__row">
          <label for="gender" className="form__label">
            Gender:
          </label>
          <select id="gender">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Can't remember</option>
          </select>
        </div>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default PostForm;
