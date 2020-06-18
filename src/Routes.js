import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Form from './components/Form'
import Submission from './components/Submission'
import { login, register, dashboard, form, submission } from './urls'
import {PrivateRoute} from './PrivateRoute'
import { AuthRoute } from './AuthRoute'

export default class Routes extends Component {
    render() {
        return (
            <>
            <Switch>
                <PrivateRoute exact path={dashboard()} component={Dashboard} />
                <PrivateRoute exact path={form()} component={Form} />
                <PrivateRoute exact path={submission()} component={Submission} />
                <AuthRoute path={login()} component={Login} />
                <AuthRoute path={register()} component={Register} />
                <Route render={() => <Redirect to='/' />} />    
            </Switch>
            </>
        )
    }
}
