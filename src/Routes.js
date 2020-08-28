import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Forms from './components/Forms'
import Submission from './components/Submission'
import SubmissionProfile from './components/SubmissionProfile'
import Questions from './components/Questions'
import Preview from './components/Preview'
import { login, register, dashboard, forms, submission, urlBaseFrontend, urlBaseBackend } from './urls'
import {PrivateRoute} from './PrivateRoute'
import { AuthRoute } from './AuthRoute'

export default class Routes extends Component {
    render() {
        return (
            <>
            <Switch>
                <PrivateRoute exact path={dashboard()} component={Dashboard} />
                <PrivateRoute exact path={forms()} component={Forms} />
                <PrivateRoute exact path={submission()} component={Submission} />
                <PrivateRoute exact path={`${submission()}/:id`} component={SubmissionProfile} />
                <PrivateRoute exact path={`${urlBaseFrontend()}form/:id`} component={Questions} />
                <PrivateRoute exact path={`${urlBaseFrontend()}preview/:form_id/:user_id`} component={Preview} />
                <AuthRoute path={login()} component={Login} />
                <AuthRoute path={register()} component={Register} />
                <Route render={() => <Redirect to='/' />} />    
            </Switch>
            </>
        )
    }
}
