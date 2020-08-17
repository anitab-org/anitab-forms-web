import {
    GET_ALL_FORMS,
    GET_PUBLISHED_FORMS,
    GET_UNPUBLISHED_FORMS,
    GET_FORM,
    POST_FORM,
    UPDATE_PUBLISHED_FORM,
    UPDATE_UNPUBLISHED_FORM,
    UNPUBLISH_FORM,
    PUBLISH_FORM,
    DELETE_PUBLISHED_FORM,
    DELETE_UNPUBLISHED_FORM,
    FORM_ERRORS
} from '../actions/types';

const initialState = {
    form: [],
    publishedform: [],
    unpublishedform: [],
    postform: [],
    form: [],
    updatepublished: [],
    updateunpublished: [],
    formerror: null,
    formid: null
}

const formReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ALL_FORMS:
            return {
                ...state,
                form: action.payload,
            };
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
        case GET_FORM:
            return {
                ...state,
                form: action.payload,
            };
        case POST_FORM:
            return {
                ...state,
                postform: action.payload,
                publishedform: action.payload.published_status ? [action.payload, ...state.publishedform] : [...state.publishedform],
                unpublishedform: action.payload.published_status ? [...state.unpublishedform] : [action.payload, ...state.unpublishedform]
            };
        case UPDATE_PUBLISHED_FORM:
            return {
                ...state,
                postform: action.payload,
                publishedform: [...state.publishedform.filter(
                    publishedform => publishedform.id !== action.payload.id
                ), action.payload] 
            }
        case UPDATE_UNPUBLISHED_FORM:
            return {
                ...state,
                postform: action.payload,
                unpublishedform: [...state.unpublishedform.filter(
                    unpublishedform => unpublishedform.id !== action.payload.id
                ), action.payload] 
            }
        case UNPUBLISH_FORM:
            return {
                ...state,
                publishedform: [...state.publishedform.filter(
                    publishedform => publishedform.id !== action.payload.id
                )],
                unpublishedform: [action.payload, ...state.unpublishedform]
            };
        case PUBLISH_FORM:
            return {
                ...state,
                unpublishedform: [...state.unpublishedform.filter(
                    unpublishedform => unpublishedform.id !== action.payload.id
                )],
                publishedform: [action.payload, ...state.publishedform]
            };
        case DELETE_PUBLISHED_FORM:
            return {
                ...state,
                publishedform: [...state.publishedform.filter(
                    publishedform => publishedform.id !== action.payload
                )]
            };
        case DELETE_UNPUBLISHED_FORM:
            return {
                ...state,
                unpublishedform: [...state.unpublishedform.filter(
                    unpublishedform => unpublishedform.id !== action.payload
                )]
            };
        case FORM_ERRORS:
            return {
                ...state,
                formerror: action.payload,
            };
        default:
            return state
    }
}

export default formReducer
