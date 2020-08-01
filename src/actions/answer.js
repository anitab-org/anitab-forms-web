import axios from 'axios'
import {
    urlFormFeedback
} from '../urls'
import {
    GET_ANSWERS,
    POST_ANSWERS,
    ANSWER_ERROR
} from './types'

export const postAnswers = (data, callback) => async dispatch => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.token}`,
            }
        }
        const res = await axios.post(urlFormFeedback(),data, config);
        dispatch({
            type: POST_ANSWERS,
            payload: res.data
        });
        callback()
    }
    catch (err) {
        dispatch({
            type: ANSWER_ERROR,
            payload: err.response.data
        })
    }
}
