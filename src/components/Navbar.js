import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getInfo } from '../actions/info'
import { getUser } from '../actions/user'
import { Icon } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import navbar from '../styles/Navbar.css'
import { login } from '../urls'


class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoggedIn: false,
            showDropdown: false,
        }
        this.change = this.change.bind(this)
    }
    componentDidMount() {
        if(localStorage.getItem('token') !== null){
            this.props.getInfo()
            this.props.getUser()
        }
        
    }
    change = (e) => {
        localStorage.removeItem('token')
        localStorage.removeItem('isAuthenticated')
        this.setState({
            isLoggedIn: false
        })
    }
    openDropdown = () => {
        this.setState({
            showDropdown: !this.state.showDropdown,
        })
    }

    render() {
        const result = this.props.userinfo
        const { user } = this.props
        const { isLoggedIn, showDropdown } = this.state
        localStorage.getItem('token') !== null ? this.state.isLoggedIn = true : this.state.isLoggedIn = false
        return (
            <div className='head'>
            <div className='navbar'>
                <span className='main'>Open Source Programs</span>
                {
                    isLoggedIn ?
                    <div className='right'>
                    {
                        result && result.length === 1 ?
                        result.map(info =>
                            <div>
                            <span>{info.name}</span>
                            
                            </div>
                            )
                            : user.map(user =>
                                <span>{user.username}</span>
                                )
                    }
                    <Icon name='caret down' onClick={this.openDropdown}/>
                    </div>
                    : null
                }                
            </div>
            {
                showDropdown ?
                <div className='dropdown'>
                    <ul>
                        <li onClick={this.change}><Link to={login()}>Logout</Link></li>
                    </ul>
                </div>
                : null
            }
            </div>
        )
    }
}

Navbar.propTypes = {
    userinfo: PropTypes.array.isRequired,
    user: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    userinfo: state.info.userinfo,
    userinfoerror: state.info.userinfoerror,
    user: state.user.user,
    usererror: state.user.usererror,
})

export default connect(
    mapStateToProps,
    { getInfo, getUser, }
)(Navbar)