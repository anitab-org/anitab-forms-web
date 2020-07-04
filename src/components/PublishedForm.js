import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPublishedForm, deletePublishedForm } from '../actions/form'
import PropTypes from 'prop-types'
import { Card, Button, Message, Modal, Icon, Header } from 'semantic-ui-react'
import moment from 'moment'
import '../styles/Form.css'

class PublishedForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            formserror: null,
            deleted: false,
            open: false
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

    render() {
        const { publishedform, type } = this.props
        const { formserror, deleted } = this.state
        console.log(this.props)
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
                                        <span>Fields: <span className='blue'>{publishedform.form_fields.length}</span></span>
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
                                    <Button basic color='red'>UNPUBLISH</Button>
                                    <Button color='blue'>EDIT</Button>
                                    <Modal
                                        basic
                                        trigger={<Button negative onClick={this.close}>DELETE</Button>}
                                        open={this.state.open}
                                        size='large'
                                        closeOnDimmerClick={false}
                                        closeOnEscape={false}
                                        onClose={this.close}>
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
                                </Card.Content>
                                :
                                <Card.Content extra>
                                    <Button icon basic color='grey' labelPosition='right'>
                                        <Icon name='arrow right' />
                                        Fill Form
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
    deletePublishedForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    publishedform: state.form.publishedform,
    formerror: state.form.formerror
})

export default connect(
    mapStateToProps,
    { getPublishedForm, deletePublishedForm }
)(PublishedForm)
