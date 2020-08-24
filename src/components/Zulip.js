import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getZulipStat, updateZulipStat } from '../actions/zulip'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Card, Icon } from 'semantic-ui-react'
import '../styles/Dashboard.css'

class Zulip extends Component {

    componentDidMount() {
        this.props.getZulipStat()
    }

    update = () => {
        this.props.updateZulipStat()
    }

    render() {
        const { zulipstat } = this.props
        return (
            <>
            {/* zulip stats of a user  */}
            <Card.Content >
                <Card.Header >
                    <span>Zulip Stats</span>
                    <span className='space'></span>
                    <Icon name='refresh' size='small' color='grey' onClick={this.update} className='refresh' />
                </Card.Header>
                <Card.Description>
                    {
                        zulipstat[0] ?
                        <>
                        <b>Username: </b>{zulipstat[0].zulip_username}<br/>
                        <b>Total Messages: </b>{zulipstat[0].total_messages}<br/>
                        <b>First Activity: </b>{moment(new Date(zulipstat[0].first_activity), "YYYYMMDD").fromNow()}<br/>
                        <b>Last Activity: </b>{moment(new Date(zulipstat[0].last_activity), "YYYYMMDD").fromNow()}<br/>
                        {/* check for existence of streamwise messages */}
                        {
                            zulipstat[0].newcomers_messages ?
                            <> 
                            <b>Streams: </b><br/>
                            <ul>
                                <li><b>#newcomers: </b>{zulipstat[0] ? zulipstat[0].newcomers_messages : 0 }</li>
                                <li><b>#celebrate: </b>{zulipstat[0] ? zulipstat[0].celebrate_messages : 0 }</li>
                                <li><b>#opportunities: </b>{zulipstat[0] ? zulipstat[0].opportunities_messages : 0 }</li>
                                <li><b>#questions: </b>{zulipstat[0] ? zulipstat[0].questions_messages : 0 }</li>
                                <li><b>#general: </b>{zulipstat[0] ? zulipstat[0].general_messages : 0 }</li>
                            </ul>
                            </>
                            : null
                        }
                        </>
                        : null
                    }
                </Card.Description>
            </Card.Content>
            {/* this part shows details of high/low community interaction and last updated time of stats  */}
            <Card.Content extra>
                <b>Stats Last updated: </b>{zulipstat[0] ? moment(new Date(zulipstat[0].updated_on), "YYYYMMDD").fromNow() : 'Never'}<br/>
                {
                    zulipstat[0] ?
                    zulipstat[0].total_messages < 10 ?
                    <span>Expected messages to be above 10. Please increase your community engagement!</span>
                    : null
                    : null
                }
            </Card.Content>
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
