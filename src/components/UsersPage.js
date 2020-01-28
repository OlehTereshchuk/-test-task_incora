import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers } from '../store/store';
import { loadUsers } from '../store/usersReducer';
import User from './User';

const UsersPage = ({ users, loadUsersFromServer }) => {
  const columns = ['id', 'name', 'username', 'email', 'posts'];

  useEffect(() => {
    loadUsersFromServer();
  }, [loadUsersFromServer]);

  return (
    <table className="table">
      <thead>
        <tr>
          {columns.map(column => (
            <th key={column} className="table__head-item">{column}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <User
            key={user.id}
            columns={columns}
            userData={user}
          />
        ))}
      </tbody>
    </table>
  );
};

const mapStateToProps = state => ({
  users: getUsers(state),
});

const mapMethodsToProps = {
  loadUsersFromServer: loadUsers,
};

UsersPage.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadUsersFromServer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapMethodsToProps)(UsersPage);
