import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getForm } from '../actions/form'
import { getInfo } from '../actions/info'
import { getQuestions, postQuestions } from '../actions/question'
import PropTypes from 'prop-types'
import moment from 'moment'
import '../styles/Questions.css'
import { Card, Form, TextArea, Checkbox, Button, Icon, Select, Divider, Item, Input, Dropdown, Label } from 'semantic-ui-react'
import { forms } from '../urls'


// options for selection of data type
const data_options = [
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
                    data_type: '',
                    options: [],
                    value: '',
                    forms: [this.props.match.params.id]
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

    // on change of previously available fields
    onChange = (e, id, str) => {
        this.setState({
            fields: this.state.fields.map((field, index) => {
                return index === id ? {
                    ...field,
                    ...field.label = str === 'label' ? e.target.value : field.label,
                    ...field.description = str === 'description' ? e.target.value : field.description,
                    ...field.order = str === 'order' ? e.target.value : field.order,
                    ...field.required = str === 'required' ? !field.required : field.required,
                } : field
            })
        })
    }

    // on change of new fields
    onNewChange = (e, id, str, data) => {
        this.setState({
            newfields: this.state.newfields.map((newfield, index) => {
                return id === index ? {
                    ...newfield,
                    label: str === 'label' ? e.target.value : newfield.label,
                    description: str === 'description' ? e.target.value : newfield.description,
                    order: str === 'order' ? e.target.value : newfield.order,
                    required: str === 'required' ? !newfield.required : newfield.required,
                    data_type: str === 'data_type' ? data.value : newfield.data_type,
                } : newfield
            })
        })
    }

    // adding of option to the options array
    addOption = (e, id) => {
        this.setState({
            fields: this.state.fields.map((field, index) => {
                return id === index ? {
                    ...field,
                    ...field.options = [...this.state.fields[index].options, this.state.fields[index].value],
                    ...field.value = ''
                } : field
            }),
        })
        
    }

    // adding of option to the options array
    addNewOption = (e, id) => {
        this.setState({
            newfields: this.state.newfields.map((newfield, index) => {
                return id === index ? {
                    ...newfield,
                    options: [...this.state.newfields[index].options, this.state.newfields[index].value],
                    value: ''
                } : newfield
            }),
        })
        
    }

    // handling change of field value while updating already existent field
    handleChange = (e, id) => {
        this.setState({
            fields: this.state.fields.map((field, index) => {
                return id === index ? {
                    ...field,
                    ...field.value= e.target.value
                } : field
            })
        })
    }

    // handling change of field value for newly created field
    handleNewChange = (e, id) => {
        this.setState({
            newfields: this.state.newfields.map((newfield, index) => {
                return id === index ? {
                    ...newfield,
                    value: e.target.value
                } : newfield
            })
        })
    }

    // function to add a new field
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
                    <Dropdown
                        fluid
                        selection
                        options={data_options}
                        placeholder="Choose data type"
                        required
                        onChange={(event, data) => this.onNewChange(event, index, 'data_type', data)}
                    />
                    <Form.Input
                        checked={this.state.newfields[index].required}
                        control={Checkbox}
                        label="Required"
                        onChange={(event) => this.onNewChange(event, index, 'required')}
                    />
                </Form.Group>
                <Form.Group widths={6}>
                    <Form.Input
                        value={this.state.newfields[index].description}
                        control={TextArea}
                        placeholder="Enter description (optional)"
                        onChange={(event) => this.onNewChange(event, index, 'description')}
                    />
                    <Form.Input
                        type='text'
                        pattern='[0-9]*'
                        placeholder='Order'
                        value={this.state.newfields[index].order}
                        onChange={(event) => this.onNewChange(event, index, 'order')}
                    />
                    <Form.Input
                        type='text'
                        placeholder="Enter options"
                        name="option"
                        value={this.state.newfields[index].value}
                        onChange={(event) => this.handleNewChange(event, index)}
                    />
                    <Icon name='check' color='green' onClick={(event) => this.addNewOption(event, index)} />
                </Form.Group>
                {
                    this.state.newfields[index].options && this.state.newfields[index].options.length !== 0 ?
                    this.state.newfields[index].options.map((option, index) =>
                    <Label>{option}</Label>
                    )
                    : null
                }
            </Form>
            <Divider />
            </>
        ))
    }

    // function for creating a new object
    increaseField = (e) => {
        this.setState({
            newfields: [...this.state.newfields, {
                label: '',
                description: '',
                order: null,
                required: false,
                data_type: '',
                options: [],
                value: '',
                forms: [this.props.match.params.id]
            }]
        })
    }

    // form validation to prevent saving of unnecessary data
    save = () => {
        if(this.state.newfields.length === 1 &&
            this.state.newfields[0].label === '' &&
            this.state.newfields[0].description === '' &&
            this.state.newfields[0].data_type === '' &&
            this.state.newfields[0].order === null
        ) {
            const data = [...this.state.fields]
            const { id } = this.props.match.params
            this.props.postQuestions(id, data, this.callback)
        }
        else {
            const data = [...this.state.fields, ...this.state.newfields]
            const { id } = this.props.match.params
            this.props.postQuestions(id, data, this.callback)
            this.setState({
                newfields: [
                    {
                        label: '',
                        description: '',
                        order: null,
                        required: false,
                        data_type: '',
                        options: [],
                        value: '',
                        forms: [this.props.match.params.id]
                    }
                ]
            })
        }
        
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

        // user type condition 
        const type = userinfo ? ( userinfo[0] ? userinfo[0].user_type : null ) : 'student'
        this.state.fields = questions
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

                            {/* sharing of form link */}
                            {
                                type === 'admin' ?
                                <Card.Content extra>
                                    <Modal
                                        trigger={<Button icon basic color='grey' labelPosition='right' onClick={this.close}>
                                                    <Icon name='share' />
                                                    SHARE
                                                </Button>}
                                        open={this.state.open}
                                        closeOnDimmerClick={false}
                                        closeOnEscape={false}
                                        onClose={this.close}
                                        closeIcon
                                    >
                                        <Modal.Header>Copy Link</Modal.Header>
                                        <Modal.Content>
                                            {/* domain name of the site + pathname */}
                                            <Form.Input  value={'localhost:3000' + this.props.location.pathname} />
                                        </Modal.Content>
                                    </Modal>
                                </Card.Content>
                                : null
                            }                         
                        </Card>
                        : 
                        <div className='zero'>No such form exists.</div>
                }
                </div>
                <Divider />
                <div className='lower'>
                <div className='fields'>

                {/* editable format of fields */}
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
                                        options={data_options}
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
                                        pattern='[0-9]*'
                                        placeholder='Order'
                                        value={this.state.fields[index].order}
                                        onChange={(event) => this.onChange(event, index, 'order')}
                                    />
                                    <Form.Input
                                        type='text'
                                        placeholder="Enter options"
                                        value={this.state.fields[index].value}
                                        onChange={(event) => this.handleChange(event, index)}
                                    />
                                    <Icon name='check' color='green' onClick={(event) => this.addOption(event, index)} />
                                </Form.Group>
                                {
                                    this.state.fields[index].options &&  this.state.fields[index].options.length !== 0 ?
                                    this.state.fields[index].options.map((option, index) =>
                                    <Label>{option}</Label>
                                    )
                                    : null
                                }
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
                {/* check for user type */}
                {
                    type === 'admin' ?
                    <>
                    {this.createForm()}
                    <Icon
                        onClick={this.increaseField}
                        name="plus"
                        size="large"
                    />
                    </>
                    : null
                }
                </div>
                {/* check for user type for display of buttons */}
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
