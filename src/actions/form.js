import axios from 'axios'
import {
    urlPostForm,
    urlGetForm,
    urlFormId
} from '../urls'
import {
    GET_PUBLISHED_FORMS,
    GET_UNPUBLISHED_FORMS,
    GET_FORM,
    POST_FORM,
    UPDATE_PUBLISHED_FORM,
    UPDATE_UNPUBLISHED_FORM,
    UNPUBLISH_FORM,
    PUBLISH_FORM,
    DELETE_UNPUBLISHED_FORM,
    DELETE_PUBLISHED_FORM,
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

export const getForm = (id) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlFormId(id), config);
        dispatch({
            type: GET_FORM,
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
        console.log(err)
        dispatch({
            type: FORM_ERRORS,
            payload: err.response.data
        });
        callback()
    }
};

export const unpublishForm = (id, data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.patch(urlFormId(id), data, config);
        dispatch({
            type: UNPUBLISH_FORM,
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

export const publishForm = (id, data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.patch(urlFormId(id), data, config);
        dispatch({
            type: PUBLISH_FORM,
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

export const patchPublishedForm = (id, data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.patch(urlFormId(id), data, config);
        dispatch({
            type: UPDATE_PUBLISHED_FORM,
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

export const patchUnpublishedForm = (id, data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.patch(urlFormId(id), data, config);
        dispatch({
            type: UPDATE_UNPUBLISHED_FORM,
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

export const deletePublishedForm = (id, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.delete(urlFormId(id), config);
        dispatch({
            type: DELETE_PUBLISHED_FORM,
            payload: id
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

export const deleteUnpublishedForm = (id, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.delete(urlFormId(id), config);
        dispatch({
            type: DELETE_UNPUBLISHED_FORM,
            payload: id
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
