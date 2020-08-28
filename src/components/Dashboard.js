import React, { Component } from 'react'
import '../styles/Dashboard.css'
import { Item, Card, Header, Divider, Icon } from 'semantic-ui-react'
import Profile from './Profile'
import FormsFilled from './FormsFilled'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            edit: false
        }
    }

    handleEdit = () => {
        this.setState({
            edit: !this.state.edit
        })
    }

    render() {
        return (
            <div className='dashboard'>
                <div className='left'>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Item.Header>
                                    <div className='head'> 
                                        <span>Profile</span>
                                        {
                                            this.props.id ?
                                            null
                                            : <Icon name={this.state.edit ? 'x' : 'pencil'} color='grey' onClick={this.handleEdit} />
                                        }
                                        
                                    </div>
                                </Item.Header>
                                <Item.Description>
                                    <Profile edit={this.state.edit} id={this.props.id}/>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                        <Divider/>
                        <Item>
                            <Item.Content>
                                <Header>Forms Filled</Header>
                                <FormsFilled  id={this.props.id}/>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </div>
                <div className='right'>
                    <Card.Group centered itemsPerRow={1}>
                        <Card>
                            <Card.Content header='Zulip Stats' />
                        </Card>
                        <Card>
                            <Card.Content header='Github Stats' />
                        </Card>
                    </Card.Group>
                </div>
            </div>
        )
    }
}
