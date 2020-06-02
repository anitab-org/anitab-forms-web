import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
// import Routes from '../Routes'
import app from '../styles/App.css'

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        {/* <Router>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router> */}
        it works
      </div>
    )
  }
}
