import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getQuestions } from '../actions/question'
import { postAnswers } from '../actions/answer'
import PropTypes from 'prop-types'
import '../styles/Questions.css'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { Form, TextArea, Divider, Button, Select } from 'semantic-ui-react'

class Preview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            date: '',
            time: '',
            answers: [],
            error: null,
        }
    }

    async componentDidMount() {
        await this.props.getQuestions(this.props.id)
        for(var i=0; i<this.props.questions.length; i++){
            if(this.props.questions[i].data_type === 'checkbox'){
                this.state.answers.push({ "question": this.props.questions[i].id, "value": [] })
            }
            this.state.answers.push({ "question": this.props.questions[i].id, "value": undefined })
        }
    }

    onChange = (e, id) => {
        this.setState({
            answers: this.state.answers.map((answer, index) => {
                return id === index ? {
                    ...answer,
                    value: e.target.value,
                } : answer
            })
        })
    }

    handleChange = (e, id, {name, value}) => {
        if(this.state.hasOwnProperty(name)) {
            this.setState({
                answers: this.state.answers.map((answer, index) => {
                    return id === index ? {
                        ...answer,
                        value: value,
                    } : answer
                })
            })
        }
    }

    onSelect = (e, id, {value}) => {
        this.setState({
            answers: this.state.answers.map((answer, index) => {
                return id === index ? {
                    ...answer,
                    value: value
                } : answer
            })
        })
    }

    onDropdownChange = (e, id) => {
        this.setState({
            answers: this.state.answers.map((answer, index) => {
                return id === index ? {
                    ...answer,
                    value: e.target.value
                } : answer
            })
        })
    }

    checkboxChange = (e, id, optionindex) => {
        this.setState({
            answers: this.state.answers.map((answer, index) => {
                return id === index ? {
                    ...answer,
                    value: e.target.checked ? [...this.state.answers[id].value, e.target.value] : [...this.state.answers[id].value.filter(
                        (value, idx) => idx !== optionindex
                    )]
                } : answer
            })
        })
    }

    submit = () => {
        const data = {
            form: this.props.id,
            answers: this.state.answers
        }
        this.props.postAnswers(data, this.callback)
    }

    callback = () => {
        this.setState({
            error: this.props.answererror?true:false
        })
        setTimeout(() => {
            this.setState({
                error: null
            })
        }, 5000)
    }

    render () {
        const { questions } = this.props
        const { value, answers } = this.state
        return (
            <Form className='preview'>
            {/* question type view based on each data type  */}
            {
                questions && questions.length !== 0 ?
                questions.map((question, index) =>
                    <div key={index}>
                    {
                        question.data_type === 'char' ?
                        <>
                        <Form.Input
                            label={question.order + '. ' + question.label}
                            type='text'
                            key={question.id}
                            required={question.required}
                            value={answers[index] ? answers[index].value : ''}
                            onChange={(event) => this.onChange(event, index)}
                        />
                        <span>{question.description}</span>
                        </>
                        : null
                    }
                    {
                        question.data_type === 'text' ?
                        <>
                        <Form.Input
                            label={question.order + '. ' + question.label}
                            control={TextArea}
                            key={question.id}
                            required={question.required}
                            value={answers[index] ? answers[index].value : ''}
                            onChange={(event) => this.onChange(event, index)}
                        />
                        <span>{question.description}</span>
                        </>
                        : null
                    }
                    {
                        question.data_type === 'choice' ?
                        <>
                        <span key={question.id}><b>{question.order + '. ' + question.label}</b></span>
                        {
                            question.options.map(option => 
                                <>
                                <Form.Radio
                                    label={option}
                                    value={option}
                                    checked={answers[index] ? answers[index].value === option : false}
                                    key={option}
                                    onChange={(event, value) => this.onSelect(event, index, value)}
                                />
                                </>
                                )
                        }
                        <span>{question.description}</span>
                        </>
                        : null
                    }
                    {
                        question.data_type === 'dropdown' ?
                        <>
                        <Form.Input
                            label={question.order + '. ' + question.label}
                            control='select'
                            options={question.options}
                            key={question.id}
                            required={question.required}
                            onChange={(event) => this.onDropdownChange(event, index)}
                        >
                            {
                                question.options.map(option =>

                                    <option value={option} key={option}>{option}</option>
                                    )
                            }
                        </Form.Input>
                        <span>{question.description}</span>
                        </>
                        : null
                    }
                    {
                        question.data_type === 'checkbox' ?
                        <>
                        <span key={question.id}><b>{question.order + '. ' + question.label}</b></span>
                        {
                            question.options.map((option, id) =>
                                <div key={id}>
                                <Form.Input
                                    label={option}
                                    control='input'
                                    type='checkbox'
                                    value={option}
                                    onChange={(event) => this.checkboxChange(event, index, id)}
                                />
                                </div>
                                )
                        }
                        <span>{question.description}</span>
                        </>
                        : null
                    }
                    {
                        question.data_type === 'date' ?
                        <>
                        <DateInput
                            label={question.order + '. ' + question.label}
                            required={question.required}
                            key={question.id}
                            name='date'
                            dateFormat={moment(this.value).format('YYYY-MM-DD')}
                            value={answers[index] ? answers[index].value : moment()}
                            onChange={(event, name, value) => this.handleChange(event, index, name, value)}
                        />
                        <span>{question.description}</span>
                        </>
                        : null
                    }
                    {
                        question.data_type === 'time' ?
                        <>
                        <TimeInput
                            label={question.order + '. ' + question.label}
                            required={question.required}
                            key={question.id}
                            name='time'
                            disableMinute={false}
                            value={answers[index] ? answers[index].value : ''}
                            onChange={(event, name, value) => this.handleChange(event, index, name, value)}
                        />
                        <span>{question.description}</span>
                        </>
                        : null
                    }
                    {
                        question.data_type === 'file' ?
                        <>
                        <Form.Input
                            label={question.order + '. ' + question.label}
                            required={question.required}
                            key={question.id}
                            type='file'
                        />
                        <span>{question.description}</span>
                        </>
                        : null
                    }
                    <Divider />
                    </div>
                )
                : null
            }
            <Button positive onClick={this.submit}>SUBMIT</Button>
            </Form>
        )
    }
}

Preview.propTypes = {
    questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    questions: state.questions.questions,
    questionerror: state.questions.questionerror,
    answererror: state.answer.answererror
})

export default connect(
    mapStateToProps,
    { getQuestions, postAnswers }
)(Preview)
