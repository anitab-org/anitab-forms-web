import axios from 'axios'
import {
    urlQuestions
} from '../urls'
import {
    GET_QUESTIONS,
    POST_QUESTIONS,
    QUESTION_ERROR
} from './types'

export const getQuestions = (form_id) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.get(urlQuestions(form_id), config);
        dispatch({
            type: GET_QUESTIONS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: QUESTION_ERROR,
            payload: err.response.data
        })
    }
}

export const postQuestions = (form_id) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.post(urlQuestions(form_id), config);
        dispatch({
            type: POST_QUESTIONS,
            payload: res.data
        });
    }
    catch (err) {
        dispatch({
            type: QUESTION_ERROR,
            payload: err.response.data
        })
    }
}
