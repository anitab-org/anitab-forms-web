import React, { Component } from 'react'
import dashboard from '../styles/Dashboard.css'
import { Item, Card, Header, Divider } from 'semantic-ui-react'

export default class Form extends Component {
    render() {
        return (
            <div className='dashboard'>
                <div className='left'>
                <Item>
                    <Item.Content>
                        <Header>Profile</Header>
                    </Item.Content>
                </Item>
                <Divider/>
                <Item>
                    <Item.Content>
                        <Header>Forms Filled</Header>
                    </Item.Content>
                </Item>
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
