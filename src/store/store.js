import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import usersReducer from './usersReducer';
import postsReducer from './postsReducer';
import commentsReducer from './commentsReducer';

const rootReducer = combineReducers({
  users: usersReducer,
  postsInfo: postsReducer,
  comments: commentsReducer,
});

export const getUsers = state => state.users;
export const getPosts = state => state.postsInfo.posts;
export const getCurrentPost = state => state.postsInfo.currentPost;
export const getComments = state => state.comments;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
