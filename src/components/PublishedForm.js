import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPublishedForm } from '../actions/form'
import PropTypes from 'prop-types'
import { Card, Icon, Button, Divider } from 'semantic-ui-react'
import moment from 'moment'
import '../styles/Form.css'

class PublishedForm extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.getPublishedForm('True')
    }

    render() {
        const { publishedform } = this.props
        return (
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
                            <Card.Content extra>
                                <Button basic color='red'>UNPUBLISH</Button>
                                <Button color='blue'>EDIT</Button>
                                <Button negative>DELETE</Button>
                            </Card.Content>
                        </Card>
                        )
                        : 
                        <div>There are no Published Forms.</div>
                }
            </Card.Group>
        )
    }
}

PublishedForm.propTypes = {
    publishedform: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    publishedform: state.form.publishedform,
    formerror: state.form.formerror
})

export default connect(
    mapStateToProps,
    { getPublishedForm }
)(PublishedForm)
