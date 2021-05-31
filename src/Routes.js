import React, { Component } from 'react';
import { Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Forms from './components/Forms';
import ErrorPage from './components/ErrorPage';
import Submission from './components/Submission';
import Questions from './components/Questions';
import {
  login,
  register,
  dashboard,
  forms,
  submission,
  urlBaseFrontend,
} from './urls';
import { PrivateRoute } from './PrivateRoute';
import { AuthRoute } from './AuthRoute';

export default class Routes extends Component {
  render() {
    return (
      <>
        <Switch>
          <PrivateRoute exact path={dashboard()} component={Dashboard} />
          <PrivateRoute exact path={forms()} component={Forms} />
          <PrivateRoute exact path={submission()} component={Submission} />
          <PrivateRoute
            exact
            path={`${urlBaseFrontend()}form/:id`}
            component={Questions}
          />
          <AuthRoute path={login()} component={Login} />
          <AuthRoute path={register()} component={Register} />
          <AuthRoute component={ErrorPage} />
        </Switch>
      </>
    );
  }
}
