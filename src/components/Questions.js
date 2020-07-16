import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getForm } from '../actions/form'
import { getInfo } from '../actions/info'
import { getQuestions, postQuestions } from '../actions/question'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../styles/Questions.css'
import { Card, Form, TextArea, Checkbox, Button, Icon, Select, Divider, Item, Input } from 'semantic-ui-react'
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
        this.state = {
            fields: [],
            newfields: [
                {
                    label: '',
                    description: '',
                    order: null,
                    required: false,
                    data_type: 'char'
                }
            ]
        }
        this.onChange = this.onChange.bind(this)
        this.onNewChange = this.onNewChange.bind(this)
    }

    async componentDidMount() {
        this.props.getInfo()
        const { id } = this.props.match.params
        await this.props.getQuestions(id)
        await this.props.getForm(id)
    }

    onChange = (e, id, str) => {
        this.setState({
            fields: this.state.fields.map((field, index) => {
                return index === id ? {
                    ...field.label = str === 'label' ? e.target.value : field.label,
                    ...field.description = str === 'description' ? e.target.value : field.description,
                    ...field.order = str === 'order' ? e.target.value : field.order,
                    ...field.required = str === 'required' ? !field.required : field.required,
                } : field
            })
        })
    }

    onNewChange = (e, id, str) => {
        this.setState({
            newfields: this.state.newfields.map((newfield, index) => {
                return id === index ? {
                    ...newfield.label = str === 'label' ? e.target.value : newfield.label,
                    ...newfield.description = str === 'description' ? e.target.value : newfield.description,
                    ...newfield.order = str === 'order' ? e.target.value : newfield.order,
                    ...newfield.required = str === 'required' ? !newfield.required : newfield.required,
                    ...newfield.data_type = str === 'data_type' ? e.target.value : newfield.data_type
                } : newfield
            })
        })
    }

    createForm = () => {
        return this.state.newfields.map((object, index) => (
            <>
            <Form key={index}>
                <Form.Group widths='equal'>
                    <Form.Input
                        type='text'
                        placeholder='Enter your question field label...'
                        value={this.state.newfields[index].label}
                        required
                        onChange={(event) => this.onNewChange(event, index, 'label')}
                    />
                    <Form.Input
                        control={Select}
                        options={options}
                        placeholder="Choose data type"
                        required
                        value={this.state.newfields[index].data_type}
                        onChange={(event) => this.onNewChange(event, index, 'data_type')}
                    />
                    <Form.Input
                        checked={this.state.newfields[index].required || false}
                        control={Checkbox}
                        label="Required"
                        onChange={(event) => this.onNewChange(event, index, 'required')}
                    />
                </Form.Group>
                <Form.Group widths={6}>
                    <Form.Input
                        value={this.state.newfields[index].description || ''}
                        control={TextArea}
                        placeholder="Enter description (optional)"
                        onChange={(event) => this.onNewChange(event, index, 'description')}
                    />
                    <Form.Input
                        type='text'
                        placeholder="Enter options"
                    />
                </Form.Group>
            </Form>
            <Divider />
            </>
        ))
    }

    increaseField = (e) => {
        this.setState({
            newfields: [...this.state.newfields, {
                label: '',
                description: '',
                order: null,
                required: false,
                data_type: 'char'
            }]
        })
    }

    save = () => {
        const data = [...this.state.fields, ...this.state.newfields]
        console.log(data)
        const { id } = this.props.match.params
        this.props.postQuestions(id, data, this.callback)
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
        const { questions, form, userinfo } = this.props
        const type = userinfo ? ( userinfo[0] ? userinfo[0].user_type : null ) : 'student'
        this.state.fields = questions
        console.log(this.state.newfields)
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
                        <div className='zero'>This form is currently not accepting any responses.</div>
                }
                </div>
                <Divider />
                <div className='lower'>
                <div className='fields'>
                {
                    form && form.length !== 0 ?
                    (
                        questions && questions.length !== 0 ?
                        this.state.fields.map((object, index) =>
                            <>
                            <Form key={object.id}>
                                <Form.Group widths='equal'>
                                    <Form.Input
                                        type='text'
                                        placeholder='Enter your question field label...'
                                        value={this.state.fields[index].label}
                                        required
                                        onChange={(event) => this.onChange(event, index, 'label')}
                                    />
                                    <Form.Input
                                        control={Select}
                                        options={options}
                                        placeholder="Choose data type"
                                        required
                                        value={this.state.fields[index].data_type}
                                    />
                                    <Form.Input
                                        checked={this.state.fields[index].required}
                                        control={Checkbox}
                                        label="Required"
                                        onChange={(event) => this.onChange(event, index, 'required')}
                                    />
                                </Form.Group>
                                <Form.Group widths={6}>
                                    <Form.Input
                                        value={this.state.fields[index].description}
                                        control={TextArea}
                                        placeholder="Enter description (optional)"
                                        onChange={(event) => this.onChange(event, index, 'description')}
                                    />
                                    <Form.Input
                                        type='text'
                                        placeholder="Enter options"
                                    />
                                </Form.Group>
                            </Form>
                            <div className='dates'>
                                <span><i>Created {moment(new Date(this.state.fields[index].created_on), "YYYYMMDD").fromNow()}</i></span>
                                <span><i>Updated {moment(new Date(this.state.fields[index].updated_on), "YYYYMMDD").fromNow()}</i></span>
                            </div>
                            <Divider />
                            </>
                            )
                        : null
                    )
                    : null
                }
                {
                    type === 'admin' ?
                    <>
                    {this.createForm()}
                    <Icon
                        onClick={this.increaseField}
                        name="plus"
                        size="large"
                        styleName="plus-icon"
                    />
                    </>
                    : null
                }
                </div>
                
                {
                    type === 'admin' ?
                    (
                        form && form.length !== 0 ?
                        <div className='save'>
                            <Button color='green' fluid onClick={this.save} >
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
    form: PropTypes.object.isRequired,
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


// Access Key ID:
// AKIAI4722Q6MVBY56V3Q
// Secret Access Key:
// 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
