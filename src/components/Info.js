import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getInfo } from '../actions/info'
import PropTypes from 'prop-types'

class Info extends Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.getInfo()
    }
    render() {
        return(
            <div>
               hello 
            </div>
        )
    }
}

Info.propTypes = {
    userinfo: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    userinfo: state.info.userinfo,
})

export default connect(
    mapStateToProps,
    { getInfo, }
)(Info)
