import React, { Component } from "react";
import { connect } from "react-redux";
import { getInfo, postInfo, patchInfo } from "../actions/info";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { Form, Message } from "semantic-ui-react";
import "../styles/Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      zulip_id: null,
      update: false,
      error: null,
      submitted: false,
    };
  }

  componentDidMount() {
    this.props.getInfo();
  }

  submitInfo = () => {
    if (!this.state.update) {
      const data = {
        name: this.state.name,
        zulip_id: this.state.zulip_id,
      };
      this.props.postInfo(data, this.callback, this.success);
      this.setState({
        update: true,
      });
    } else {
      const data = {
        name: this.state.name,
      };
      this.props.patchInfo(
        this.props.userinfoid,
        data,
        this.callback,
        this.success
      );
    }
  };

  callback = () => {
    this.setState({
      error: this.props.userinfoerror ? true : false,
      submitted: true,
    });
    toast.error("Unsuccessful");
    setTimeout(() => {
      this.setState({
        error: null,
        submitted: false,
      });
    }, 5000);
  };
  success = () => {
    this.props.handleEdit();
    toast.success("Succesful");
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { userinfo } = this.props;
    {
      userinfo && userinfo.length === 1
        ? (this.state.update = true)
        : (this.state.update = false);
    }
    return (
      <>
        {userinfo && userinfo.length === 1 ? (
          userinfo.map((userinfo) => (
            <div key={userinfo.id}>
              {this.props.edit === true ? (
                <Form error>
                  <Form.Input
                    name="name"
                    defaultValue={
                      this.state.name ? this.state.name : userinfo.name
                    }
                    onChange={this.onChange}
                    label="Name"
                    placeholder="Enter your name..."
                    fluid
                  />
                  <Form.Input
                    name="zulip_id"
                    value={userinfo.zulip_id}
                    onChange={this.onChange}
                    label="Zulip User ID"
                    placeholder="Enter your Zulip user ID..."
                    fluid
                    readOnly
                  />
                  <Form.Input
                    name="role"
                    value={userinfo.user_type}
                    label="Role"
                    fluid
                    readOnly
                  />
                  {this.state.error && (
                    <Message
                      error
                      header="Unsuccessful"
                      content="Kindely check the Zulip Id you have provided"
                    />
                  )}
                  <Form.Button
                    disabled={!this.state.name}
                    onClick={this.submitInfo}
                  >
                    SUBMIT
                  </Form.Button>
                </Form>
              ) : (
                <div key={userinfo.id}>
                  <span>
                    <b>Name: </b>
                    {userinfo.name}
                  </span>
                  <br />
                  <span>
                    <b>Email: </b>
                    {userinfo.user.email}
                  </span>
                  <br />
                  <span>
                    <b>Role: </b>
                    {userinfo.user_type}
                  </span>
                  <br />
                  <span>
                    <b>Zulip ID: </b>
                    {userinfo.zulip_id}
                  </span>
                </div>
              )}
            </div>
          ))
        ) : (
          <>
            {this.props.edit === true ? (
              <>
                <Message
                  warning
                  header="Important: Regarding Zulip ID"
                  list={[
                    "You can go the Zulip screen and click on your name from the user list on the right. On the URL, you will see a number after user. That is your Zulip user ID.",
                    "Please enter this correctly as this will be used to get your Zulip stats, and is not changeable in future.",
                    "If you have not signed up on Zulip yet, sign up first and then enter this information!",
                  ]}
                />
                <Form error>
                  <Form.Input
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    label="Name"
                    placeholder="Enter your username..."
                    fluid
                    required
                  />
                  <Form.Input
                    name="zulip_id"
                    value={
                      this.state.zulip_id
                        ? this.state.zulip_id
                        : userinfo.zulip_id
                    }
                    onChange={this.onChange}
                    label="Zulip User ID"
                    placeholder="Enter your Zulip user ID..."
                    fluid
                    required
                  />
                  <span></span>
                  <Form.Input
                    name="role"
                    value="student"
                    label="Role"
                    fluid
                    readOnly
                  />
                  {this.state.error && (
                    <Message
                      error
                      header="Unsuccessful"
                      content="Kindely check the Zulip Id you have provided"
                    />
                  )}
                  <Form.Button
                    disabled={!this.state.name || !this.state.zulip_id}
                    onClick={this.submitInfo}
                  >
                    SUBMIT
                  </Form.Button>
                </Form>
              </>
            ) : (
              <span>
                You have not filled in your basic information till now.
              </span>
            )}
          </>
        )}
      </>
    );
  }
}

Profile.propTypes = {
  postInfo: PropTypes.func.isRequired,
  patchInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  userinfo: state.info.userinfo,
  userinfoerror: state.info.userinfoerror,
  userinfoid: state.info.userinfoid,
});

export default connect(mapStateToProps, { getInfo, postInfo, patchInfo })(
  Profile
);
