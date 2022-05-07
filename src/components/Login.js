import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { postLogin } from '../actions/login';
import { Form, Image, Divider, Icon, Message, Button } from 'semantic-ui-react';
import { Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './../styles/Login.css';
import orgLogo from '../assets/org-logo.jpg';
import { register } from '../urls';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameerror: null,
      passworderror: null,
      showPassword: false,
      error: null,
      submitted: false,
    };
    this.submitLogin = this.submitLogin.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  handleShow = () =>
    this.setState({
      showPassword: !this.state.showPassword,
    });

  submitLogin = () => {
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
    if (this.state.password === '') {
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

    if (err === false) {
      const data = {
        username: this.state.username,
        password: this.state.password,
      };
      this.props.postLogin(data, this.callback);
      this.setState({
        username: '',
        password: '',
        usernameerror: null,
        passworderror: null,
      });
    }
  };

  callback = () => {
    this.setState({
      error: this.props.loginerror ? true : false,
      submitted: true,
    });
    if (!this.state.error) {
      this.props.history.push('/');
    }
    setTimeout(() => {
      this.setState({
        error: null,
        submitted: false,
      });
    }, 5000);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  UNSAFE_componentWillMount() {
    this.setState({
      username: '',
      password: '',
      usernameerror: null,
      passworderror: null,
      showPassword: false,
      error: null,
      submitted: false,
    });
  }

  render() {
    const { showPassword, error, submitted } = this.state;
    return (
      <Container className="container d-flex align-items-center">
        <Container
          className="remo d-flex flex-xl-row flex-lg-row flex-md-row flex-column-reverse align-items-center justify-content-center justify-content-xl-around justify-content-lg-around w-100"
          style={{ height: 'calc(100vh - 56px)' }}
        >
          <div className="login">
            <span>
              <b>Login</b>
            </span>
            <Divider />
            <Form>
              <Form.Input
                name="username"
                data-testid="input-username"
                value={this.state.username}
                onChange={this.onChange}
                label="Username"
                required
                placeholder="Enter your username..."
              />
              <Form.Input
                data-testid="input-password"
                type={showPassword ? 'text' : 'password'}
                icon={
                  <Icon
                    name={showPassword ? 'eye slash outline' : 'eye'}
                    data-testid="hide-password"
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
              />
              <Button
                data-testid="button-login"
                fluid
                primary
                type="button"
                onClick={this.submitLogin}
                disabled={!this.state.username || !this.state.password}
              >
                LOG IN
              </Button>
            </Form>

            {/* form validation */}
            {this.state.usernameerror ? (
              <Message error content="Username cannot be empty!" />
            ) : null}
            {this.state.passworderror ? (
              <Message error content="Password cannot be empty!" />
            ) : null}
            {error && submitted ? (
              <Message error content={this.props.loginerror.detail} />
            ) : null}
            <Divider />
            <span>
              Don't have an account? <Link to={register()}>Register here.</Link>
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

Login.propTypes = {
  postLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login.login,
  loginerror: state.login.loginerror,
});

export default connect(mapStateToProps, { postLogin })(Login);
