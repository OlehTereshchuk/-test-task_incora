import { loadCommentsFromServer } from '../api/commentsAPI';

const SET_COMMENTS = 'SET_COMMENTS';

const setComments = comments => ({
  type: SET_COMMENTS,
  comments,
});

export const loadComments = URL => async(dispatch) => {
  const comments = await loadCommentsFromServer(URL);

  dispatch(setComments(comments));
};

const commentsReducer = (comments = [], action) => {
  switch (action.type) {
    case SET_COMMENTS:
      return action.comments;
    default:
      return comments;
  }
};

export default commentsReducer;
