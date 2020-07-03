import axios from 'axios'
import {
    urlPostForm,
    urlGetForm
} from '../urls'
import {
    GET_PUBLISHED_FORMS,
    GET_UNPUBLISHED_FORMS,
    POST_FORM,
    UPDATE_FORM,
    FORM_ERRORS
} from './types'

export const getPublishedForm = (status) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlGetForm(status), config);
        dispatch({
            type: GET_PUBLISHED_FORMS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: FORM_ERRORS,
            payload: err.response.data
        })
    }
}

export const getUnpublishedForm = (status) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlGetForm(status), config);
        dispatch({
            type: GET_UNPUBLISHED_FORMS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: FORM_ERRORS,
            payload: err.response.data
        })
    }
}

export const postForm = (data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.post(urlPostForm(), data, config);
        dispatch({
            type: POST_FORM,
            payload: res.data
        });
        callback()
    }
    catch (err) {
        dispatch({
            type: FORM_ERRORS,
            payload: err.response.data
        });
        callback()
    }
};
