import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { GoogleOauthLogin } from '../actions/login';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Message } from 'semantic-ui-react';
import '../styles/google-auth-styles.css';

class GoogleSocialAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: '',
      error: null,
      posted: false,
      errorText: '',
    };
  }

  responseCode = (response) => {
    this.setState({
      statusCode: response.code,
    });
    const data = {
      statusCode: this.state.code,
      ...response,
    };
    this.props.GoogleOauthLogin(data, this.callback);
    this.setState({
      statusCode: '',
    });
  };

  callback = () => {
    this.setState({
      error: this.props.loginerror ? true : false,
      posted: true,
      errorText: 'Server Error: try again.',
    });
    console.log(this.state.error, this.state.posted);
    if (!this.state.error) {
      this.props.history.push('/');
    }
    setTimeout(() => {
      this.setState({
        error: false,
        posted: false,
      });
    }, 4000);
  };

  GoogleError = (response) => {
    console.log(response);
    this.setState({
      error: true,
      posted: true,
      errorText: 'Google API Error.',
    });
    setTimeout(() => {
      this.setState({
        error: false,
        posted: false,
      });
    }, 4000);
  };

  componentDidMount() {
    this.setState({
      statusCode: '',
      error: null,
      posted: false,
      errorText: '',
    });
  }

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }
  render() {
    const {
      REACT_APP_GOOGLE_CLIENT_ID,
      REACT_APP_GOOGLE_CALLBACK_URL,
    } = process.env;
    const { error, posted, errorText } = this.state;
    const onFailure = (response) => this.GoogleError(response);

    return (
      <>
        {error && posted ? (
          <Message error content={errorText} />
        ) : (
          <div className="google-login" data-testid="GoogleSignUpButton">
            <GoogleLogin
              clientId={`${REACT_APP_GOOGLE_CLIENT_ID}`}
              onSuccess={this.responseCode}
              onFailure={onFailure}
              buttonText="SignUp with Google"
              redirectUri={`${REACT_APP_GOOGLE_CALLBACK_URL}`}
              className="google-cust-button"
            />
          </div>
        )}
      </>
    );
  }
}

GoogleSocialAuth.propTypes = {
  GoogleOauthLogin: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  login: state.login.login,
  loginerror: state.login.loginerror,
});

export default connect(mapStateToProps, { GoogleOauthLogin })(GoogleSocialAuth);
