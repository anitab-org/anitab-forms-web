import {
    GET_PUBLISHED_FORMS,
    GET_UNPUBLISHED_FORMS,
    POST_FORM,
    UPDATE_FORM,
    FORM_ERRORS
} from '../actions/types';

const initialState = {
    publishedform: [],
    unpublishedform: [],
    postform: [],
    formerror: null,
    formid: null
}

const formReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_PUBLISHED_FORMS:
            return {
                ...state,
                publishedform: action.payload,
            };
        case GET_UNPUBLISHED_FORMS:
            return {
                ...state,
                unpublishedform: action.payload,
            };
        case POST_FORM:
            return {
                ...state,
                postform: action.payload,
            }
        case FORM_ERRORS:
            return {
                ...state,
                formerror: action.payload,
            }
        default:
            return state
    }
}

export default formReducer
