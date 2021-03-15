import React, { Component } from 'react';
import { Route, Switch, Router } from 'react-router-dom';
import Routes from '../Routes';
import { history } from '../store';
import '../styles/App.css';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router history={history}>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
      </div>
    );
  }
}
