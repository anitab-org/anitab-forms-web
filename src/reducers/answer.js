import {
    GET_ANSWERS,
    POST_ANSWERS,
    ANSWER_ERROR
} from '../actions/types';

const initialState = {
    answers: [],
    postanswers: [],
    answererror: null
}

const answerReducer = (state = initialState, action) => {
    switch(action.type) {
        // case GET_ANSWERS:
        //     return {
        //         ...state,
        //         questions: action.payload,
        //     };
        case POST_ANSWERS:
            return {
                ...state,
                postanswers: action.payload,
                // questions: action.payload
            };
        case ANSWER_ERROR:
            return {
                ...state,
                answererror: action.payload,
            }
        default:
            return state
    }
}

export default answerReducer
