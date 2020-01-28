import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AddPost } from '../store/postsReducer';

const Form = ({ userId, setIsFormVisible, addPost }) => {
  const [inputValue, setInputValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');

  const handleInputChange = ({ target }) => {
    setInputValue(target.value);
  };

  const handleTextareChange = ({ target }) => {
    setTextareaValue(target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (inputValue.trim() !== '' && textareaValue.trim() !== '') {
      addPost(userId, inputValue, textareaValue);
      setIsFormVisible(false);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="title" className="form__label">
Title:
        <input
          type="text"
          id="title"
          className="form__title"
          onChange={handleInputChange}
          value={inputValue}
          required
        />
      </label>
      <label htmlFor="body" className="form__label">
Body:
        <textarea
          type="text"
          id="body"
          className="form__textarea"
          onChange={handleTextareChange}
          value={textareaValue}
          required
        />
      </label>
      <input type="submit" value="Add  post" className="form__submit" />
    </form>
  );
};

Form.propTypes = {
  userId: PropTypes.string.isRequired,
  setIsFormVisible: PropTypes.func.isRequired,
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost: AddPost })(Form);
