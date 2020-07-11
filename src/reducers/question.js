import {
    GET_QUESTIONS,
    POST_QUESTIONS,
    QUESTION_ERROR
} from '../actions/types';

const initialState = {
    questions: [],
    postquestions: [],
    questionerror: null
}

const questionReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.payload,
            };
        case POST_QUESTIONS:
            return {
                ...state,
                postquestions: action.payload,
            };
        case QUESTION_ERROR:
            return {
                ...state,
                questionerror: action.payload,
            }
        default:
            return state
    }
}

export default questionReducer
