import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getInfo, postInfo, patchInfo } from '../actions/info'
import PropTypes from 'prop-types'
import { Form, Icon, Message } from 'semantic-ui-react'
import '../styles/Profile.css'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            update: false,
            error: null,
            submitted: false
        }
    }

    componentDidMount() {
        this.props.getInfo()   
    }

    submitInfo = () => {
        if(!this.state.update) {
            const data = {
                name: this.state.name
            }
            this.props.postInfo(data, this.callback)
            this.setState({
                update: true
            })
        }
        else {
            const data = {
                name: this.state.name
            }
            this.props.patchInfo(this.props.userinfoid, data, this.callback)
        } 
    }

    callback = () => {
        this.setState({
            error: this.props.userinfoerror?true:false,
            submitted: true
        })
        setTimeout(() => {
            this.setState({
                error: null,
                submitted: false
            })
        }, 5000)
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        const { userinfo } = this.props
        {
            userinfo && userinfo.length === 1 ? this.state.update = true : this.state.update = false
        }
        return (
            <>
            {
                userinfo && userinfo.length === 1 ?
                userinfo.map(userinfo => 
                    <>
                    {
                        this.props.edit === true ?
                        <Form>
                            <Form.Input
                                name="name"
                                defaultValue={this.state.name ? this.state.name : userinfo.name}
                                onChange={this.onChange}
                                label='Name'
                                placeholder='Enter your name...' 
                                inline
                            />
                            <Form.Input
                                name="role"
                                value={userinfo.user_type}
                                label='Role' 
                                inline
                                readOnly
                            />
                            <Form.Button
                                disabled={!this.state.name}
                                onClick={this.submitInfo}
                            >
                                SUBMIT
                            </Form.Button>
                        </Form>
                        :
                        <div>
                            <span><b>Name: </b>{userinfo.name}</span><br />
                            <span><b>Email: </b>{userinfo.user.email}</span><br />
                            <span><b>Role: </b>{userinfo.user_type}</span>
                        </div>
                    }
                    </>
                    )
                : 
                <>
                {
                    this.props.edit === true ?
                    <Form>
                        <Form.Input
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                            label='Name'
                            placeholder='Enter your username...' 
                            inline
                        />
                        <Form.Input
                            name="role"
                            value='student'
                            label='Role' 
                            inline
                            readOnly
                        />
                        <Form.Button
                            disabled={!this.state.name}
                            onClick={this.submitInfo}
                        >
                            SUBMIT
                        </Form.Button>
                    </Form>
                    : <span>You have not filled in your basic information till now.</span>
                }
                </>
            }
            </>            
        )
    }
}

Profile.propTypes = {
    userinfo: PropTypes.func.isRequired,
    postInfo: PropTypes.func.isRequired,
    patchInfo: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    userinfo: state.info.userinfo,
    userinfoerror: state.info.userinfoerror,
    userinfoid: state.info.userinfoid,
})

export default connect(
    mapStateToProps,
    { getInfo, postInfo, patchInfo }
)(Profile)
