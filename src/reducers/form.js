import {
    GET_PUBLISHED_FORMS,
    GET_UNPUBLISHED_FORMS,
    POST_FORM,
    UPDATE_FORM,
    DELETE_PUBLISHED_FORM,
    DELETE_UNPUBLISHED_FORM,
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
            console.log(action.payload)
            return {
                ...state,
                postform: action.payload,
                publishedform: action.payload.published_status ? [...state, action.payload] : [...state],
                unpublishedform: action.payload.published_status ? [...state] : [...state, action.payload]
            }
        case DELETE_PUBLISHED_FORM:
            return {
                ...state,
                publishedform: state.publishedform.filter(
                    publishedform => publishedform.id !== action.payload
                )
            }
        case DELETE_UNPUBLISHED_FORM:
            return {
                ...state,
                unpublishedform: state.unpublishedform.filter(
                    unpublishedform => unpublishedform.id !== action.payload
                )
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
