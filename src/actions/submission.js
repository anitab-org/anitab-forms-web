import axios from 'axios'
import {
    urlFormsFilled,
    urlSubmissions,
    urlFormsFilledId,
    urlFormsFilledUser
} from '../urls'
import {
    GET_FORMS,
    GET_SUBMISSIONS,
    UPDATE_SUBMISSION,
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

export const getFormsFilledUser = (id) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlFormsFilledUser(id), config);
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

export const updateSubmission = (id, data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.patch(urlFormsFilledId(id), data, config);
        dispatch({
            type: UPDATE_SUBMISSION,
            payload: res.data
        });
        callback()
    }
    catch (err) {
        console.log(err)
        dispatch({
            type: SUBMISSION_ERROR,
            payload: err.response.data
        })
        callback()
    }
}
