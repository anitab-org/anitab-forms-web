import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import Routes from '../Routes'
// import Navbar from './Navbar'
import { history } from '../store'
import app from '../styles/App.css'


// const store = configureStore()
// window.store = store

export default class App extends Component {
  render() {
    return (
      <div className='app'>
        <Router history={history}>
          <Switch>
            <Route component={Routes} />
          </Switch>
        </Router>
        
      </div>
    )
  }
}


