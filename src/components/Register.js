import React, { Component } from 'react';
import { connect } from 'react-redux';
import { postRegister } from '../actions/login';
import { Form, Image, Divider, Icon, Message } from 'semantic-ui-react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { login } from '../urls';
import orgLogo from '../assets/org-logo.jpg';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      usernameerror: null,
      emailerror: null,
      passworderror: null,
      matcherror: null,
      showPassword: false,
      showConfirmPassword: false,
      error: null,
      submitted: false,
      emailregexp: /\S+@\S+\.\S+/,
      passwordregexp:
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-~`!@#$%^&*()_+=><,.|?/\\{}[\]"':;])[A-Za-z\d-~`!@#$%^&*()_+=><,.|?/\\{}[\]"':;]{8,}$/,
    };
    this.submitRegister = this.submitRegister.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleShow = () =>
    this.setState({
      showPassword: !this.state.showPassword,
    });

  handleShowConfirm = () =>
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword,
    });

  submitRegister = () => {
    // form validation checks
    let err = false;
    if (this.state.username === '') {
      this.setState({
        usernameerror: true,
      });
      setTimeout(() => {
        this.setState({
          usernameerror: false,
        });
      }, 10000);
      err = true;
    }
    if (
      this.state.email === '' ||
      !this.state.emailregexp.test(this.state.email)
    ) {
      this.setState({
        emailerror: true,
      });
      setTimeout(() => {
        this.setState({
          emailerror: false,
        });
      }, 10000);
      err = true;
    }
    if (
      this.state.password === '' ||
      this.state.confirm_password === '' ||
      !this.state.passwordregexp.test(this.state.password) ||
      !this.state.passwordregexp.test(this.state.confirm_password)
    ) {
      this.setState({
        passworderror: true,
      });
      setTimeout(() => {
        this.setState({
          passworderror: false,
        });
      }, 10000);
      err = true;
    }
    if (this.state.password !== this.state.confirm_password) {
      this.setState({
        matcherror: true,
      });
      setTimeout(() => {
        this.setState({
          matcherror: false,
        });
      }, 10000);
      err = true;
    }

    // prevent submission on error
    if (err === false) {
      const data = {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
      };
      this.props.postRegister(data, this.callback);
      this.setState({
        username: '',
        email: '',
        password: '',
        confirm_password: '',
        usernameerror: null,
        emailerror: null,
        passworderror: null,
        matcherror: null,
      });
    }
  };

  callback = () => {
    this.setState({
      error: this.props.registererror ? true : false,
      submitted: true,
    });
    setTimeout(() => {
      this.setState({
        error: null,
        submitted: false,
      });
    }, 5000);
  };

  componentWillUnmount() {
    this.setState({
      submitted: false,
      error: null,
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      usernameerror: null,
      emailerror: null,
      passworderror: null,
      matcherror: null,
    });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { showPassword, showConfirmPassword } = this.state;
    var usererror = null;
    var mailerror = null;
    this.props.registererror
      ? (usererror = this.props.registererror.username)
      : (usererror = null);
    this.props.registererror
      ? (mailerror = this.props.registererror.email)
      : (mailerror = null);

    return (
      <Container className="container d-flex align-items-center">
        <Container
          className="remo d-flex flex-xl-row flex-lg-row flex-md-row flex-column-reverse align-items-center justify-content-center justify-content-xl-around justify-content-lg-around w-100"
          style={{ height: 'calc(100vh - 56px)' }}
        >
          <div className="login">
            <span>
              <b>Register</b>
            </span>
            <Divider />
            <Form>
              <Form.Input
                name="username"
                value={this.state.username}
                onChange={this.onChange}
                label="Username"
                required
                placeholder="Enter your username..."
                data-testid="username"
              />
              <Form.Input
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                label="Email"
                required
                placeholder="Enter your email..."
                data-testid="email"
              />
              <Form.Input
                type={showPassword ? 'text' : 'password'}
                icon={
                  <Icon
                    name={showPassword ? 'eye slash outline' : 'eye'}
                    data-testid="hide-display-password"
                    onClick={this.handleShow}
                    link
                  />
                }
                name="password"
                value={this.state.password}
                onChange={this.onChange}
                label="Password"
                required
                placeholder="Enter your password..."
                data-testid="password"
              />
              <Form.Input
                type={showConfirmPassword ? 'text' : 'password'}
                icon={
                  <Icon
                    name={showConfirmPassword ? 'eye slash outline' : 'eye'}
                    data-testid="hide-display-confirm-password"
                    onClick={this.handleShowConfirm}
                    link
                  />
                }
                name="confirm_password"
                value={this.state.confirm_password}
                onChange={this.onChange}
                label="Confirm Password"
                required
                placeholder="Confirm your password..."
                data-testid="confirm_password"
              />
              <Form.Button
                fluid
                primary
                onClick={this.submitRegister}
                disabled={
                  !this.state.username ||
                  !this.state.email ||
                  !this.state.password ||
                  !this.state.confirm_password
                }
                data-testid="register_btn"
              >
                REGISTER
              </Form.Button>
            </Form>

            {/* form validation */}
            {this.state.usernameerror ? (
              <Message error content="Username cannot be empty!" />
            ) : null}
            {this.state.emailerror ? (
              <Message error content="Email format is not valid!" />
            ) : null}
            {this.state.passworderror ? (
              <Message
                error
                content="Password is too short and not valid! It should contain minimum 12 characters, at least one uppercase letter, one lowercase letter, one number and one special character."
              />
            ) : null}
            {this.state.matcherror ? (
              <Message error content="Passwords do not match!" />
            ) : null}
            {this.state.error && this.state.submitted ? (
              usererror ? (
                <Message
                  warning
                  content="A user with that username already exists."
                />
              ) : (
                <Message warning content={this.props.registererror} />
              )
            ) : (
              <>
                {this.state.submitted ? (
                  <Message
                    success
                    content="You have registered successfully! Please confirm your email address to Login."
                  />
                ) : null}
              </>
            )}
            {this.state.error && this.state.submitted ? (
              mailerror ? (
                <Message warning content="Email address not valid." />
              ) : null
            ) : null}
            <Divider />
            <span>
              Already have an account? <Link to={login()}>Login here.</Link>
            </span>
          </div>
          <div className="logo">
            <Image src={orgLogo} />
          </div>
        </Container>
      </Container>
    );
  }
}

Register.propTypes = {
  postRegister: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  register: state.login.register,
  registererror: state.login.registererror,
});

export default connect(mapStateToProps, { postRegister })(Register);
