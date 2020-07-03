import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import { getUnpublishedForm } from '../actions/form'
import PropTypes from 'prop-types'
import { Card, Icon, Item, Button } from 'semantic-ui-react'
import '../styles/Form.css'

class UnpublishedForm extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.getUnpublishedForm('False')
    }

    render() {
        const { unpublishedform } = this.props
        console.log(unpublishedform)
        return (
            <Card.Group>
                {
                    unpublishedform && unpublishedform.length !== 0 ?
                    unpublishedform.map(unpublishedform =>
                        <Card fluid key={unpublishedform.id}>
                            <Card.Content>
                                <Card.Header>{unpublishedform.name}</Card.Header>
                                <Card.Meta>{unpublishedform.description}</Card.Meta>
                                <div className='card'>
                                    <div className='details'>
                                        <div className='first'>
                                            <span>Published Status: <span className='red'>NO</span></span>
                                            <span>Fields: <span className='blue'>{unpublishedform.form_fields.length}</span></span>
                                        </div>
                                        <div className='center'>
                                            <span>Target User: <span className='blue'>{unpublishedform.target_user.toUpperCase()}</span></span>
                                        </div>
                                        <div className='last'>
                                            <span>Created: <span className='grey'>{moment(new Date(unpublishedform.created_on), "YYYYMMDD").fromNow()}</span></span>
                                            <span>Updated: <span className='grey'>{moment(new Date(unpublishedform.updated_on), "YYYYMMDD").fromNow()}</span></span>
                                        </div>
                                    </div>
                                </div>
                            </Card.Content>
                            <Card.Content extra>
                                <Button color='green'>PUBLISH</Button>
                                <Button color='blue'>EDIT</Button>
                                <Button negative>DELETE</Button>
                            </Card.Content>
                        </Card>
                        )
                        : 
                        <div>There are no Unpublished Forms.</div>
                }
            </Card.Group>
        )
    }
}

UnpublishedForm.propTypes = {
    unpublishedform: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    unpublishedform: state.form.unpublishedform,
    formerror: state.form.formerror
})

export default connect(
    mapStateToProps,
    { getUnpublishedForm }
)(UnpublishedForm)
