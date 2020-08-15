import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getZulipStat, updateZulipStat } from '../actions/zulip'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Icon } from 'semantic-ui-react'
import '../styles/Dashboard.css'

class Zulip extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getZulipStat()
    }

    update = () => {
        this.props.updateZulipStat()
    }

    render() {
        const { zulipstat } = this.props
        console.log(zulipstat)
        return (
            <>
            <Card.Content >
                <Card.Header >
                    <span>Zulip Stats</span>
                    <span className='space'></span>
                    <Icon name='refresh' size='small' color='grey' onClick={this.update} className='refresh' />
                </Card.Header>
                <Card.Description>
                    <b>Username: </b>{zulipstat[0] ? zulipstat[0].zulip_username :  null}<br/>
                    <b>Total Messages: </b>{zulipstat[0] ? zulipstat[0].total_messages : 0 }<br/>
                    <b>Last Activity: </b>{zulipstat[0] ? moment(new Date(zulipstat[0].last_activity), "YYYYMMDD").fromNow() : 'Never'}<br/>
                </Card.Description>
            </Card.Content>
            {
                zulipstat[0] ?
                zulipstat[0].total_messages < 10 ?
                <Card.Content extra>Expected messages to be above 10. Please increase your community engagement!</Card.Content>
                : null
                : null
            }
            </>
        )
    }
}

Zulip.propTypes = {
    zulipstat: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    zulipstat: state.zulip.zulipstat,
    zuliperror: state.zulip.zuliperror
})

export default connect(
    mapStateToProps,
    { getZulipStat, updateZulipStat }
)(Zulip)
