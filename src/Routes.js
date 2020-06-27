import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Info from './components/Info'
import { login, register, dashboard } from './urls'
import {PrivateRoute} from './PrivateRoute'
import { AuthRoute } from './AuthRoute'

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute exact path={dashboard()} component={Info} />
                <AuthRoute path={login()} component={Login} />
                <AuthRoute path={register()} component={Register} />
                <Route render={() => <Redirect to='/' />} />    
            </Switch>
        )
    }
}
