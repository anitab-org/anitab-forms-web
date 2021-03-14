import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GitHubLogin from 'react-github-login';
import { postGithubCode } from '../actions/login';
import { Icon, Message } from 'semantic-ui-react';

class GitHubAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      error: null,
      posted: false,
      errorText: '',
    };
    this.postCode = this.postCode.bind(this);
    this.GithubError = this.GithubError.bind(this);
  }

  postCode = (response) => {
    this.setState({
      code: response.code,
    });
    const data = {
      code: this.state.code,
    };
    this.props.postGithubCode(data, this.callback);
    this.setState({
      code: '',
    });
  };

  callback = () => {
    this.setState({
      error: this.props.loginerror ? true : false,
      posted: true,
      errorText: 'Server Error: try again.',
    });
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

  githubIcon = () => {
    return (
      <React.Fragment>
        <div data-testid="GitHubLoginButton">
          <Icon name="github" /> Log in with GitHub
        </div>
      </React.Fragment>
    );
  };

  GithubError = (response) => {
    console.log(response);
    this.setState({
      error: true,
      posted: true,
      errorText: 'GitHub API Error.',
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
      code: '',
      error: null,
      posted: false,
      errorText: '',
    });
  }

  componentWillUnmount() {
    // eslint-disable-next-line
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    const {
      REACT_APP_GITHUB_CLIENT_ID,
      REACT_APP_GITHUB_CALLBACK_URL,
    } = process.env;
    const { error, posted, errorText } = this.state;
    const onFailure = (response) => this.GithubError(response);
    return (
      <>
        {error && posted ? (
          <Message error content={errorText} />
        ) : (
          <GitHubLogin
            clientId={`${REACT_APP_GITHUB_CLIENT_ID}`}
            onSuccess={this.postCode}
            onFailure={onFailure}
            redirectUri={`${REACT_APP_GITHUB_CALLBACK_URL}`}
            className="ui fluid button"
          >
            {this.githubIcon()}
          </GitHubLogin>
        )}
      </>
    );
  }
}

GitHubAuth.propTypes = {
  postGithubCode: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  login: state.login.login,
  loginerror: state.login.loginerror,
});

export default connect(mapStateToProps, { postGithubCode })(GitHubAuth);
