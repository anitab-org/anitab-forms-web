import {
    GET_FORMS,
    GET_SUBMISSIONS,
    UPDATE_SUBMISSION,
    SUBMISSION_ERROR
} from '../actions/types';
import { submission } from '../urls';

const initialState = {
    formsfilled: [],
    submissions: [],
    submissionerror: null
}

const submissionReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_FORMS:
            return {
                ...state,
                formsfilled: action.payload,
            };
        case GET_SUBMISSIONS:
            return {
                ...state,
                submissions: action.payload,
            };
        case UPDATE_SUBMISSION:
            return {
                ...state,
                submissions: [action.payload, ...state.submissions.filter(
                    submission => submission.id !== action.payload.id
                )],
            };
        case SUBMISSION_ERROR:
            return {
                ...state,
                submissionerror: action.payload,
            }
        default:
            return state
    }
}

export default submissionReducer
