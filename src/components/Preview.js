import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getQuestions } from '../actions/question'
import PropTypes from 'prop-types'
import '../styles/Questions.css'
import { DateInput, TimeInput } from 'semantic-ui-calendar-react';
import { Form, TextArea, Divider } from 'semantic-ui-react'

class Preview extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            date: '',
            time: ''
        }
    }

    async componentDidMount() {
        await this.props.getQuestions(this.props.id)
    }

    handleChange = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
          this.setState({ [name]: value });
        }
    }

    render () {
        const { questions } = this.props
        const { value } = this.state
        return (
            <Form className='preview'>
            {/* question type view based on each data type  */}
            {
                questions && questions.length !== 0 ?
                questions.map(question =>
                    <>
                    {
                        question.data_type === 'char' ?
                        <>
                        <Form.Input
                            label={question.order + '. ' + question.label}
                            type='text'
                            key={question.id}
                            required={question.required}
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
                                    checked={value === option}
                                    key={option}
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
                            key={question.id}
                            required={question.required}
                        >
                            {
                                question.options.map(option =>
                                    <>
                                    <option value={option} key={option}>{option}</option>
                                    </> 
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
                            question.options.map(option =>
                                <>
                                <Form.Input label={option} control='input' type='checkbox' key={option}/>
                                </>
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
                            value={this.state.date}
                            onChange={this.handleChange}
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
                            value={this.state.time}
                            onChange={this.handleChange}
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
                    </>
                )
                : null
            }
            </Form>
        )
    }
}

Preview.propTypes = {
    questions: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    questions: state.questions.questions,
    questionerror: state.questions.questionerror
})

export default connect(
    mapStateToProps,
    { getQuestions }
)(Preview)
