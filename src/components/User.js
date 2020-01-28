import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const User = ({ userData, columns }) => (
  <tr>
    {columns.map((column) => {
      if (column === 'posts') {
        return (
          <td key={column} className="table__body-item">
            <NavLink
              to={`/posts?userId=${userData.id}`}
              className="table__body-link"
            >
                Details
            </NavLink>
          </td>
        );
      }

      return (
        <td className="table__body-item" key={column}>{userData[column]}</td>
      );
    })}
  </tr>
);

User.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default User;
