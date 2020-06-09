import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import Navbar from './components/Navbar'

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <>
    <Navbar login={true}/>
    <Route {...rest} render={props => (
        localStorage.getItem('token')
        ? <Component {...props} />
        : <Redirect to='/register'/>
    )} />
    </>
)