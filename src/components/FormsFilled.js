import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFormsFilled } from '../actions/submission'
import PropTypes from 'prop-types'
import { form } from '../urls'
import { Card, Button, Message, Modal, Icon, Header, Form, TextArea, Checkbox } from 'semantic-ui-react'
import moment from 'moment'
import '../styles/Form.css'

class FormsFilled extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getFormsFilled()
    }
    
    render() {
        console.log(this.props)
        return(
            <div>
                hello works
            </div>
        )
    }
}

FormsFilled.propTypes = {
    formsfilled: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    formsfilled: state.submission.formsfilled,
    submissionerror: state.submission.submissionerror
})

export default connect(
    mapStateToProps,
    { getFormsFilled }
)(FormsFilled)
