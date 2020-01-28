import React from 'react';
import PropTypes from 'prop-types';

const CommentsList = ({ comments }) => (
  <article className="comments">
    <dl>
      {comments.map(comment => (
        <div key={comment.id}>
          <dt className="comment__author">
            {comment.name}
            <br />
            {comment.email}
          </dt>
          <dd className="comment__body">{comment.body}</dd>
        </div>
      ))}
    </dl>
  </article>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentsList;
