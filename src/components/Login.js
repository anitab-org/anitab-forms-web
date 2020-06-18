import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { postLogin } from '../actions/login'
import { Form, Grid, Image, Divider, Icon, Message, Button } from 'semantic-ui-react'
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
            usernameerror: null,
            passworderror: null,
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
        let err = false
        if(this.state.username===''){
            this.setState({
                usernameerror: true,
            })
            setTimeout(() => {
                this.setState({
                    usernameerror: false,
                })
            }, 10000)
            err = true
        }
        if(this.state.password===''){
            this.setState({
                passworderror: true,
            })
            setTimeout(() => {
                this.setState({
                    passworderror: false,
                })
            }, 10000)
            err = true
        }

        if(err === false){
            const data = {
                username: this.state.username,
                password: this.state.password
            }
            this.props.postLogin(data, this.callback)
            this.setState({
                username: '',
                password:'',
                usernameerror: null,
                passworderror: null
            })            
        }
    }

    callback = () => {
        this.setState({
            error: this.props.loginerror?true:false,
        })
        if(!this.state.error){
            this.props.history.push('/')
        }
        setTimeout(() => {
            this.setState({
                error: null
            })
        }, 5000)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }


    render() {
        const { showPassword } = this.state
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
                                required
                                placeholder='Enter your username...' />
                            <Form.Input
                                type={showPassword ? 'text': 'password'}
                                icon={<Icon name={showPassword ? 'eye slash outline': 'eye'} onClick={this.handleShow} link />}
                                name="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                label='Password'
                                required
                                placeholder='Enter your password...' />
                            <Button
                                fluid
                                primary
                                type='button'
                                onClick={this.submitLogin}
                                disabled={!this.state.username || !this.state.password}
                                >LOG IN</Button>
                        </Form>

                        {/* form validation */}
                        {
                            this.state.usernameerror ?
                            <Message
                            error
                            content="Username cannot be empty!"
                            />
                            : null
                        }
                        {
                            this.state.passworderror ?
                            <Message
                            error
                            content="Password cannot be empty!"
                            />
                            : null
                        }
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