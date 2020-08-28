import axios from 'axios'
import {
    urlInfo,
    urlInfoId,
    urlPatchInfo
} from '../urls'
import {
    GET_USER_INFO,
    POST_USER_INFO,
    UPDATE_USER_INFO,
    USER_INFO_ERRORS
} from './types'

export const getInfo = () => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlInfo(), config);
        dispatch({
            type: GET_USER_INFO,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: USER_INFO_ERRORS,
            payload: err.response.data
        })
    }
}

export const getInfoId = (id) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlInfoId(id), config);
        dispatch({
            type: GET_USER_INFO,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: USER_INFO_ERRORS,
            payload: err.response.data
        })
    }
}

export const postInfo = (data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.post(urlInfo(), data, config);
        dispatch({
            type: POST_USER_INFO,
            payload: res.data
        });
        callback()
    }
    catch (err) {
        dispatch({
            type: USER_INFO_ERRORS,
            payload: err.response.data
        });
        callback()
    }
};

export const patchInfo = (id, data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.patch(urlPatchInfo(id), data, config);
        dispatch({
            type: UPDATE_USER_INFO,
            payload: res.data
        });
        callback()
    }
    catch (err) {
        dispatch({
            type: USER_INFO_ERRORS,
            payload: err.response.data
        });
        callback()
    }
};
