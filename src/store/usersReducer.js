import { loadUsersFromServer } from '../api/usersAPI';

const SET_USERS = 'SET_USERS';

const setUsers = users => ({
  type: SET_USERS,
  users,
});

export const loadUsers = () => async(dispatch) => {
  const users = await loadUsersFromServer();

  dispatch(setUsers(users));
};

const usersReducer = (users = [], action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return users;
  }
};

export default usersReducer;
