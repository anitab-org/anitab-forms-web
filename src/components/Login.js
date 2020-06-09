import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postLogin } from '../actions/login'
import { Form, Grid, Image, Divider, Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import login from './../styles/Login.css'
import orgLogo from '../assets/org-logo.jpg'
import { register } from '../urls'

class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            error: null
        }
        this.submitLogin = this.submitLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleShow = (e) => this.setState({
        showPassword: !this.state.showPassword
    })

    submitLogin = () => {
        const data = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.postLogin(data, this.callback)
        if(this.state.error === null){
            this.props.history.push('/')
        }
    }

    callback = () => {
        this.setState({
            error: this.props.loginerror?true:false,
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    componentWillUnmount() {
        this.setState({
            error: null,
            username: '',
            password:''
        })
    }

    render() {
        const { showPassword } = this.state
        console.log(this.state)
        return (
            <>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={5}>
                    <div className='login'>
                    <span><b>Login</b></span>
                    <Divider />
                        <Form>
                            <Form.Input
                                name="username"
                                value={this.state.username}
                                onChange={this.onChange}
                                label='Username'
                                placeholder='Enter your username...' />
                            {
                                showPassword ?
                                <Form.Input
                                    type='text'
                                    icon={<Icon name='eye slash outline'
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    onClick={this.handleShow} link />}
                                    label='Password'
                                    placeholder='Enter your password...' />
                                : <Form.Input
                                    type='password'
                                    icon={<Icon name='eye' onClick={this.handleShow} link />}
                                    name="password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    label='Password'
                                    placeholder='Enter your password...' />
                            }
                            <Form.Button fluid primary onClick={this.submitLogin}>LOG IN</Form.Button>
                        </Form>
                    <Divider />
                    <span>Don't have an account? <Link to={register()}>Register here.</Link></span>
                    </div>
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <div className='logo'>
                        <Image src={orgLogo} />
                        </div>
                    </Grid.Column>
                </Grid.Row>
            
            </Grid>
            </>
        )
    }
}

Login.propTypes = {
    postLogin: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    login: state.login.login,
    loginerror: state.login.loginerror
})

export default connect(
    mapStateToProps,
    { postLogin, }
)(Login)