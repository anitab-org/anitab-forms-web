import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getInfo } from '../actions/info'
import PropTypes from 'prop-types'
import { Menu } from 'semantic-ui-react'
import { dashboard, form, submission } from '../urls'
import menubar from './../styles/Menubar.css'

class Menubar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activeItem: 'dashboard'
        }
    }

    componentDidMount() {
        this.props.getInfo()
    }

    handleItemClick = (e, { name }) => {
        this.setState({
            activeItem: name
        })
    }

    render() {
        const { activeItem } = this.state

        return(
            <div className='menubar'>
            <Menu pointing secondary>
                <Menu.Item
                name='dashboard'
                active={activeItem === 'dashboard'}
                onClick={this.handleItemClick}
                as={Link}
                to={dashboard()}
                > DASHBOARD </Menu.Item>
                <Menu.Item
                name='forms'
                active={activeItem === 'forms'}
                onClick={this.handleItemClick}
                as={Link}
                to={form()}
                > FORMS </Menu.Item>
                <Menu.Item
                name='submissions'
                active={activeItem === 'submissions'}
                onClick={this.handleItemClick}
                as={Link}
                to={submission()}
                > SUBMISSIONS </Menu.Item>
            </Menu>
            </div>
        )
    }
}

Menubar.propTypes = {
    userinfo: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    userinfo: state.info.userinfo,
})

export default connect(
    mapStateToProps,
    { getInfo, }
)(Menubar)
