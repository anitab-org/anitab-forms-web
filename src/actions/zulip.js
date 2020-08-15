import axios from 'axios'
import {
    urlZulip
} from '../urls'
import {
    GET_ZULIP_STAT,
    UPDATE_ZULIP_STAT,
    ZULIP_STAT_ERROR
} from './types'

export const getZulipStat = () => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlZulip(), config);
        dispatch({
            type: GET_ZULIP_STAT,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: ZULIP_STAT_ERROR,
            payload: err.response.data
        })
    }
}

export const updateZulipStat = (data) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.post(urlZulip(),data, config);
        dispatch({
            type: UPDATE_ZULIP_STAT,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: ZULIP_STAT_ERROR,
            payload: err.response.data
        })
    }
}
