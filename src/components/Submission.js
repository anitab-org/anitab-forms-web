import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllSubmissions, updateSubmission } from '../actions/submission'
import { getInfo } from '../actions/info'
import { getAllForms } from '../actions/form'
import PropTypes from 'prop-types'
import { submissionprofile, submission } from '../urls'
import { Grid, Dropdown, Input } from 'semantic-ui-react'
import moment from 'moment'
import '../styles/Submission.css'

const options = [
    { key: 'accepted', text: 'Accepted', value: 'accepted'},
    { key: 'rejected', text: 'Rejected', value: 'rejected'},
    { key: 'waitlisted', text: 'Waitlisted', value: 'waitlisted'},
    { key: 'pending', text: 'Pending', value: 'pending'},
]

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
        if(e.target.value === ''){
            this.props.getAllSubmissions(undefined, this.state.form_id)
        }
        else {
            this.props.getAllSubmissions(e.target.value, this.state.form_id)
        }
        this.setState({
            user_name: e.target.value,
        })
    }

    formChange = (e, data) => {
        if(data.value.length === 0){
            this.props.getAllSubmissions(this.state.user_name, undefined)
        }
        else {
            this.props.getAllSubmissions(this.state.user_name, data.value)
        }
        this.setState({
            form_id: data.value.length !== 0 ? data.value : undefined
        })
    }

    statusChange = (e, dt, id) => {
        const data = {
            acceptance_status: dt.value
        }
        console.log(data)
        this.props.updateSubmission(id, data, this.callback)
    }

    callback = () => {
        this.setState({
            error: this.props.submissionerror?true:false
        })
        setTimeout(() => {
            this.setState({
                error: null
            })
        }, 5000)
    }
    
    render() {
        const { submissions } = this.props
        const formOptions = this.props.forms.map(form => ({
            key: form.id,
            text: form.name,
            value: form.id
        }))
        console.log(submissions)
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
                <div className='submissionlist'>
                {
                    submissions && submissions.length !== 0 ?
                    <Grid celled>
                    {
                        submissions.map(submission =>
                            <Grid.Row key={submission.id}>
                                <Grid.Column width={2} as={Link} to={submissionprofile(submission.user.id)}>{submission.user.user_name[0] ? submission.user.user_name[0] : submission.user.username}</Grid.Column>
                                <Grid.Column width={2}>{submission.form.name}</Grid.Column>
                                <Grid.Column width={10}>{submission.user.username}</Grid.Column>
                                <Grid.Column className='last' width={2} textAlign='center' color={submission.acceptance_status === 'accepted' ? 'green' : (submission.acceptance_status === 'rejected' ? 'red' : (submission.acceptance_status === 'waitlisted' ? 'grey' : null))} >
                                    <Dropdown
                                        inline
                                        options={options}
                                        defaultValue={submission.acceptance_status}
                                        onChange={(event, data) => this.statusChange(event, data, submission.id)}
                                        className='green'
                                    />
                                </Grid.Column>
                            </Grid.Row>
                        
                        )
                    }
                    </Grid>
                    : <span>No submissions yet.</span>
                }
                </div>
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
    { getAllSubmissions, getInfo, getAllForms, updateSubmission }
)(Submission)
