import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getActivate } from '../actions/login';
import {
  Grid,
  Icon,
  Button,
  Container,
  Segment,
  Header,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { urlBaseFrontend } from '../urls';

class Activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uidb64: this.props.match.params.uidb64,
      token: this.props.match.params.token,
      error: null,
      activated: false,
    };
    this.callActivate = this.callActivate.bind(this);
  }

  callActivate = () => {
    const data = {
      uidb64: this.state.uidb64,
      token: this.state.token,
    };
    this.props.getActivate(data, this.callback);
  };

  callback = () => {
    this.setState({
      error: this.props.activateerror ? true : false,
      activated: true,
    });
    if (!this.state.error) {
      setTimeout(() => {
        this.props.history.push('/');
      }, 5000);
    }
  };

  componentDidMount() {
    this.setState({
      uidb64: this.props.match.params.uidb64,
      token: this.props.match.params.token,
      error: null,
      activated: false,
    });
    this.callActivate();
  }

  render() {
    const { error, activated } = this.state;
    return (
      <>
        <Container text>
          <Grid>
            <Grid.Row
              style={{
                marginTop: '30%',
              }}
            >
              <Grid.Column width={16}>
                <Segment placeholder>
                  <Header
                    as="h1"
                    icon
                    style={{
                      color: '#2185D0',
                      fontWeight: 'bolder',
                    }}
                  >
                    <Icon name="mail" />
                    {error & activated
                      ? this.props.activateerror
                      : this.props.activate}
                  </Header>
                  <Segment.Inline>
                    <Header as="h3" data-testid="ActivateHeader">
                      {error ? (
                        <Link to={urlBaseFrontend()}>
                          <Button secondary>Go to Main Page</Button>
                        </Link>
                      ) : (
                        'Redirecting to Login Page in 5 seconds.'
                      )}
                    </Header>
                  </Segment.Inline>
                </Segment>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </>
    );
  }
}

Activate.propTypes = {
  getActivate: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  activate: state.login.activate,
  activateerror: state.login.activateerror,
});

export default connect(mapStateToProps, { getActivate })(Activate);
