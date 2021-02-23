import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';

export const AuthRoute = ({ component: Component, ...rest }) => (
  <>
    <Navbar />
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem('token') === null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  </>
);
