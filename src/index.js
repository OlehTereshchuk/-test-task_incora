import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import store from './store/store';
import './styles/index.scss';

import UsersPage from './components/UsersPage';
import PostsPage from './components/PostsPage';
import Post from './components/Post';

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <NavLink
        to="/users"
        className="link"
        activeClassName="link--active"
      >
        Users
      </NavLink>

      <Route path="/users" component={UsersPage} />
      <Route path="/posts/:userId?" component={PostsPage} />
      <Route path="/comments/:postId?" component={Post} />

    </HashRouter>
  </Provider>,
  document.getElementById('root'),
);
