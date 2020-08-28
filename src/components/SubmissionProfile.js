import React, { Component } from 'react'
import '../styles/Submission.css'
import { Link } from 'react-router-dom'
import { submission } from '../urls'
import { Item, Icon } from 'semantic-ui-react'
import Dashboard from './Dashboard'

export default class SubmissionProfile extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className='submission'>
                <Item as={Link} to={submission()} className='back'>
                    <Icon name='arrow left' />
                    <Item.Content>Back to all Submissions</Item.Content>
                </Item>
                <div className='displaydashboard'>
                    <Dashboard id={this.props.match.params.id} />
                </div>
            </div>
        )
    }
}
