import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllSubmissions } from '../actions/submission'
import { getInfo } from '../actions/info'
import { getAllForms } from '../actions/form'
import PropTypes from 'prop-types'
import { form, submission } from '../urls'
import { Card, Button, Message, Modal, Icon, Header, Form, TextArea, Checkbox, Grid, Dropdown, Search, Input } from 'semantic-ui-react'
import moment from 'moment'
import '../styles/Submission.css'

const options = [
    { key: 'accepted', text: 'Accepted', value: 'accepted'},
    { key: 'rejected', text: 'Rejected', value: 'rejected'},
    { key: 'waitlisted', text: 'Waitlisted', value: 'waitlisted'},
    { key: 'pending', text: 'Pending', value: 'pending'},
]

const colorStyles = {
    option: (base, state) => ({
        ...base,
        color: 'red'
    })
}

class Submission extends Component {
    constructor(props) {
        super(props)
        this.state = {
            form_id: undefined,
            user_name: undefined,
        }
    }

    componentDidMount() {
        this.props.getInfo()
        this.props.getAllForms()
        this.props.getAllSubmissions(this.state.user_name, this.state.form_id)
    }

    onSearchChange = (e) => {
        this.setState({
            user_name: e.target.value,
        })
        this.props.getAllSubmissions(this.state.user_name, this.state.form_id)
    }

    formChange = (e, data) => {
        this.setState({
            form_id: data.value.length !== 0 ? data.value : undefined
        })
        this.props.getAllSubmissions(this.state.user_name, this.state.form_id)
    }
    
    render() {
        const { submissions, forms } = this.props
        const formOptions = forms.map(form => ({
            key: form.id,
            text: form.name,
            value: form.id
        }))
        console.log(this.state)
        return(
            <div className='submission'>
                <div className='searches'>
                    <Input
                        value={this.state.user_name}
                        onChange={this.onSearchChange}
                    />
                    <Dropdown
                        multiple
                        selection
                        fluid
                        placeholder='Search by form...'
                        options={formOptions}
                        onChange={this.formChange}
                    />
                </div>
                {
                    submissions && submissions.length !== 0 ?
                    <Grid celled>
                    {
                        submissions.map(submission =>
                            <Grid.Row>
                                <Grid.Column width={2}>{submission.user.user_name[0] ? submission.user.user_name[0] : submission.user.username}</Grid.Column>
                                <Grid.Column width={2}>{submission.form.name}</Grid.Column>
                                <Grid.Column width={10}>{submission.user.username}</Grid.Column>
                                <Grid.Column width={2} textAlign='center' >
                                    <Dropdown
                                        inline
                                        options={options}
                                        defaultValue={submission.acceptance_status}
                                        styles={colorStyles}
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        
                        )
                    }
                    </Grid>
                    : <span>No submissions yet.</span>
                }
            </div>
        )
    }
}

Submission.propTypes = {
    userinfo: PropTypes.func.isRequired,
    submissions: PropTypes.array.isRequired,
    forms: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    userinfo: state.info.userinfo,
    submissions: state.submission.submissions,
    forms: state.form.form,
    submissionerror: state.submission.submissionerror
})

export default connect(
    mapStateToProps,
    { getAllSubmissions, getInfo, getAllForms }
)(Submission)
