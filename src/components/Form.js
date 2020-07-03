import React, { Component } from 'react'
import { connect } from 'react-redux'
import { postForm } from '../actions/form'
import { getInfo } from '../actions/info'
import PropTypes from 'prop-types'
import '../styles/Form.css'
import PublishedForm from './PublishedForm'
import UnpublishedForm from './UnpublishedForm'
import { Header, Divider } from 'semantic-ui-react'

class Form extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getInfo()
    }

    render() {
        const { userinfo } = this.props
        const type = userinfo ? ( userinfo[0] ? userinfo[0].user_type : null ) : 'student'
        return (
            <div className='form'>
                <div className='inside'>
                {
                    type === 'admin'?
                    <>
                    <Header>Published Forms</Header>
                    <PublishedForm />
                    <Divider />
                    <Header>Unpublished Forms</Header>
                    <UnpublishedForm />
                    </>
                    : <PublishedForm />
                }
                </div>
            </div>
        )
    }
}

Form.propTypes = {
    userinfo: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    formerror: state.form.formerror,
    userinfo: state.info.userinfo,
})

export default connect(
    mapStateToProps,
    { postForm, getInfo }
)(Form)
