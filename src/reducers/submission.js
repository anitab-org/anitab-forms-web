import {
    GET_FORMS,
    GET_SUBMISSIONS,
    SUBMISSION_ERROR
} from '../actions/types';

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
