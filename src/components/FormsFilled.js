import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFormsFilled, getFormsFilledUser } from '../actions/submission'
import PropTypes from 'prop-types'
import { preview } from '../urls'
import { Card, Button, Message, Modal, Icon, Header, Form, TextArea, Checkbox } from 'semantic-ui-react'
import moment from 'moment'
import '../styles/Dashboard.css'

class FormsFilled extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        if(this.props.id){
            this.props.getFormsFilledUser(this.props.id)
        }
        else{
            this.props.getFormsFilled()
        }
    }
    
    render() {
        console.log(this.props.formsfilled)
        const { formsfilled } = this.props
        return(
            <div className='formsfilled'>
            <Card.Group>
            {
                formsfilled && formsfilled.length !== 0 ?
                formsfilled.map(formsfilled =>
                    <Card fluid key={formsfilled.form.id} >
                        <Card.Content>
                            <Card.Header>{formsfilled.form.name}</Card.Header>
                            <Card.Meta>{formsfilled.form.description}</Card.Meta>
                            <div className='card'>
                                <div className='details'>
                                    <div className='first'>
                                        <span>Published Status: <span className='grey'>{formsfilled.form.published_status.toUpperCase()}</span></span>
                                        <span>Fields: <span className='blue'>{formsfilled.form.questions.length}</span></span>
                                    </div>
                                    <div className='center'>
                                        <span>Target User: <span className='blue'>{formsfilled.form.target_user.toUpperCase()}</span></span>
                                    </div>
                                    <div className='last'>
                                        <span>Created: <span className='grey'>{moment(new Date(formsfilled.form.created_on), "YYYYMMDD").fromNow()}</span></span>
                                        <span>Updated: <span className='grey'>{moment(new Date(formsfilled.form.updated_on), "YYYYMMDD").fromNow()}</span></span>
                                    </div>
                                </div>
                            </div>
                        </Card.Content>
                        <Card.Content extra>
                            <Button icon basic color='grey' labelPosition='right' as={Link} to={preview(formsfilled.form.id, formsfilled.user.id)}>
                                <Icon name='arrow right' />
                                VIEW FORM
                            </Button>
                        </Card.Content>
                    </Card>
                    )
                : <span>No forms filled yet.</span>
            }
            </Card.Group>
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
    { getFormsFilled, getFormsFilledUser }
)(FormsFilled)
