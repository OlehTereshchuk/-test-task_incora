import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import Form from './Form';
import { getPosts } from '../store/store';
import { loadPosts, EditPost, DeletePost } from '../store/postsReducer';

const PostsPage = ({ posts, loadPostsFromServer, editPost, deletePost }) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isEditWindowVisible, setIsEditWindowVisible] = useState(null);
  const [textareaValue, setTextareaValue] = useState('');

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const URL = `https://jsonplaceholder.typicode.com/posts${location.search}`;

  const userId = searchParams.get('userId');
  const popupButtonValue = isFormVisible ? 'Close' : 'Add new post';

  const handleButtonClick = () => {
    setIsFormVisible(!isFormVisible);
  };

  const handleEditClick = (id) => {
    setTextareaValue('');

    if (isEditWindowVisible !== id) {
      setIsEditWindowVisible(id);
    } else {
      setIsEditWindowVisible(null);
    }
  };

  const handleTextareachange = ({ target }) => {
    setTextareaValue(target.value);
  };

  const handleSubmit = (id, event) => {
    event.preventDefault();
    if (textareaValue !== '') {
      editPost(id, textareaValue);
      setIsEditWindowVisible(null);
    }
  };

  useEffect(() => {
    loadPostsFromServer(URL);
  }, [loadPostsFromServer, URL]);

  return (
    <>
      <button
        className={cn('popup-button', {
          'popup-button--close': isFormVisible,
        })}
        type="button"
        onClick={handleButtonClick}
      >
        {popupButtonValue}
      </button>

      {isFormVisible && (
        <Form userId={userId} setIsFormVisible={setIsFormVisible} />
      )}

      {posts.map(({ id, title, body }) => (
        <section key={id} className="post shadow">
          <h2 className="post__title">{title}</h2>
          <p>{body}</p>
          {isEditWindowVisible === id
            && (
              <form className="post__edit-form" onSubmit={event => handleSubmit(id, event)}>
                <button
                  onClick={() => setIsEditWindowVisible(null)}
                  type="button"
                  className="post__edit-close"
                >
                  X
                </button>
                <label htmlFor="textarea">
Body:
                  <textarea
                    id="textarea"
                    onChange={handleTextareachange}
                    className="post__edit-textarea"
                    defaultValue={body}
                  />
                </label>
                <input type="submit" className="post__edit-submit" value="Edit" />
              </form>
            )
          }

          <NavLink
            to={`/comments?postId=${id}`}
            className="post__link"
          >
            All information
          </NavLink>

          <img
            src="/-test-task_incora/images/edit.svg"
            alt="edit icon"
            className="post__icon post__icon--edit"
            onClick={() => handleEditClick(id)}
          />
          <img
            src="/-test-task_incora/images/delete.svg"
            alt="delete icon"
            className="post__icon post__icon--delete"
            onClick={() => deletePost(id)}
          />
        </section>
      ))}
    </>
  );
};

const mapStateToProps = state => ({
  posts: getPosts(state),
});

const mapMethodsToProps = {
  loadPostsFromServer: loadPosts,
  editPost: EditPost,
  deletePost: DeletePost,
};

PostsPage.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadPostsFromServer: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapMethodsToProps)(PostsPage);
