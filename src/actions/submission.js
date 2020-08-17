import axios from 'axios'
import {
    urlFormsFilled,
    urlSubmissions
} from '../urls'
import {
    GET_FORMS,
    GET_SUBMISSIONS,
    SUBMISSION_ERROR
} from './types'

export const getFormsFilled = () => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlFormsFilled(), config);
        dispatch({
            type: GET_FORMS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: SUBMISSION_ERROR,
            payload: err.response.data
        })
    }
}

export const getAllSubmissions = (user_name, form_id) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlSubmissions(user_name, form_id), config);
        dispatch({
            type: GET_SUBMISSIONS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: SUBMISSION_ERROR,
            payload: err.response.data
        })
    }
}
