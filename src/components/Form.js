import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postForm } from '../actions/form'
import { getInfo } from '../actions/info'
import PropTypes from 'prop-types'
import '../styles/Form.css'
import PublishedForm from './PublishedForm'
import UnpublishedForm from './UnpublishedForm'
import { Header, Divider, Form, TextArea, Checkbox, Select, Dropdown, Button, Message, Icon } from 'semantic-ui-react'

const options = [
    { key: 'all', text: 'All', value: 'all' },
    { key: 'adm', text: 'Admin', value: 'admin' },
    { key: 'stu', text: 'Student', value: 'student' },
  ]

class Forms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: '',
            published_status: false,
            target_user: 'all',
            error: null,
            submitted: false,
            create: false
        }
    }

    componentDidMount() {
        this.props.getInfo()
    }

    displayForm = () => {
        this.setState({
            create: !this.state.create,
        })
    }

    submitForm = () => {
        const data = {
            name: this.state.name,
            description: this.state.description,
            published_status: this.state.published_status,
            target_user: this.state.target_user
        }
        this.props.postForm(data, this.callback)
        this.setState({
            name: '',
            description: '',
            published_status: false,
            target_user: 'all',
            create: false
        })
    }

    callback = () => {
        this.setState({
            error: this.props.formerror?true:false,
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

    onCheck = (e) => {
        this.setState({ published_status: !this.state.published_status })
    }

    onSelect = (e, { value }) => {
        this.setState({
            target_user: value
        })
    }

    render() {
        const { userinfo } = this.props
        const type = userinfo ? ( userinfo[0] ? userinfo[0].user_type : null ) : 'student'

        return (
            <div className='form'>
                <div className='inside'>
                {
                    type === 'admin'?
                    <>
                    <div className='create'>
                        <div className='message'>
                            {
                                this.state.error && this.state.submitted ?
                                <Message
                                    error
                                    content={this.props.formerror}
                                />
                                : null
                            }
                            {
                                this.state.submitted ?
                                <Message
                                    success
                                    content="Your form was created"
                                />
                                : null
                            }
                        </div>
                        {
                            this.state.create ?
                            <Form>
                                <Form.Input
                                    label='Form Name'
                                    type='text'
                                    name='name'
                                    value={this.state.name}
                                    fluid
                                    placeholder='Enter a name for your form...'
                                    onChange={this.onChange}
                                    required
                                />
                                <Form.Input
                                    fluid
                                    control={TextArea}
                                    name='description'
                                    value={this.state.description}
                                    label='Description'
                                    placeholder='Add any extra information related to your form...'
                                    onChange={this.onChange}
                                />
                                <Form.Group inline>
                                    <label>Target User</label>
                                    <Form.Radio
                                        label='All'
                                        value='all'
                                        checked={this.state.target_user === 'all'}
                                        onChange={this.onSelect}
                                    />
                                    <Form.Radio
                                        label='Admin'
                                        value='admin'
                                        checked={this.state.target_user === 'admin'}
                                        onChange={this.onSelect}
                                    />
                                    <Form.Radio
                                        label='Student'
                                        value='student'
                                        checked={this.state.target_user === 'student'}
                                        onChange={this.onSelect}
                                    />
                                </Form.Group>                            
                                <Form.Input
                                    control={Checkbox}
                                    label='Published'
                                    name='published_status'
                                    onChange={this.onCheck}
                                />
                                <div className='button'>
                                <Form.Button
                                    onClick={this.displayForm}
                                    color='grey'
                                    basic
                                >CANCEL</Form.Button>
                                <Form.Button
                                    disabled={!this.state.name || !this.state.target_user}
                                    onClick={this.submitForm}
                                    color='green'
                                >
                                    CREATE
                                </Form.Button>
                                </div>
                            </Form>
                            :
                            <div className='message'>
                                <Button icon onClick={this.displayForm}>
                                    <Icon name='add' />
                                    Create a New Form
                                </Button>
                            </div>
                        }
                        <Divider />
                    </div>
                    <Header>Published Forms</Header>
                    <PublishedForm type={type} />
                    <Divider />
                    <Header>Unpublished Forms</Header>
                    <UnpublishedForm />
                    </>
                    : <PublishedForm type={type} />
                }
                </div>
            </div>
        )
    }
}

Forms.propTypes = {
    userinfo: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    formerror: state.form.formerror,
    userinfo: state.info.userinfo,
})

export default connect(
    mapStateToProps,
    { postForm, getInfo }
)(Forms)
