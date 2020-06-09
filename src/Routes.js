import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Register from './components/Register'
import Info from './components/Info'
import { register, dashboard } from './urls'
import {PrivateRoute} from './PrivateRoute'
import { AuthRoute } from './AuthRoute'

export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <PrivateRoute exact path={dashboard()} component={Info} />
                <AuthRoute path={register()} component={Register} />
                <Route render={() => <Redirect to='/' />} />    
            </Switch>
        )
    }
}