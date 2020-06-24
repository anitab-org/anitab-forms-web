import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'
import { dashboard } from './urls'

export const AuthRoute = ({ component: Component, ...rest }) => (
    <>
    <Navbar login={false}/>
    <Route {...rest} render={props => (
        localStorage.getItem('token') === null
        ? <Component {...props} />
        : <Redirect to={dashboard()} />
    )} />
    </>
)
