import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getForm } from '../actions/form'
import { getInfo } from '../actions/info'
import { getQuestions, postQuestions } from '../actions/question'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../styles/Questions.css'
import { Header, Card, Form, TextArea, Checkbox, Button, Modal, Icon, Select, Divider, Item } from 'semantic-ui-react'
import { forms } from '../urls'

const options = [
    { key: 'char', text: 'Short Answer', value: 'char' },
    { key: 'text', text: 'Paragraph', value: 'text' },
    { key: 'choice', text: 'Choice', value: 'choice' },
    { key: 'checkbox', text: 'Checkbox', value: 'checkbox' },
    { key: 'dropdown', text: 'Dropdown', value: 'dropdown' },
    { key: 'date', text: 'Date', value: 'date' },
    { key: 'time', text: 'Time', value: 'time' },
    { key: 'file', text: 'File Upload', value: 'file' },
  ]

class Questions extends Component {
    constructor(props) {
        super(props)
    }

    async componentDidMount() {
        this.props.getInfo()
        const { id } = this.props.match.params
        await this.props.getQuestions(id)
        await this.props.getForm(id)
    }

    render() {
        console.log(this.props)
        const { questions, form, userinfo } = this.props
        const type = userinfo ? ( userinfo[0] ? userinfo[0].user_type : null ) : 'student'
        return(
            <div className='questions'>
                <Item as={Link} to={forms()} className='back'>
                    <Icon name='arrow left' />
                    <Item.Content>Back to all Forms</Item.Content>
                </Item>
                <div className='upper'>
                {
                    form && form.length !== 0 ?
                        <Card fluid key={form.id}>
                            <Card.Content>
                                <Card.Header>{form.name}</Card.Header>
                                <Card.Meta>{form.description}</Card.Meta>
                                <div className='details'>
                                    <div className='first'>
                                        <span>Published Status: <span className='green'>YES</span></span>
                                        <span>Fields: <span className='blue'>{form.questions ? form.questions.length : '0'}</span></span>
                                    </div>
                                    <div className='center'>
                                        <span>Target User: <span className='blue'>{form.target_user ? form.target_user.toUpperCase(): null}</span></span>
                                    </div>
                                    <div className='last'>
                                        <span>Created: <span className='grey'>{moment(new Date(form.created_on), "YYYYMMDD").fromNow()}</span></span>
                                        <span>Updated: <span className='grey'>{moment(new Date(form.updated_on), "YYYYMMDD").fromNow()}</span></span>
                                    </div>
                                </div>
                            </Card.Content>                            
                        </Card>
                        : 
                        <div className='zero'>No such form exists.</div>
                }
                </div>
                <Divider />
                <div className='lower'>
                <div className='fields'>
                {
                    form && form.length !== 0 ?
                    (
                        questions && questions.length !== 0 ?
                        questions.map(question =>
                            <Form key={question.id}>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        type='text'
                                        placeholder='Enter your question field label...'
                                        value={question.label}
                                        required
                                    />
                                    <Form.Input
                                        control={Select}
                                        options={options}
                                        placeholder="Choose data type"
                                        required
                                        value={question.data_type}
                                    />
                                    <Form.Input
                                        checked={question.required}
                                        control={Checkbox}
                                        label="Required"
                                    />
                                </Form.Group>
                                <Form.Group widths={6}>
                                    <Form.Input
                                        value={question.description}
                                        control={TextArea}
                                        placeholder="Enter description (optional)"
                                    />
                                    <Form.Input
                                        type='text'
                                        placeholder="Enter options"
                                    />
                                </Form.Group>
                            </Form>
                            )
                        : null
                    )
                    : null
                }
                </div>
                {
                    type === 'admin' ?
                    (
                        form && form.length !== 0 ?
                        <div className='save'>
                            <Button color='green' fluid>
                                SAVE
                            </Button>
                            <Button primary fluid>
                                PREVIEW
                            </Button>
                        </div>
                        : null
                    )
                    : null
                }
                </div>

                
            </div>
        )
    }
}

Questions.propTypes = {
    questions: PropTypes.array.isRequired,
    form: PropTypes.array.isRequired,
    userinfo: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    questions: state.questions.questions,
    questionerror: state.questions.questionerror,
    form: state.form.form,
    userinfo: state.info.userinfo
})

export default connect(
    mapStateToProps,
    { getQuestions, postQuestions, getForm, getInfo }
)(Questions)
