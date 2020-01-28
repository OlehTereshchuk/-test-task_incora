import {
  loadPostsFromServer, loadPostFromServer, addNewPost, putPostRequest, deletePostRequest,
} from '../api/postsAPI';

const SET_POSTS = 'SET_POSTS';
const SET_CURRENT_POST = 'SET_CURRENT_POST';
const ADD_POST = 'ADD_POST';
const EDIT_POST = 'EDIT_POST';
const DELETE_POST = 'DELETE_POST';

const setPosts = posts => ({
  type: SET_POSTS,
  posts,
});
const setCurrentPost = post => ({
  type: SET_CURRENT_POST,
  post,
});
const addPost = post => ({
  type: ADD_POST,
  post,
});
const editPost = (id, body) => ({
  type: EDIT_POST,
  id,
  body,
});
const deletePost = id => ({
  type: DELETE_POST,
  id,
});

export const loadPosts = URL => async(dispatch) => {
  const posts = await loadPostsFromServer(URL);

  dispatch(setPosts(posts));
};

export const loadPost = URL => async(dispatch) => {
  const post = await loadPostFromServer(URL);

  dispatch(setCurrentPost(post));
};

export const AddPost = (userId, title, body) => async(dispatch) => {
  const newPost = await addNewPost(userId, title, body);

  dispatch(addPost(newPost));
};

export const EditPost = (postId, newBody) => async(dispatch) => {
  const { id, body } = await putPostRequest(postId, newBody);

  dispatch(editPost(id, body));
};

export const DeletePost = postId => async(dispatch) => {
  const response = await deletePostRequest(postId);

  if (response) {
    dispatch(deletePost(postId));
  }
};

const initialValue = {
  posts: [],
  currentPost: {},
};

const postsReducer = (state = initialValue, action) => {
  switch (action.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: action.posts,
      };
    case SET_CURRENT_POST:
      return {
        ...state,
        currentPost: action.post,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.post, ...state.posts],
      };
    case EDIT_POST:
      return {
        ...state,
        posts: [...state.posts.map(
          (post) => {
            if (post.id === action.id) {
              return {
                ...post,
                body: action.body,
              };
            }

            return post;
          },
        )],
      };
    case DELETE_POST:
      return {
        ...state,
        posts: [...state.posts.filter(post => post.id !== action.id)],
      };
    default:
      return state;
  }
};

export default postsReducer;
