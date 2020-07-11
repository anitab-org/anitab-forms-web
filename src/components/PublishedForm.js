import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPublishedForm, deletePublishedForm, unpublishForm, patchPublishedForm } from '../actions/form'
import PropTypes from 'prop-types'
import { form } from '../urls'
import { Card, Button, Message, Modal, Icon, Header, Form, TextArea, Checkbox } from 'semantic-ui-react'
import moment from 'moment'
import '../styles/Form.css'

class PublishedForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            formserror: null,
            deleted: false,
            open: false,
            editOpen: false,
            error: null,
            name: '',
            description: '',
            target_user: 'all'
        }
    }

    componentDidMount() {
        this.props.getPublishedForm('True')
    }

    deleteForm = (e, id) => {
        this.props.deletePublishedForm(id, 'True', this.deleteCallback)
        this.setState({
            open: !this.state.open,
        })
    }

    deleteCallback = () => {
        this.setState({
            formserror: this.props.formerror ? true : false,
            deleted: true,
        })
        setTimeout(() => {
            this.setState({
                formserror: null,
                deleted: false,
            })
        }, 5000)
    }

    close = () => {
        this.setState({ open: !this.state.open })
    }

    editClose = () => {
        this.setState({ editOpen: !this.state.editOpen })
    }

    onCheck = (e) => {
        this.setState({ published_status: !this.state.published_status })
    }

    onSelect = (e, { value }) => {
        this.setState({
            target_user: value
        })
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    unpublish = (e, id) => {
        const data = {
            published_status: 'False'
        }
        this.props.unpublishForm(id, data, this.callback)
    }

    updateForm = (e, id) => {
        const data = {}
        if (this.state.name) {
            data.name = this.state.name
        }
        if (this.state.description) {
            data.description = this.state.description
        }
        if (this.state.target_user) {
            data.target_user = this.state.target_user
        }
        this.props.patchPublishedForm(id, data, this.callback)
        this.setState({
            name: '',
            description: '',
            target_user: 'all'
        })
    }

    callback = () => {
        this.setState({
            error: this.props.formerror?true:false
        })
        setTimeout(() => {
            this.setState({
                error: null
            })
        }, 5000)
    }

    render() {
        const { publishedform, type } = this.props
        const { deleted } = this.state
        return (
            <>
            {
                deleted ?
                <Message
                    success
                    content="The form was succesfully deleted."
                />
                : null
            }
            <Card.Group>
                {
                    publishedform && publishedform.length !== 0 ?
                    publishedform.map(publishedform =>
                        <Card fluid key={publishedform.id}>
                            <Card.Content>
                                <Card.Header>{publishedform.name}</Card.Header>
                                <Card.Meta>{publishedform.description}</Card.Meta>
                                <div className='details'>
                                    <div className='first'>
                                        <span>Published Status: <span className='green'>YES</span></span>
                                        <span>Fields: <span className='blue'>{publishedform.questions.length}</span></span>
                                    </div>
                                    <div className='center'>
                                        <span>Target User: <span className='blue'>{publishedform.target_user.toUpperCase()}</span></span>
                                    </div>
                                    <div className='last'>
                                        <span>Created: <span className='grey'>{moment(new Date(publishedform.created_on), "YYYYMMDD").fromNow()}</span></span>
                                        <span>Updated: <span className='grey'>{moment(new Date(publishedform.updated_on), "YYYYMMDD").fromNow()}</span></span>
                                    </div>
                                </div>
                            </Card.Content>
                            {
                                type === 'admin' ?
                                <Card.Content extra>
                                    <Button basic color='red' onClick={(event) => this.unpublish(event, publishedform.id)}>UNPUBLISH</Button>
                                    <Modal
                                        trigger={<Button color='blue' onClick={this.editClose}>EDIT</Button>}
                                        closeOnDimmerClick={false}
                                        closeIcon
                                        key={publishedform.id}
                                    >
                                        <Modal.Header>Edit Form</Modal.Header>
                                        <Modal.Content>
                                        <Form>
                                            <Form.Input
                                                label='Form Name'
                                                type='text'
                                                name='name'
                                                value={this.state.name ? this.state.name : publishedform.name}
                                                placeholder='Enter a name for your form...'
                                                onChange={this.onChange}
                                                required
                                            />
                                            <Form.Input
                                                control={TextArea}
                                                name='description'
                                                value={this.state.description ? this.state.description : publishedform.description}
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
                                            <div className='button'>
                                            <Form.Button
                                                onClick={this.editClose}
                                                color='grey'
                                                basic
                                            >CANCEL</Form.Button>
                                            <Form.Button
                                                onClick={(event) => this.updateForm(event, publishedform.id)}
                                                color='green'
                                            >
                                                SUBMIT
                                            </Form.Button>
                                            </div>
                                        </Form>
                                        </Modal.Content>
                                    </Modal>
                                    <Modal
                                        basic
                                        trigger={<Button negative onClick={this.close}>DELETE</Button>}
                                        size='large'
                                        closeOnDimmerClick={false}
                                    >
                                        <Header icon='archive' content='Delete Confirmation' />
                                        <Modal.Content>
                                            Deleting this form will delete all the fields and responses related to this form.
                                        </Modal.Content>
                                        <Modal.Actions>
                                            <Button basic color='red' onClick={this.close}>
                                                <Icon name='remove' /> NO
                                            </Button>
                                            <Button color='green' onClick={(event) => this.deleteForm(event, publishedform.id)}>
                                                <Icon name='checkmark' /> YES
                                            </Button>
                                        </Modal.Actions>
                                    </Modal>
                                    <Button icon basic color='grey' labelPosition='right' as={Link} to={form(publishedform.id, 'True')}>
                                        <Icon name='arrow right' />
                                        EDIT FIELDS
                                    </Button>
                                </Card.Content>
                                :
                                <Card.Content extra>
                                    <Button icon basic color='grey' labelPosition='right'>
                                        <Icon name='arrow right' />
                                        FILL FORM
                                    </Button>
                                </Card.Content>
                            }
                            
                        </Card>
                        )
                        : 
                        <div className='zero'>There are no Published Forms.</div>
                }
            </Card.Group>
            </>
        )
    }
}

PublishedForm.propTypes = {
    publishedform: PropTypes.array.isRequired,
    deletePublishedForm: PropTypes.func.isRequired,
    unpublishForm: PropTypes.func.isRequired,
    patchPublishedForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    publishedform: state.form.publishedform,
    formerror: state.form.formerror
})

export default connect(
    mapStateToProps,
    { getPublishedForm, deletePublishedForm, unpublishForm, patchPublishedForm }
)(PublishedForm)
