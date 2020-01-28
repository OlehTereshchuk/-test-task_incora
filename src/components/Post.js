import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useLocation } from 'react-router';
import CommentsList from './CommentsList';
import { getComments, getCurrentPost } from '../store/store';
import { loadComments } from '../store/commentsReducer';
import { loadPost } from '../store/postsReducer';

const Post = ({ comments, loadCommentsFromServer, post, loadPostFromServer }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const URL_GET_COMMENTS = `https://jsonplaceholder.typicode.com/comments${location.search}`;

  const postId = +searchParams.get('postId');
  const URL_GET_POST = `https://jsonplaceholder.typicode.com/posts/${postId}`;

  useEffect(() => {
    loadPostFromServer(URL_GET_POST);
    loadCommentsFromServer(URL_GET_COMMENTS);
  }, [loadCommentsFromServer, URL_GET_COMMENTS, loadPostFromServer, URL_GET_POST]);

  return (
    <section className="post shadow">
      <h2 className="post__title">{post.title}</h2>
      <p>{post.body}</p>
      {comments.length > 0 && (
        <>
          <h3 className="post__title">Comments</h3>
          <CommentsList comments={comments} />
        </>
      )}
    </section>
  );
};

const mapStateToProps = state => ({
  comments: getComments(state),
  post: getCurrentPost(state),
});

const mapMethodsToProps = {
  loadCommentsFromServer: loadComments,
  loadPostFromServer: loadPost,
};

Post.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadCommentsFromServer: PropTypes.func.isRequired,
  post: PropTypes.shape({
    body: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  loadPostFromServer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapMethodsToProps)(Post);
