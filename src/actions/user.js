import axios from 'axios'
import {
    urlUser
} from '../urls'
import {
    USER,
    USER_ERRORS
} from './types'

export const getUser = () => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlUser(), config);
        dispatch({
            type: USER,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: USER_ERRORS,
            payload: err.response.data
        })
    }
}
